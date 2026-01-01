import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Initialize i18n
import { ErrorBoundary } from './components/ErrorBoundary';
import { prepareAllAds, showBannerAd } from './modules/admob-service';

// Initialize AdMob for native apps, prepare all ads, and show bottom banner
prepareAllAds().then(() => {
  // Show banner ad at bottom of screen on native apps
  showBannerAd('bottom');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        }
      >
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
