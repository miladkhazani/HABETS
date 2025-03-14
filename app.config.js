module.exports = {
  name: 'Habets',
  slug: 'habets',
  scheme: 'habets',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'me.habets.app'
  },
  android: {
    package: 'me.habets.app'
  },
  web: {
    bundler: 'metro',
    output: 'single',
    favicon: './assets/images/favicon.png'
  },
  plugins: [
    'expo-router'
  ],
  experiments: {
    typedRoutes: true
  }
};