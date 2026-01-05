/**
 * AdMob Service
 *
 * Handles AdMob ads for native Android/iOS apps via Capacitor.
 * Supports: Banner ads, Interstitial ads, Rewarded interstitial ads
 * This service is only used when running in a native app context.
 */

import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  type AdMobBannerSize,
  type AdMobRewardInterstitialItem,
  type AdOptions,
  type BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
  type RewardInterstitialAdOptions,
  RewardInterstitialAdPluginEvents,
} from '@capacitor-community/admob';

// ============================================
// Ad Unit Types
// ============================================

export type InterstitialType = 'export' | 'gallery' | 'generation';
export type RewardedType = 'premium' | 'export_hd';

// ============================================
// Test Ad Unit IDs (Google's official test IDs)
// ============================================

const TEST_BANNER_AD_ID = 'ca-app-pub-3940256099942544/6300978111';
const TEST_INTERSTITIAL_AD_ID = 'ca-app-pub-3940256099942544/1033173712';
const TEST_REWARDED_INTERSTITIAL_AD_ID = 'ca-app-pub-3940256099942544/6978759866';

// ============================================
// Production Ad Unit IDs (from environment variables)
// ============================================

// Banner ads
const PROD_BANNER_BOTTOM_ID = import.meta.env.VITE_ADMOB_BANNER_BOTTOM || TEST_BANNER_AD_ID;
const PROD_BANNER_TOP_ID = import.meta.env.VITE_ADMOB_BANNER_TOP || TEST_BANNER_AD_ID;

// Interstitial ads
const PROD_INTERSTITIAL_IDS: Record<InterstitialType, string> = {
  export: import.meta.env.VITE_ADMOB_INTERSTITIAL_EXPORT || TEST_INTERSTITIAL_AD_ID,
  gallery: import.meta.env.VITE_ADMOB_INTERSTITIAL_GALLERY || TEST_INTERSTITIAL_AD_ID,
  generation: import.meta.env.VITE_ADMOB_INTERSTITIAL_GENERATION || TEST_INTERSTITIAL_AD_ID,
};

// Rewarded interstitial ads
const PROD_REWARDED_IDS: Record<RewardedType, string> = {
  premium: import.meta.env.VITE_ADMOB_REWARDED_PREMIUM || TEST_REWARDED_INTERSTITIAL_AD_ID,
  export_hd: import.meta.env.VITE_ADMOB_REWARDED_EXPORT_HD || TEST_REWARDED_INTERSTITIAL_AD_ID,
};

// Use test ads in development or when testing flag is set
// Production ads are tried first; if they fail, we fallback to test ads
const hasProductionIds = Boolean(
  import.meta.env.VITE_ADMOB_BANNER_BOTTOM ||
    import.meta.env.VITE_ADMOB_INTERSTITIAL_EXPORT ||
    import.meta.env.VITE_ADMOB_REWARDED_PREMIUM
);
const FORCE_TEST_ADS = import.meta.env.DEV || import.meta.env.VITE_ADMOB_TESTING === 'true';

// Track which ad types have failed with production IDs and should use test ads
const prodAdsFailed = {
  bannerTop: false,
  bannerBottom: false,
  interstitialExport: false,
  interstitialGallery: false,
  interstitialGeneration: false,
  rewardedPremium: false,
  rewardedExportHd: false,
};

/**
 * Check if we should use test ads for a given ad type
 * Returns true if: forced test mode, no production IDs, or production ads have failed
 */
function shouldUseTestAds(adType: keyof typeof prodAdsFailed): boolean {
  if (FORCE_TEST_ADS) return true;
  if (!hasProductionIds) return true;
  return prodAdsFailed[adType];
}

/**
 * Mark that production ads failed for a given type - will use test ads from now on
 */
function markProdAdFailed(adType: keyof typeof prodAdsFailed): void {
  if (!prodAdsFailed[adType]) {
    prodAdsFailed[adType] = true;
    console.error(`AdMob: Production ad failed for ${adType}, falling back to test ads`);
  }
}

// ============================================
// State Management
// ============================================

let isInitialized = false;

