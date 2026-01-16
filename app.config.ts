import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Prombutne',
  slug: 'prombutne',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'prombutne',
  userInterfaceStyle: 'automatic',

  splash: {
    image: './apps/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },

  assetBundlePatterns: ['**/*'],

  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.prombutne.app',
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './apps/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.prombutne.app',
  },

  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './apps/assets/images/favicon.png',
  },

  plugins: ['expo-router'],

  experiments: {
    typedRoutes: true,
  },
};

export default config;
