import '@expo/metro-runtime';
import React from 'react';
import './__create/reset.css';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';

import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

import CreateApp from './App';

LoadSkiaWeb().then(() => {
  renderRootComponent(CreateApp);
});