// Guard against concurrent initialization / duplicate listeners
let initInFlight: Promise<boolean> | null = null;
let listenersSetup = false;
let currentBannerPosition: 'top' | 'bottom' | null = null;
let pendingBannerPosition: 'top' | 'bottom' | null = null; // Track position during load attempt
let currentBannerHeight = 0;

// Callbacks for banner height changes
type BannerHeightCallback = (height: number) => void;
const bannerHeightCallbacks: Set<BannerHeightCallback> = new Set();

// Track loaded state for each interstitial type
const interstitialLoadedState: Record<InterstitialType, boolean> = {
  export: false,
  gallery: false,
  generation: false,
};

// Track loaded state for each rewarded ad type
const rewardedLoadedState: Record<RewardedType, boolean> = {
  premium: false,
  export_hd: false,
};

// Track which interstitial/rewarded is currently being prepared
// Note: Each ad type tracks its own loaded state independently via the maps above
let _currentlyPreparingInterstitial: InterstitialType | null = null;
let _currentlyShowingInterstitial: InterstitialType | null = null;
let interstitialDismissResolver: ((ok: boolean) => void) | null = null;
let _currentlyPreparingRewarded: RewardedType | null = null;

// Track the actual ad ID that was prepared (for matching loaded events)
let lastPreparedInterstitialType: InterstitialType | null = null;
let lastPreparedRewardedType: RewardedType | null = null;

// Generation counter for showing ads every N generations
let generationCount = 0;

// ============================================
// Initialization
// ============================================

/**
 * Initialize AdMob SDK
 * Should be called once when the app starts
 * Includes retry logic for reliability
 */
export async function initializeAdMob(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    // Use console.error for critical logs that survive ProGuard stripping
    console.error('AdMob: Not a native platform, skipping initialization');
    return false;
  }

  if (isInitialized) {
    console.error('AdMob: Already initialized');
    return true;
  }

  // If multiple parts of the app call initialize at the same time, share the same promise
  if (initInFlight) {
    console.error('AdMob: Initialization already in progress, waiting...');
    return initInFlight;
  }

  initInFlight = (async () => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // Increased delay between retries

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.error(
          `AdMob: Initializing (attempt ${attempt}/${MAX_RETRIES}), forceTestMode=${FORCE_TEST_ADS}, hasProductionIds=${hasProductionIds}`
        );

        // The initialize call may take a while due to Google Play Services signal collection
        // This is normal and the SDK will still work even if signal collection times out
        await AdMob.initialize({
          initializeForTesting: FORCE_TEST_ADS,
        });

        console.error('AdMob: SDK initialized successfully');

        setupAdMobListeners();
        isInitialized = true;

        // Longer delay to ensure SDK is fully ready after initialization
        // This helps with the GMS signal collection timeout issue
        console.error('AdMob: Waiting for SDK to stabilize...');
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Preload the most common ads only; others can be prepared on-demand
        console.error('AdMob: Preparing interstitial ad...');
        const interstitialResult = await prepareInterstitial('export');
        console.error(`AdMob: Interstitial prepare result: ${interstitialResult}`);

        console.error('AdMob: Preparing rewarded ad...');
        const rewardedResult = await prepareRewardedAd('premium');
        console.error(`AdMob: Rewarded prepare result: ${rewardedResult}`);

        console.error('AdMob: Initialization complete');
        return true;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error(`AdMob: Initialization attempt ${attempt} failed: ${errorMsg}`);

        if (attempt < MAX_RETRIES) {
          console.error(`AdMob: Retrying in ${RETRY_DELAY}ms...`);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }

    console.error('AdMob: All initialization attempts failed');
    return false;
  })();

  try {
    return await initInFlight;
  } finally {
    initInFlight = null;
  }
}

/**
 * Set up AdMob event listeners for debugging and analytics
 */
