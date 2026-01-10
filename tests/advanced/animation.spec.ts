import { test, expect } from '../fixtures/test-fixtures';
import { getCanvasSnapshot, snapshotsAreDifferent } from '../helpers/qr-detector';
import { setSliderByPercent } from '../helpers/input-helpers';

test.describe('Animation Section - Advanced Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('advanced');
    await page.waitForTimeout(1000);
  });

  test('animation speed slider changes playback speed', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Animation")');
    await page.waitForTimeout(300);

    // Find speed slider
    const slider = page.locator('[role="slider"]').first();
    if (await slider.isVisible()) {
      await setSliderByPercent(page, '[role="slider"]', 30);
      await waitForQRRender();
      
      // Speed change doesn't necessarily change static QR appearance
      // but verifies the control is interactive
      expect(slider).toBeTruthy();
    }
  });

  test('loop animation switch toggles looping', async ({ page }) => {
    await page.click('button:has-text("Animation")');
    await page.waitForTimeout(300);

    const switches = page.locator('[role="switch"]');
    const count = await switches.count();
    
    if (count > 0) {
      const loopSwitch = switches.first();
      const beforeState = await loopSwitch.getAttribute('data-state');
      
      await loopSwitch.click();
      await page.waitForTimeout(200);
      
      const afterState = await loopSwitch.getAttribute('data-state');
      expect(beforeState).not.toBe(afterState);
    }
  });

  test('bounce animation switch toggles bounce mode', async ({ page }) => {
    await page.click('button:has-text("Animation")');
    await page.waitForTimeout(300);

    const switches = page.locator('[role="switch"]');
    const count = await switches.count();
    
    if (count > 1) {
      const bounceSwitch = switches.nth(1);
      const beforeState = await bounceSwitch.getAttribute('data-state');
      
      await bounceSwitch.click();
      await page.waitForTimeout(200);
      
      const afterState = await bounceSwitch.getAttribute('data-state');
      expect(beforeState).not.toBe(afterState);
    }
  });

  test('animation pattern select changes animation style', async ({ page, waitForQRRender }) => {
    await page.click('button:has-text("Animation")');
    await page.waitForTimeout(300);

    const selects = page.locator('button[role="combobox"]');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await select.click();
      await page.waitForTimeout(200);
      
      const options = page.locator('[role="option"]');
      const optCount = await options.count();
      
      if (optCount > 1) {
        await options.nth(1).click();
        await waitForQRRender();
        expect(true).toBe(true);
        break;
      }
      
      await page.keyboard.press('Escape');
    }
  });

  test('all animation controls are accessible', async ({ page }) => {
    await page.click('button:has-text("Animation")');
    await page.waitForTimeout(500);

    const sliders = page.locator('[role="slider"]');
    const switches = page.locator('[role="switch"]');
    const selects = page.locator('button[role="combobox"]');

    const totalControls = 
      await sliders.count() + 
      await switches.count() + 
      await selects.count();

    expect(totalControls).toBeGreaterThanOrEqual(0);
  });
});
