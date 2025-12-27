/**
 * AdMob Service
 * 
 * Handles AdMob ads for native Android/iOS apps via Capacitor.
 * Supports: Banner ads, Interstitial ads, Rewarded video ads
 * This service is only used when running in a native app context.
 */

import { Capacitor } from '@capacitor/core'
import { 
  AdMob, 
  BannerAdOptions, 
  BannerAdSize, 
  BannerAdPosition, 
  BannerAdPluginEvents, 
  AdMobBannerSize,
  InterstitialAdPluginEvents,
  RewardAdPluginEvents,
  AdOptions,
  RewardAdOptions,
  AdMobRewardItem
} from '@capacitor-community/admob'

// ============================================
// Ad Unit Types
// ============================================

export type InterstitialType = 'export' | 'gallery' | 'generation'
export type RewardedType = 'premium' | 'export_hd'

// ============================================
// Test Ad Unit IDs (Google's official test IDs)
// ============================================

const TEST_BANNER_AD_ID = 'ca-app-pub-3940256099942544/6300978111'
const TEST_INTERSTITIAL_AD_ID = 'ca-app-pub-3940256099942544/1033173712'
const TEST_REWARDED_AD_ID = 'ca-app-pub-3940256099942544/5224354917'

// ============================================
// Production Ad Unit IDs (from environment variables)
// ============================================

// Banner ads
const PROD_BANNER_BOTTOM_ID = import.meta.env.VITE_ADMOB_BANNER_BOTTOM || TEST_BANNER_AD_ID
const PROD_BANNER_TOP_ID = import.meta.env.VITE_ADMOB_BANNER_TOP || TEST_BANNER_AD_ID

// Interstitial ads
const PROD_INTERSTITIAL_IDS: Record<InterstitialType, string> = {
  export: import.meta.env.VITE_ADMOB_INTERSTITIAL_EXPORT || TEST_INTERSTITIAL_AD_ID,
  gallery: import.meta.env.VITE_ADMOB_INTERSTITIAL_GALLERY || TEST_INTERSTITIAL_AD_ID,
  generation: import.meta.env.VITE_ADMOB_INTERSTITIAL_GENERATION || TEST_INTERSTITIAL_AD_ID,
}

// Rewarded video ads
const PROD_REWARDED_IDS: Record<RewardedType, string> = {
  premium: import.meta.env.VITE_ADMOB_REWARDED_PREMIUM || TEST_REWARDED_AD_ID,
  export_hd: import.meta.env.VITE_ADMOB_REWARDED_EXPORT_HD || TEST_REWARDED_AD_ID,
}

// Use test ads in development or when testing flag is set
const USE_TEST_ADS = import.meta.env.DEV || import.meta.env.VITE_ADMOB_TESTING === 'true'

// ============================================
// State Management
// ============================================

let isInitialized = false
let currentBannerPosition: 'top' | 'bottom' | null = null

// Track loaded state for each interstitial type
const interstitialLoadedState: Record<InterstitialType, boolean> = {
  export: false,
  gallery: false,
  generation: false,
}

// Track loaded state for each rewarded ad type
const rewardedLoadedState: Record<RewardedType, boolean> = {
  premium: false,
  export_hd: false,
}

// Track which interstitial/rewarded is currently being prepared
let currentlyPreparingInterstitial: InterstitialType | null = null
let currentlyPreparingRewarded: RewardedType | null = null

// Generation counter for showing ads every N generations
let generationCount = 0

// ============================================
// Initialization
// ============================================

/**
 * Initialize AdMob SDK
 * Should be called once when the app starts
 */
export async function initializeAdMob(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    console.log('AdMob: Not a native platform, skipping initialization')
    return false
  }

  if (isInitialized) {
    return true
  }

  try {
    await AdMob.initialize({
      initializeForTesting: USE_TEST_ADS,
    })
    isInitialized = true
    console.log('AdMob: Initialized successfully')
    
    // Set up event listeners
    setupAdMobListeners()
    
    return true
  } catch (error) {
    console.error('AdMob: Initialization failed:', error)
    return false
  }
}

/**
 * Set up AdMob event listeners for debugging and analytics
 */