function setupAdMobListeners() {
  if (listenersSetup) {
    return;
  }
  listenersSetup = true;

  // Banner ad listeners - using console.error for logs that survive ProGuard
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    console.error('AdMob: Banner ad loaded successfully');
    // Clear pending position on successful load
    pendingBannerPosition = null;
  });

  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error) => {
    console.error('AdMob: Banner ad failed to load:', error);
    console.error(
      `AdMob: pendingBannerPosition=${pendingBannerPosition}, currentBannerPosition=${currentBannerPosition}`
    );

    // Handle fallback to test ads
    // Use currentBannerPosition as fallback if pendingBannerPosition was cleared
    const position = pendingBannerPosition || currentBannerPosition;
    if (position) {
      const adTypeKey = position === 'top' ? 'bannerTop' : 'bannerBottom';
      console.error(
        `AdMob: Checking fallback for ${adTypeKey}, shouldUseTestAds=${shouldUseTestAds(adTypeKey)}`
      );
      if (!shouldUseTestAds(adTypeKey)) {
        markProdAdFailed(adTypeKey);
        // Clear state before retry to avoid loops
        pendingBannerPosition = null;
        currentBannerPosition = null;
        // Retry with test ads
        console.error('AdMob: Retrying banner with test ads after FailedToLoad event...');
        showBannerAd(position);
      } else {
        // Test ads also failed, clear state
        pendingBannerPosition = null;
        console.error('AdMob: Test ads also failed, giving up');
      }
    } else {
      console.error('AdMob: No position tracked, cannot retry');
    }
  });

  AdMob.addListener(BannerAdPluginEvents.Opened, () => {
    console.error('AdMob: Banner ad opened');
  });

  AdMob.addListener(BannerAdPluginEvents.Closed, () => {
    console.error('AdMob: Banner ad closed');
  });

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
    console.log('AdMob: Banner size changed:', size);
    // Update banner height and notify subscribers
    if (size?.height) {
      currentBannerHeight = size.height;
      for (const cb of bannerHeightCallbacks) {
        cb(currentBannerHeight);
      }
    }
  });

  // Interstitial ad listeners
  // Use lastPreparedInterstitialType instead of currentlyPreparingInterstitial
  // because the Loaded event fires asynchronously and currentlyPreparingInterstitial
  // may have changed by then (causing state desync)
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
    console.error('AdMob: Interstitial ad loaded');
    if (lastPreparedInterstitialType) {
      interstitialLoadedState[lastPreparedInterstitialType] = true;
    }
  });

  AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
    console.error('AdMob: Interstitial ad failed to load:', error);
    if (lastPreparedInterstitialType) {
      interstitialLoadedState[lastPreparedInterstitialType] = false;
      // Mark for fallback to test ads on next prepare
      const adTypeKey = getInterstitialAdTypeKey(lastPreparedInterstitialType);
      if (!shouldUseTestAds(adTypeKey)) {
        markProdAdFailed(adTypeKey);
      }
    }
  });

  AdMob.addListener(InterstitialAdPluginEvents.Showed, () => {
    console.error('AdMob: Interstitial ad showed');
  });

  AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
    console.error('AdMob: Interstitial ad dismissed');

    // The plugin only keeps a single interstitial instance; after dismissal it must be prepared again.
    for (const key of Object.keys(interstitialLoadedState)) {
      interstitialLoadedState[key as InterstitialType] = false;
    }

    _currentlyShowingInterstitial = null;
    if (interstitialDismissResolver) {
      interstitialDismissResolver(true);
      interstitialDismissResolver = null;
    }
  });

  AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error) => {
    console.error('AdMob: Interstitial ad failed to show:', error);
    _currentlyShowingInterstitial = null;
    if (interstitialDismissResolver) {
      interstitialDismissResolver(false);
      interstitialDismissResolver = null;
    }
  });

  // Rewarded Interstitial ad listeners
  // Use lastPreparedRewardedType instead of currentlyPreparingRewarded
  // to avoid state desync when Loaded event fires asynchronously
  AdMob.addListener(RewardInterstitialAdPluginEvents.Loaded, () => {
    console.error('AdMob: Rewarded Interstitial ad loaded');
    if (lastPreparedRewardedType) {
      rewardedLoadedState[lastPreparedRewardedType] = true;
    }
  });

  AdMob.addListener(RewardInterstitialAdPluginEvents.FailedToLoad, (error) => {
    console.error('AdMob: Rewarded Interstitial ad failed to load:', error);
    if (lastPreparedRewardedType) {
      rewardedLoadedState[lastPreparedRewardedType] = false;
      // Mark for fallback to test ads on next prepare
      const adTypeKey = getRewardedAdTypeKey(lastPreparedRewardedType);
      if (!shouldUseTestAds(adTypeKey)) {
        markProdAdFailed(adTypeKey);
      }
    }
  });

  AdMob.addListener(RewardInterstitialAdPluginEvents.Showed, () => {
    console.error('AdMob: Rewarded Interstitial ad showed');
  });

  AdMob.addListener(RewardInterstitialAdPluginEvents.Dismissed, () => {
    console.error('AdMob: Rewarded Interstitial ad dismissed');
    // Reset loaded state
    for (const key of Object.keys(rewardedLoadedState)) {
      rewardedLoadedState[key as RewardedType] = false;
    }
  });

  AdMob.addListener(RewardInterstitialAdPluginEvents.FailedToShow, (error) => {
    console.error('AdMob: Rewarded Interstitial ad failed to show:', error);
  });

  AdMob.addListener(
    RewardInterstitialAdPluginEvents.Rewarded,
    (reward: AdMobRewardInterstitialItem) => {
      console.error('AdMob: User earned reward:', reward);
    }
  );
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
    return false;
  }

  // Initialize if not already done
  if (!isInitialized) {
    const success = await initializeAdMob();
    if (!success) return false;
  }

  // If same banner is already showing, don't re-show
  if (currentBannerPosition === position) {
    return true;
  }

  // Hide existing banner if showing at different position
  if (currentBannerPosition !== null) {
    await hideBannerAd();
  }

  const adTypeKey = position === 'top' ? 'bannerTop' : 'bannerBottom';
  const prodAdId = position === 'top' ? PROD_BANNER_TOP_ID : PROD_BANNER_BOTTOM_ID;
  const useTestAds = shouldUseTestAds(adTypeKey);

  // Track pending position for FailedToLoad event handler
  pendingBannerPosition = position;

  try {
    const options: BannerAdOptions = {
      adId: useTestAds ? TEST_BANNER_AD_ID : prodAdId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: position === 'top' ? BannerAdPosition.TOP_CENTER : BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: useTestAds,
    };

    console.error(
      `AdMob: Showing banner at ${position}, testMode=${useTestAds}, adId=${options.adId}`
    );
    await AdMob.showBanner(options);
    currentBannerPosition = position;
    // Note: Don't clear pendingBannerPosition here - wait for Loaded or FailedToLoad event
    // The showBanner() call returns before we know if the ad actually loaded
    console.error(`AdMob: Banner request sent for ${position}`);
    return true;
  } catch (error) {
    console.error('AdMob: Failed to show banner:', error);

    // If production ads failed, retry with test ads
    if (!useTestAds) {
      markProdAdFailed(adTypeKey);
      console.error('AdMob: Retrying banner with test ads...');
      return showBannerAd(position); // Recursive retry with test ads
    }
    return false;
  }
}

