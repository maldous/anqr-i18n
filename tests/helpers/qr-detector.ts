import type { Page, Locator } from '@playwright/test';

/**
 * QR Canvas Change Detection Utilities
 * Uses event-driven patterns instead of arbitrary timeouts
 * 
 * IMPORTANT: Uses data-testid attributes for stable selectors:
 * - data-testid="sidebar" - the sidebar aside element
 * - data-testid="sidebar-scroll" - the scrollable container within sidebar
 * - data-testid="accordion-overlay" - the overlay accordion item
 * - data-testid="overlay-enabled-switch" - overlay enabled toggle
 * - data-testid="overlay-mode-select" - overlay mode dropdown
 * - data-testid="overlay-intensity-slider" - intensity slider
 * - data-testid="overlay-color-mode-select" - color mode dropdown
 * - data-testid="overlay-preserve-finders-switch" - preserve finders toggle
 * - data-testid="overlay-upload" - upload button
 * - data-testid="overlay-from-url" - from URL button
 * - data-testid="qr-preview" - the QR canvas container
 */

/** Default timeout for waiting operations */
const DEFAULT_TIMEOUT = 10000;

/**
 * Get the sidebar's scrollable container using data-testid
 */
export function getSidebarScroller(page: Page): Locator {
  return page.locator('[data-testid="sidebar-scroll"]');
}

/**
 * Open an accordion section by name and wait for it to be visible
 * Uses aria-expanded for state detection
 */
export async function openAccordion(page: Page, sectionId: string): Promise<void> {
  const accordionItem = page.locator(`[data-testid="accordion-${sectionId}"]`);
  const trigger = accordionItem.locator('[data-radix-collection-item]').first();
  
  // Check if already open
  const isExpanded = await trigger.getAttribute('data-state') === 'open';
  if (isExpanded) return;
  
  // Scroll trigger into view within sidebar
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  
  // Wait for region to be visible
  await page.waitForSelector(`[data-testid="accordion-${sectionId}"] [role="region"][data-state="open"]`, {
    state: 'visible',
    timeout: 5000
  }).catch(() => {});
}

/**
 * Scroll an element into view within the sidebar scroller
 * This is the key function that actually scrolls the sidebar container
 */
