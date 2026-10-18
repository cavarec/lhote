import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
  server: {
    port: 5173,
    strictPort: true,
    // Avec `npm run dev` actif, l'API répond sur le port 8788 (Pages -> Worker).
    proxy: { '/api': 'http://localhost:8788' },
  },
  preview: {
    port: 4173,
    strictPort: true,
    proxy: { '/api': 'http://localhost:8787' },
  },
  test: {
    environment: 'node',
    include: [
      'src/**/*.test.ts',
      'content/**/*.test.ts',
      'tests/content/**/*.test.ts',
      'tests/design/**/*.test.ts',
      'worker/tests/**/*.test.ts',
    ],
    coverage: {
      provider: 'v8',
      include: ['src/lib/engine/**/*.ts', 'worker/src/**/*.ts'],
      exclude: [
        '**/*.test.ts',
        '**/test-fixtures.ts',
        '**/types.ts',
        // Adaptateurs plateforme (import 'cloudflare:workers') : vérifiés par le test de fumée
        // décrit dans worker/README.md, pas par vitest.
        'worker/src/index.ts',
        'worker/src/durable/Chronology.ts',
        'worker/src/env.ts',
      ],
      reporter: ['text', 'lcov'],
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
});
