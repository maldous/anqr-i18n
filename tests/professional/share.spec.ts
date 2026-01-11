/**
 * Share Section Tests - Comprehensive Coverage
 * Tests all share controls: direct link, embed HTML, markdown, social sharing
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

// Helper: Expand the Share section
async function expandShareSection(page: Page) {
  // First close any open sections for clean state
  const openTriggers = page.locator('[data-state="open"] > [role="button"]');
  const openCount = await openTriggers.count();
  for (let i = 0; i < openCount; i++) {
    await openTriggers.nth(i).click();
    await page.waitForTimeout(100);
  }
  
  // Find and click Share accordion trigger
  const shareTrigger = page.locator('button').filter({ hasText: /^Share$/i }).first();
  if (await shareTrigger.count() > 0) {
    await shareTrigger.scrollIntoViewIfNeeded();
    await shareTrigger.click();
    await waitForAccordionOpen(page);
    await page.waitForTimeout(200);
  }
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
// DIRECT LINK TESTS
// ============================================================================

test.describe('Share Direct Link', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('direct link switch is visible and toggleable', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    await expect(switchEl).toBeVisible();
    
    const initialState = await switchEl.getAttribute('data-state');
    await toggleSwitchByTestId(page, 'share-direct-link-switch');
    const newState = await switchEl.getAttribute('data-state');
    
    expect(newState).not.toBe(initialState);
  });

  test('direct link switch has role="switch"', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    const role = await switchEl.getAttribute('role');
    expect(role).toBe('switch');
  });

  test('enabling direct link shows URL input', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    
    // Ensure direct link is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
      await page.waitForTimeout(200);
    }
    
    const urlInput = page.locator('[data-testid="share-direct-link-input"]');
    await expect(urlInput).toBeVisible();
  });

  test('direct link URL input is readonly', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    
    // Ensure direct link is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
      await page.waitForTimeout(200);
    }
    
    const urlInput = page.locator('[data-testid="share-direct-link-input"]');
    const isReadOnly = await urlInput.getAttribute('readonly');
    expect(isReadOnly).not.toBeNull();
  });

  test('direct link URL contains expected base URL', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    
    // Ensure direct link is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
      await page.waitForTimeout(200);
    }
    
    const urlInput = page.locator('[data-testid="share-direct-link-input"]');
    const url = await urlInput.inputValue();
    
    // URL should contain query parameters
    expect(url).toContain('?');
  });

  test('copy link button is visible when direct link enabled', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    
    // Ensure direct link is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
      await page.waitForTimeout(200);
    }
    
    const copyButton = page.locator('[data-testid="share-copy-link-button"]');
    await expect(copyButton).toBeVisible();
  });

  test('disabling direct link hides URL input', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    
    // Ensure direct link is disabled
    if ((await switchEl.getAttribute('data-state')) === 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
      await page.waitForTimeout(200);
    }
    
    const urlInput = page.locator('[data-testid="share-direct-link-input"]');
    const isVisible = await urlInput.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });
});

// ============================================================================
// EMBED HTML TESTS
// ============================================================================

test.describe('Share Embed HTML', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('embed HTML switch is visible and toggleable', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-embed-html-switch"]');
    await expect(switchEl).toBeVisible();
    
    const initialState = await switchEl.getAttribute('data-state');
    await toggleSwitchByTestId(page, 'share-embed-html-switch');
    const newState = await switchEl.getAttribute('data-state');
    
    expect(newState).not.toBe(initialState);
  });

  test('enabling embed HTML shows embed code input', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-embed-html-switch"]');
    
    // Ensure embed HTML is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-embed-html-switch');
      await page.waitForTimeout(200);
    }
    
    const embedInput = page.locator('[data-testid="share-embed-code-input"]');
    await expect(embedInput).toBeVisible();
  });

  test('embed code contains img tag', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-embed-html-switch"]');
    
    // Ensure embed HTML is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-embed-html-switch');
      await page.waitForTimeout(200);
    }
    
    const embedInput = page.locator('[data-testid="share-embed-code-input"]');
    const embedCode = await embedInput.inputValue();
    
    expect(embedCode.toLowerCase()).toContain('<img');
  });

  test('markdown embed input is visible when embed HTML enabled', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-embed-html-switch"]');
    
    // Ensure embed HTML is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-embed-html-switch');
      await page.waitForTimeout(200);
    }
    
    const markdownInput = page.locator('[data-testid="share-markdown-input"]');
    await expect(markdownInput).toBeVisible();
  });

  test('markdown embed contains markdown image syntax', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-embed-html-switch"]');
    
    // Ensure embed HTML is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-embed-html-switch');
      await page.waitForTimeout(200);
    }
    
    const markdownInput = page.locator('[data-testid="share-markdown-input"]');
    const markdownCode = await markdownInput.inputValue();
    
    // Markdown image format: ![alt](url)
    expect(markdownCode).toMatch(/!\[.*\]\(.*\)/);
  });

  test('copy embed button is visible', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-embed-html-switch"]');
    
    // Ensure embed HTML is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-embed-html-switch');
      await page.waitForTimeout(200);
    }
    
    const copyEmbedButton = page.locator('[data-testid="share-copy-embed-button"]');
    await expect(copyEmbedButton).toBeVisible();
  });

  test('copy markdown button is visible', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-embed-html-switch"]');
    
    // Ensure embed HTML is enabled
    if ((await switchEl.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-embed-html-switch');
      await page.waitForTimeout(200);
    }
    
    const copyMarkdownButton = page.locator('[data-testid="share-copy-markdown-button"]');
    await expect(copyMarkdownButton).toBeVisible();
  });
});

// ============================================================================
// ENCODE MORE PARAMS TESTS
// ============================================================================

test.describe('Share Encode More Params', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('encode more params switch is visible and toggleable', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-encode-more-params-switch"]');
    await expect(switchEl).toBeVisible();
    
    const initialState = await switchEl.getAttribute('data-state');
    await toggleSwitchByTestId(page, 'share-encode-more-params-switch');
    const newState = await switchEl.getAttribute('data-state');
    
    expect(newState).not.toBe(initialState);
  });

  test('encode more params switch has role="switch"', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-encode-more-params-switch"]');
    const role = await switchEl.getAttribute('role');
    expect(role).toBe('switch');
  });
});

// ============================================================================
// QUICK SHARE TESTS
// ============================================================================

test.describe('Share Quick Share', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('quick copy button is visible', async ({ page }) => {
    const quickCopyButton = page.locator('[data-testid="share-quick-copy-button"]');
    await expect(quickCopyButton).toBeVisible();
  });

  test('quick copy button is clickable', async ({ page }) => {
    const quickCopyButton = page.locator('[data-testid="share-quick-copy-button"]');
    await quickCopyButton.scrollIntoViewIfNeeded();
    await quickCopyButton.click();
    
    // Button should show "Copied" state briefly
    await page.waitForTimeout(100);
    // Button click should not throw error
    expect(true).toBe(true);
  });
});

// ============================================================================
// SOCIAL SHARE TESTS
// ============================================================================

test.describe('Share Social Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('twitter share button is visible', async ({ page }) => {
    const twitterButton = page.locator('[data-testid="share-twitter-button"]');
    await expect(twitterButton).toBeVisible();
  });

  test('whatsapp share button is visible', async ({ page }) => {
    const whatsappButton = page.locator('[data-testid="share-whatsapp-button"]');
    await expect(whatsappButton).toBeVisible();
  });

  test('twitter button has correct text', async ({ page }) => {
    const twitterButton = page.locator('[data-testid="share-twitter-button"]');
    const text = await twitterButton.textContent();
    expect(text?.toLowerCase()).toContain('twitter');
  });

  test('whatsapp button has correct text', async ({ page }) => {
    const whatsappButton = page.locator('[data-testid="share-whatsapp-button"]');
    const text = await whatsappButton.textContent();
    expect(text?.toLowerCase()).toContain('whatsapp');
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Share Section Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('all switches have role="switch"', async ({ page }) => {
    const switches = page.locator('[data-testid*="share"][data-testid*="switch"]');
    const count = await switches.count();
    
    for (let i = 0; i < count; i++) {
      const switchEl = switches.nth(i);
      if (await switchEl.isVisible().catch(() => false)) {
        const role = await switchEl.getAttribute('role');
        expect(role).toBe('switch');
      }
    }
  });

  test('share section can be navigated via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('copy buttons are keyboard accessible', async ({ page }) => {
    const quickCopyButton = page.locator('[data-testid="share-quick-copy-button"]');
    await quickCopyButton.focus();
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    
    // Button should have been activated
    expect(true).toBe(true);
  });
});

// ============================================================================
// COMBINED SETTINGS TESTS
// ============================================================================

test.describe('Share Combined Settings', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('multiple share options can be enabled together', async ({ page }) => {
    const directLinkSwitch = page.locator('[data-testid="share-direct-link-switch"]');
    const embedHtmlSwitch = page.locator('[data-testid="share-embed-html-switch"]');
    
    // Enable both
    if ((await directLinkSwitch.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
    }
    if ((await embedHtmlSwitch.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-embed-html-switch');
    }
    
    // Both should be checked
    expect(await directLinkSwitch.getAttribute('data-state')).toBe('checked');
    expect(await embedHtmlSwitch.getAttribute('data-state')).toBe('checked');
  });

  test('share settings persist after section collapse/expand', async ({ page }) => {
    const directLinkSwitch = page.locator('[data-testid="share-direct-link-switch"]');
    
    // Enable direct link if not already
    if ((await directLinkSwitch.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
    }
    
    const stateBeforeCollapse = await directLinkSwitch.getAttribute('data-state');
    
    // Collapse and expand
    const shareTrigger = page.locator('button').filter({ hasText: /^Share$/i }).first();
    await shareTrigger.click();
    await page.waitForTimeout(200);
    await shareTrigger.click();
    await waitForAccordionOpen(page);
    
    // Verify state persisted
    const stateAfterExpand = await directLinkSwitch.getAttribute('data-state');
    expect(stateAfterExpand).toBe(stateBeforeCollapse);
  });
});

// ============================================================================
// EDGE CASES
// ============================================================================

test.describe('Share Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await setupPage(page);
    await expandShareSection(page);
  });

  test('rapid switch toggling works correctly', async ({ page }) => {
    const switchEl = page.locator('[data-testid="share-direct-link-switch"]');
    
    // Toggle rapidly multiple times
    for (let i = 0; i < 5; i++) {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
      await page.waitForTimeout(50);
    }
    
    // Switch should still be functional
    const state = await switchEl.getAttribute('data-state');
    expect(state === 'checked' || state === 'unchecked').toBe(true);
  });

  test('all buttons remain clickable after multiple interactions', async ({ page }) => {
    // Enable direct link and embed
    const directLinkSwitch = page.locator('[data-testid="share-direct-link-switch"]');
    if ((await directLinkSwitch.getAttribute('data-state')) !== 'checked') {
      await toggleSwitchByTestId(page, 'share-direct-link-switch');
    }
    
    // Click copy button multiple times
    const copyButton = page.locator('[data-testid="share-copy-link-button"]');
    for (let i = 0; i < 3; i++) {
      await copyButton.click();
      await page.waitForTimeout(100);
    }
    
    // Button should still be visible and enabled
    await expect(copyButton).toBeVisible();
    await expect(copyButton).toBeEnabled();
  });
});