/**
 * Convenience function to show banner at top of screen
 */
export async function showTopBanner(): Promise<boolean> {
  return showBannerAd('top');
}

/**
 * Convenience function to show banner at bottom of screen
 */
export async function showBottomBanner(): Promise<boolean> {
  return showBannerAd('bottom');
}

/**
 * Hide the currently showing banner ad
 */
export async function hideBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform() || currentBannerPosition === null) {
    return;
  }

  try {
    await AdMob.hideBanner();
    currentBannerPosition = null;
    console.error('AdMob: Banner hidden');
  } catch (error) {
    console.error('AdMob: Failed to hide banner:', error);
  }
}

/**
 * Remove the banner ad completely
 */
export async function removeBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    await AdMob.removeBanner();
    currentBannerPosition = null;
    console.error('AdMob: Banner removed');
  } catch (error) {
    console.error('AdMob: Failed to remove banner:', error);
  }
}

// ============================================
// Interstitial Ads
// ============================================

/**
 * Get the ad type key for tracking production failures
 */
function getInterstitialAdTypeKey(type: InterstitialType): keyof typeof prodAdsFailed {
  const keyMap: Record<InterstitialType, keyof typeof prodAdsFailed> = {
    export: 'interstitialExport',
    gallery: 'interstitialGallery',
    generation: 'interstitialGeneration',
  };
  return keyMap[type];
}

