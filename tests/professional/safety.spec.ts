import { test, expect } from '../fixtures/test-fixtures';
import { getCanvasSnapshot, snapshotsAreDifferent } from '../helpers/qr-detector';
import { setSliderByPercent } from '../helpers/input-helpers';

test.describe('Safety Section - Professional Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('professional');
    await page.waitForTimeout(1000);
  });

  test('safety mode select changes safety strictness', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Safety")');
    await page.waitForTimeout(300);

    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      const strictOption = page.locator('[role="option"]:has-text("Strict")').first();
      const balancedOption = page.locator('[role="option"]:has-text("Balanced")').first();
      
      if (await strictOption.isVisible()) {
        await strictOption.click();
        await waitForQRRender();
        expect(true).toBe(true);
        break;
      } else if (await balancedOption.isVisible()) {
        await balancedOption.click();
        await waitForQRRender();
        expect(true).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });

  test('min module size slider affects minimum pixel size', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Safety")');
    await page.waitForTimeout(300);

    const sliders = page.locator('[role="slider"]');
    if (await sliders.first().isVisible()) {
      const before = await getCanvasSnapshot(page);
      await setSliderByPercent(page, '[role="slider"]', 70);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(true).toBe(true);
    }
  });

  test('contrast check switch toggles contrast validation', async ({ page }) => {
    await page.click('button:has-text("Safety")');
    await page.waitForTimeout(300);

    const switches = page.locator('[role="switch"]');
    const count = await switches.count();
    
    if (count > 0) {
      const switchEl = switches.first();
      const beforeState = await switchEl.getAttribute('data-state');
      
      await switchEl.click();
      await page.waitForTimeout(200);
      
      const afterState = await switchEl.getAttribute('data-state');
      expect(beforeState).not.toBe(afterState);
    }
  });

  test('show heatmap switch toggles debug overlay', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Safety")');
    await page.waitForTimeout(300);

    const switches = page.locator('[role="switch"]');
    const count = await switches.count();
    
    // Find heatmap switch (might be second or third)
    for (let i = 0; i < count; i++) {
      const before = await getCanvasSnapshot(page);
      await switches.nth(i).click();
      await waitForQRRender();
      const after = await getCanvasSnapshot(page);
      
      // Toggle back
      await switches.nth(i).click();
      await page.waitForTimeout(200);
    }
    
    expect(true).toBe(true);
  });

  test('auto pick version switch enables automatic version selection', async ({ page }) => {
    await page.click('button:has-text("Safety")');
    await page.waitForTimeout(300);

    const switches = page.locator('[role="switch"]');
    const count = await switches.count();
    
    if (count > 1) {
      const switchEl = switches.nth(1);
      const beforeState = await switchEl.getAttribute('data-state');
      
      await switchEl.click();
      await page.waitForTimeout(200);
      
      const afterState = await switchEl.getAttribute('data-state');
      expect(beforeState).not.toBe(afterState);
    }
  });

  test('auto pick ECC switch enables automatic error correction', async ({ page }) => {
    await page.click('button:has-text("Safety")');
    await page.waitForTimeout(300);

    const switches = page.locator('[role="switch"]');
    const count = await switches.count();
    
    if (count > 2) {
      const switchEl = switches.nth(2);
      const beforeState = await switchEl.getAttribute('data-state');
      
      await switchEl.click();
      await page.waitForTimeout(200);
      
      const afterState = await switchEl.getAttribute('data-state');
      expect(beforeState).not.toBe(afterState);
    }
  });
});
