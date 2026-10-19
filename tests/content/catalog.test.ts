import { describe, expect, it } from 'vitest';
import { artifacts } from '../../content/artifacts';
import { characters } from '../../content/characters/archetypes';
import { catalog } from '../../content';
import { fragments } from '../../content/fragments';

describe('personnages', () => {
  it('sont douze, trois par archétype, aux identifiants uniques', () => {
    expect(characters).toHaveLength(12);
    expect(new Set(characters.map((c) => c.id)).size).toBe(12);
    for (const archetype of ['confident', 'worried', 'hostile', 'innocent'] as const) {
      expect(characters.filter((c) => c.archetype === archetype)).toHaveLength(3);
    }
  });

  it('ont un nom distinct et les trois répliques de base', () => {
    expect(new Set(characters.map((c) => c.name)).size).toBe(12);
    for (const character of characters) {
      expect(Object.keys(character.dialogues).sort()).toEqual([
        'doubt',
        'farewell',
        'greeting',
      ]);
      for (const lines of Object.values(character.dialogues)) {
        expect(lines.length).toBeGreaterThanOrEqual(2);
      }
      expect(character.voice.length).toBeGreaterThan(20);
    }
  });

  it('ne citent ni lieu ni époque : elles servent à toutes les prémisses', () => {
    const text = characters
      .flatMap((c) => Object.values(c.dialogues).flat())
      .map((l) => l.text)
      .join(' ')
      .toLowerCase();
    for (const word of ['port', 'train', 'fanal', 'réserve', 'village', 'neige']) {
      expect(text).not.toMatch(new RegExp(`(?<![\\p{L}])${word}(?![\\p{L}])`, 'u'));
    }
  });
});

describe('objets-traces', () => {
  it('sont six, aux identifiants et aux noms uniques', () => {
    expect(artifacts).toHaveLength(6);
    expect(new Set(artifacts.map((a) => a.id)).size).toBe(6);
    expect(new Set(artifacts.map((a) => a.name)).size).toBe(6);
  });
});

describe('fragments de méta-histoire', () => {
  it('sont dix, répartis 3 / 3 / 3 / 1 sur les quatre actes', () => {
    expect(fragments).toHaveLength(10);
    const perAct = [1, 2, 3, 4].map(
      (act) => fragments.filter((f) => f.act === act).length,
    );
    expect(perAct).toEqual([3, 3, 3, 1]);
  });

  it('ont des identifiants et des rangs uniques, et sont déjà dans l’ordre', () => {
    expect(new Set(fragments.map((f) => f.id)).size).toBe(10);
    const keys = fragments.map((f) => f.act * 100 + f.order);
    expect(new Set(keys).size).toBe(10);
    expect(keys).toEqual([...keys].sort((a, b) => a - b));
  });

  it('ne tranchent jamais la question : pas de réponse à « pourquoi tu sautes »', () => {
    for (const fragment of fragments) {
      expect(fragment.text).not.toMatch(/\bparce que\b/i);
    }
  });
});

describe('catalogue', () => {
  it('est branché dans son ensemble', () => {
    expect(catalog.premises).toHaveLength(7);
    expect(catalog.characters).toBe(characters);
    expect(catalog.artifacts).toBe(artifacts);
    expect(catalog.fragments).toBe(fragments);
    expect(catalog.fractures).toHaveLength(14);
    expect(catalog.echoes).toHaveLength(8);
    expect(catalog.observerMessages).toHaveLength(12);
  });
});
