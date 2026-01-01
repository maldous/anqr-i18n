import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'link.anqr.app',
  appName: 'ANQR',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
    buildOptions: {
      keystorePath: 'android/app/release-key.keystore',
      keystoreAlias: 'anqr',
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f172a',
      showSpinner: false,
    },
    AdMob: {
      // AdMob App ID for Android
      // Use Google's test App ID for development, replace with your actual ID for production
      // Get your production ID from: https://admob.google.com
      androidAppId: 'ca-app-pub-2270701384951162~3067761782',
      // iOS App ID (if you add iOS support later)
      // iosAppId: 'ca-app-pub-3940256099942544~1458002511', // Test App ID
      // Enable test mode during development
      initializeForTesting: false,
    },
  },
};

export default config;
