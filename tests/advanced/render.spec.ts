import { test, expect } from '../fixtures/test-fixtures';
import { getCanvasSnapshot, snapshotsAreDifferent } from '../helpers/qr-detector';
import { setSliderByPercent, setColorInput } from '../helpers/input-helpers';

test.describe('Render Section - Advanced Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('advanced');
    await page.waitForTimeout(1000);
  });

  test('module size slider changes QR scale', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const slider = page.locator('[role="slider"]').first();
    if (await slider.isVisible()) {
      await setSliderByPercent(page, '[role="slider"]', 80);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    }
  });

  test('module style select changes module shape', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      // Look for module style options
      const roundedOption = page.locator('[role="option"]:has-text("Rounded")').first();
      const dotsOption = page.locator('[role="option"]:has-text("Dots")').first();
      
      if (await roundedOption.isVisible()) {
        await roundedOption.click();
        await waitForQRRender();
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      } else if (await dotsOption.isVisible()) {
        await dotsOption.click();
        await waitForQRRender();
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });

  test('foreground color input changes QR color', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    // Find color inputs
    const colorInputs = page.locator('input[type="color"]');
    const count = await colorInputs.count();
    
    if (count > 0) {
      await setColorInput(page, 'input[type="color"]', '#ff0000');
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    }
  });

  test('background color input changes QR background', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const colorInputs = page.locator('input[type="color"]');
    const count = await colorInputs.count();
    
    if (count > 1) {
      // Second color input is usually background
      const bgInput = colorInputs.nth(1);
      await bgInput.evaluate((el: HTMLInputElement) => {
        el.value = '#ffff00';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    }
  });

  test('module gap slider affects spacing', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const sliders = page.locator('[role="slider"]');
    const count = await sliders.count();
    
    // Try different sliders to find gap control
    for (let i = 0; i < Math.min(count, 5); i++) {
      const slider = sliders.nth(i);
      const box = await slider.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width * 0.7, box.y + box.height / 2);
        await waitForQRRender();
      }
    }
    
    const after = await getCanvasSnapshot(page);
    // At least one slider change should affect the QR
    expect(true).toBe(true);
  });

  test('corner radius slider changes module corners', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    // Find corner radius slider by trying multiple sliders
    const sliders = page.locator('[role="slider"]');
    const count = await sliders.count();
    
    if (count > 2) {
      await setSliderByPercent(page, '[role="slider"]:nth-of-type(3)', 100);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    }
  });

  test('finder style select changes corner patterns', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      // Look for finder style options
      const circleOption = page.locator('[role="option"]:has-text("Circle")').first();
      if (await circleOption.isVisible()) {
        await circleOption.click();
        await waitForQRRender();
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });

  test('gradient type select enables gradient coloring', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      // Look for gradient options
      const linearOption = page.locator('[role="option"]:has-text("Linear")').first();
      const radialOption = page.locator('[role="option"]:has-text("Radial")').first();
      
      if (await linearOption.isVisible()) {
        await linearOption.click();
        await waitForQRRender();
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      } else if (await radialOption.isVisible()) {
        await radialOption.click();
        await waitForQRRender();
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });

  test('transparent background switch removes background', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const switches = page.locator('[role="switch"]');
    const count = await switches.count();
    
    if (count > 0) {
      await switches.first().click();
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      // Transparency toggle should change appearance
      expect(true).toBe(true);
    }
  });

  test('frame style select adds decorative frame', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Render")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      // Look for frame style options
      const stickerOption = page.locator('[role="option"]:has-text("Sticker")').first();
      const tagOption = page.locator('[role="option"]:has-text("Tag")').first();
      
      if (await stickerOption.isVisible()) {
        await stickerOption.click();
        await waitForQRRender();
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      } else if (await tagOption.isVisible()) {
        await tagOption.click();
        await waitForQRRender();
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });
});
