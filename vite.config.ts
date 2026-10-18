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
  },
});
