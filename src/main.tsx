import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { prepareAllAds, showBannerAd } from './modules/admob-service'

// Initialize AdMob for native apps, prepare all ads, and show bottom banner
prepareAllAds().then(() => {
  // Show banner ad at bottom of screen on native apps
  showBannerAd('bottom')
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
