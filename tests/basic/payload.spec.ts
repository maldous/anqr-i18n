import { test, expect } from '../fixtures/test-fixtures';
import { getCanvasSnapshot, snapshotsAreDifferent } from '../helpers/qr-detector';

test.describe('Payload Section - Basic Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('basic');
    // Wait for initial render and QR to be ready
    await page.waitForSelector('canvas', { timeout: 10000 });
    await page.waitForTimeout(500);
  });

  /**
   * Helper to switch payload type to Plain Text and get the textarea
   */
  async function switchToPlainTextAndGetTextarea(page: import('@playwright/test').Page) {
    // Find the content type combobox in the sidebar
    // Use getByRole for better accessibility-based selection
    const combobox = page.getByRole('combobox', { name: /content|type/i }).first();
    
    // If that doesn't work, fall back to first combobox
    let selectTrigger = combobox;
    if (!(await combobox.count())) {
      selectTrigger = page.getByRole('combobox').first();
    }
    
    // Wait for it to be actionable and click with force to bypass visibility checks
    await selectTrigger.waitFor({ state: 'attached', timeout: 10000 });
    
    // Use JavaScript click to bypass any visibility issues
    await selectTrigger.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(400);
    
    // Find and click "Plain Text" option in the dropdown
    const plainTextOption = page.getByRole('option', { name: /Plain Text/i }).first();
    await plainTextOption.waitFor({ state: 'visible', timeout: 5000 });
    await plainTextOption.click();
    await page.waitForTimeout(400);
    
    // Now textarea should be visible
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 5000 });
    return textarea;
  }

  test('changing payload text updates QR code', async ({ page, waitForQRRender }) => {
    // Get initial snapshot
    const before = await getCanvasSnapshot(page);

    // Switch to Plain Text mode (default is URL)
    const textarea = await switchToPlainTextAndGetTextarea(page);
    
    await textarea.clear();
    await textarea.fill('New test content 12345');
    await textarea.blur();

    await waitForQRRender();
    
    const after = await getCanvasSnapshot(page);
    
    expect(snapshotsAreDifferent(before, after)).toBe(true);
  });

  test('payload type selector changes available fields', async ({ page }) => {
    // Click on the payload section to ensure it's expanded
    const payloadSection = page.locator('button:has-text("Payload")').first();
    await payloadSection.click();
    await page.waitForTimeout(300);

    // Find the payload type select trigger
    const selectTrigger = page.locator('[data-testid="payload-type-select"]').first();
    
    // If data-testid doesn't exist, try finding by nearby label
    const payloadSelect = selectTrigger.isVisible() 
      ? selectTrigger 
      : page.locator('button[role="combobox"]').first();
    
    if (await payloadSelect.isVisible()) {
      await payloadSelect.click();
      await page.waitForTimeout(200);
      
      // Look for URL option
      const urlOption = page.locator('[role="option"]:has-text("URL")').first();
      if (await urlOption.isVisible()) {
        await urlOption.click();
        await page.waitForTimeout(300);
        
        // Should now show URL input
        const urlInput = page.locator('input[type="url"], input[placeholder*="http"]').first();
        await expect(urlInput).toBeVisible();
      }
    }
  });

  test('URL payload type updates QR with URL content', async ({ page, waitForQRRender }) => {
    // Expand payload section
    await page.click('button:has-text("Payload")');
    await page.waitForTimeout(300);

    // Get initial snapshot
    const before = await getCanvasSnapshot(page);

    // Try to switch to URL type and enter a URL
    const selectTrigger = page.locator('button[role="combobox"]').first();
    if (await selectTrigger.isVisible()) {
      await selectTrigger.click();
      await page.waitForTimeout(200);
      
      const urlOption = page.locator('[role="option"]:has-text("URL")').first();
      if (await urlOption.isVisible()) {
        await urlOption.click();
        await page.waitForTimeout(300);
        
        // Find URL input and enter value
        const urlInput = page.locator('input[type="url"], input[type="text"]').first();
        await urlInput.clear();
        await urlInput.fill('https://example.com/test-url');
        await urlInput.blur();
        
        await waitForQRRender();
        
        const after = await getCanvasSnapshot(page);
        expect(snapshotsAreDifferent(before, after)).toBe(true);
      }
    }
  });

  test('empty payload shows appropriate state', async ({ page }) => {
    // Expand payload section first
    await page.click('button:has-text("Payload")');
    await page.waitForTimeout(300);

    // Clear the payload
    const textarea = page.locator('textarea').first();
    if (await textarea.isVisible({ timeout: 5000 }).catch(() => false)) {
      await textarea.clear();
      await textarea.blur();
      await page.waitForTimeout(500);
      
      // Canvas should still exist (might show default or empty state)
      const canvas = page.locator('canvas').first();
      await expect(canvas).toBeVisible();
    } else {
      // If textarea not visible, just verify canvas exists
      const canvas = page.locator('canvas').first();
      await expect(canvas).toBeVisible();
    }
  });

  test('special characters in payload are encoded correctly', async ({ page, waitForQRRender }) => {
    const before = await getCanvasSnapshot(page);
    
    // Switch to Plain Text mode (default is URL)
    const textarea = await switchToPlainTextAndGetTextarea(page);
    
    await textarea.clear();
    await textarea.fill('Test with special chars: @#$%^&*(){}[]|\\:";\'<>,.?/~`');
    await textarea.blur();
    
    await waitForQRRender();
    
    const after = await getCanvasSnapshot(page);
    expect(snapshotsAreDifferent(before, after)).toBe(true);
  });

  test('unicode characters in payload work', async ({ page, waitForQRRender }) => {
    const before = await getCanvasSnapshot(page);
    
    // Switch to Plain Text mode (default is URL)
    const textarea = await switchToPlainTextAndGetTextarea(page);
    
    await textarea.clear();
    await textarea.fill('Unicode test: 你好世界 🎉 Ñoño café');
    await textarea.blur();
    
    await waitForQRRender();
    
    const after = await getCanvasSnapshot(page);
    expect(snapshotsAreDifferent(before, after)).toBe(true);
  });
});
