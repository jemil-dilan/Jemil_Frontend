const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');
const { FileStore } = require('metro-cache');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.maxWorkers = 6;
config.resolver.unstable_enableSymlinks = false;
config.experiments = {
  ...config.experiments,
  tsconfigPaths: true,
};

const WEB_ALIASES = {
  'expo-secure-store': path.resolve(__dirname, './polyfills/web/secureStore.web.ts'),
  'react-native-webview': path.resolve(__dirname, './polyfills/web/webview.web.tsx'),
  'react-native-safe-area-context': path.resolve(
    __dirname,
    './polyfills/web/safeAreaContext.web.jsx'
  ),
  'react-native-maps': path.resolve(__dirname, './polyfills/web/maps.web.jsx'),
  'react-native-web/dist/exports/SafeAreaView': path.resolve(
    __dirname,
    './polyfills/web/SafeAreaView.web.jsx'
  ),
  'react-native-web/dist/exports/Alert': path.resolve(__dirname, './polyfills/web/alerts.web.tsx'),
  'react-native-web/dist/exports/RefreshControl': path.resolve(
    __dirname,
    './polyfills/web/refreshControl.web.tsx'
  ),
  'expo-status-bar': path.resolve(__dirname, './polyfills/web/statusBar.web.tsx'),
  'expo-location': path.resolve(__dirname, './polyfills/web/location.web.ts'),
  './layouts/Tabs': path.resolve(__dirname, './polyfills/web/tabbar.web.jsx'),
  'expo-notifications': path.resolve(__dirname, './polyfills/web/notifications.web.tsx'),
  'expo-contacts': path.resolve(__dirname, './polyfills/web/contacts.web.ts'),
  'expo-font': path.resolve(__dirname, './polyfills/web/expo-font.web.ts'),
  'react-native-google-mobile-ads': path.resolve(
    __dirname,
    './polyfills/web/google-mobile-ads.web.tsx'
  ),
  'react-native-web/dist/exports/ScrollView': path.resolve(
    __dirname,
    './polyfills/web/scrollview.web.jsx'
  ),
};
const NATIVE_ALIASES = {
  './Libraries/Components/TextInput/TextInput': path.resolve(
    __dirname,
    './polyfills/native/textinput.native.jsx'
  ),
  'react-native-google-mobile-ads': path.resolve(
    __dirname,
    './polyfills/native/google-mobile-ads.native.tsx'
  ),
};
// Aliases that only apply outside production. The real packages crash on
// import in Expo Go preview (their browser-mode shims pull in DOM-only code
// that throws on Hermes), which makes expo-router silently swallow the load
// error and warn "Route is missing the required default export" -- leaving
// the app on a black/splash screen. EAS production builds keep the real
// modules so paid users hit the native SDKs as normal.
const DEV_ONLY_NATIVE_ALIASES = {
  'react-native-purchases': path.resolve(
    __dirname,
    './polyfills/native/react-native-purchases.native.tsx'
  ),
};
const SHARED_ALIASES = {
  'expo-image': path.resolve(__dirname, './polyfills/shared/expo-image.tsx'),
};

// Add web-specific alias configuration through resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  try {
    // Polyfills are not resolved by Metro
    if (
      context.originModulePath.startsWith(`${__dirname}/polyfills/native`) ||
      context.originModulePath.startsWith(`${__dirname}/polyfills/web`) ||
      context.originModulePath.startsWith(`${__dirname}/polyfills/shared`)
    ) {
      return context.resolveRequest(context, moduleName, platform);
    }
    // Wildcard alias from tsconfig: "@/*" -> "./src/*"
    if (moduleName.startsWith('@/')) {
      return context.resolveRequest(
        context,
        path.resolve(__dirname, 'src', moduleName.slice(2)),
        platform
      );
    }
    // Wildcard alias for Expo Google Fonts
    if (moduleName.startsWith('@expo-google-fonts/') && moduleName !== '@expo-google-fonts/dev') {
      return context.resolveRequest(context, '@expo-google-fonts/dev', platform);
    }
    if (SHARED_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
      return context.resolveRequest(context, SHARED_ALIASES[moduleName], platform);
    }
    if (platform === 'web') {
      // Only apply aliases if the module is one of our polyfills
      if (WEB_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
        return context.resolveRequest(context, WEB_ALIASES[moduleName], platform);
      }
      return context.resolveRequest(context, moduleName, platform);
    }

    if (NATIVE_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
      return context.resolveRequest(context, NATIVE_ALIASES[moduleName], platform);
    }
    if (DEV_ONLY_NATIVE_ALIASES[moduleName] && !moduleName.startsWith('./polyfills/')) {
      return context.resolveRequest(
        context,
        DEV_ONLY_NATIVE_ALIASES[moduleName],
        platform
      );
    }
    return context.resolveRequest(context, moduleName, platform);
  } catch (error) {
    throw error;
  }
};

const cacheDir = path.join(__dirname, 'caches');

config.cacheStores = () => [
  new FileStore({
    root: path.join(cacheDir, '.metro-cache'),
  }),
];
config.resetCache = false;
config.fileMapCacheDirectory = cacheDir;

const originalGetTransformOptions = config.transformer.getTransformOptions;

config.transformer = {
  ...config.transformer,
  getTransformOptions: async (entryPoints, options) => {
    if (options.dev === false) {
      const fs = require('node:fs');
      fs.rmSync(cacheDir, { recursive: true, force: true });
      fs.mkdirSync(cacheDir);
    }
    return await originalGetTransformOptions(entryPoints, options);
  },
};

module.exports = config;