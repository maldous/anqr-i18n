import { test as base, type Page } from '@playwright/test';
import { waitForCanvasChange, getCanvasSnapshot, waitForAccordionOpen } from '../helpers/qr-detector';
import { enableBrowserDebug, waitForAppReady, waitForRenderingIdle } from '../helpers/test-setup';

export type Tier = 'basic' | 'advanced' | 'professional';

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

/**
 * Dismiss the welcome modal by clicking the dismiss button if it appears
 * Uses event-driven waiting instead of arbitrary timeouts
 */
async function dismissWelcomeModalHelper(page: Page): Promise<void> {
  // Check if any modal overlay is blocking - look for the z-[200] fixed overlay
  const modalOverlay = page.locator('.fixed.z-\\[200\\]').first();
  
  // Give a short window for modal to appear (this is acceptable as we're checking for absence)
  const isVisible = await modalOverlay.waitFor({ state: 'visible', timeout: 1000 }).then(() => true).catch(() => false);
  
  if (isVisible) {
    // Try clicking "Get Started" button first (most reliable)
    const getStartedBtn = page.locator('button:has-text("Get Started")').first();
    if (await getStartedBtn.isVisible().catch(() => false)) {
      await getStartedBtn.click();
      // Wait for modal to close
      await modalOverlay.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      return;
    }
    
    // Try pressing Escape key
    await page.keyboard.press('Escape');
    // Wait for modal to close
    await modalOverlay.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
  }
}

/**
 * Set localStorage to skip welcome modal before page loads
 */
async function setupLocalStorage(page: Page): Promise<void> {
  // Add script to set localStorage before the page fully loads
  await page.addInitScript(() => {
    // Mark welcome modal as seen with current version
    localStorage.setItem('anqr-welcome-seen', '2026.01.04');
  });
}

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
      // Wait for page to be ready - look for the tabs container
      await page.waitForSelector('[role="tablist"]', { timeout: 10000 });
      
      // The tabs contain text like "Basic", "Advanced", "Professional"
      // Find and click the tab that matches our tier
      const tierLabels: Record<Tier, string[]> = {
        basic: ['Basic'],
        advanced: ['Advanced'],
        professional: ['Professional', 'Pro'],
      };
      
      const labels = tierLabels[tier];
      let clicked = false;
      
      for (const label of labels) {
        // Try to find tab with this label
        const tab = page.locator(`[role="tab"]:has-text("${label}")`).first();
        if (await tab.isVisible().catch(() => false)) {
          await tab.click();
          clicked = true;
          // Wait for tab to be selected (aria-selected="true")
          await page.waitForSelector(`[role="tab"][aria-selected="true"]:has-text("${label}")`, { timeout: 2000 }).catch(() => {});
          break;
        }
      }
      
      // If tabs not found (mobile view), try the select dropdown
      if (!clicked) {
        const selectTrigger = page.locator('button[role="combobox"]').first();
        if (await selectTrigger.isVisible().catch(() => false)) {
          await selectTrigger.click();
          // Wait for dropdown to open
          await page.waitForSelector('[data-radix-popper-content-wrapper]', { state: 'visible', timeout: 2000 });
          
          for (const label of labels) {
            const option = page.locator(`[role="option"]:has-text("${label}")`).first();
            if (await option.isVisible().catch(() => false)) {
              await option.click();
              // Wait for dropdown to close
              await page.waitForSelector('[data-radix-popper-content-wrapper]', { state: 'hidden', timeout: 2000 }).catch(() => {});
              break;
            }
          }
        }
      }
    };
    await use(setTier);
  },

  expandSection: async ({ page }, use) => {
    const expandSection = async (sectionId: string) => {
      // Find the accordion item and click to expand if not already expanded
      const trigger = page.locator(`[data-state][value="${sectionId}"]`).first();
      
      // Check if already expanded
      const isExpanded = await trigger.getAttribute('data-state') === 'open';
      
      if (!isExpanded) {
        // Click the accordion trigger to expand
        await page.click(`button:has-text("${getSectionLabel(sectionId)}")`);
        // Wait for accordion to open using data-state attribute
        await waitForAccordionOpen(page, sectionId);
      }
    };
    await use(expandSection);
  },

  getCanvas: async ({ page }, use) => {
    const getCanvas = async () => {
      return page.locator('canvas').first();
    };
    await use(getCanvas);
  },

  waitForQRRender: async ({ page }, use) => {
    const waitForQRRender = async () => {
      // Wait for canvas to be visible first
      const canvas = page.locator('canvas').first();
      await canvas.waitFor({ state: 'visible', timeout: 5000 });
      
      // Wait for app to signal rendering is complete (data-rendering-state="idle")
      // This waits for: blur -> debounce (300ms) -> render -> idle
      await waitForRenderingIdle(page, 10000);
    };
    await use(waitForQRRender);
  },
});

function getSectionLabel(sectionId: string): string {
  const labels: Record<string, string> = {
    payload: 'Payload',
    overlay: 'Overlay',
    qr: 'QR Encoding',
    render: 'Rendering',
    animation: 'Animation',
    output: 'Output',
    watermark: 'Watermark',
    metadata: 'Metadata',
    share: 'Share',
    safety: 'Safety',
  };
  return labels[sectionId] || sectionId;
}

export { expect } from '@playwright/test';
