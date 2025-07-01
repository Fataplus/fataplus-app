import { defineConfig, devices } from '@playwright/test';

// Lire les variables d'environnement du fichier .env.local
require('dotenv').config({ path: '.env.local' });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'pnpm run dev',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
}); 