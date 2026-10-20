import type { Page } from '@playwright/test';

/** Joue un saut jusqu'à l'écran de fin en prenant, à chaque étape, le premier choix. */
export async function playToResolution(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click(); // orientation
  await playDialogue(page);
  await page.locator('.choice').first().click(); // enquête
  await leaveInvestigation(page);
  await page.locator('.choice').first().click(); // fracture
  await page.getByRole('button', { name: 'Décider' }).click();
  await page.getByText('Il faut agir, maintenant.').waitFor();
}

export async function startLeap(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entrer dans une nouvelle vie' }).click();
  await page.getByRole('button', { name: 'Ouvrir les yeux' }).waitFor();
}

/** Les deux passes du dialogue : un premier choix, puis un second, puis « Continuer ». */
export async function playDialogue(page: Page): Promise<void> {
  await page.locator('.choice').first().click();
  await page.locator('.choice').first().click();
  await page.getByRole('button', { name: 'Continuer' }).click();
}

/** Quitte l'enquête : « Continuer », puis le coup de théâtre, puis « Faire face ». */
export async function leaveInvestigation(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Faire face' }).click();
}
