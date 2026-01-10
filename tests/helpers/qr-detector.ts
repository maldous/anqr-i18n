import type { Page, Locator } from '@playwright/test';

/**
 * QR Canvas Change Detection Utilities
 * Uses event-driven patterns instead of arbitrary timeouts
 */

/** Default timeout for waiting operations */
const DEFAULT_TIMEOUT = 10000;

/**
 * Get a snapshot of the canvas as a data URL
 */
export async function getCanvasSnapshot(page: Page): Promise<string> {
  const canvas = page.locator('canvas').first();
  await canvas.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  
  const dataUrl = await canvas.evaluate((el: HTMLCanvasElement) => {
    return el.toDataURL('image/png');
  });
  
  return dataUrl;
}

/**
 * Get canvas pixel data for more precise comparison
 */
export async function getCanvasPixels(page: Page): Promise<Uint8ClampedArray> {
  const canvas = page.locator('canvas').first();
  
  const pixelData = await canvas.evaluate((el: HTMLCanvasElement) => {
    const ctx = el.getContext('2d');
    if (!ctx) return [];
    const imageData = ctx.getImageData(0, 0, el.width, el.height);
    return Array.from(imageData.data);
  });
  
  return new Uint8ClampedArray(pixelData);
}

/**
 * Check if two canvas snapshots are different
 */
export function snapshotsAreDifferent(before: string, after: string): boolean {
  return before !== after;
}

/**
 * Wait for the QR canvas to change from a previous snapshot
 * Uses page.waitForFunction for efficient polling without arbitrary timeouts
 */
export async function waitForCanvasChange(
  page: Page,
  previousSnapshot: string,
  timeout = DEFAULT_TIMEOUT
): Promise<boolean> {
  try {
    await page.waitForFunction(
      (prevSnapshot: string) => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return false;
        const currentSnapshot = canvas.toDataURL('image/png');
        return currentSnapshot !== prevSnapshot;
      },
      previousSnapshot,
      { timeout, polling: 50 }
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Execute an action and verify it changes the QR canvas
 * Returns true if the action caused a canvas change
 * Uses waitForFunction for efficient event-driven detection
 */
export async function expectQRChanged(
  page: Page,
  action: () => Promise<void>,
  timeout = DEFAULT_TIMEOUT
): Promise<boolean> {
  // Get snapshot before action
  const before = await getCanvasSnapshot(page);
  
  // Execute the action
  await action();
  
  // Wait for canvas to change (event-driven, no fixed timeout)
  return await waitForCanvasChange(page, before, timeout);
}

/**
 * Get canvas dimensions
 */
export async function getCanvasDimensions(page: Page): Promise<{ width: number; height: number }> {
  const canvas = page.locator('canvas').first();
  
  const dimensions = await canvas.evaluate((el: HTMLCanvasElement) => ({
    width: el.width,
    height: el.height,
  }));
  
  return dimensions;
}

/**
 * Calculate the percentage difference between two canvas snapshots
 * Useful for determining if changes are significant
 */
export async function getCanvasDifferencePercent(
  page: Page,
  snapshot1: string,
  snapshot2: string
): Promise<number> {
  // This is a simplified comparison - for production, consider using
  // image comparison libraries like pixelmatch
  if (snapshot1 === snapshot2) return 0;
  
  // Get pixel data for both
  const before = await page.evaluate((dataUrl: string) => {
    return new Promise<number[]>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve([]);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resolve(Array.from(imageData.data));
      };
      img.src = dataUrl;
    });
  }, snapshot1);
  
  const after = await page.evaluate((dataUrl: string) => {
    return new Promise<number[]>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve([]);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resolve(Array.from(imageData.data));
      };
      img.src = dataUrl;
    });
  }, snapshot2);
  
  if (before.length !== after.length || before.length === 0) {
    return 100; // Completely different or error
  }
  
  let differentPixels = 0;
  const totalPixels = before.length / 4; // RGBA = 4 values per pixel
  
  for (let i = 0; i < before.length; i += 4) {
    const rDiff = Math.abs(before[i] - after[i]);
    const gDiff = Math.abs(before[i + 1] - after[i + 1]);
    const bDiff = Math.abs(before[i + 2] - after[i + 2]);
    
    // Consider pixels different if any channel differs by more than 5
    if (rDiff > 5 || gDiff > 5 || bDiff > 5) {
      differentPixels++;
    }
  }
  
  return (differentPixels / totalPixels) * 100;
}

