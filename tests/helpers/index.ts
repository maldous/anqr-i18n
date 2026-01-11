/**
 * Test Helpers Index
 * 
 * Central export point for all test utilities.
 * Prefer importing from this file for cleaner imports.
 */

// Primary E2E library - use this for new tests
export * from './e2e-library';

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
