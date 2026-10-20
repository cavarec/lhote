import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: "L'Hôte",
        short_name: "L'Hôte",
        description: 'Un jeu narratif : tu ouvres les yeux dans le corps d’un inconnu.',
        lang: 'fr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#f4ede0',
        background_color: '#f4ede0',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // App shell + contenu narratif (les prémisses sont dans un seul chunk) + polices.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest,json}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /^\/nouveautes\.xml$/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          // Les envois ne passent jamais par le cache : le client gère lui-même file d'attente et reprises.
          {
            urlPattern: ({ url }: { url: URL }) =>
              url.pathname === '/api/leap' || url.pathname === '/api/resolve',
            handler: 'NetworkOnly',
            method: 'POST',
          },
          {
            urlPattern: ({ url }: { url: URL }) => url.pathname === '/api/state',
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'lhote-state',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 1 },
            },
          },
        ],
      },
    }),
  ],
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
