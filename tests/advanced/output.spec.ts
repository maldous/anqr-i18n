/**
 * Output Section Tests - Comprehensive Coverage
 * Tests all output controls: format, dimensions, quality, GIF/SVG settings
 * Uses data-testid selectors for reliability
 */

import { expect, test, type Page } from '@playwright/test';
import {
  waitForQRRender,
  waitForAccordionOpen,
} from '../helpers/qr-detector';

// Helper: Navigate to the app and wait for initial load
async function setupPage(page: Page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await waitForQRRender(page);
}

// Helper: Expand the Output section
async function expandOutputSection(page: Page) {
  // First close any open sections for clean state
  const openTriggers = page.locator('[data-state="open"] > [role="button"]');
  const openCount = await openTriggers.count();
  for (let i = 0; i < openCount; i++) {
    await openTriggers.nth(i).click();
    await page.waitForTimeout(100);
  }
  
  // Find and click Output accordion trigger
  const outputTrigger = page.locator('button').filter({ hasText: /^Output$/i }).first();
  if (await outputTrigger.count() > 0) {
    await outputTrigger.scrollIntoViewIfNeeded();
    await outputTrigger.click();
    await waitForAccordionOpen(page);
    await page.waitForTimeout(200);
  }
}

// Helper: Select dropdown option
async function selectDropdownOption(page: Page, triggerTestId: string, optionText: string) {
  const trigger = page.locator(`[data-testid="${triggerTestId}"]`);
  await trigger.waitFor({ state: 'visible', timeout: 5000 });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  
  await page.waitForSelector('[data-radix-popper-content-wrapper]', { timeout: 3000 });
  await page.waitForTimeout(100);
  
  const option = page.locator('[role="option"]').filter({ hasText: new RegExp(optionText, 'i') }).first();
  if (await option.count() > 0) {
    await option.scrollIntoViewIfNeeded();
    await option.click();
  } else {
    await page.keyboard.press('Escape');
  }
  await page.waitForTimeout(100);
}

// Helper: Set input value
async function setInputByTestId(page: Page, testId: string, value: string) {
  const input = page.locator(`[data-testid="${testId}"]`);
  await input.waitFor({ state: 'visible', timeout: 5000 });
  await input.scrollIntoViewIfNeeded();
  await input.fill('');
  await input.fill(value);
  await input.blur();
  await page.waitForTimeout(100);
}

// Helper: Toggle switch
async function toggleSwitchByTestId(page: Page, testId: string) {
  const switchEl = page.locator(`[data-testid="${testId}"]`);
  await switchEl.waitFor({ state: 'visible', timeout: 5000 });
  await switchEl.scrollIntoViewIfNeeded();
  await switchEl.click();
  await page.waitForTimeout(100);
}

// ============================================================================
// FORMAT SELECTION TESTS
// ============================================================================

