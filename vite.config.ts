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
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'content/**/*.test.ts', 'tests/content/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/engine/**/*.ts'],
      exclude: ['**/*.test.ts', '**/test-fixtures.ts', '**/types.ts'],
      reporter: ['text', 'lcov'],
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
});