/**
 * Prepare (preload) an interstitial ad of the specified type
 * If production ads fail, the FailedToLoad listener marks them for fallback,
 * and subsequent calls will automatically use test ads.
 * @param type - 'export', 'gallery', or 'generation'
 */
export async function prepareInterstitial(type: InterstitialType = 'export'): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  // Initialize if not already done
  if (!isInitialized) {
    const success = await initializeAdMob();
    if (!success) return false;
  }

  // Already loaded
  if (interstitialLoadedState[type]) {
    return true;
  }

  const adTypeKey = getInterstitialAdTypeKey(type);
  const useTestAds = shouldUseTestAds(adTypeKey);

  try {
    _currentlyPreparingInterstitial = type;
    lastPreparedInterstitialType = type; // Track for async loaded event
    const prodAdId = PROD_INTERSTITIAL_IDS[type];

    const options: AdOptions = {
      adId: useTestAds ? TEST_INTERSTITIAL_AD_ID : prodAdId,
      isTesting: useTestAds,
    };

    console.error(`AdMob: Preparing interstitial (${type}), testMode=${useTestAds}`);
    await AdMob.prepareInterstitial(options);
    console.error(`AdMob: Interstitial (${type}) prepare call completed`);
    return true;
  } catch (error) {
    console.error(`AdMob: Failed to prepare interstitial (${type}):`, error);
    return false;
  }
}

/**
 * Show an interstitial ad of the specified type
 * @param type - 'export', 'gallery', or 'generation'
 */
export async function showInterstitial(type: InterstitialType = 'export'): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  // Initialize if not already done
  if (!isInitialized) {
    const success = await initializeAdMob();
    if (!success) return false;
  }

  // Ensure the requested interstitial is loaded (prepareInterstitial may replace the currently loaded one)
  if (!interstitialLoadedState[type]) {
    console.error(`AdMob: Interstitial (${type}) not loaded, preparing...`);
    await prepareInterstitial(type);

    const start = Date.now();
    while (!interstitialLoadedState[type] && Date.now() - start < 15000) {
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  if (!interstitialLoadedState[type]) {
    console.error(`AdMob: Interstitial (${type}) still not ready after waiting`);
    return false;
  }

  // If an interstitial is already being shown, don't attempt to show another
  if (interstitialDismissResolver) {
    console.error('AdMob: Interstitial already showing, skipping');
    return false;
  }

  _currentlyShowingInterstitial = type;

  const dismissed = new Promise<boolean>((resolve) => {
    interstitialDismissResolver = resolve;
  });

  try {
    await AdMob.showInterstitial();
    console.error(`AdMob: Interstitial (${type}) show requested`);

    // Wait until the user dismisses the ad (or it fails to show)
    const timeout = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 60000));
    return await Promise.race([dismissed, timeout]);
  } catch (error) {
    console.error(`AdMob: Failed to show interstitial (${type}):`, error);
    interstitialDismissResolver = null;
    _currentlyShowingInterstitial = null;
    return false;
  }
}

/**
 * Track generation and show interstitial every N generations
 * @param n - Show ad every N generations (default: 5)
 * @returns true if ad was shown
 */
export async function trackGenerationAndShowAd(n: number = 5): Promise<boolean> {
  generationCount++;

  if (generationCount >= n) {
    generationCount = 0;
    return showInterstitial('generation');
  }

  return false;
}

/**
 * Reset the generation counter
 */
export function resetGenerationCount(): void {
  generationCount = 0;
}

/**
 * Get current generation count
 */
export function getGenerationCount(): number {
  return generationCount;
}

// ============================================
// Rewarded Interstitial Ads
// ============================================

/**
 * Get the ad type key for tracking production failures
 */
function getRewardedAdTypeKey(type: RewardedType): keyof typeof prodAdsFailed {
  const keyMap: Record<RewardedType, keyof typeof prodAdsFailed> = {
    premium: 'rewardedPremium',
    export_hd: 'rewardedExportHd',
  };
  return keyMap[type];
}