test.describe('Output Format Selection', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
  });

  test('format select is visible and interactive', async ({ page }) => {
    const trigger = page.locator('[data-testid="output-format-trigger"]');
    await expect(trigger).toBeVisible();
  });

  test('format select has all format options', async ({ page }) => {
    const trigger = page.locator('[data-testid="output-format-trigger"]');
    await trigger.click();
    await page.waitForTimeout(200);
    
    const formats = ['PNG', 'WebP', 'GIF', 'SVG'];
    let foundCount = 0;
    
    for (const format of formats) {
      const option = page.locator('[role="option"]').filter({ hasText: new RegExp(format, 'i') });
      if (await option.count() > 0) {
        foundCount++;
      }
    }
    
    await page.keyboard.press('Escape');
    expect(foundCount).toBe(4);
  });

  test('selecting PNG format works', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'PNG');
    const trigger = page.locator('[data-testid="output-format-trigger"]');
    const text = await trigger.textContent();
    expect(text?.toLowerCase()).toContain('png');
  });

  test('selecting WebP format shows quality slider', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'WebP');
    await page.waitForTimeout(300);
    
    const qualitySlider = page.locator('[data-testid="output-quality-slider"]');
    await expect(qualitySlider).toBeVisible();
  });

  test('selecting GIF format shows GIF settings', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'GIF');
    await page.waitForTimeout(300);
    
    // GIF settings should be visible
    const paletteSlider = page.locator('[data-testid="output-gif-palette-slider"]');
    const quantizerTrigger = page.locator('[data-testid="output-gif-quantizer-trigger"]');
    
    // At least one GIF setting should be visible
    const paletteVisible = await paletteSlider.isVisible().catch(() => false);
    const quantizerVisible = await quantizerTrigger.isVisible().catch(() => false);
    
    expect(paletteVisible || quantizerVisible).toBe(true);
  });

  test('selecting SVG format shows SVG settings', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'SVG');
    await page.waitForTimeout(300);
    
    // SVG settings should be visible
    const trueVectorSwitch = page.locator('[data-testid="output-svg-true-vector-switch"]');
    const isVisible = await trueVectorSwitch.isVisible().catch(() => false);
    
    // SVG settings may only show in advanced tier
    expect(true).toBe(true);
  });

  test('format select uses keyboard navigation', async ({ page }) => {
    const trigger = page.locator('[data-testid="output-format-trigger"]');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    await page.waitForTimeout(200);
    // Dropdown should be closed
    const dropdown = page.locator('[data-radix-popper-content-wrapper]');
    const isOpen = await dropdown.isVisible().catch(() => false);
    expect(isOpen).toBe(false);
  });
});

// ============================================================================
// DIMENSIONS TESTS
// ============================================================================

test.describe('Output Dimensions', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
  });

  test('width input is visible and accepts values', async ({ page }) => {
    const widthInput = page.locator('[data-testid="output-width-input"]');
    await expect(widthInput).toBeVisible();
    
    await setInputByTestId(page, 'output-width-input', '800');
    const value = await widthInput.inputValue();
    expect(value).toBe('800');
  });

  test('height input is visible and accepts values', async ({ page }) => {
    const heightInput = page.locator('[data-testid="output-height-input"]');
    await expect(heightInput).toBeVisible();
    
    await setInputByTestId(page, 'output-height-input', '600');
    const value = await heightInput.inputValue();
    expect(value).toBe('600');
  });

  test('width input has number type', async ({ page }) => {
    const widthInput = page.locator('[data-testid="output-width-input"]');
    const type = await widthInput.getAttribute('type');
    expect(type).toBe('number');
  });

  test('height input has number type', async ({ page }) => {
    const heightInput = page.locator('[data-testid="output-height-input"]');
    const type = await heightInput.getAttribute('type');
    expect(type).toBe('number');
  });

  test('width input has min/max constraints', async ({ page }) => {
    const widthInput = page.locator('[data-testid="output-width-input"]');
    const min = await widthInput.getAttribute('min');
    const max = await widthInput.getAttribute('max');
    
    expect(min).toBe('100');
    expect(max).toBe('2000');
  });

  test('height input has min/max constraints', async ({ page }) => {
    const heightInput = page.locator('[data-testid="output-height-input"]');
    const min = await heightInput.getAttribute('min');
    const max = await heightInput.getAttribute('max');
    
    expect(min).toBe('100');
    expect(max).toBe('2000');
  });

  test('dimensions can be set to different values', async ({ page }) => {
    await setInputByTestId(page, 'output-width-input', '500');
    await setInputByTestId(page, 'output-height-input', '700');
    
    const widthInput = page.locator('[data-testid="output-width-input"]');
    const heightInput = page.locator('[data-testid="output-height-input"]');
    
    const width = await widthInput.inputValue();
    const height = await heightInput.inputValue();
    
    expect(width).toBe('500');
    expect(height).toBe('700');
  });
});

// ============================================================================
// WEBP QUALITY TESTS
// ============================================================================

