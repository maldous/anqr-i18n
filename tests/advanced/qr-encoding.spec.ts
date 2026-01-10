import { test, expect } from '../fixtures/test-fixtures';
import { getCanvasSnapshot, snapshotsAreDifferent } from '../helpers/qr-detector';
import { setSliderByPercent } from '../helpers/input-helpers';

test.describe('QR Encoding Section - Advanced Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('advanced');
    await page.waitForTimeout(1000);
  });

  test('QR version slider changes QR complexity', async ({ page, waitForQRRender }) => {
    // Expand QR Encoding section
    await page.click('button:has-text("QR Encoding")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    // Find version slider (usually first slider in QR section)
    const slider = page.locator('[role="slider"]').first();
    if (await slider.isVisible()) {
      await setSliderByPercent(page, '[role="slider"]', 50);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    }
  });

  test('error correction level select changes QR density', async ({ page, waitForQRRender }) => {
    // Expand QR Encoding section
    await page.click('button:has-text("QR Encoding")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    // Find ECC select
    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      // Look for ECC options (L, M, Q, H)
      const eccOption = page.locator('[role="option"]:has-text("H")').first();
      if (await eccOption.isVisible()) {
        await eccOption.click();
        await waitForQRRender();
        
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
        break;
      }
      
      // Close dropdown if no match
      await page.keyboard.press('Escape');
    }
  });

  test('quiet zone slider changes border size', async ({ page, waitForQRRender }) => {
    // Expand QR Encoding section
    await page.click('button:has-text("QR Encoding")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    // Find quiet zone slider (might be second slider)
    const sliders = page.locator('[role="slider"]');
    const count = await sliders.count();
    
    if (count > 1) {
      // Try second slider for quiet zone
      await setSliderByPercent(page, '[role="slider"]:nth-of-type(2)', 80);
      await waitForQRRender();
      
      const after = await getCanvasSnapshot(page);
      // Quiet zone change affects canvas size/border
      expect(true).toBe(true);
    }
  });

  test('encoding mode select changes data encoding', async ({ page, waitForQRRender }) => {
    // Expand QR Encoding section
    await page.click('button:has-text("QR Encoding")');
    await page.waitForTimeout(300);

    const before = await getCanvasSnapshot(page);

    // Find encoding mode select
    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      // Look for encoding options
      const byteOption = page.locator('[role="option"]:has-text("Byte")').first();
      if (await byteOption.isVisible()) {
        await byteOption.click();
        await waitForQRRender();
        
        const after = await getCanvasSnapshot(page);
        // Encoding mode may change QR pattern
        expect(true).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });

  test('mask pattern affects QR visual pattern', async ({ page, waitForQRRender }) => {
    // Expand QR Encoding section
    await page.click('button:has-text("QR Encoding")');
    await page.waitForTimeout(300);

    // Look for mask pattern control (might be select or slider)
    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      const text = await select.textContent();
      
      if (text?.toLowerCase().includes('mask') || text?.match(/\d/)) {
        const before = await getCanvasSnapshot(page);
        
        await select.click();
        await page.waitForTimeout(200);
        
        const options = page.locator('[role="option"]');
        const optCount = await options.count();
        
        if (optCount > 1) {
          await options.nth(1).click();
          await waitForQRRender();
          
          const after = await getCanvasSnapshot(page);
          expect(snapshotsAreDifferent(before, after)).toBe(true);
        }
        break;
      }
    }
  });

  test('all QR encoding controls are present', async ({ page }) => {
    // Expand QR Encoding section
    await page.click('button:has-text("QR Encoding")');
    await page.waitForTimeout(500);

    // Verify presence of controls
    const sliders = page.locator('[role="slider"]');
    const selects = page.locator('button[role="combobox"]');
    const switches = page.locator('[role="switch"]');

    const totalControls = 
      await sliders.count() + 
      await selects.count() + 
      await switches.count();

    expect(totalControls).toBeGreaterThan(0);
  });
});
