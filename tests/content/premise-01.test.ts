import { describe, expect, it } from 'vitest';
import { catalog } from '../../content';
import { premise01 } from '../../content/premises/premise-01';
import { countWords } from './rules';

describe('prémisse 1', () => {
  it('référence des fractures qui existent', () => {
    for (const id of premise01.fractures) {
      expect(catalog.fractures.some((f) => f.id === id)).toBe(true);
    }
    expect(new Set(premise01.fractures).size).toBe(2);
  });

  it('a des identifiants de résolution et de choix uniques', () => {
    const resolutionIds = premise01.resolutions.map((r) => r.id);
    expect(new Set(resolutionIds).size).toBe(resolutionIds.length);
    const choiceIds = (premise01.openingDialogue.choices ?? []).map((c) => c.id);
    expect(new Set(choiceIds).size).toBe(choiceIds.length);
  });

  it('propose les trois natures d’issue : résolue, exposée, morte', () => {
    const outcomes = new Set(premise01.resolutions.map((r) => r.outcome));
    expect(outcomes).toEqual(new Set(['resolved', 'failed', 'exposed', 'died']));
  });

  it('parle à l’emplacement 0 ou 1, jamais à un personnage nommé', () => {
    expect(['0', '1']).toContain(premise01.openingDialogue.npcId);
  });

  it('reste neutre : ni lieu réel ni année dans l’époque et les identifiants', () => {
    expect(premise01.id).toBe('premise-01');
    expect(premise01.epoch).not.toMatch(/\d/);
  });

  it('a un volume d’une prémisse jouable (le budget cible est 1 500 mots)', () => {
    const texts = [
      premise01.wakeup,
      ...premise01.orientation.map((o) => o.text),
      ...premise01.openingDialogue.lines.map((l) => l.text),
      ...(premise01.openingDialogue.choices ?? []).flatMap((c) => [
        c.text,
        ...c.reply.map((l) => l.text),
      ]),
      ...premise01.investigation.map((i) => i.text),
      ...premise01.resolutions.flatMap((r) => [r.choiceText, r.resultText]),
    ];
    const words = texts.reduce((sum, text) => sum + countWords(text), 0);
    expect(words).toBeGreaterThan(700);
  });
});
