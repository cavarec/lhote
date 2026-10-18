import type { Page } from '@playwright/test';

/** Joue un saut jusqu'à l'écran de fin en prenant, à chaque étape, le premier choix. */
export async function playToResolution(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Ouvrir les yeux' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click(); // orientation
  await page.locator('.choice').first().click(); // dialogue
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.locator('.choice').first().click(); // enquête
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.locator('.choice').first().click(); // fracture
  await page.getByRole('button', { name: 'Décider' }).click();
  await page.getByText('Il faut agir, maintenant.').waitFor();
}

export async function startLeap(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sauter' }).click();
  await page.getByRole('button', { name: 'Ouvrir les yeux' }).waitFor();
}