export async function ensureVisibleInSidebar(page: Page, locator: Locator): Promise<void> {
  // First ensure the element exists
  await locator.waitFor({ state: 'attached', timeout: 5000 });
  
  // Scroll sidebar to bring element into view
  await page.evaluate(async (testId) => {
    const scroller = document.querySelector('[data-testid="sidebar-scroll"]') as HTMLElement;
    if (!scroller) return;
    
    // Find the element - we pass selector info via evaluate
    const element = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
    if (!element) return;
    
    // Get positions relative to scroller
    const scrollerRect = scroller.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Check if element is below visible area
    if (elementRect.bottom > scrollerRect.bottom) {
      const scrollNeeded = elementRect.bottom - scrollerRect.bottom + 50;
      scroller.scrollTop += scrollNeeded;
    }
    // Check if element is above visible area  
    else if (elementRect.top < scrollerRect.top) {
      const scrollNeeded = scrollerRect.top - elementRect.top + 50;
      scroller.scrollTop -= scrollNeeded;
    }
  }, await locator.getAttribute('data-testid'));
  
  // Fallback: use scrollIntoView on the element itself
  await locator.evaluate(el => {
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
}

/**
 * Scroll the overlay section content to reveal controls below the file preview.
 * After uploading an overlay image, the controls (Mode, Intensity, etc.) are
 * below the fold and need scrolling within the sidebar to be visible.
 * 
 * Uses data-testid selectors for reliability:
 * - data-testid="sidebar-scroll" for the scrollable container
 * - data-testid="overlay-enabled-switch" for the enable toggle
 * - data-testid="overlay-mode-select" for the mode dropdown
 */
export async function scrollOverlaySectionToControls(page: Page): Promise<void> {
  // Step 1: Enable the overlay if it's not enabled
  // The Mode/Intensity/ColorMode controls only render when overlay.enabled is true
  const enabledSwitch = page.locator('[data-testid="overlay-enabled-switch"]');
  
  // Wait for the switch to be attached (it appears after file upload)
  await enabledSwitch.waitFor({ state: 'attached', timeout: 5000 }).catch(() => {});
  
  // Check if it exists and is unchecked
  if (await enabledSwitch.count() > 0) {
    const state = await enabledSwitch.getAttribute('data-state');
    if (state === 'unchecked') {
      await enabledSwitch.scrollIntoViewIfNeeded();
      await enabledSwitch.click({ force: true });
      // Wait for controls to render
      await page.waitForSelector('[data-testid="overlay-mode-select"]', {
        state: 'attached',
        timeout: 3000
      }).catch(() => {});
    }
  }
  
  // Step 2: Scroll the sidebar container to show the Mode combobox
  await page.evaluate(() => {
    const scroller = document.querySelector('[data-testid="sidebar-scroll"]') as HTMLElement;
    if (!scroller) return;
    
    // Find the Mode select by data-testid
    const modeSelect = document.querySelector('[data-testid="overlay-mode-select"]') as HTMLElement;
    if (!modeSelect) return;
    
    // Get positions
    const scrollerRect = scroller.getBoundingClientRect();
    const selectRect = modeSelect.getBoundingClientRect();
    
    // If the select is below the visible area, scroll down
    if (selectRect.top > scrollerRect.bottom - 100) {
      const scrollAmount = selectRect.top - scrollerRect.top - 150;
      scroller.scrollTop += scrollAmount;
    }
    // If the select is above the visible area, scroll up
    else if (selectRect.top < scrollerRect.top + 100) {
      const scrollAmount = scrollerRect.top - selectRect.top + 150;
      scroller.scrollTop -= scrollAmount;
    }
  });
  
  // Wait for the Mode select to be visible in viewport
  const modeSelect = page.locator('[data-testid="overlay-mode-select"]');
  await modeSelect.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
}

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
 * Click an option in an open Radix select
 * Uses keyboard navigation for reliable scrolling within dropdowns
 */
export async function clickSelectOption(
  page: Page,
  optionText: string,
  timeout = DEFAULT_TIMEOUT
): Promise<boolean> {
  const dropdown = page.locator('[data-radix-popper-content-wrapper]').first();
  await dropdown.waitFor({ state: 'visible', timeout });
  
  // Get all options and find target index
  const allOptions = dropdown.locator('[role="option"]');
  const count = await allOptions.count();
  
  let targetIndex = -1;
  for (let i = 0; i < count; i++) {
    const text = await allOptions.nth(i).textContent();
    if (text && new RegExp(optionText, 'i').test(text.trim())) {
      targetIndex = i;
      break;
    }
  }
  
  if (targetIndex === -1) return false;
  
  // Use keyboard navigation - more reliable than click for scrolling
  // Press Home to go to first option, then arrow down to target
  await page.keyboard.press('Home');
  for (let i = 0; i < targetIndex; i++) {
    await page.keyboard.press('ArrowDown');
  }
  
  // Small wait for dropdown to scroll
  await page.waitForTimeout(50);
  
  // Press Enter to select
  await page.keyboard.press('Enter');
  return true;
}

/**
 * Select an option from a dropdown using data-testid
 * Opens the dropdown, selects option, and waits for close
 */
export async function selectDropdownOption(
  page: Page,
  selectTestId: string,
  optionText: string
): Promise<boolean> {
  const select = page.locator(`[data-testid="${selectTestId}"]`);
  
  // Scroll into view within sidebar
  await select.scrollIntoViewIfNeeded();
  
  // Click to open
  await select.click({ force: true });
  
  // Wait for dropdown
  await waitForSelectOpen(page);
  
  // Select option
  const clicked = await clickSelectOption(page, optionText);
  
  if (!clicked) {
    await page.keyboard.press('Escape');
  }
  
  return clicked;
}

/**
 * Set a slider value by clicking at a percentage position
 * Uses data-testid for stable selection
 */
export async function setSliderValue(
  page: Page,
  sliderTestId: string,
  percent: number
): Promise<void> {
  const slider = page.locator(`[data-testid="${sliderTestId}"]`);
  
  // Scroll into view
  await slider.scrollIntoViewIfNeeded();
  await slider.waitFor({ state: 'visible', timeout: 5000 });
  
  const box = await slider.boundingBox();
  if (box) {
    const x = box.x + (box.width * percent) / 100;
    const y = box.y + box.height / 2;
    await page.mouse.click(x, y);
  }
}

/**
 * Toggle a switch using data-testid
 */
export async function toggleSwitch(
  page: Page,
  switchTestId: string
): Promise<void> {
  const switchEl = page.locator(`[data-testid="${switchTestId}"]`);
  await switchEl.scrollIntoViewIfNeeded();
  await switchEl.click({ force: true });
}
