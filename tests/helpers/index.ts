/**
 * Test Helpers Index
 * 
 * Central export point for all test utilities.
 * Prefer importing from this file for cleaner imports.
 * 
 * IMPORTANT: All tests MUST dismiss the WelcomeModal!
 * Use setWelcomeModalSeen() BEFORE navigation, or use setupTest()/navigateToApp().
 */

// Primary E2E library - use this for new tests
export * from './e2e-library';

// Comprehensive test utilities (test-utils.ts)
export {
  // Welcome modal handling (REQUIRED for all tests)
  WELCOME_MODAL_STORAGE_KEY,
  WELCOME_MODAL_VERSION,
  setWelcomeModalSeen,
  dismissWelcomeModal as dismissWelcomeModalUtils,
  navigateToApp,
  resetAppState,
  // Tier and accordion
  selectTier as selectTierUtils,
  openAccordion,
  waitForAccordionState as waitForAccordionStateUtils,
  // Controls
  setSlider as setSliderUtils,
  selectOption as selectOptionUtils,
  toggleSwitch as toggleSwitchUtils,
  setInput,
  uploadFile,
  // Waits
  waitForRenderComplete,
  waitForDropdownOpen,
  waitForDropdownClosed,
  waitForControlReady,
  waitForCanvasStable as waitForCanvasStableUtils,
  // Selectors
  getControl,
  getCanvas as getCanvasUtils,
  getSidebarScroller,
  getAccordionRegion,
  // Visual assertions
  getCanvasSnapshot as getCanvasSnapshotUtils,
  snapshotsAreDifferent as snapshotsAreDifferentUtils,
  waitForCanvasChange as waitForCanvasChangeUtils,
  expectCanvasChanged,
  // Scroll
  ensureVisibleInSidebar,
  // Constants
  DEFAULT_TIMEOUT,
  RENDER_TIMEOUT,
  SECTION_LABELS,
  TIER_LABELS,
  // Types
  type Tier as TierType,
  type AccordionSection,
  type AccordionState,
  type RenderState,
  type SwitchState,
} from './test-utils';

// Legacy helpers - for backward compatibility with existing tests
export {
  getCanvasSnapshot,
  snapshotsAreDifferent,
  waitForQRStable,
  waitForAccordionOpen,
  waitForSelectOpen,
  waitForSelectClosed,
  clickSelectOption,
} from './qr-detector';

// Input helpers
export {
  setSlider,
  setSelect,
  toggleSwitch,
  setTextInput,
  setColorInput,
} from './input-helpers';

// Test setup
export {
  enableBrowserDebug,
  waitForAppReady,
  waitForRenderingIdle,
  waitForCanvasStable,
  getCanvasDataUrl,
} from './test-setup';

// Settings registry
export {
  getQRChangingSettings,
  getSettingsForTier,
  getSettingsForSection,
  SETTINGS_REGISTRY,
} from './settings-registry';
