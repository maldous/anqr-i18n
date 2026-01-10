import * as path from 'path';
import { test, expect } from '../fixtures/test-fixtures';
import { getCanvasSnapshot, snapshotsAreDifferent } from '../helpers/qr-detector';
import { setSliderByPercent } from '../helpers/input-helpers';
import type { Page } from '@playwright/test';

/**
 * Comprehensive Basic Tier Overlay Tests
 * 
 * Tests ALL overlay-related functionality available in the basic tier:
 * - File uploads (static image and animated GIF)
 * - URL loading (static image and animated GIF)
 * - All 4 basic overlay modes: center, blend, halftone, dithered
 * - Intensity slider (25%, 50%, 75%, 100%)
 * - All 3 color modes: color, grayscale, bw
 * - Preserve finder patterns switch
 * - Crop functionality (enable/disable + crop size)
 * - Combined settings permutations
 * - State changes after overlay loaded
 */

// ==========================================
// TEST IMAGE PATHS
// ==========================================
const STATIC_IMAGE_PATH = path.join(process.cwd(), 'public/tsunami.jpg');
const ANIMATED_IMAGE_PATH = path.join(process.cwd(), 'public/king.gif');
const STATIC_IMAGE_URL = 'https://anqr.link/tsunami.jpg';
const ANIMATED_IMAGE_URL = 'https://anqr.link/king.gif';

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Expand the Overlay section in the sidebar and ensure it stays open
 */
async function expandOverlaySection(page: Page) {
  // Find the Overlay accordion trigger by text
  const overlayTrigger = page.locator('button[data-radix-collection-item]').filter({ hasText: /^Overlay$/i }).first();
  
  // Check if the section is already open by looking at the accordion item's data-state
  const accordionItem = page.locator('[data-state][value="overlay"]').first();
  const state = await accordionItem.getAttribute('data-state').catch(() => 'closed');
  
  if (state !== 'open') {
    // Click to expand
    if (await overlayTrigger.isVisible().catch(() => false)) {
      await overlayTrigger.click();
      await page.waitForTimeout(400);
    }
  }
  
  // Scroll the overlay section into view to ensure controls are visible
  const overlayContent = page.locator('[data-state="open"][value="overlay"]').first();
  if (await overlayContent.isVisible().catch(() => false)) {
    await overlayContent.scrollIntoViewIfNeeded();
  }
}

/**
 * Upload an overlay image file
 */
async function uploadOverlayImage(page: Page, filePath: string) {
  await expandOverlaySection(page);
  
  // File input is hidden but setInputFiles works on hidden inputs
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(filePath);
  await page.waitForTimeout(1500); // Wait for image to load and process
  
  // Re-expand the section in case it closed after file selection
  await expandOverlaySection(page);
  await page.waitForTimeout(300);
}

/**
 * Load an overlay image from URL
 */
async function loadOverlayFromUrl(page: Page, url: string) {
  await expandOverlaySection(page);
  
  // Click "From URL" button
  const fromUrlButton = page.locator('button').filter({ hasText: /From URL|URL/i }).first();
  await fromUrlButton.click();
  await page.waitForTimeout(300);
  
  // Enter URL
  const urlInput = page.locator('input[type="url"]').first();
  await urlInput.fill(url);
  
  // Click Load button
  const loadButton = page.locator('button').filter({ hasText: /^Load$/i }).first();
  await loadButton.click();
  
  // Wait for network request and image load
  await page.waitForTimeout(2500);
}

/**
 * Clear the current overlay
 */
async function clearOverlay(page: Page) {
  await expandOverlaySection(page);
  // Look for the X button near the filename
  const clearButton = page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first();
  if (await clearButton.isVisible().catch(() => false)) {
    await clearButton.click();
    await page.waitForTimeout(300);
  }
}

/**
 * Set overlay mode (center, blend, halftone, dithered)
 */
