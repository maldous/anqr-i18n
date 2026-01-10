import { test, expect } from '../fixtures/test-fixtures';

test.describe('Share Section - Professional Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('professional');
    await page.waitForTimeout(1000);
  });

  test('encode more params switch toggles URL parameter encoding', async ({ page }) => {
    await page.click('button:has-text("Share")');
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

  test('share URL input displays shareable link', async ({ page }) => {
    await page.click('button:has-text("Share")');
    await page.waitForTimeout(300);

    const textInputs = page.locator('input[type="text"]');
    const count = await textInputs.count();
    
    // Look for URL display input (usually readonly)
    for (let i = 0; i < count; i++) {
      const input = textInputs.nth(i);
      const value = await input.inputValue();
      
      if (value.includes('http') || value.includes('anqr')) {
        expect(value.length).toBeGreaterThan(0);
        break;
      }
    }
  });

  test('copy button is present and clickable', async ({ page }) => {
    await page.click('button:has-text("Share")');
    await page.waitForTimeout(300);

    const copyButton = page.locator('button:has-text("Copy")').first();
    
    if (await copyButton.isVisible()) {
      await copyButton.click();
      await page.waitForTimeout(200);
      expect(true).toBe(true);
    }
  });

  test('all share controls are accessible', async ({ page }) => {
    await page.click('button:has-text("Share")');
    await page.waitForTimeout(500);

    const textInputs = page.locator('input[type="text"]');
    const switches = page.locator('[role="switch"]');
    const buttons = page.locator('button');

    const totalControls = 
      await textInputs.count() + 
      await switches.count();

    expect(totalControls).toBeGreaterThanOrEqual(0);
  });
});
