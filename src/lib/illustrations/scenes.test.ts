import { describe, expect, it } from 'vitest';
import { moodSvg, sceneSvg, type Mood, type SceneKind } from './scenes';
import { catalog } from '../../../content';

const kinds: SceneKind[] = [
  'wakeup',
  'orientation',
  'dialogue',
  'investigation',
  'fracture',
];
const moods: Mood[] = ['resolved', 'failed', 'exposed', 'died'];

describe('illustrations', () => {
  it('chaque prémisse a une image par temps du récit', () => {
    for (const p of catalog.premises) {
      for (const k of kinds)
        expect(sceneSvg(p.id, k), `${p.id} ${k}`).toMatch(/<(path|rect|circle|ellipse)/);
    }
  });
  it('chaque issue a une ambiance', () => {
    for (const m of moods) expect(moodSvg(m)).toMatch(/<(path|rect|circle|ellipse)/);
  });
  it('aucune image ne contient de script ni de lien externe', () => {
    const all = [
      ...catalog.premises.flatMap((p) => kinds.map((k) => sceneSvg(p.id, k) ?? '')),
      ...moods.map(moodSvg),
    ].join('');
    expect(all).not.toMatch(/<script|href=|on\w+=|http/i);
  });
  it('une prémisse inconnue ne produit rien', () => {
    expect(sceneSvg('premise-99', 'wakeup')).toBeNull();
  });
});
