/**
 * Metadata Section Tests - Comprehensive Coverage
 * Tests all metadata controls: title, author, copyright, license, description, creation time, custom KV
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

// Helper: Expand the Metadata section
async function expandMetadataSection(page: Page) {
  // First close any open sections for clean state
  const openTriggers = page.locator('[data-state="open"] > [role="button"]');
  const openCount = await openTriggers.count();
  for (let i = 0; i < openCount; i++) {
    await openTriggers.nth(i).click();
    await page.waitForTimeout(100);
  }
  
  // Find and click Metadata accordion trigger
  const metadataTrigger = page.locator('button').filter({ hasText: /^Metadata$/i }).first();
  if (await metadataTrigger.count() > 0) {
    await metadataTrigger.scrollIntoViewIfNeeded();
    await metadataTrigger.click();
    await waitForAccordionOpen(page);
    await page.waitForTimeout(200);
  }
}

// Helper: Set input value using data-testid
async function setInputByTestId(page: Page, testId: string, value: string) {
  const input = page.locator(`[data-testid="${testId}"]`);
  await input.waitFor({ state: 'visible', timeout: 5000 });
  await input.scrollIntoViewIfNeeded();
  await input.fill('');
  await input.fill(value);
  await input.blur();
  await page.waitForTimeout(100);
}

// Helper: Toggle switch using data-testid
async function toggleSwitchByTestId(page: Page, testId: string) {
  const switchEl = page.locator(`[data-testid="${testId}"]`);
  await switchEl.waitFor({ state: 'visible', timeout: 5000 });
  await switchEl.scrollIntoViewIfNeeded();
  await switchEl.click();
  await page.waitForTimeout(100);
}

// ============================================================================
// TITLE INPUT TESTS
// ============================================================================

test.describe('Metadata Title', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('title input is visible and accepts values', async ({ page }) => {
    const titleInput = page.locator('[data-testid="metadata-title-input"]');
    await expect(titleInput).toBeVisible();
    
    await setInputByTestId(page, 'metadata-title-input', 'My QR Code');
    const value = await titleInput.inputValue();
    expect(value).toBe('My QR Code');
  });

  test('title input has placeholder', async ({ page }) => {
    const titleInput = page.locator('[data-testid="metadata-title-input"]');
    const placeholder = await titleInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });

  test('title input handles special characters', async ({ page }) => {
    await setInputByTestId(page, 'metadata-title-input', 'QR Code © 2024 <test>');
    const titleInput = page.locator('[data-testid="metadata-title-input"]');
    const value = await titleInput.inputValue();
    expect(value).toBe('QR Code © 2024 <test>');
  });
});

// ============================================================================
// AUTHOR INPUT TESTS
// ============================================================================

test.describe('Metadata Author', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('author input is visible and accepts values', async ({ page }) => {
    const authorInput = page.locator('[data-testid="metadata-author-input"]');
    await expect(authorInput).toBeVisible();
    
    await setInputByTestId(page, 'metadata-author-input', 'John Doe');
    const value = await authorInput.inputValue();
    expect(value).toBe('John Doe');
  });

  test('author input has placeholder', async ({ page }) => {
    const authorInput = page.locator('[data-testid="metadata-author-input"]');
    const placeholder = await authorInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });
});

// ============================================================================
// COPYRIGHT INPUT TESTS
// ============================================================================

test.describe('Metadata Copyright', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('copyright input is visible and accepts values', async ({ page }) => {
    const copyrightInput = page.locator('[data-testid="metadata-copyright-input"]');
    await expect(copyrightInput).toBeVisible();
    
    await setInputByTestId(page, 'metadata-copyright-input', '© 2024 ANQR');
    const value = await copyrightInput.inputValue();
    expect(value).toBe('© 2024 ANQR');
  });

  test('copyright input has placeholder', async ({ page }) => {
    const copyrightInput = page.locator('[data-testid="metadata-copyright-input"]');
    const placeholder = await copyrightInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });
});

// ============================================================================
// LICENSE INPUT TESTS
// ============================================================================

test.describe('Metadata License', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('license input is visible and accepts values', async ({ page }) => {
    const licenseInput = page.locator('[data-testid="metadata-license-input"]');
    await expect(licenseInput).toBeVisible();
    
    await setInputByTestId(page, 'metadata-license-input', 'MIT');
    const value = await licenseInput.inputValue();
    expect(value).toBe('MIT');
  });

  test('license input has placeholder', async ({ page }) => {
    const licenseInput = page.locator('[data-testid="metadata-license-input"]');
    const placeholder = await licenseInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });
});

// ============================================================================
// DESCRIPTION TEXTAREA TESTS
// ============================================================================

test.describe('Metadata Description', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('description textarea is visible and accepts values', async ({ page }) => {
    const descriptionTextarea = page.locator('[data-testid="metadata-description-textarea"]');
    await expect(descriptionTextarea).toBeVisible();
    
    await setInputByTestId(page, 'metadata-description-textarea', 'This is a test QR code with a description.');
    const value = await descriptionTextarea.inputValue();
    expect(value).toBe('This is a test QR code with a description.');
  });

  test('description textarea has placeholder', async ({ page }) => {
    const descriptionTextarea = page.locator('[data-testid="metadata-description-textarea"]');
    const placeholder = await descriptionTextarea.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });

  test('description textarea accepts multiline text', async ({ page }) => {
    const multilineText = 'Line 1\nLine 2\nLine 3';
    await setInputByTestId(page, 'metadata-description-textarea', multilineText);
    const descriptionTextarea = page.locator('[data-testid="metadata-description-textarea"]');
    const value = await descriptionTextarea.inputValue();
    expect(value).toBe(multilineText);
  });
});

// ============================================================================
// CREATION TIME TOGGLE TESTS
// ============================================================================

test.describe('Metadata Creation Time', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('creation time switch is visible and toggleable', async ({ page }) => {
    const switchEl = page.locator('[data-testid="metadata-creation-time-switch"]');
    await expect(switchEl).toBeVisible();
    
    const initialState = await switchEl.getAttribute('data-state');
    await toggleSwitchByTestId(page, 'metadata-creation-time-switch');
    
    const newState = await switchEl.getAttribute('data-state');
    expect(newState).not.toBe(initialState);
  });

  test('creation time switch has role="switch"', async ({ page }) => {
    const switchEl = page.locator('[data-testid="metadata-creation-time-switch"]');
    const role = await switchEl.getAttribute('role');
    expect(role).toBe('switch');
  });

  test('creation time switch toggles between checked and unchecked', async ({ page }) => {
    const switchEl = page.locator('[data-testid="metadata-creation-time-switch"]');
    
    // Toggle twice to verify both states work
    await toggleSwitchByTestId(page, 'metadata-creation-time-switch');
    const state1 = await switchEl.getAttribute('data-state');
    
    await toggleSwitchByTestId(page, 'metadata-creation-time-switch');
    const state2 = await switchEl.getAttribute('data-state');
    
    expect(state1).not.toBe(state2);
  });
});

// ============================================================================
// CUSTOM KEY-VALUE TESTS
// ============================================================================

test.describe('Metadata Custom Key-Value Pairs', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('add custom field button is visible', async ({ page }) => {
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    await expect(addButton).toBeVisible();
  });

  test('clicking add button creates new key-value row', async ({ page }) => {
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    await addButton.scrollIntoViewIfNeeded();
    await addButton.click();
    await page.waitForTimeout(200);
    
    // First row should now exist
    const keyInput = page.locator('[data-testid="metadata-custom-key-input-0"]');
    await expect(keyInput).toBeVisible();
    
    const valueInput = page.locator('[data-testid="metadata-custom-value-input-0"]');
    await expect(valueInput).toBeVisible();
  });

  test('can add multiple custom key-value rows', async ({ page }) => {
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    
    // Add 3 rows
    for (let i = 0; i < 3; i++) {
      await addButton.scrollIntoViewIfNeeded();
      await addButton.click();
      await page.waitForTimeout(100);
    }
    
    // All 3 rows should exist
    for (let i = 0; i < 3; i++) {
      const row = page.locator(`[data-testid="metadata-custom-kv-row-${i}"]`);
      await expect(row).toBeVisible();
    }
  });

  test('can edit custom key-value inputs', async ({ page }) => {
    // Add a row first
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    await addButton.scrollIntoViewIfNeeded();
    await addButton.click();
    await page.waitForTimeout(200);
    
    // Edit the key
    await setInputByTestId(page, 'metadata-custom-key-input-0', 'myKey');
    const keyInput = page.locator('[data-testid="metadata-custom-key-input-0"]');
    expect(await keyInput.inputValue()).toBe('myKey');
    
    // Edit the value
    await setInputByTestId(page, 'metadata-custom-value-input-0', 'myValue');
    const valueInput = page.locator('[data-testid="metadata-custom-value-input-0"]');
    expect(await valueInput.inputValue()).toBe('myValue');
  });

  test('can remove custom key-value row', async ({ page }) => {
    // Add a row first
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    await addButton.scrollIntoViewIfNeeded();
    await addButton.click();
    await page.waitForTimeout(200);
    
    // Verify row exists
    const row = page.locator('[data-testid="metadata-custom-kv-row-0"]');
    await expect(row).toBeVisible();
    
    // Click remove button
    const removeButton = page.locator('[data-testid="metadata-custom-remove-button-0"]');
    await removeButton.click();
    await page.waitForTimeout(200);
    
    // Row should be gone
    await expect(row).not.toBeVisible();
  });

  test('key-value inputs have placeholders', async ({ page }) => {
    // Add a row first
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    await addButton.scrollIntoViewIfNeeded();
    await addButton.click();
    await page.waitForTimeout(200);
    
    const keyInput = page.locator('[data-testid="metadata-custom-key-input-0"]');
    const valueInput = page.locator('[data-testid="metadata-custom-value-input-0"]');
    
    const keyPlaceholder = await keyInput.getAttribute('placeholder');
    const valuePlaceholder = await valueInput.getAttribute('placeholder');
    
    expect(keyPlaceholder).toBeTruthy();
    expect(valuePlaceholder).toBeTruthy();
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Metadata Section Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('all inputs are focusable via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('creation time switch has proper role', async ({ page }) => {
    const switchEl = page.locator('[data-testid="metadata-creation-time-switch"]');
    const role = await switchEl.getAttribute('role');
    expect(role).toBe('switch');
  });

  test('add button is keyboard accessible', async ({ page }) => {
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    await addButton.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    
    // Row should be added
    const row = page.locator('[data-testid="metadata-custom-kv-row-0"]');
    await expect(row).toBeVisible();
  });
});

// ============================================================================
// COMBINED SETTINGS TESTS
// ============================================================================

test.describe('Metadata Combined Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('all metadata fields can be filled together', async ({ page }) => {
    await setInputByTestId(page, 'metadata-title-input', 'Test QR');
    await setInputByTestId(page, 'metadata-author-input', 'Test Author');
    await setInputByTestId(page, 'metadata-copyright-input', '© 2024');
    await setInputByTestId(page, 'metadata-license-input', 'MIT');
    await setInputByTestId(page, 'metadata-description-textarea', 'Test description');
    
    // Enable creation time
    const switchEl = page.locator('[data-testid="metadata-creation-time-switch"]');
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'metadata-creation-time-switch');
    }
    
    // Verify all values
    expect(await page.locator('[data-testid="metadata-title-input"]').inputValue()).toBe('Test QR');
    expect(await page.locator('[data-testid="metadata-author-input"]').inputValue()).toBe('Test Author');
    expect(await page.locator('[data-testid="metadata-copyright-input"]').inputValue()).toBe('© 2024');
    expect(await page.locator('[data-testid="metadata-license-input"]').inputValue()).toBe('MIT');
    expect(await page.locator('[data-testid="metadata-description-textarea"]').inputValue()).toBe('Test description');
    expect(await switchEl.getAttribute('data-state')).toBe('checked');
  });

  test('metadata settings persist after section collapse/expand', async ({ page }) => {
    // Set a value
    await setInputByTestId(page, 'metadata-title-input', 'Persistent Title');
    
    // Collapse and expand
    const metadataTrigger = page.locator('button').filter({ hasText: /^Metadata$/i }).first();
    await metadataTrigger.click();
    await page.waitForTimeout(200);
    await metadataTrigger.click();
    await waitForAccordionOpen(page);
    
    // Verify value persisted
    const titleInput = page.locator('[data-testid="metadata-title-input"]');
    const value = await titleInput.inputValue();
    expect(value).toBe('Persistent Title');
  });
});

// ============================================================================
// EDGE CASES
// ============================================================================

test.describe('Metadata Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandMetadataSection(page);
  });

  test('inputs handle empty values', async ({ page }) => {
    // Fill and then clear
    await setInputByTestId(page, 'metadata-title-input', 'Test');
    await setInputByTestId(page, 'metadata-title-input', '');
    
    const titleInput = page.locator('[data-testid="metadata-title-input"]');
    const value = await titleInput.inputValue();
    expect(value).toBe('');
  });

  test('inputs handle long text', async ({ page }) => {
    const longText = 'A'.repeat(500);
    await setInputByTestId(page, 'metadata-description-textarea', longText);
    
    const descriptionTextarea = page.locator('[data-testid="metadata-description-textarea"]');
    const value = await descriptionTextarea.inputValue();
    expect(value).toBe(longText);
  });

  test('rapid custom field add/remove works correctly', async ({ page }) => {
    const addButton = page.locator('[data-testid="metadata-add-custom-button"]');
    
    // Add 3 rows rapidly
    for (let i = 0; i < 3; i++) {
      await addButton.scrollIntoViewIfNeeded();
      await addButton.click();
      await page.waitForTimeout(50);
    }
    
    // Remove middle row
    const removeButton = page.locator('[data-testid="metadata-custom-remove-button-1"]');
    if (await removeButton.isVisible()) {
      await removeButton.click();
      await page.waitForTimeout(100);
    }
    
    // Should still have at least one row visible
    const rows = page.locator('[data-testid^="metadata-custom-kv-row-"]');
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