/**
 * Wait for accordion section to be fully open
 * Uses data-state attribute detection instead of timeouts
 */
export async function waitForAccordionOpen(
  page: Page,
  sectionValue: string,
  timeout = DEFAULT_TIMEOUT
): Promise<void> {
  // Wait for the accordion item to have data-state="open"
  await page.waitForSelector(
    `[data-state="open"][value="${sectionValue}"], [data-state="open"] [value="${sectionValue}"]`,
    { state: 'attached', timeout }
  ).catch(() => {
    // Alternative: look for the content region to be visible
  });
  
  // Also wait for the content to be visible
  const content = page.locator(`[role="region"][data-state="open"]`).first();
  await content.waitFor({ state: 'visible', timeout }).catch(() => {});
}

/**
 * Wait for an image to load into the overlay processor
 * Detects canvas change after file input
 */
export async function waitForOverlayImageLoad(
  page: Page,
  previousSnapshot: string,
  timeout = DEFAULT_TIMEOUT
): Promise<void> {
  // Wait for canvas to change (indicates image was processed)
  await waitForCanvasChange(page, previousSnapshot, timeout);
}

/**
 * Wait for QR to finish rendering after any change
 * Uses application signaling (data-rendering-state) for reliability
 */
export async function waitForQRStable(
  page: Page,
  _stabilityMs = 200,
  timeout = DEFAULT_TIMEOUT
): Promise<void> {
  // Wait for app to signal rendering is complete
  // The app sets data-rendering-state="idle" when:
  // - debounce has settled (isPending = false)
  // - rendering is complete (isRendering = false)
  await page.waitForSelector(
    '[data-rendering-state="idle"]',
    { state: 'attached', timeout }
  ).catch(() => {
    // Fallback: wait for canvas to be visible
    return page.waitForSelector('canvas', { state: 'visible', timeout: 2000 });
  });
}

/**
 * Wait for select dropdown to open (Radix UI)
 */
export async function waitForSelectOpen(page: Page, timeout = DEFAULT_TIMEOUT): Promise<void> {
  await page.waitForSelector('[data-radix-popper-content-wrapper]', { state: 'visible', timeout });
}

/**
 * Wait for select dropdown to close (Radix UI)
 */
export async function waitForSelectClosed(page: Page, timeout = DEFAULT_TIMEOUT): Promise<void> {
  await page.waitForSelector('[data-radix-popper-content-wrapper]', { state: 'hidden', timeout }).catch(() => {});
}

/**
 * Click an option in an open Radix select, scrolling if needed
 */
export async function clickSelectOption(
  page: Page,
  optionText: string,
  timeout = DEFAULT_TIMEOUT
): Promise<boolean> {
  const dropdown = page.locator('[data-radix-popper-content-wrapper]').first();
  await dropdown.waitFor({ state: 'visible', timeout });
  
  // Find the option by text
  const option = dropdown.locator('[role="option"]').filter({ hasText: new RegExp(optionText, 'i') }).first();
  
  // Check if option exists
  const count = await option.count();
  if (count === 0) {
    // Try scrolling through options to find it
    const allOptions = dropdown.locator('[role="option"]');
    const totalOptions = await allOptions.count();
    
    for (let i = 0; i < totalOptions; i++) {
      const opt = allOptions.nth(i);
      const text = await opt.textContent();
      if (text && new RegExp(optionText, 'i').test(text)) {
        await opt.scrollIntoViewIfNeeded();
        await opt.click();
        return true;
      }
    }
    return false;
  }
  
  // Scroll option into view and click
  await option.scrollIntoViewIfNeeded();
  await option.click();
  return true;
}