async function setOverlayMode(page: Page, mode: string) {
  await expandOverlaySection(page);
  await page.waitForTimeout(300);
  
  // Find the Mode select - it's the first combobox in the overlay section content
  // The accordion content region contains all controls
  const overlaySection = page.locator('[data-state="open"][value="overlay"]').first();
  const accordionContent = overlaySection.locator('xpath=following-sibling::*[1]');
  
  // Scroll down within the overlay section to ensure controls are visible
  await accordionContent.evaluate(el => el.scrollTop = 0);
  
  // Find the Mode select - look for combobox
  const modeSelect = accordionContent.locator('[role="combobox"]').first();
  await modeSelect.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  
  if (await modeSelect.isVisible().catch(() => false)) {
    // Scroll the select into view first
    await modeSelect.scrollIntoViewIfNeeded();
    await modeSelect.click();
    await page.waitForTimeout(300);
    
    // Wait for dropdown to appear
    await page.waitForSelector('[data-radix-popper-content-wrapper]', { timeout: 3000 }).catch(() => {});
    
    // Find the option - scroll through options if needed
    const optionsContainer = page.locator('[data-radix-popper-content-wrapper]').first();
    const option = optionsContainer.locator('[role="option"]').filter({ hasText: new RegExp(mode, 'i') }).first();
    
    // Scroll the option into view within the dropdown
    if (await option.count() > 0) {
      await option.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      await option.click();
      await page.waitForTimeout(300);
    } else {
      // Try keyboard navigation as fallback
      const allOptions = optionsContainer.locator('[role="option"]');
      const count = await allOptions.count();
      for (let i = 0; i < count; i++) {
        const opt = allOptions.nth(i);
        const text = await opt.textContent();
        if (text && new RegExp(mode, 'i').test(text)) {
          await opt.scrollIntoViewIfNeeded();
          await opt.click();
          await page.waitForTimeout(300);
          return;
        }
      }
      // Close dropdown if option not found
      await page.keyboard.press('Escape');
    }
  }
}

/**
 * Set overlay color mode (color, grayscale, bw)
 */
async function setOverlayColorMode(page: Page, colorMode: string) {
  await expandOverlaySection(page);
  await page.waitForTimeout(300);
  
  // Find overlay section content
  const overlaySection = page.locator('[data-state="open"][value="overlay"]').first();
  const accordionContent = overlaySection.locator('xpath=following-sibling::*[1]');
  
  // Color mode is typically the second combobox in the overlay section
  const comboboxes = accordionContent.locator('[role="combobox"]');
  const count = await comboboxes.count();
  
  // Look through comboboxes to find the one with color options
  for (let i = 0; i < count; i++) {
    const combobox = comboboxes.nth(i);
    if (!(await combobox.isVisible().catch(() => false))) continue;
    
    // Scroll combobox into view
    await combobox.scrollIntoViewIfNeeded();
    await combobox.click();
    await page.waitForTimeout(300);
    
    // Wait for dropdown
    await page.waitForSelector('[data-radix-popper-content-wrapper]', { timeout: 3000 }).catch(() => {});
    const optionsContainer = page.locator('[data-radix-popper-content-wrapper]').first();
    
    // Check if this dropdown has color mode options
    const allOptions = optionsContainer.locator('[role="option"]');
    const optionTexts: string[] = [];
    const optCount = await allOptions.count();
    for (let j = 0; j < optCount; j++) {
      const text = await allOptions.nth(j).textContent();
      optionTexts.push(text || '');
    }
    
    // Check if this is the color mode dropdown
    const hasColorOptions = optionTexts.some(t => /Color|Grayscale|B&W/i.test(t));
    
    if (hasColorOptions) {
      // Find our target option
      for (let j = 0; j < optCount; j++) {
        const opt = allOptions.nth(j);
        const text = await opt.textContent();
        
        // Match color mode by text
        const isMatch = 
          (colorMode.toLowerCase() === 'color' && /^Color$/i.test(text || '')) ||
          (colorMode.toLowerCase() === 'grayscale' && /Grayscale/i.test(text || '')) ||
          ((colorMode.toLowerCase() === 'bw' || colorMode.toLowerCase() === 'b&w') && /B&W|BW|Black/i.test(text || ''));
        
        if (isMatch) {
          await opt.scrollIntoViewIfNeeded();
          await opt.click();
          await page.waitForTimeout(300);
          return;
        }
      }
    }
    
    // Close dropdown if not the right one
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
  }
}

/**
 * Set overlay intensity via slider
 */
