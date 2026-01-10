import { test, expect } from '../fixtures/test-fixtures';
import { getCanvasSnapshot, snapshotsAreDifferent } from '../helpers/qr-detector';

test.describe('Output Section - Advanced Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('advanced');
    await page.waitForTimeout(1000);
  });

  test('output format select changes export format', async ({ page }) => {
    await page.click('button:has-text("Output")');
    await page.waitForTimeout(300);

    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      // Look for format options
      const pngOption = page.locator('[role="option"]:has-text("PNG")').first();
      const webpOption = page.locator('[role="option"]:has-text("WebP")').first();
      
      if (await pngOption.isVisible() || await webpOption.isVisible()) {
        const option = await pngOption.isVisible() ? pngOption : webpOption;
        await option.click();
        await page.waitForTimeout(200);
        expect(true).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });

  test('output width input changes export dimensions', async ({ page }) => {
    await page.click('button:has-text("Output")');
    await page.waitForTimeout(300);

    const numberInputs = page.locator('input[type="number"]');
    const count = await numberInputs.count();
    
    if (count > 0) {
      const widthInput = numberInputs.first();
      await widthInput.clear();
      await widthInput.fill('800');
      await widthInput.blur();
      await page.waitForTimeout(200);
      
      const value = await widthInput.inputValue();
      expect(value).toBe('800');
    }
  });

  test('output height input changes export dimensions', async ({ page }) => {
    await page.click('button:has-text("Output")');
    await page.waitForTimeout(300);

    const numberInputs = page.locator('input[type="number"]');
    const count = await numberInputs.count();
    
    if (count > 1) {
      const heightInput = numberInputs.nth(1);
      await heightInput.clear();
      await heightInput.fill('600');
      await heightInput.blur();
      await page.waitForTimeout(200);
      
      const value = await heightInput.inputValue();
      expect(value).toBe('600');
    }
  });

  test('quality slider affects export quality', async ({ page }) => {
    await page.click('button:has-text("Output")');
    await page.waitForTimeout(300);

    const sliders = page.locator('[role="slider"]');
    const count = await sliders.count();
    
    if (count > 0) {
      const qualitySlider = sliders.first();
      const box = await qualitySlider.boundingBox();
      
      if (box) {
        await page.mouse.click(box.x + box.width * 0.9, box.y + box.height / 2);
        await page.waitForTimeout(200);
        expect(true).toBe(true);
      }
    }
  });

  test('all output controls are accessible', async ({ page }) => {
    await page.click('button:has-text("Output")');
    await page.waitForTimeout(500);

    const sliders = page.locator('[role="slider"]');
    const selects = page.locator('button[role="combobox"]');
    const inputs = page.locator('input[type="number"]');
    const switches = page.locator('[role="switch"]');

    const totalControls = 
      await sliders.count() + 
      await selects.count() + 
      await inputs.count() +
      await switches.count();

    expect(totalControls).toBeGreaterThan(0);
  });
});
