import type { Page } from '@playwright/test';

/**
 * QR Canvas Change Detection Utilities
 * Helps verify that UI changes actually update the QR code
 */

/**
 * Get a snapshot of the canvas as a data URL
 */
export async function getCanvasSnapshot(page: Page): Promise<string> {
  const canvas = page.locator('canvas').first();
  await canvas.waitFor({ state: 'visible', timeout: 5000 });
  
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
 */
export async function waitForCanvasChange(
  page: Page,
  previousSnapshot: string,
  timeout = 5000
): Promise<boolean> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const currentSnapshot = await getCanvasSnapshot(page);
    if (snapshotsAreDifferent(previousSnapshot, currentSnapshot)) {
      return true;
    }
    await page.waitForTimeout(100);
  }
  
  return false;
}

/**
 * Execute an action and verify it changes the QR canvas
 * Returns true if the action caused a canvas change
 */
export async function expectQRChanged(
  page: Page,
  action: () => Promise<void>,
  options: { timeout?: number; waitAfterAction?: number } = {}
): Promise<boolean> {
  const { timeout = 5000, waitAfterAction = 500 } = options;
  
  // Get snapshot before action
  const before = await getCanvasSnapshot(page);
  
  // Execute the action
  await action();
  
  // Wait for debounce and render
  await page.waitForTimeout(waitAfterAction);
  
  // Check if canvas changed
  const changed = await waitForCanvasChange(page, before, timeout);
  
  return changed;
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