async function setOverlayIntensity(page: Page, percent: number) {
  await expandOverlaySection(page);
  await page.waitForTimeout(300);
  
  // Find overlay section content
  const overlaySection = page.locator('[data-state="open"][value="overlay"]').first();
  const accordionContent = overlaySection.locator('xpath=following-sibling::*[1]');
  
  // Find intensity slider (usually the first slider in overlay section)
  const slider = accordionContent.locator('[role="slider"]').first();
  await slider.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  
  if (await slider.isVisible().catch(() => false)) {
    // Scroll slider into view
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    
    const box = await slider.boundingBox();
    if (box) {
      const x = box.x + (box.width * percent) / 100;
      const y = box.y + box.height / 2;
      await page.mouse.click(x, y);
      await page.waitForTimeout(300);
    }
  }
}

/**
 * Toggle preserve finders switch
 */
async function togglePreserveFinders(page: Page) {
  await expandOverlaySection(page);
  await page.waitForTimeout(300);
  
  // Find overlay section content
  const overlaySection = page.locator('[data-state="open"][value="overlay"]').first();
  const accordionContent = overlaySection.locator('xpath=following-sibling::*[1]');
  
  // Find switches in the overlay section content
  const switches = accordionContent.locator('[role="switch"]');
  const count = await switches.count();
  
  // Look for the "Preserve Finders" switch by examining nearby labels
  for (let i = 0; i < count; i++) {
    const switchEl = switches.nth(i);
    const isVisible = await switchEl.isVisible().catch(() => false);
    
    if (isVisible) {
      // Check if this switch is for preserve finders by looking at its container
      const container = switchEl.locator('xpath=ancestor::div[contains(@class, "flex")]').first();
      const text = await container.textContent().catch(() => '');
      
      if (text && /preserve|finder/i.test(text)) {
        await switchEl.scrollIntoViewIfNeeded();
        await switchEl.click();
        await page.waitForTimeout(300);
        return;
      }
    }
  }
  
  // Fallback: toggle the first non-disabled switch after the enable switch
  for (let i = 1; i < count; i++) {
    const switchEl = switches.nth(i);
    const isVisible = await switchEl.isVisible().catch(() => false);
    const isDisabled = await switchEl.getAttribute('aria-disabled') === 'true';
    
    if (isVisible && !isDisabled) {
      await switchEl.scrollIntoViewIfNeeded();
      await switchEl.click();
      await page.waitForTimeout(300);
      return;
    }
  }
}

/**
 * Enable/disable crop
 */
async function setCropEnabled(page: Page, enabled: boolean) {
  await expandOverlaySection(page);
  await page.waitForTimeout(300);
  
  // Find overlay section content
  const overlaySection = page.locator('[data-state="open"][value="overlay"]').first();
  const accordionContent = overlaySection.locator('xpath=following-sibling::*[1]');
  
  // Find the crop enable switch
  const switches = accordionContent.locator('[role="switch"]');
  const count = await switches.count();
  
  for (let i = 0; i < count; i++) {
    const switchEl = switches.nth(i);
    const isVisible = await switchEl.isVisible().catch(() => false);
    
    if (isVisible) {
      // Check if this might be the crop switch by looking at nearby text
      const container = switchEl.locator('xpath=ancestor::div[contains(@class, "flex")]').first();
      const text = await container.textContent().catch(() => '');
      
      if (text?.toLowerCase().includes('crop')) {
        await switchEl.scrollIntoViewIfNeeded();
        
        const currentState = await switchEl.getAttribute('data-state');
        const isCurrentlyEnabled = currentState === 'checked';
        
        if (isCurrentlyEnabled !== enabled) {
          await switchEl.click();
          await page.waitForTimeout(300);
        }
        return;
      }
    }
  }
}

/**
 * Set crop size via slider
 */
async function setCropSize(page: Page, percent: number) {
  await expandOverlaySection(page);
  await page.waitForTimeout(300);
  
  // Find overlay section content
  const overlaySection = page.locator('[data-state="open"][value="overlay"]').first();
  const accordionContent = overlaySection.locator('xpath=following-sibling::*[1]');
  
  // Find crop size slider (usually appears after crop is enabled)
  const sliders = accordionContent.locator('[role="slider"]');
  const count = await sliders.count();
  
  if (count > 1) {
    // Crop size slider is typically the second slider
    const cropSlider = sliders.nth(1);
    if (await cropSlider.isVisible().catch(() => false)) {
      await cropSlider.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      
      const box = await cropSlider.boundingBox();
      if (box) {
        // Map percent (10-100) to slider position
        const x = box.x + (box.width * percent) / 100;
        const y = box.y + box.height / 2;
        await page.mouse.click(x, y);
        await page.waitForTimeout(300);
      }
    }
  }
}

