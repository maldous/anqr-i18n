import { test as base, type Page } from '@playwright/test';
import {
  waitForRenderComplete,
  waitForAccordionState,
  dismissWelcomeModal,
  selectTier as selectTierHelper,
  openAccordion as openAccordionHelper,
  getCanvas,
  SECTION_LABELS,
  type Tier,
  type AccordionSection,
} from '../helpers/test-utils';
import { enableBrowserDebug } from '../helpers/test-setup';
export type { Tier } from '../helpers/test-utils';

export interface TestFixtures {
  /** Set the tier before running test */
  setTier: (tier: Tier) => Promise<void>;
  /** Expand a sidebar section by ID */
  expandSection: (sectionId: string) => Promise<void>;
  /** Get the QR canvas element */
  getCanvas: () => Promise<ReturnType<Page['locator']>>;
  /** Wait for QR to finish rendering (debounce complete) */
  waitForQRRender: () => Promise<void>;
  /** Dismiss welcome modal if present */
  dismissWelcomeModal: () => Promise<void>;
}

// Re-export dismissWelcomeModal from test-utils
const dismissWelcomeModalHelper = dismissWelcomeModal;



export const test = base.extend<TestFixtures>({
  // Auto-setup: Set localStorage to skip welcome modal and enable debugging
  page: async ({ page }, use) => {
    // Set localStorage via init script to prevent welcome modal
    await page.addInitScript(() => {
      localStorage.setItem('anqr-welcome-seen', '2026.01.04');
    });
    
    // Enable browser-side debugging (errors only by default to reduce noise)
    enableBrowserDebug(page, { console: true, errors: true, network: false });
    
    await use(page);
  },

  // Dismiss welcome modal fixture (backup in case modal still appears)
  dismissWelcomeModal: async ({ page }, use) => {
    const dismissWelcomeModal = async () => {
      await dismissWelcomeModalHelper(page);
    };
    await use(dismissWelcomeModal);
  },

  setTier: async ({ page }, use) => {
    const setTier = async (tier: Tier) => {
      // Use centralized selectTier helper
      await selectTierHelper(page, tier);
    };
    await use(setTier);
  },

  expandSection: async ({ page }, use) => {
    const expandSection = async (sectionId: string) => {
      // Use centralized openAccordion helper
      await openAccordionHelper(page, sectionId as AccordionSection);
    };
    await use(expandSection);
  },

  getCanvas: async ({ page }, use) => {
    const getCanvasLocator = async () => {
      return getCanvas(page);
    };
    await use(getCanvasLocator);
  },

  waitForQRRender: async ({ page }, use) => {
    const waitForQRRender = async () => {
      // Use centralized waitForRenderComplete helper
      await waitForRenderComplete(page, 'waitForQRRender');
    };
    await use(waitForQRRender);
  },
});

function getSectionLabel(sectionId: string): string {
  return SECTION_LABELS[sectionId as AccordionSection] || sectionId;
}

export { expect } from '@playwright/test';