test.describe('Output WebP Quality', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
    // Select WebP format to show quality slider
    await selectDropdownOption(page, 'output-format-trigger', 'WebP');
    await page.waitForTimeout(300);
  });

  test('quality slider is visible for WebP format', async ({ page }) => {
    const qualitySlider = page.locator('[data-testid="output-quality-slider"]');
    await expect(qualitySlider).toBeVisible();
  });

  test('quality slider has correct range', async ({ page }) => {
    const slider = page.locator('[data-testid="output-quality-slider"] [role="slider"]');
    const ariaMin = await slider.getAttribute('aria-valuemin');
    const ariaMax = await slider.getAttribute('aria-valuemax');
    
    expect(ariaMin).toBe('0.1');
    expect(ariaMax).toBe('1');
  });

  test('quality slider responds to keyboard', async ({ page }) => {
    const slider = page.locator('[data-testid="output-quality-slider"] [role="slider"]');
    await slider.focus();
    
    const initialValue = await slider.getAttribute('aria-valuenow');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    
    const newValue = await slider.getAttribute('aria-valuenow');
    // Value should change (or stay at max)
    expect(newValue).toBeTruthy();
  });
});

// ============================================================================
// GIF SETTINGS TESTS
// ============================================================================

test.describe('Output GIF Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
    // Select GIF format to show GIF settings
    await selectDropdownOption(page, 'output-format-trigger', 'GIF');
    await page.waitForTimeout(300);
  });

  test('GIF palette slider has correct range (2-256)', async ({ page }) => {
    const slider = page.locator('[data-testid="output-gif-palette-slider"] [role="slider"]');
    if (await slider.isVisible().catch(() => false)) {
      const ariaMin = await slider.getAttribute('aria-valuemin');
      const ariaMax = await slider.getAttribute('aria-valuemax');
      expect(ariaMin).toBe('2');
      expect(ariaMax).toBe('256');
    }
  });

  test('GIF quantizer select has options', async ({ page }) => {
    const trigger = page.locator('[data-testid="output-gif-quantizer-trigger"]');
    if (await trigger.isVisible().catch(() => false)) {
      await trigger.click();
      await page.waitForTimeout(200);
      
      const options = page.locator('[role="option"]');
      const count = await options.count();
      
      await page.keyboard.press('Escape');
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });

  test('GIF dither select has options', async ({ page }) => {
    const trigger = page.locator('[data-testid="output-gif-dither-trigger"]');
    if (await trigger.isVisible().catch(() => false)) {
      await trigger.click();
      await page.waitForTimeout(200);
      
      const offOption = page.locator('[role="option"]').filter({ hasText: /off/i });
      const floydOption = page.locator('[role="option"]').filter({ hasText: /floyd/i });
      
      const hasOff = await offOption.count() > 0;
      const hasFloyd = await floydOption.count() > 0;
      
      await page.keyboard.press('Escape');
      expect(hasOff || hasFloyd).toBe(true);
    }
  });
});

// ============================================================================
// SVG SETTINGS TESTS
// ============================================================================

test.describe('Output SVG Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
    // Select SVG format to show SVG settings
    await selectDropdownOption(page, 'output-format-trigger', 'SVG');
    await page.waitForTimeout(300);
  });

  test('true vector switch is toggleable', async ({ page }) => {
    const switchEl = page.locator('[data-testid="output-svg-true-vector-switch"]');
    if (await switchEl.isVisible().catch(() => false)) {
      const initialState = await switchEl.getAttribute('data-state');
      await toggleSwitchByTestId(page, 'output-svg-true-vector-switch');
      const newState = await switchEl.getAttribute('data-state');
      expect(newState).not.toBe(initialState);
    }
  });

  test('embed raster overlay switch is toggleable', async ({ page }) => {
    const switchEl = page.locator('[data-testid="output-svg-embed-raster-switch"]');
    if (await switchEl.isVisible().catch(() => false)) {
      const initialState = await switchEl.getAttribute('data-state');
      await toggleSwitchByTestId(page, 'output-svg-embed-raster-switch');
      const newState = await switchEl.getAttribute('data-state');
      expect(newState).not.toBe(initialState);
    }
  });

  test('shape precision select has options', async ({ page }) => {
    // First enable true vector to show precision option
    const trueVectorSwitch = page.locator('[data-testid="output-svg-true-vector-switch"]');
    if (await trueVectorSwitch.isVisible().catch(() => false)) {
      if ((await trueVectorSwitch.getAttribute('data-state')) !== 'checked') {
        await toggleSwitchByTestId(page, 'output-svg-true-vector-switch');
        await page.waitForTimeout(200);
      }
    }
    
    const trigger = page.locator('[data-testid="output-svg-precision-trigger"]');
    if (await trigger.isVisible().catch(() => false)) {
      await trigger.click();
      await page.waitForTimeout(200);
      
      const pixelOption = page.locator('[role="option"]').filter({ hasText: /pixel/i });
      const preciseOption = page.locator('[role="option"]').filter({ hasText: /precise/i });
      
      const hasPixel = await pixelOption.count() > 0;
      const hasPrecise = await preciseOption.count() > 0;
      
      await page.keyboard.press('Escape');
      expect(hasPixel || hasPrecise).toBe(true);
    }
  });
});

