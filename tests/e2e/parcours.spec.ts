import { expect, test } from '@playwright/test';
import { playDialogue, playToResolution, startLeap } from './helpers';

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

  test('l’accueil propose de partager et de lire les nouveautés, sans bruit', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.getByRole('button', { name: 'Nouveautés' }).click();
    await expect(
      page.getByRole('heading', { name: 'Kalan Goañv et Nedeleg' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Le flux des nouveautés' }),
    ).toHaveAttribute('href', '/nouveautes.xml');
    await page.getByRole('button', { name: 'Retour' }).click();
    await page.getByRole('button', { name: 'Partager' }).click();
    await expect(page.getByText('Le lien est copié.')).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'https://lhote.atao.dev/',
    );
  });

  test('« Laisser ta main faire » tient lieu de choix, au dialogue puis à l’enquête', async ({
    page,
  }) => {
    await startLeap(page);
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await page.getByRole('button', { name: 'Laisser ta main faire.' }).click();
    await page.getByText('Tu laisses ta main faire.').first().waitFor();
    await page.locator('.choice').first().click(); // seconde passe
    await page.getByRole('button', { name: 'Continuer' }).click();
    const hand = page.getByRole('button', { name: 'Laisser ta main faire.' });
    await hand.click();
    await expect(hand).toHaveCount(0);
    await expect(page.locator('.npc-hand').first()).toBeVisible();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await page.getByRole('button', { name: 'Faire face' }).click();
    await page.getByRole('button', { name: 'Décider' }).waitFor({ state: 'attached' });
  });

  test('l’enquête ne propose jamais deux fois le même libellé', async ({ page }) => {
    await startLeap(page);
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await playDialogue(page);
    await page.getByText('Tu ne peux pas tout examiner.').waitFor();
    const labels = await page.locator('.choice').allTextContents();
    expect(labels.length).toBeGreaterThan(0);
    expect(new Set(labels).size).toBe(labels.length);
  });

  test('l’enquête est limitée : la troisième nature se ferme', async ({ page }) => {
    await startLeap(page);
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await playDialogue(page);
    await page.getByText('Il te reste 2 gestes.').waitFor();
    await page.locator('.choice:not([disabled])').first().click();
    await page.getByText('Il te reste 1 geste.').waitFor();
    await page.locator('.choice:not([disabled])').first().click();
    await expect(page.getByText('Le temps te manque.')).toBeVisible();
    await expect(page.locator('li .choice:not([disabled])')).toHaveCount(0);
  });

  test('on peut revenir à l’accueil en plein saut et le reprendre', async ({ page }) => {
    await startLeap(page);
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await expect(page.locator('.choice').first()).toBeVisible();
    await page.getByRole('button', { name: /Retourner à l’accueil/ }).click();
    await expect(page.getByRole('button', { name: 'Reprendre le saut' })).toBeVisible();
    await page.getByRole('button', { name: 'Reprendre le saut' }).click();
    await expect(page.locator('.choice').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ouvrir les yeux' })).toHaveCount(0);
  });

  test('« Écouter » lit le texte affiché à voix haute, et s’arrête', async ({ page }) => {
    await page.addInitScript(() => {
      const said: string[] = [];
      (window as unknown as { said: string[] }).said = said;
      class Utterance {
        text: string;
        lang = '';
        rate = 1;
        voice: unknown = null;
        onend: (() => void) | null = null;
        onerror: (() => void) | null = null;
        constructor(text: string) {
          this.text = text;
        }
      }
      (
        window as unknown as { SpeechSynthesisUtterance: unknown }
      ).SpeechSynthesisUtterance = Utterance;
      Object.defineProperty(window, 'speechSynthesis', {
        value: {
          getVoices: () => [],
          speak: (u: Utterance) => said.push(u.text),
          cancel: () => undefined,
        },
        configurable: true,
      });
    });
    await startLeap(page);
    await page.getByRole('button', { name: 'Écouter le texte à voix haute' }).click();
    await expect(
      page.getByRole('button', { name: 'Arrêter la lecture à voix haute' }),
    ).toBeVisible();
    const said = await page.evaluate(
      () => (window as unknown as { said: string[] }).said,
    );
    expect(said.length).toBeGreaterThan(0);
    await page.getByRole('button', { name: 'Arrêter la lecture à voix haute' }).click();
    await expect(
      page.getByRole('button', { name: 'Écouter le texte à voix haute' }),
    ).toBeVisible();
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
