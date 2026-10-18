import { expect, test } from '@playwright/test';
import { playToResolution, startLeap } from './helpers';

test.describe('parcours complet', () => {
  test('un saut de bout en bout, puis le journal', async ({ page }) => {
    await startLeap(page);
    await playToResolution(page);
    await page.locator('.choice').first().click();

    // Écran de fin : le bouton de retour apparaît une fois le texte lu.
    await page.getByRole('button', { name: 'Revenir' }).click();
    await expect(page.getByRole('button', { name: 'Sauter' })).toBeVisible();

    await page.getByRole('button', { name: 'Journal' }).click();
    await expect(page.getByText('1 saut accompli.')).toBeVisible();
    await page.getByRole('button', { name: 'Retour' }).click();
  });

  test('la partie reprend là où elle s’est arrêtée après un rechargement', async ({
    page,
  }) => {
    await startLeap(page);
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await expect(page.locator('.choice').first()).toBeVisible();
    await page.reload();
    await page.getByRole('button', { name: 'Reprendre le saut' }).click();
    // On est revenu au dialogue, pas au réveil.
    await expect(page.locator('.choice').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ouvrir les yeux' })).toHaveCount(0);
  });

  test('hors connexion, la fin est mise en attente puis envoyée au retour du réseau', async ({
    page,
    context,
  }) => {
    await startLeap(page);
    await playToResolution(page);
    await context.setOffline(true);
    await page.locator('.choice').first().click();
    await expect(
      page.getByText('Hors connexion : cette fin sera enregistrée'),
    ).toBeVisible({
      timeout: 45_000,
    });
    await context.setOffline(false);
    await page.getByRole('button', { name: 'Revenir' }).click();
    await page.evaluate(() => window.dispatchEvent(new Event('online')));
    await expect(page.getByText(/en attente de connexion/)).toHaveCount(0, {
      timeout: 15_000,
    });
  });

  test('les réglages de lecture s’appliquent et se conservent', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Confidentialité et réglages' }).click();
    await page.getByRole('button', { name: 'Grand', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-text-size', 'large');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-text-size', 'large');
  });

  test('l’export et la suppression des données fonctionnent', async ({ page }) => {
    await startLeap(page);
    await page.goto('/');
    await page.getByRole('button', { name: 'Confidentialité et réglages' }).click();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Télécharger mes données' }).click();
    expect((await download).suggestedFilename()).toBe('lhote-mes-donnees.json');

    await page.getByRole('button', { name: 'Supprimer mes données' }).click();
    await page.getByRole('button', { name: 'Oui, tout effacer' }).click();
    await expect(page.getByText('Quelqu’un dort dans un corps')).toBeVisible();
  });
});
