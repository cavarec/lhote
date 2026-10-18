import { defineConfig, devices } from '@playwright/test';

// Parcours complet contre le vrai Worker (Miniflare) et le front construit.
// Prérequis : `npm run build`. Le Worker est démarré ici, l'état est jetable.
export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '*.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',
  timeout: 60_000,
  use: {
    baseURL: 'http://localhost:4173',
    ...devices['Desktop Chrome'],
    reducedMotion: 'reduce',
    locale: 'fr-FR',
    trace: 'retain-on-failure',
    // En local, PW_CHROMIUM peut pointer vers un Chromium déjà installé.
    launchOptions: process.env['PW_CHROMIUM']
      ? { executablePath: process.env['PW_CHROMIUM'] }
      : {},
  },
  webServer: [
    {
      command:
        'npx wrangler dev --config worker/wrangler.toml --port 8787 --persist-to .wrangler/e2e-state',
      url: 'http://localhost:8787/api/health',
      reuseExistingServer: !process.env['CI'],
      timeout: 120_000,
    },
    {
      command: 'npx vite preview',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env['CI'],
    },
  ],
});