/**
 * Prepare (preload) a rewarded interstitial ad
 * If production ads fail, the FailedToLoad listener marks them for fallback,
 * and subsequent calls will automatically use test ads.
 * @param type - 'premium' or 'export_hd'
 */
export async function prepareRewardedAd(type: RewardedType): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  // Initialize if not already done
  if (!isInitialized) {
    const success = await initializeAdMob();
    if (!success) return false;
  }

  // Already loaded
  if (rewardedLoadedState[type]) {
    return true;
  }

  const adTypeKey = getRewardedAdTypeKey(type);
  const useTestAds = shouldUseTestAds(adTypeKey);

  try {
    _currentlyPreparingRewarded = type;
    lastPreparedRewardedType = type; // Track for async loaded event
    const prodAdId = PROD_REWARDED_IDS[type];

    const options: RewardInterstitialAdOptions = {
      adId: useTestAds ? TEST_REWARDED_INTERSTITIAL_AD_ID : prodAdId,
      isTesting: useTestAds,
    };

    console.error(`AdMob: Preparing rewarded ad (${type}), testMode=${useTestAds}`);
    await AdMob.prepareRewardInterstitialAd(options);
    console.error(`AdMob: Rewarded ad (${type}) prepare call completed`);
    return true;
  } catch (error) {
    console.error(`AdMob: Failed to prepare rewarded interstitial ad (${type}):`, error);
    return false;
  }
}

/**
 * Show a rewarded interstitial ad and return the reward if earned
 * @param type - 'premium' or 'export_hd'
 * @returns Promise with reward info if earned, null otherwise
 */
export async function showRewardedAd(
  type: RewardedType
): Promise<AdMobRewardInterstitialItem | null> {
  if (!Capacitor.isNativePlatform()) {
    return null;
  }

  // Prepare if not loaded
  if (!rewardedLoadedState[type]) {
    console.error(`AdMob: Rewarded Interstitial ad (${type}) not loaded, preparing...`);
    await prepareRewardedAd(type);
    // Give it a moment to load
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  if (!rewardedLoadedState[type]) {
    console.error(`AdMob: Rewarded Interstitial ad (${type}) still not ready`);
    return null;
  }

  try {
    const result = await AdMob.showRewardInterstitialAd();
    console.error(`AdMob: Rewarded Interstitial ad (${type}) completed:`, result);
    rewardedLoadedState[type] = false;

    // Return the reward (result is the AdMobRewardInterstitialItem itself)
    return result || null;
  } catch (error) {
    console.error(`AdMob: Failed to show rewarded interstitial ad (${type}):`, error);
    return null;
  }
}

/**
 * Check if a rewarded ad is ready to show
 */
export function isRewardedAdReady(type: RewardedType): boolean {
  return rewardedLoadedState[type];
}

// ============================================
// Utility Functions
// ============================================

/**
 * Check if AdMob is available and initialized
 */
export function isAdMobAvailable(): boolean {
  return Capacitor.isNativePlatform() && isInitialized;
}

/**
 * Get the current banner position
 */
export function getCurrentBannerPosition(): 'top' | 'bottom' | null {
  return currentBannerPosition;
}

/**
 * Get the current banner height in pixels
 */
export function getBannerHeight(): number {
  return currentBannerHeight;
}

/**
 * Subscribe to banner height changes
 * @returns Unsubscribe function
 */
export function onBannerHeightChange(callback: BannerHeightCallback): () => void {
  bannerHeightCallbacks.add(callback);
  // Immediately call with current height if banner is showing
  if (currentBannerHeight > 0) {
    callback(currentBannerHeight);
  }
  return () => bannerHeightCallbacks.delete(callback);
}

/**
 * Prepare all ads (call on app startup for best UX)
 */
export async function prepareAllAds(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  if (!isInitialized) {
    const success = await initializeAdMob();
    if (!success) return;
  }

  // NOTE: The underlying plugin does not reliably disambiguate multiple interstitial instances.
  // Preload only the most common ads; prepare others on-demand.
  await prepareInterstitial('export');
  await prepareRewardedAd('premium');
}