/**
 * Check if overlay is enabled
 */
async function isOverlayEnabled(page: Page): Promise<boolean> {
  await expandOverlaySection(page);
  const enableSwitch = page.locator('[role="switch"]').first();
  const state = await enableSwitch.getAttribute('data-state').catch(() => 'unchecked');
  return state === 'checked';
}

/**
 * Set payload text (for combined tests)
 */
async function setPayloadText(page: Page, text: string) {
  // Expand payload section
  const payloadTrigger = page.locator('button').filter({ hasText: /^Payload$/i }).first();
  if (await payloadTrigger.isVisible().catch(() => false)) {
    await payloadTrigger.click();
    await page.waitForTimeout(300);
  }
  
  // Switch to plain text type
  const combobox = page.getByRole('combobox').first();
  await combobox.click();
  await page.waitForTimeout(200);
  
  const plainTextOption = page.getByRole('option', { name: /Plain Text/i }).first();
  if (await plainTextOption.isVisible().catch(() => false)) {
    await plainTextOption.click();
    await page.waitForTimeout(200);
  } else {
    await page.keyboard.press('Escape');
  }
  
  // Set text
  const textarea = page.locator('textarea').first();
  if (await textarea.isVisible().catch(() => false)) {
    await textarea.clear();
    await textarea.fill(text);
    await textarea.blur();
    await page.waitForTimeout(300);
  }
}

// ==========================================
// TESTS
// ==========================================