function setupAdMobListeners() {
  // Banner ad listeners
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    console.log('AdMob: Banner ad loaded')
  })

  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error) => {
    console.error('AdMob: Banner ad failed to load:', error)
  })

  AdMob.addListener(BannerAdPluginEvents.Opened, () => {
    console.log('AdMob: Banner ad opened')
  })

  AdMob.addListener(BannerAdPluginEvents.Closed, () => {
    console.log('AdMob: Banner ad closed')
  })

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
    console.log('AdMob: Banner size changed:', size)
  })

  // Interstitial ad listeners
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
    console.log('AdMob: Interstitial ad loaded')
    if (currentlyPreparingInterstitial) {
      interstitialLoadedState[currentlyPreparingInterstitial] = true
    }
  })

  AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
    console.error('AdMob: Interstitial ad failed to load:', error)
    if (currentlyPreparingInterstitial) {
      interstitialLoadedState[currentlyPreparingInterstitial] = false
    }
  })

  AdMob.addListener(InterstitialAdPluginEvents.Showed, () => {
    console.log('AdMob: Interstitial ad showed')
  })

  AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
    console.log('AdMob: Interstitial ad dismissed')
    // Reset loaded state - ad needs to be prepared again
    Object.keys(interstitialLoadedState).forEach(key => {
      interstitialLoadedState[key as InterstitialType] = false
    })
  })

  AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error) => {
    console.error('AdMob: Interstitial ad failed to show:', error)
  })

  // Rewarded ad listeners
  AdMob.addListener(RewardAdPluginEvents.Loaded, () => {
    console.log('AdMob: Rewarded ad loaded')
    if (currentlyPreparingRewarded) {
      rewardedLoadedState[currentlyPreparingRewarded] = true
    }
  })

  AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (error) => {
    console.error('AdMob: Rewarded ad failed to load:', error)
    if (currentlyPreparingRewarded) {
      rewardedLoadedState[currentlyPreparingRewarded] = false
    }
  })

  AdMob.addListener(RewardAdPluginEvents.Showed, () => {
    console.log('AdMob: Rewarded ad showed')
  })

  AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
    console.log('AdMob: Rewarded ad dismissed')
    // Reset loaded state
    Object.keys(rewardedLoadedState).forEach(key => {
      rewardedLoadedState[key as RewardedType] = false
    })
  })

  AdMob.addListener(RewardAdPluginEvents.FailedToShow, (error) => {
    console.error('AdMob: Rewarded ad failed to show:', error)
  })

  AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward: AdMobRewardItem) => {
    console.log('AdMob: User earned reward:', reward)
  })
}

// ============================================
// Banner Ads
// ============================================

/**
 * Show a banner ad at the specified position
 * @param position - 'top' or 'bottom' of the screen
 */
export async function showBannerAd(position: 'top' | 'bottom' = 'bottom'): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false
  }

  // Initialize if not already done
  if (!isInitialized) {
    const success = await initializeAdMob()
    if (!success) return false
  }

  // If same banner is already showing, don't re-show
  if (currentBannerPosition === position) {
    return true
  }

  // Hide existing banner if showing at different position
  if (currentBannerPosition !== null) {
    await hideBannerAd()
  }

  try {
    const prodAdId = position === 'top' ? PROD_BANNER_TOP_ID : PROD_BANNER_BOTTOM_ID
    
    const options: BannerAdOptions = {
      adId: USE_TEST_ADS ? TEST_BANNER_AD_ID : prodAdId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: position === 'top' ? BannerAdPosition.TOP_CENTER : BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: USE_TEST_ADS,
    }

    await AdMob.showBanner(options)
    currentBannerPosition = position
    console.log(`AdMob: Banner shown at ${position}`)
    return true
  } catch (error) {
    console.error('AdMob: Failed to show banner:', error)
    return false
  }
}

/**
 * Convenience function to show banner at top of screen
 */
export async function showTopBanner(): Promise<boolean> {
  return showBannerAd('top')
}

/**
 * Convenience function to show banner at bottom of screen
 */
export async function showBottomBanner(): Promise<boolean> {
  return showBannerAd('bottom')
}

/**
 * Hide the currently showing banner ad
 */
export async function hideBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform() || currentBannerPosition === null) {
    return
  }

  try {
    await AdMob.hideBanner()
    currentBannerPosition = null
    console.log('AdMob: Banner hidden')
  } catch (error) {
    console.error('AdMob: Failed to hide banner:', error)
  }
}

/**
 * Remove the banner ad completely
 */
export async function removeBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return
  }

  try {
    await AdMob.removeBanner()
    currentBannerPosition = null
    console.log('AdMob: Banner removed')
  } catch (error) {
    console.error('AdMob: Failed to remove banner:', error)
  }
}

// ============================================
// Interstitial Ads
// ============================================

/**
 * Prepare (preload) an interstitial ad of the specified type
 * @param type - 'export', 'gallery', or 'generation'
 */
export async function prepareInterstitial(type: InterstitialType = 'export'): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false
  }

  // Initialize if not already done
  if (!isInitialized) {
    const success = await initializeAdMob()
    if (!success) return false
  }

  // Already loaded
  if (interstitialLoadedState[type]) {
    return true
  }

  try {
    currentlyPreparingInterstitial = type
    const prodAdId = PROD_INTERSTITIAL_IDS[type]
    
    const options: AdOptions = {
      adId: USE_TEST_ADS ? TEST_INTERSTITIAL_AD_ID : prodAdId,
      isTesting: USE_TEST_ADS,
    }

    await AdMob.prepareInterstitial(options)
    console.log(`AdMob: Interstitial (${type}) prepared`)
    return true
  } catch (error) {
    console.error(`AdMob: Failed to prepare interstitial (${type}):`, error)
    return false
  }
}

