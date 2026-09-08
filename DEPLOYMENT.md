# Deployment

Two deployables live in this monorepo:

| App      | Directory      | Platform                                         |
| -------- | -------------- | ------------------------------------------------ |
| Web      | `apps/web`     | Vercel (Hobby), static assets + Node.js function |
| Mobile   | `apps/mobile`  | Expo EAS build (Android APK/AAB, iOS IPA)        |

---

## Web — Vercel

Tech stack: React Router v7 + Hono (`react-router-hono-server` 2.13.0) SSR with file-based `app/api` routes. The production build produces `build/server/index.js` (Hono app) and `build/client/`.

### 1. Project settings (Vercel dashboard)

- **Root Directory**: `apps/web`
- **Node.js Version**: 22.x (or >= 20 via `engines` in `apps/web/package.json`)
- **Build Command**: `npm run build` (`react-router build`)
- **Don't** let Vercel auto-detect a framework preset; the repo is "Other". The deploy is driven by `apps/web/vercel.json`:
  - `@vercel/static-build` — ships `build/client` as static files (JS/CSS in `/assets/*`, favicon, etc.)
  - `@vercel/node` — compiles `api/index.ts` into a single catch-all Node.js function
  - routes — `handle: "filesystem"` serves existing static files first, then `/(.*)` rewrites everything else (SSR pages AND `/api/*`) to the function

The function (`api/index.ts`) re-exports the built Hono app (`build/server/index.js`) through `hono/vercel`'s `handle(app)`. It exposes `GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS` plus a `default` web handler (Vercel Node runtime calls these with a standard `Request` and expects a `Response`). `serveStatic()` inside the Hono app needs `build/client` present in the sandbox, which the `includeFiles` config guarantees.

### 2. Environment variables (Vercel dashboard → Project → Settings → Environment Variables)

For `production` preview, set the same values for both `production` and `preview` scopes as needed.

| Variable                 | Purpose                                       | Required |
| ------------------------ | --------------------------------------------- | -------- |
| `DATABASE_URL`           | Neon Postgres connection string               | yes      |
| `AUTH_SECRET`            | Auth.js / JWT signing secret (32+ random char)| yes      |
| `AUTH_URL`               | Public origin, e.g. `https://jemil.vercel.app`| yes      |
| `STRIPE_SECRET_KEY`      | Stripe secret key                             | yes*     |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client)               | yes*     |
| `NEXT_PUBLIC_APP_URL`    | Public origin (client-safe)                   | yes*     |
| `CORS_ORIGINS`           | Extra comma-separated CORS origins (optional) | no       |

`AUTH_URL` must be HTTPS so cookies are flagged secure. `AUTH_SECRET` should be generated with `openssl rand -base64 32`.

### 3. Local verification

```bash
cd apps/web
npm install
npm run dev          # dev server on http://localhost:4000
npm run build        # react-router build → build/server + build/client
npm start            # prod server on port 3000 (Hono serve() binds a port; ignore the prints)
```

The function wrapper was validated locally: `GET /` returns SSR HTML (200), `POST /api/contact` returns `{"success":true}`, `POST /api/upload` accepts `{"url": "..."}`, `GET /api/auth/token` returns 401. The `serve()` port bind on import is harmless in a serverless function — Vercel invokes the exported handler directly and tears the sandbox down.

---

## Mobile — Expo EAS

Tech stack: Expo SDK 54, expo-router. Native builds go through EAS Build (Android or iOS). No native API keys are committed; they come from `EXPO_PUBLIC_*` env vars injected at build time.

### 1. One-time setup

```bash
cd apps/mobile
npm install
npx eas-cli login
npx eas-cli init              # creates/links the EAS project (adds extra.eas.projectId)
npx eas-cli build:configure   # syncs expo-updates etc. (optional)
```

`apps/mobile/eas.json` defines three profiles:

| Profile       | Use                                    |
| ------------- | -------------------------------------- |
| `development` | `developmentClient: true`, internal    |
| `preview`     | internal distribution (APK for Android, ad-hoc IPA for iOS) |
| `production`  | store builds (`autoIncrement: true`)   |

### 2. Environment variables

EAS injects `EXPO_PUBLIC_*` variables at build time. Set them as **project secrets** so all build profiles inherit them:

```bash
npx eas-cli secret:create --scope project --name EXPO_PUBLIC_BASE_URL --value https://jemil.vercel.app
# ...repeat for each variable below
```

| Variable                             | Purpose                                       | Required |
| ------------------------------------ | --------------------------------------------- | -------- |
| `EXPO_PUBLIC_BASE_URL`               | Web/API origin used by `useUpload`, auth, fetch | yes      |
| `EXPO_PUBLIC_HOST`                   | Auth host (deep-link / webview)                | yes*     |
| `EXPO_PUBLIC_AUTH_KEY`               | JWT auth key (defaults to `jemil-auth-jwt`)    | no       |
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`    | Google Maps on web polyfill                    | no       |
| `EXPO_PUBLIC_REVENUE_CAT_APP_STORE_API_KEY`   | RevenueCat iOS key                      | yes*     |
| `EXPO_PUBLIC_REVENUE_CAT_PLAY_STORE_API_KEY`  | RevenueCat Android key                  | yes*     |
| `EXPO_PUBLIC_REVENUE_CAT_TEST_STORE_API_KEY`  | RevenueCat web/test key                  | yes*     |
| `EXPO_PUBLIC_ENV`                    | `'production'` vs dev (disables revenue polyfills) | no    |

Local dev reads the same vars from `apps/mobile/.env` (not committed — see `apps/mobile/.gitignore`).

### 3. Build

```bash
cd apps/mobile
npx eas-cli build --profile preview --platform android   # internal APK
npx eas-cli build --profile preview --platform ios       # internal IPA (Apple account needed)
npx eas-cli build --profile production --platform all    # store builds
```

`app.json` already sets: `slug: jemil`, `scheme: jemil`, Android `package` and iOS `bundleIdentifier` = `com.jemil.app`. For store production builds you must fill Apple App Store Connect / Google Play metadata and signing credentials (`npx eas-cli credentials`).

---

## Known limitations

- **`/api/upload` is a stub**: it accepts JSON `{url}`/`{base64}` and raw octet-stream, but does **not** parse `multipart/form-data` yet (web `FormData` file uploads and mobile `FileSystem.uploadAsync` will fail). Wire a real object storage provider before enabling file upload to production.
- **Prerendering is disabled** (`react-router.config.ts` → `prerender: false`); SSR renders every route. A full-site prerender crashed the build earlier and was not re-enabled.
- **`package-lock.json` at the repo root is stray noise** (an `npm install` without a root `package.json` created it); keep it untracked. Vercel resolves deps from `apps/web/package-lock.json`.