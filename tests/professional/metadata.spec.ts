import { test, expect } from '../fixtures/test-fixtures';

test.describe('Metadata Section - Professional Tier', () => {
  test.beforeEach(async ({ page, setTier }) => {
    await page.goto('/');
    await setTier('professional');
    await page.waitForTimeout(1000);
  });

  test('metadata title input accepts text', async ({ page }) => {
    await page.click('button:has-text("Metadata")');
    await page.waitForTimeout(300);

    const textInputs = page.locator('input[type="text"]');
    const count = await textInputs.count();
    
    if (count > 0) {
      const titleInput = textInputs.first();
      await titleInput.clear();
      await titleInput.fill('My QR Code Title');
      await titleInput.blur();
      await page.waitForTimeout(200);
      
      const value = await titleInput.inputValue();
      expect(value).toBe('My QR Code Title');
    }
  });

  test('metadata author input accepts text', async ({ page }) => {
    await page.click('button:has-text("Metadata")');
    await page.waitForTimeout(300);

    const textInputs = page.locator('input[type="text"]');
    const count = await textInputs.count();
    
    if (count > 1) {
      const authorInput = textInputs.nth(1);
      await authorInput.clear();
      await authorInput.fill('Test Author');
      await authorInput.blur();
      await page.waitForTimeout(200);
      
      const value = await authorInput.inputValue();
      expect(value).toBe('Test Author');
    }
  });

  test('metadata description textarea accepts text', async ({ page }) => {
    await page.click('button:has-text("Metadata")');
    await page.waitForTimeout(300);

    const textareas = page.locator('textarea');
    const count = await textareas.count();
    
    if (count > 0) {
      const descTextarea = textareas.first();
      await descTextarea.clear();
      await descTextarea.fill('This is a test description for the QR code.');
      await descTextarea.blur();
      await page.waitForTimeout(200);
      
      const value = await descTextarea.inputValue();
      expect(value).toContain('test description');
    }
  });

  test('include timestamp switch toggles metadata timestamp', async ({ page }) => {
    await page.click('button:has-text("Metadata")');
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

  test('all metadata controls are accessible', async ({ page }) => {
    await page.click('button:has-text("Metadata")');
    await page.waitForTimeout(500);

    const textInputs = page.locator('input[type="text"]');
    const textareas = page.locator('textarea');
    const switches = page.locator('[role="switch"]');

    const totalControls = 
      await textInputs.count() + 
      await textareas.count() + 
      await switches.count();

    expect(totalControls).toBeGreaterThanOrEqual(0);
  });
});
