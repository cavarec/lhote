import { describe, expect, it } from 'vitest';
import { lottieNames, lottieUrl } from './lottie';

describe('animations Lottie', () => {
  const files = {
    'premise-01': '/a.json',
    'premise-01-dialogue': '/b.json',
    'mood-died': '/c.json',
  };

  it('cherche du plus précis au plus général', () => {
    expect(lottieNames('premise-01', 'dialogue')).toEqual([
      'premise-01-dialogue',
      'premise-01',
    ]);
    expect(lottieNames('premise-01')).toEqual(['premise-01']);
    expect(lottieNames('', undefined, 'died')).toEqual(['mood-died']);
    expect(lottieNames('')).toEqual([]);
  });

  it('un nom précis l’emporte, sinon le nom général', () => {
    expect(lottieUrl('premise-01', 'dialogue', undefined, files)).toBe('/b.json');
    expect(lottieUrl('premise-01', 'fracture', undefined, files)).toBe('/a.json');
  });

  it('rend null sans fichier, pour garder le SVG', () => {
    expect(lottieUrl('premise-02', 'dialogue', undefined, files)).toBeNull();
    expect(lottieUrl('premise-01', undefined, 'resolved', files)).toBeNull();
    expect(lottieUrl('premise-01', 'dialogue', undefined, {})).toBeNull();
  });
});