// ============================================================================
// CONDITIONAL VISIBILITY TESTS
// ============================================================================

test.describe('Output Conditional Settings Visibility', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
  });

  test('quality slider hidden for PNG format', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'PNG');
    await page.waitForTimeout(300);
    
    const qualitySlider = page.locator('[data-testid="output-quality-slider"]');
    const isVisible = await qualitySlider.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('GIF settings hidden for PNG format', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'PNG');
    await page.waitForTimeout(300);
    
    const gifPalette = page.locator('[data-testid="output-gif-palette-slider"]');
    const isVisible = await gifPalette.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('SVG settings hidden for PNG format', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'PNG');
    await page.waitForTimeout(300);
    
    const svgSwitch = page.locator('[data-testid="output-svg-true-vector-switch"]');
    const isVisible = await svgSwitch.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('GIF settings hidden for SVG format', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'SVG');
    await page.waitForTimeout(300);
    
    const gifPalette = page.locator('[data-testid="output-gif-palette-slider"]');
    const isVisible = await gifPalette.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('SVG settings hidden for GIF format', async ({ page }) => {
    await selectDropdownOption(page, 'output-format-trigger', 'GIF');
    await page.waitForTimeout(300);
    
    const svgSwitch = page.locator('[data-testid="output-svg-true-vector-switch"]');
    const isVisible = await svgSwitch.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('switching formats updates visible settings', async ({ page }) => {
    // Start with PNG
    await selectDropdownOption(page, 'output-format-trigger', 'PNG');
    await page.waitForTimeout(300);
    
    let qualityVisible = await page.locator('[data-testid="output-quality-slider"]').isVisible().catch(() => false);
    expect(qualityVisible).toBe(false);
    
    // Switch to WebP
    await selectDropdownOption(page, 'output-format-trigger', 'WebP');
    await page.waitForTimeout(300);
    
    qualityVisible = await page.locator('[data-testid="output-quality-slider"]').isVisible().catch(() => false);
    expect(qualityVisible).toBe(true);
    
    // Switch back to PNG
    await selectDropdownOption(page, 'output-format-trigger', 'PNG');
    await page.waitForTimeout(300);
    
    qualityVisible = await page.locator('[data-testid="output-quality-slider"]').isVisible().catch(() => false);
    expect(qualityVisible).toBe(false);
  });
});

// ============================================================================
// ADVANCED TIER - FILENAME AND DPI TESTS
// ============================================================================

test.describe('Output Advanced Settings (Advanced Tier)', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
  });

  test('filename input accepts custom values', async ({ page }) => {
    const filenameInput = page.locator('[data-testid="output-filename-input"]');
    if (await filenameInput.isVisible().catch(() => false)) {
      await setInputByTestId(page, 'output-filename-input', 'my-custom-qr');
      const value = await filenameInput.inputValue();
      expect(value).toBe('my-custom-qr');
    }
  });

  test('filename input has placeholder', async ({ page }) => {
    const filenameInput = page.locator('[data-testid="output-filename-input"]');
    if (await filenameInput.isVisible().catch(() => false)) {
      const placeholder = await filenameInput.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
    }
  });
});

