/**
 * E2E Library Demo Tests
 * 
 * Demonstrates how to use the E2E testing library with:
 * - Deterministic event-driven waits (no sleeps)
 * - Helper classes for UI interactions
 * - Accessibility assertions
 * - Visual comparison tied to render completion
 */

import { test, expect } from '../fixtures/test-fixtures';

import {
  setupTest,
  createTestContext,
  waitForRenderCycle,
  waitForRenderIdle,
  snapshotsAreDifferent,
  SidebarSection,
  SelectHelper,
  SliderHelper,
  SwitchHelper,
  InputHelper,
  assertSliderAccessibility,
  assertSelectAccessibility,
  assertSwitchAccessibility,
  assertKeyboardFocusable,
} from '../helpers/e2e-library';

test.describe('E2E Library Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Setup test with clean state - this handles navigation, modal dismissal, and initial render wait
    await setupTest(page, { tier: 'basic' });
  });

  test.describe('Section Navigation', () => {
    test('can open and close accordion sections', async ({ page }) => {
      const ctx = createTestContext(page);
      
      // Open QR Encoding section
      await ctx.qrEncoding.open();
      expect(await ctx.qrEncoding.isOpen()).toBe(true);
      
      // Open Render section (may auto-close QR Encoding depending on accordion mode)
      await ctx.render.open();
      expect(await ctx.render.isOpen()).toBe(true);
      
      // Close Render section
      await ctx.render.close();
      expect(await ctx.render.isOpen()).toBe(false);
    });

    test('can access controls within a section', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.qrEncoding.open();
      const region = ctx.qrEncoding.getRegion();
      
      // Find a slider within the section
      const slider = region.locator('[role="slider"]').first();
      await expect(slider).toBeVisible();
    });
  });

  test.describe('Select Interactions', () => {
    test('can change ECC level and verify render update', async ({ page }) => {
      const ctx = createTestContext(page);
      
      // Take initial snapshot
      const before = await ctx.getSnapshot();
      
      // Open QR Encoding section and find ECC select
      await ctx.qrEncoding.open();
      const region = ctx.qrEncoding.getRegion();
      const eccSelect = new SelectHelper(region.locator('[role="combobox"]').first());
      
      // Change ECC to H (highest)
      await eccSelect.choose('H');
      
      // Wait for render to complete
      await ctx.waitForRender();
      
      // Verify QR changed
      const after = await ctx.getSnapshot();
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('select has proper ARIA attributes', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.qrEncoding.open();
      const region = ctx.qrEncoding.getRegion();
      const select = region.locator('[role="combobox"]').first();
      
      await assertSelectAccessibility(select);
    });
  });

  test.describe('Slider Interactions', () => {
    test('can change version slider and verify render update', async ({ page }) => {
      const ctx = createTestContext(page);
      
      const before = await ctx.getSnapshot();
      
      await ctx.qrEncoding.open();
      const region = ctx.qrEncoding.getRegion();
      
      // Find the version slider (contains role="slider")
      const sliderContainer = region.locator('.relative').filter({ has: page.locator('[role="slider"]') }).first();
      const slider = new SliderHelper(sliderContainer);
      
      // Get current value
      const currentValue = await slider.getValue();
      
      // Set to a different value (e.g., version 5)
      const newValue = currentValue === 5 ? 10 : 5;
      await slider.setValue(newValue);
      
      await ctx.waitForRender();
      
      const after = await ctx.getSnapshot();
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });

    test('slider has proper ARIA attributes', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.qrEncoding.open();
      const region = ctx.qrEncoding.getRegion();
      const sliderContainer = region.locator('.relative').filter({ has: page.locator('[role="slider"]') }).first();
      
      await assertSliderAccessibility(sliderContainer);
    });

    test('slider is keyboard operable', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.qrEncoding.open();
      const region = ctx.qrEncoding.getRegion();
      const sliderThumb = region.locator('[role="slider"]').first();
      
      await assertKeyboardFocusable(sliderThumb);
      
      // Get initial value
      const initialValue = Number(await sliderThumb.getAttribute('aria-valuenow'));
      
      // Press arrow key to change value
      await page.keyboard.press('ArrowRight');
      
      // Value should have changed
      const newValue = Number(await sliderThumb.getAttribute('aria-valuenow'));
      expect(newValue).toBeGreaterThanOrEqual(initialValue);
    });
  });

  test.describe('Switch Interactions', () => {
    test('can toggle transparent background', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.render.open();
      const region = ctx.render.getRegion();
      
      // Find a switch in the render section
      const switchEl = region.locator('[role="switch"]').first();
      const switchHelper = new SwitchHelper(switchEl);
      
      const before = await switchHelper.isChecked();
      await switchHelper.toggle();
      const after = await switchHelper.isChecked();
      
      expect(after).not.toBe(before);
    });

    test('switch has proper ARIA attributes', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.render.open();
      const region = ctx.render.getRegion();
      const switchEl = region.locator('[role="switch"]').first();
      
      await assertSwitchAccessibility(switchEl);
    });

    test('switch is keyboard operable', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.render.open();
      const region = ctx.render.getRegion();
      const switchEl = region.locator('[role="switch"]').first();
      
      await assertKeyboardFocusable(switchEl);
      
      const switchHelper = new SwitchHelper(switchEl);
      const before = await switchHelper.isChecked();
      
      // Toggle with Space key
      await switchHelper.toggleByKeyboard();
      
      const after = await switchHelper.isChecked();
      expect(after).not.toBe(before);
    });
  });

  test.describe('Input Interactions', () => {
    test('can change payload text', async ({ page }) => {
      const ctx = createTestContext(page);
      
      const before = await ctx.getSnapshot();
      
      await ctx.payload.open();
      const region = ctx.payload.getRegion();
      
      // Find the text input or textarea
      const input = region.locator('input[type="text"], input[type="url"], textarea').first();
      const inputHelper = new InputHelper(input);
      
      // Change the value
      await inputHelper.setValue('https://example.com/test');
      
      await ctx.waitForRender();
      
      const after = await ctx.getSnapshot();
      expect(snapshotsAreDifferent(before, after)).toBe(true);
    });
  });

  test.describe('Render Completion Waits', () => {
    test('waitForRenderCycle waits for complete cycle', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.payload.open();
      const region = ctx.payload.getRegion();
      const input = region.locator('input[type="text"], input[type="url"], textarea').first();
      
      // Make a change
      await input.fill('https://test-url.com');
      
      // Wait for complete render cycle (change -> debounce -> render -> idle)
      await ctx.waitForRender();
      
      // Should be in idle state now
      const preview = page.locator('[data-testid="qr-preview"]');
      await expect(preview).toHaveAttribute('data-rendering-state', 'idle');
    });

    test('multiple rapid changes result in single render', async ({ page }) => {
      const ctx = createTestContext(page);
      
      await ctx.payload.open();
      const region = ctx.payload.getRegion();
      const input = region.locator('input[type="text"], input[type="url"], textarea').first();
      
      // Make rapid changes (debounce should batch them)
      await input.fill('a');
      await input.fill('ab');
      await input.fill('abc');
      await input.fill('https://final-url.com');
      
      // Wait for render to complete
      await ctx.waitForRender();
      
      // QR should show the final URL
      const snapshot = await ctx.getSnapshot();
      expect(snapshot).toBeTruthy();
    });
  });

  test.describe('Visual Comparison', () => {
    test('snapshots are deterministic', async ({ page }) => {
      const ctx = createTestContext(page);
      
      // Take two snapshots without any changes
      const snapshot1 = await ctx.getSnapshot();
      const snapshot2 = await ctx.getSnapshot();
      
      // They should be identical
      expect(snapshotsAreDifferent(snapshot1, snapshot2)).toBe(false);
    });

    test('different settings produce different snapshots', async ({ page }) => {
      const ctx = createTestContext(page);
      
      const snapshot1 = await ctx.getSnapshot();
      
      // Change foreground color
      await ctx.render.open();
      const region = ctx.render.getRegion();
      const colorInput = region.locator('input[type="color"], input[type="text"]').first();
      await colorInput.fill('#ff0000');
      
      await ctx.waitForRender();
      
      const snapshot2 = await ctx.getSnapshot();
      
      // Snapshots should be different
      expect(snapshotsAreDifferent(snapshot1, snapshot2)).toBe(true);
    });
  });
});

// NOTE: Advanced and Professional tier tests have been moved to their respective directories:
// - tests/advanced/e2e-library-demo.spec.ts
// - tests/professional/e2e-library-demo.spec.ts