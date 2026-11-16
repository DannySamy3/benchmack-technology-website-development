import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
    // Scroll-reveal animations start at opacity 0; reduced motion shows content immediately.
    contextOptions: { reducedMotion: 'reduce' },
  },
  projects: [
    {
      name: 'desktop',
      // Locally, use the installed Google Chrome; CI installs Playwright's Chromium.
      use: { ...devices['Desktop Chrome'], channel: isCI ? undefined : 'chrome' },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'], channel: isCI ? undefined : 'chrome' },
      testIgnore: /unit\//,
    },
  ],
  webServer: {
    // CI builds in an earlier step; locally, build first so tests run against production output.
    command: isCI ? 'npm start' : 'npm run build && npm start',
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 180_000,
    env: {
      // Never send real email from tests, and keep Turnstile off.
      PORT: String(PORT),
      HOSTNAME: '127.0.0.1',
      CONTACT_DRY_RUN: '1',
      RESEND_API_KEY: '',
      TURNSTILE_SECRET_KEY: '',
    },
  },
})
