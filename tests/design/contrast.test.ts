import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Les couleurs sont lues dans app.css : un changement de palette fait échouer ce test s'il casse WCAG AA.

function token(css: string, name: string): string {
  const match = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
  if (!match?.[1]) throw new Error(`Jeton --${name} introuvable.`);
  return match[1];
}

function luminance(hex: string): number {
  const channel = (i: number): number => {
    const value = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

describe('contraste des couleurs (WCAG AA, 4,5:1)', () => {
  const css = readFileSync(new URL('../../src/app.css', import.meta.url), 'utf8');
  const parchment = token(css, 'parchment');

  it.each([
    ['ink', 'texte courant'],
    ['blood', 'liens et accents'],
    ['mist', 'texte secondaire'],
  ])('%s sur parchemin (%s)', (name) => {
    expect(contrast(token(css, name), parchment)).toBeGreaterThanOrEqual(4.5);
  });

  it('parchemin sur encre (bouton principal)', () => {
    expect(contrast(parchment, token(css, 'ink'))).toBeGreaterThanOrEqual(4.5);
  });

  it('parchemin sur rouge sombre (survol du bouton principal)', () => {
    expect(contrast(parchment, token(css, 'blood'))).toBeGreaterThanOrEqual(4.5);
  });
});
