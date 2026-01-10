import { test as base, type Page } from '@playwright/test';

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
 */
async function dismissWelcomeModalHelper(page: Page): Promise<void> {
  // Wait a bit for modal to potentially appear
  await page.waitForTimeout(800);
  
  // Check if any modal overlay is blocking - look for the z-[200] fixed overlay
  const modalOverlay = page.locator('.fixed.z-\\[200\\]').first();
  if (await modalOverlay.isVisible().catch(() => false)) {
    // Try clicking "Get Started" button first (most reliable)
    const getStartedBtn = page.locator('button:has-text("Get Started")').first();
    if (await getStartedBtn.isVisible().catch(() => false)) {
      await getStartedBtn.click();
      await page.waitForTimeout(400);
      return;
    }
    
    // Try pressing Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
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
  // Auto-setup: Set localStorage to skip welcome modal BEFORE each test
  page: async ({ page }, use) => {
    // Set localStorage via init script to prevent welcome modal
    await page.addInitScript(() => {
      localStorage.setItem('anqr-welcome-seen', '2026.01.04');
    });
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
          break;
        }
      }
      
      // If tabs not found (mobile view), try the select dropdown
      if (!clicked) {
        const selectTrigger = page.locator('button[role="combobox"]').first();
        if (await selectTrigger.isVisible().catch(() => false)) {
          await selectTrigger.click();
          await page.waitForTimeout(100);
          
          for (const label of labels) {
            const option = page.locator(`[role="option"]:has-text("${label}")`).first();
            if (await option.isVisible().catch(() => false)) {
              await option.click();
              break;
            }
          }
        }
      }
      
      // Wait for UI to update
      await page.waitForTimeout(300);
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
        await page.waitForTimeout(200);
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
      // Wait for the debounce (300ms) plus render time
      await page.waitForTimeout(500);
      // Wait for any loading indicators to disappear
      await page.waitForSelector('[data-loading="true"]', { state: 'hidden', timeout: 5000 }).catch(() => {});
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
