import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { playToResolution, startLeap } from './helpers';

async function audit(page: Page): Promise<void> {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
}

test.describe('accessibilité (WCAG AA)', () => {
  test('accueil, réglages et journal', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sauter' }).waitFor();
    await audit(page);
    await page.getByRole('button', { name: 'Journal' }).click();
    await page.getByRole('button', { name: 'Retour' }).waitFor();
    await audit(page);
    await page.getByRole('button', { name: 'Retour' }).click();
    await page.getByRole('button', { name: 'Confidentialité et réglages' }).click();
    await page.getByRole('heading', { name: 'Vos données' }).waitFor();
    await audit(page);
  });

  test('chaque beat du saut', async ({ page }) => {
    await startLeap(page);
    await audit(page);
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    await audit(page);
    await page.getByRole('button', { name: 'Continuer' }).click();
    await audit(page);
    await page.locator('.choice').first().click();
    await page.getByRole('button', { name: 'Continuer' }).waitFor();
    await audit(page);
    await page.getByRole('button', { name: 'Continuer' }).click();
    await audit(page);
    await page.locator('.choice').first().click();
    await page.getByRole('button', { name: 'Continuer' }).click();
    await audit(page);
    await page.locator('.choice').first().click();
    await page.getByRole('button', { name: 'Décider' }).click();
    await audit(page);
  });

  test('tout se joue au clavier et le focus reste visible', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sauter' }).waitFor();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Sauter' })).toBeFocused();
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).waitFor();
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  });

  test('les cibles tactiles font au moins 48 px', async ({ page }) => {
    await startLeap(page);
    await playToResolution(page);
    const heights = await page
      .locator('.choice')
      .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
    expect(heights.length).toBeGreaterThan(0);
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(47.5);
  });

  test('la machine à écrire s’interrompt d’un clic ou de la touche Échap', async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: 'no-preference' });
    const page = await context.newPage();
    await page.goto('/');
    await page.getByRole('button', { name: 'Sauter' }).click();
    await page.locator('.scene-title').waitFor();
    await page.locator('.narration.fade-in').first().click();
    await expect(page.getByRole('button', { name: 'Ouvrir les yeux' })).toBeVisible({
      timeout: 2000,
    });
    await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
    // La scène suivante n'existe qu'une fois l'état enregistré : on l'attend.
    await page.getByRole('list', { name: 'Progression du saut' }).waitFor();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible({
      timeout: 2000,
    });
    await context.close();
  });
});
