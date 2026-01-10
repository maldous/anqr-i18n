import { defineConfig, devices } from '@playwright/test';
import os from 'os';

/**
 * Playwright configuration for ANQR UI testing
 * Supports tier-based test organization: basic, advanced, professional
 * 
 * HARDWARE OPTIMIZATION:
 * - Detects CPU cores and uses 75% for parallel workers (leaves headroom for browser processes)
 * - On 32-core machine: ~24 parallel browser instances
 * - Memory: Each Chrome instance uses ~100-200MB, so 64GB supports 200+ parallel browsers
 */

// Calculate optimal worker count based on hardware
// Use 75% of CPUs to leave room for browser rendering threads
const cpuCount = os.cpus().length;
const optimalWorkers = Math.max(4, Math.floor(cpuCount * 0.75));

export default defineConfig({
  testDir: './tests',
  
  /* PARALLELIZATION - exploit all hardware */
  fullyParallel: true,
  workers: process.env.CI ? 4 : optimalWorkers, // 24 workers on 32-core machine
  
  /* Increase timeouts for parallel load */
  timeout: 60 * 1000, // 60s per test
  expect: {
    timeout: 10 * 1000, // 10s for assertions
  },
  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  
  /* Reporter configuration */
  reporter: [
    ['html', { open: 'never' }],
    ['list'], // Show real-time progress
  ],
  
  /* Global settings */
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    /* Browser launch options for performance */
    launchOptions: {
      args: [
        '--disable-gpu', // Disable GPU for headless stability
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Use /tmp instead of /dev/shm (more memory)
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
      ],
    },
  },

  /* Configure projects for different tiers */
  projects: [
    {
      name: 'basic',
      testMatch: /tests\/basic\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'advanced',
      testMatch: /tests\/advanced\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'professional',
      testMatch: /tests\/professional\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'permutations',
      testMatch: /tests\/permutations\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
      timeout: 4 * 60 * 60 * 1000, // 4 hours for exhaustive permutation tests
    },
    {
      name: 'reports',
      testMatch: /tests\/reports\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
      timeout: 10 * 60 * 1000, // 10 minutes for report generation
    },
  ],

  /* Run local dev server before starting tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  /* Output directory for test artifacts */
  outputDir: 'test-results/',
  
  /* Preserve output on failure for debugging */
  preserveOutput: 'failures-only',
});