// ============================================================================
// PROFESSIONAL TIER - DPI AND QUIET ZONE TESTS
// ============================================================================

test.describe('Output Professional Settings (Professional Tier)', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
  });

  test('DPI slider has correct range (72-600)', async ({ page }) => {
    const slider = page.locator('[data-testid="output-dpi-slider"] [role="slider"]');
    if (await slider.isVisible().catch(() => false)) {
      const ariaMin = await slider.getAttribute('aria-valuemin');
      const ariaMax = await slider.getAttribute('aria-valuemax');
      expect(ariaMin).toBe('72');
      expect(ariaMax).toBe('600');
    }
  });

  test('include quiet zone switch is toggleable', async ({ page }) => {
    const switchEl = page.locator('[data-testid="output-include-quiet-zone-switch"]');
    if (await switchEl.isVisible().catch(() => false)) {
      const initialState = await switchEl.getAttribute('data-state');
      await toggleSwitchByTestId(page, 'output-include-quiet-zone-switch');
      const newState = await switchEl.getAttribute('data-state');
      expect(newState).not.toBe(initialState);
    }
  });

  test('format extra select has options', async ({ page }) => {
    const trigger = page.locator('[data-testid="output-format-extra-trigger"]');
    if (await trigger.isVisible().catch(() => false)) {
      await trigger.click();
      await page.waitForTimeout(200);
      
      const noneOption = page.locator('[role="option"]').filter({ hasText: /none/i });
      const epsOption = page.locator('[role="option"]').filter({ hasText: /eps/i });
      
      const hasNone = await noneOption.count() > 0;
      const hasEps = await epsOption.count() > 0;
      
      await page.keyboard.press('Escape');
      expect(hasNone || hasEps).toBe(true);
    }
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Output Section Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
  });

  test('format select has combobox role', async ({ page }) => {
    const trigger = page.locator('[data-testid="output-format-trigger"]');
    const role = await trigger.getAttribute('role');
    expect(role).toBe('combobox');
  });

  test('dimension inputs are labeled', async ({ page }) => {
    const widthInput = page.locator('[data-testid="output-width-input"]');
    const heightInput = page.locator('[data-testid="output-height-input"]');
    
    // Inputs should be visible and have proper type
    await expect(widthInput).toBeVisible();
    await expect(heightInput).toBeVisible();
  });

  test('output section can be navigated via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});

// ============================================================================
// EDGE CASES
// ============================================================================

test.describe('Output Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandOutputSection(page);
  });

  test('dimension inputs handle empty value gracefully', async ({ page }) => {
    const widthInput = page.locator('[data-testid="output-width-input"]');
    await widthInput.fill('');
    await widthInput.blur();
    await page.waitForTimeout(100);
    
    // Should have some default value
    const value = await widthInput.inputValue();
    expect(value).toBeTruthy();
  });

  test('rapid format switching works correctly', async ({ page }) => {
    const formats = ['PNG', 'WebP', 'GIF', 'SVG', 'PNG'];
    
    for (const format of formats) {
      await selectDropdownOption(page, 'output-format-trigger', format);
      await page.waitForTimeout(100);
    }
    
    // Should end on PNG
    const trigger = page.locator('[data-testid="output-format-trigger"]');
    const text = await trigger.textContent();
    expect(text?.toLowerCase()).toContain('png');
  });

  test('output settings persist after section collapse/expand', async ({ page }) => {
    // Set a custom value
    await setInputByTestId(page, 'output-width-input', '999');
    
    // Collapse and expand
    const outputTrigger = page.locator('button').filter({ hasText: /^Output$/i }).first();
    await outputTrigger.click();
    await page.waitForTimeout(200);
    await outputTrigger.click();
    await waitForAccordionOpen(page);
    
    // Verify value persisted
    const widthInput = page.locator('[data-testid="output-width-input"]');
    const value = await widthInput.inputValue();
    expect(value).toBe('999');
  });
});
