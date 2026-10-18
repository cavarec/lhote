import { expect, test } from '@playwright/test';
import { startLeap } from './helpers';

// Le service worker n'est actif que dans le build (`vite preview`), pas en développement.
test.use({ serviceWorkers: 'allow' });

async function waitForServiceWorker(
  page: import('@playwright/test').Page,
): Promise<void> {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  // Le premier chargement n'est pas contrôlé : un rechargement place la page sous le worker.
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
}

test.describe('PWA', () => {
  test('le manifeste est complet', async ({ page, request }) => {
    await page.goto('/');
    const href = await page.locator('link[rel="manifest"]').getAttribute('href');
    const manifest = (await (
      await request.get(href ?? '/manifest.webmanifest')
    ).json()) as {
      display: string;
      theme_color: string;
      lang: string;
      icons: { sizes: string; purpose?: string }[];
    };
    expect(manifest.display).toBe('standalone');
    expect(manifest.theme_color).toBe('#f4ede0');
    expect(manifest.lang).toBe('fr');
    const sizes = manifest.icons.map((i) => `${i.sizes}:${i.purpose ?? 'any'}`);
    expect(sizes).toEqual(
      expect.arrayContaining(['192x192:any', '512x512:any', '512x512:maskable']),
    );
  });

  test('l’application s’ouvre hors connexion et le saut en cours reste jouable', async ({
    page,
    context,
  }) => {
    await startLeap(page);
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    await page.getByRole('list', { name: 'Progression du saut' }).waitFor();
    await waitForServiceWorker(page);

    await context.setOffline(true);
    await page.reload();
    await expect(page.getByText('Hors connexion.')).toBeVisible();
    await expect(page.getByText('Connexion requise pour résoudre.')).toBeVisible();
    await page.getByRole('button', { name: 'Reprendre le saut' }).click();
    await expect(page.locator('.choice')).toHaveCount(0); // orientation : pas encore de choix
    await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
    await context.setOffline(false);
  });

  test('le dernier saut reçu se rejoue hors connexion', async ({ page, context }) => {
    await startLeap(page);
    await page.goto('/');
    await waitForServiceWorker(page);
    await context.setOffline(true);
    await page.reload();
    await page.getByRole('button', { name: /Sauter|Reprendre/ }).click();
    await expect(page.getByRole('button', { name: 'Ouvrir les yeux' })).toBeVisible();
    await context.setOffline(false);
  });
});