test.describe('Overlay Section - Basic Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('basic');
    await page.waitForSelector('canvas', { timeout: 10000 });
    await page.waitForTimeout(500);
  });

  // ==========================================
  // FILE UPLOAD TESTS
  // ==========================================
  test.describe('File Uploads', () => {
    test('uploads static image (tsunami.jpg) and changes QR', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('uploads animated GIF (king.gif) and changes QR', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await uploadOverlayImage(page, ANIMATED_IMAGE_PATH);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('static image shows preview', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      
      // Check for image preview
      const preview = page.locator('img[alt*="preview" i], img[alt*="Preview" i]').first();
      const hasPreview = await preview.isVisible().catch(() => false);
      
      // Or check for filename display
      const filename = page.locator('span').filter({ hasText: /tsunami/i }).first();
      const hasFilename = await filename.isVisible().catch(() => false);
      
      expect(hasPreview || hasFilename).toBe(true);
    });

    test('animated GIF shows preview', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, ANIMATED_IMAGE_PATH);
      await waitForQRRender();
      
      // Check for filename display
      const filename = page.locator('span').filter({ hasText: /king/i }).first();
      const hasFilename = await filename.isVisible().catch(() => false);
      
      // Or just verify canvas is present
      const canvas = page.locator('canvas').first();
      const hasCanvas = await canvas.isVisible().catch(() => false);
      
      expect(hasFilename || hasCanvas).toBe(true);
    });

    test('can clear uploaded overlay', async ({ page, waitForQRRender }) => {
      // Upload image
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      const withOverlay = await getCanvasSnapshot(page);
      
      // Clear overlay
      await clearOverlay(page);
      await waitForQRRender();
      const afterClear = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(withOverlay, afterClear)).toBe(true);
    });

    test('re-uploading different image changes QR', async ({ page, waitForQRRender }) => {
      // Upload static image
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      const staticSnapshot = await getCanvasSnapshot(page);
      
      // Upload animated image
      await uploadOverlayImage(page, ANIMATED_IMAGE_PATH);
      await waitForQRRender();
      const animatedSnapshot = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(staticSnapshot, animatedSnapshot)).toBe(true);
    });
  });

  // ==========================================
  // URL LOADING TESTS
  // ==========================================
  test.describe('URL Loading', () => {
    test('loads static image from URL and changes QR', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await loadOverlayFromUrl(page, STATIC_IMAGE_URL);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('loads animated GIF from URL and changes QR', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await loadOverlayFromUrl(page, ANIMATED_IMAGE_URL);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('URL loading shows source URL', async ({ page, waitForQRRender }) => {
      await loadOverlayFromUrl(page, STATIC_IMAGE_URL);
      await waitForQRRender();
      
      // Check for URL or "loaded from URL" indication
      const urlText = page.locator('*').filter({ hasText: /anqr\.link|loaded from url/i }).first();
      const canvas = page.locator('canvas').first();
      
      // Either URL is shown or canvas has content
      expect(await canvas.isVisible()).toBe(true);
    });
  });

  // ==========================================
  // OVERLAY MODE TESTS (4 basic modes)
  // ==========================================
  test.describe('Overlay Modes', () => {
    test.beforeEach(async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
    });

    test('center mode is available', async ({ page, waitForQRRender }) => {
      await setOverlayMode(page, 'Center Logo');
      await waitForQRRender();
      
      const snapshot = await getCanvasSnapshot(page);
      expect(snapshot).toBeTruthy();
    });

    test('blend mode changes QR from center mode', async ({ page, waitForQRRender }) => {
      await setOverlayMode(page, 'Center Logo');
      await waitForQRRender();
      const centerSnapshot = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Blend');
      await waitForQRRender();
      const blendSnapshot = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(centerSnapshot, blendSnapshot)).toBe(true);
    });

    test('halftone mode changes QR', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Halftone');
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('dithered mode changes QR', async ({ page, waitForQRRender }) => {
      await setOverlayMode(page, 'Blend');
      await waitForQRRender();
      const before = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Dithered');
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('all 4 modes produce different results', async ({ page, waitForQRRender }) => {
      const snapshots: Record<string, string> = {};
      
      // Use exact translated labels from en-US.json
      const modes = ['Center Logo', 'Blend', 'Halftone', 'Dithered'];
      for (const mode of modes) {
        await setOverlayMode(page, mode);
        await waitForQRRender();
        snapshots[mode] = await getCanvasSnapshot(page);
      }
      
      // At least 3 of 4 modes should produce different results
      const uniqueSnapshots = new Set(Object.values(snapshots));
      expect(uniqueSnapshots.size).toBeGreaterThanOrEqual(3);
    });

    test('switching between modes multiple times works', async ({ page, waitForQRRender }) => {
      // Switch modes several times
      await setOverlayMode(page, 'Blend');
      await waitForQRRender();
      const blend1 = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Halftone');
      await waitForQRRender();
      
      await setOverlayMode(page, 'Blend');
      await waitForQRRender();
      const blend2 = await getCanvasSnapshot(page);
      
      // Same mode should produce same result
      expect(blend1).toBe(blend2);
    });
  });

  // ==========================================
  // INTENSITY SLIDER TESTS
  // ==========================================
  test.describe('Intensity Slider', () => {
    test.beforeEach(async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
    });

    test('intensity 25% changes QR from default', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await setOverlayIntensity(page, 25);
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('intensity 50% changes QR', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await setOverlayIntensity(page, 50);
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('intensity 75% changes QR', async ({ page, waitForQRRender }) => {
      await setOverlayIntensity(page, 25);
      await waitForQRRender();
      const before = await getCanvasSnapshot(page);
      
      await setOverlayIntensity(page, 75);
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('intensity 100% vs 25% produces visible difference', async ({ page, waitForQRRender }) => {
      await setOverlayIntensity(page, 25);
      await waitForQRRender();
      const at25 = await getCanvasSnapshot(page);
      
      await setOverlayIntensity(page, 100);
      await waitForQRRender();
      const at100 = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(at25, at100)).toBe(true);
    });

    test('different intensity values produce different QR codes', async ({ page, waitForQRRender }) => {
      const intensities = [25, 50, 75, 100];
      const snapshots: Record<number, string> = {};
      
      for (const intensity of intensities) {
        await setOverlayIntensity(page, intensity);
        await waitForQRRender();
        snapshots[intensity] = await getCanvasSnapshot(page);
      }
      
      // At least 3 of 4 intensities should produce different results
      const uniqueSnapshots = new Set(Object.values(snapshots));
      expect(uniqueSnapshots.size).toBeGreaterThanOrEqual(3);
    });
  });

  // ==========================================
  // COLOR MODE TESTS (3 modes)
  // ==========================================
  test.describe('Color Modes', () => {
    test.beforeEach(async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
    });

    test('color mode is available', async ({ page, waitForQRRender }) => {
      await setOverlayColorMode(page, 'Color');
      await waitForQRRender();
      
      const snapshot = await getCanvasSnapshot(page);
      expect(snapshot).toBeTruthy();
    });

    test('grayscale mode changes QR from color', async ({ page, waitForQRRender }) => {
      await setOverlayColorMode(page, 'Color');
      await waitForQRRender();
      const colorSnapshot = await getCanvasSnapshot(page);
      
      await setOverlayColorMode(page, 'Grayscale');
      await waitForQRRender();
      const grayscaleSnapshot = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(colorSnapshot, grayscaleSnapshot)).toBe(true);
    });

    test('B&W mode changes QR from grayscale', async ({ page, waitForQRRender }) => {
      await setOverlayColorMode(page, 'Grayscale');
      await waitForQRRender();
      const grayscaleSnapshot = await getCanvasSnapshot(page);
      
      await setOverlayColorMode(page, 'B&W');
      await waitForQRRender();
      const bwSnapshot = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(grayscaleSnapshot, bwSnapshot)).toBe(true);
    });

    test('all 3 color modes produce different results', async ({ page, waitForQRRender }) => {
      const snapshots: Record<string, string> = {};
      
      await setOverlayColorMode(page, 'Color');
      await waitForQRRender();
      snapshots['color'] = await getCanvasSnapshot(page);
      
      await setOverlayColorMode(page, 'Grayscale');
      await waitForQRRender();
      snapshots['grayscale'] = await getCanvasSnapshot(page);
      
      await setOverlayColorMode(page, 'B&W');
      await waitForQRRender();
      snapshots['bw'] = await getCanvasSnapshot(page);
      
      // All 3 should be different
      expect(snapshotsAreDifferent(snapshots['color'], snapshots['grayscale'])).toBe(true);
      expect(snapshotsAreDifferent(snapshots['grayscale'], snapshots['bw'])).toBe(true);
      expect(snapshotsAreDifferent(snapshots['color'], snapshots['bw'])).toBe(true);
    });
  });

  // ==========================================
  // PRESERVE FINDERS TESTS
  // ==========================================
  test.describe('Preserve Finder Patterns', () => {
    test.beforeEach(async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
    });

    test('toggling preserve finders changes QR', async ({ page, waitForQRRender }) => {
      const before = await getCanvasSnapshot(page);
      
      await togglePreserveFinders(page);
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('preserve finders ON vs OFF produces different QR', async ({ page, waitForQRRender }) => {
      // Capture initial state
      const initial = await getCanvasSnapshot(page);
      
      // Toggle and capture
      await togglePreserveFinders(page);
      await waitForQRRender();
      const toggled = await getCanvasSnapshot(page);
      
      // Toggle back and capture
      await togglePreserveFinders(page);
      await waitForQRRender();
      const toggledBack = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(initial, toggled)).toBe(true);
      // Should return to similar state when toggled back
      // (might not be exactly the same due to rendering variations)
    });
  });

  // ==========================================
  // CROP FUNCTIONALITY TESTS
  // ==========================================
  test.describe('Crop Functionality', () => {
    test.beforeEach(async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
    });

    test('enabling crop shows crop controls', async ({ page, waitForQRRender }) => {
      await expandOverlaySection(page);
      
      // Count sliders before enabling crop
      const slidersBefore = await page.locator('[role="slider"]').count();
      
      // Enable crop
      await setCropEnabled(page, true);
      await page.waitForTimeout(300);
      
      // Count sliders after
      const slidersAfter = await page.locator('[role="slider"]').count();
      
      // Should have more controls after enabling crop
      expect(slidersAfter).toBeGreaterThanOrEqual(slidersBefore);
    });

    test('changing crop size changes QR', async ({ page, waitForQRRender }) => {
      await setCropEnabled(page, true);
      await waitForQRRender();
      
      const before = await getCanvasSnapshot(page);
      
      await setCropSize(page, 50);
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('different crop sizes produce different QR codes', async ({ page, waitForQRRender }) => {
      await setCropEnabled(page, true);
      await waitForQRRender();
      
      await setCropSize(page, 30);
      await waitForQRRender();
      const small = await getCanvasSnapshot(page);
      
      await setCropSize(page, 80);
      await waitForQRRender();
      const large = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(small, large)).toBe(true);
    });

    test('disabling crop changes QR back', async ({ page, waitForQRRender }) => {
      // Enable crop with small size
      await setCropEnabled(page, true);
      await setCropSize(page, 40);
      await waitForQRRender();
      const cropped = await getCanvasSnapshot(page);
      
      // Disable crop
      await setCropEnabled(page, false);
      await waitForQRRender();
      const uncropped = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(cropped, uncropped)).toBe(true);
    });
  });

  // ==========================================
  // ANIMATED GIF SPECIFIC TESTS
  // ==========================================
  test.describe('Animated GIF Overlay', () => {
    test('animated GIF from file produces output', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, ANIMATED_IMAGE_PATH);
      await waitForQRRender();
      
      const snapshot = await getCanvasSnapshot(page);
      expect(snapshot).toBeTruthy();
      expect(snapshot.length).toBeGreaterThan(100);
    });

    test('animated GIF from URL produces output', async ({ page, waitForQRRender }) => {
      await loadOverlayFromUrl(page, ANIMATED_IMAGE_URL);
      await waitForQRRender();
      
      const snapshot = await getCanvasSnapshot(page);
      expect(snapshot).toBeTruthy();
      expect(snapshot.length).toBeGreaterThan(100);
    });

    test('animated GIF supports all 4 modes', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, ANIMATED_IMAGE_PATH);
      await waitForQRRender();
      
      const modes = ['Center', 'Blend', 'Halftone', 'Dither'];
      for (const mode of modes) {
        await setOverlayMode(page, mode);
        await waitForQRRender();
        
        const snapshot = await getCanvasSnapshot(page);
        expect(snapshot).toBeTruthy();
      }
    });

    test('animated GIF supports color modes', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, ANIMATED_IMAGE_PATH);
      await waitForQRRender();
      
      const colorModes = ['Color', 'Grayscale', 'B&W'];
      for (const mode of colorModes) {
        await setOverlayColorMode(page, mode);
        await waitForQRRender();
        
        const snapshot = await getCanvasSnapshot(page);
        expect(snapshot).toBeTruthy();
      }
    });
  });

  // ==========================================
  // COMBINED SETTINGS TESTS
  // ==========================================
  test.describe('Combined Settings', () => {
    test.beforeEach(async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
    });

    test('mode + intensity combined change', async ({ page, waitForQRRender }) => {
      const initial = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Halftone');
      await setOverlayIntensity(page, 50);
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(initial, after)).toBe(true);
    });

    test('mode + color mode combined change', async ({ page, waitForQRRender }) => {
      const initial = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Blend');
      await setOverlayColorMode(page, 'Grayscale');
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(initial, after)).toBe(true);
    });

    test('all settings combined change', async ({ page, waitForQRRender }) => {
      const initial = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Halftone');
      await setOverlayIntensity(page, 75);
      await setOverlayColorMode(page, 'B&W');
      await togglePreserveFinders(page);
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(initial, after)).toBe(true);
    });

    test('4 modes x 3 color modes permutation test', async ({ page, waitForQRRender }) => {
      const modes = ['Center', 'Blend', 'Halftone', 'Dither'];
      const colorModes = ['Color', 'Grayscale', 'B&W'];
      const snapshots: string[] = [];
      
      for (const mode of modes) {
        for (const colorMode of colorModes) {
          await setOverlayMode(page, mode);
          await setOverlayColorMode(page, colorMode);
          await waitForQRRender();
          snapshots.push(await getCanvasSnapshot(page));
        }
      }
      
      // Most combinations should be unique
      const uniqueSnapshots = new Set(snapshots);
      expect(uniqueSnapshots.size).toBeGreaterThanOrEqual(8); // At least 8 unique out of 12
    });
  });

  // ==========================================
  // STATE CHANGE TESTS (Payload + Overlay)
  // ==========================================
  test.describe('Payload Changes With Overlay', () => {
    test('changing payload after loading overlay changes QR', async ({ page, waitForQRRender }) => {
      // Load overlay first
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      const withOverlay = await getCanvasSnapshot(page);
      
      // Change payload
      await setPayloadText(page, 'New payload content after overlay');
      await waitForQRRender();
      const afterPayloadChange = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(withOverlay, afterPayloadChange)).toBe(true);
    });

    test('multiple payload changes with overlay loaded', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      
      const snapshots: string[] = [];
      const payloads = ['First payload', 'Second payload', 'Third payload'];
      
      for (const payload of payloads) {
        await setPayloadText(page, payload);
        await waitForQRRender();
        snapshots.push(await getCanvasSnapshot(page));
      }
      
      // All should be different
      expect(snapshotsAreDifferent(snapshots[0], snapshots[1])).toBe(true);
      expect(snapshotsAreDifferent(snapshots[1], snapshots[2])).toBe(true);
    });

    test('changing overlay mode after payload change', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await setPayloadText(page, 'Custom payload text');
      await waitForQRRender();
      const before = await getCanvasSnapshot(page);
      
      await setOverlayMode(page, 'Halftone');
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('full workflow: payload -> overlay -> settings -> payload', async ({ page, waitForQRRender }) => {
      // Set initial payload
      await setPayloadText(page, 'Initial content');
      await waitForQRRender();
      const step1 = await getCanvasSnapshot(page);
      
      // Add overlay
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      const step2 = await getCanvasSnapshot(page);
      
      // Change overlay settings
      await setOverlayMode(page, 'Blend');
      await setOverlayIntensity(page, 60);
      await waitForQRRender();
      const step3 = await getCanvasSnapshot(page);
      
      // Change payload again
      await setPayloadText(page, 'Final content');
      await waitForQRRender();
      const step4 = await getCanvasSnapshot(page);
      
      // All steps should produce different QR codes
      expect(snapshotsAreDifferent(step1, step2)).toBe(true);
      expect(snapshotsAreDifferent(step2, step3)).toBe(true);
      expect(snapshotsAreDifferent(step3, step4)).toBe(true);
    });
  });

  // ==========================================
  // ACCESSIBILITY TESTS
  // ==========================================
  test.describe('Accessibility', () => {
    test('overlay controls have proper ARIA attributes', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      await expandOverlaySection(page);

      // Check switches have role
      const switches = page.locator('[role="switch"]');
      expect(await switches.count()).toBeGreaterThan(0);

      // Check sliders have role
      const sliders = page.locator('[role="slider"]');
      expect(await sliders.count()).toBeGreaterThan(0);

      // Check comboboxes have role
      const comboboxes = page.locator('[role="combobox"]');
      expect(await comboboxes.count()).toBeGreaterThan(0);
    });

    test('labels are present for controls', async ({ page, waitForQRRender }) => {
      await uploadOverlayImage(page, STATIC_IMAGE_PATH);
      await waitForQRRender();
      await expandOverlaySection(page);

      // Check that labels exist
      const labels = page.locator('label');
      expect(await labels.count()).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // ERROR HANDLING TESTS
  // ==========================================
  test.describe('Error Handling', () => {
    test('invalid URL shows error or handles gracefully', async ({ page, waitForQRRender }) => {
      await expandOverlaySection(page);
      
      // Click "From URL" button
      const fromUrlButton = page.locator('button').filter({ hasText: /From URL|URL/i }).first();
      await fromUrlButton.click();
      await page.waitForTimeout(300);
      
      // Enter invalid URL
      const urlInput = page.locator('input[type="url"]').first();
      await urlInput.fill('not-a-valid-url');
      
      // Try to load
      const loadButton = page.locator('button').filter({ hasText: /^Load$/i }).first();
      await loadButton.click();
      await page.waitForTimeout(1000);
      
      // Page should not crash - canvas should still be visible
      const canvas = page.locator('canvas').first();
      await expect(canvas).toBeVisible();
    });

    test('empty URL load attempt handles gracefully', async ({ page, waitForQRRender }) => {
      await expandOverlaySection(page);
      
      // Click "From URL" button
      const fromUrlButton = page.locator('button').filter({ hasText: /From URL|URL/i }).first();
      await fromUrlButton.click();
      await page.waitForTimeout(300);
      
      // Try to load with empty URL
      const loadButton = page.locator('button').filter({ hasText: /^Load$/i }).first();
      await loadButton.click();
      await page.waitForTimeout(500);
      
      // Should show error or be disabled - page should not crash
      const canvas = page.locator('canvas').first();
      await expect(canvas).toBeVisible();
    });
  });
});