/**
 * Show an interstitial ad of the specified type
 * @param type - 'export', 'gallery', or 'generation'
 */
export async function showInterstitial(type: InterstitialType = 'export'): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false
  }

  // Prepare if not loaded
  if (!interstitialLoadedState[type]) {
    console.log(`AdMob: Interstitial (${type}) not loaded, preparing...`)
    await prepareInterstitial(type)
    // Give it a moment to load
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  if (!interstitialLoadedState[type]) {
    console.log(`AdMob: Interstitial (${type}) still not ready`)
    return false
  }

  try {
    await AdMob.showInterstitial()
    console.log(`AdMob: Interstitial (${type}) shown`)
    interstitialLoadedState[type] = false
    return true
  } catch (error) {
    console.error(`AdMob: Failed to show interstitial (${type}):`, error)
    return false
  }
}

/**
 * Track generation and show interstitial every N generations
 * @param n - Show ad every N generations (default: 5)
 * @returns true if ad was shown
 */
export async function trackGenerationAndShowAd(n: number = 5): Promise<boolean> {
  generationCount++
  
  if (generationCount >= n) {
    generationCount = 0
    return showInterstitial('generation')
  }
  
  return false
}

/**
 * Reset the generation counter
 */
export function resetGenerationCount(): void {
  generationCount = 0
}

/**
 * Get current generation count
 */
export function getGenerationCount(): number {
  return generationCount
}

// ============================================
// Rewarded Video Ads
// ============================================

/**
 * Prepare (preload) a rewarded video ad
 * @param type - 'premium' or 'export_hd'
 */
export async function prepareRewardedAd(type: RewardedType): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false
  }

  // Initialize if not already done
  if (!isInitialized) {
    const success = await initializeAdMob()
    if (!success) return false
  }

  // Already loaded
  if (rewardedLoadedState[type]) {
    return true
  }

  try {
    currentlyPreparingRewarded = type
    const prodAdId = PROD_REWARDED_IDS[type]
    
    const options: RewardAdOptions = {
      adId: USE_TEST_ADS ? TEST_REWARDED_AD_ID : prodAdId,
      isTesting: USE_TEST_ADS,
    }

    await AdMob.prepareRewardVideoAd(options)
    console.log(`AdMob: Rewarded ad (${type}) prepared`)
    return true
  } catch (error) {
    console.error(`AdMob: Failed to prepare rewarded ad (${type}):`, error)
    return false
  }
}

/**
 * Show a rewarded video ad and return the reward if earned
 * @param type - 'premium' or 'export_hd'
 * @returns Promise with reward info if earned, null otherwise
 */
export async function showRewardedAd(type: RewardedType): Promise<AdMobRewardItem | null> {
  if (!Capacitor.isNativePlatform()) {
    return null
  }

  // Prepare if not loaded
  if (!rewardedLoadedState[type]) {
    console.log(`AdMob: Rewarded ad (${type}) not loaded, preparing...`)
    await prepareRewardedAd(type)
    // Give it a moment to load
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  if (!rewardedLoadedState[type]) {
    console.log(`AdMob: Rewarded ad (${type}) still not ready`)
    return null
  }

  try {
    const result = await AdMob.showRewardVideoAd()
    console.log(`AdMob: Rewarded ad (${type}) completed:`, result)
    rewardedLoadedState[type] = false
    
    // Return the reward (result is the AdMobRewardItem itself)
    return result || null
  } catch (error) {
    console.error(`AdMob: Failed to show rewarded ad (${type}):`, error)
    return null
  }
}

/**
 * Check if a rewarded ad is ready to show
 */
export function isRewardedAdReady(type: RewardedType): boolean {
  return rewardedLoadedState[type]
}

// ============================================
// Utility Functions
// ============================================

/**
 * Check if AdMob is available and initialized
 */
export function isAdMobAvailable(): boolean {
  return Capacitor.isNativePlatform() && isInitialized
}

/**
 * Get the current banner position
 */
export function getCurrentBannerPosition(): 'top' | 'bottom' | null {
  return currentBannerPosition
}

/**
 * Prepare all ads (call on app startup for best UX)
 */
export async function prepareAllAds(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return
  
  await initializeAdMob()
  
  // Prepare interstitials in background
  prepareInterstitial('export')
  prepareInterstitial('gallery')
  prepareInterstitial('generation')
  
  // Prepare rewarded ads in background
  prepareRewardedAd('premium')
  prepareRewardedAd('export_hd')
}
