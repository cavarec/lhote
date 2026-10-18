import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { catalog } from '../../content';
import type { Dialogue, Premise } from '../../content/premises/types';
import type { Catalog, WorldMutation } from '../../src/lib/engine/types';
import { makePremise } from '../../src/lib/engine/test-fixtures';
import {
  checkCatalog,
  checkDialogueChoices,
  checkPremise,
  checkText,
  collectPlayerTexts,
  countWords,
  formatViolations,
  resultTextLines,
  splitSentences,
} from './rules';

const rulesOf = (text: string) => checkText({ where: 't', text }).map((v) => v.rule);

describe('contenu réel', () => {
  it('respecte toutes les règles d’écriture (§6.7)', () => {
    expect(formatViolations(checkCatalog(catalog))).toBe('');
  });

  it('l’échantillon de voix validé respecte les règles, s’il existe', () => {
    const path = new URL('../../content/VOIX.md', import.meta.url);
    if (!existsSync(path)) return;
    const text = readFileSync(path, 'utf8')
      .split('\n')
      .filter((line) => !line.startsWith('#') && !line.startsWith('>'))
      .join('\n');
    expect(formatViolations(checkText({ where: 'VOIX.md', text }))).toBe('');
  });
});

describe('phrases', () => {
  it('découpe sur la ponctuation et les sauts de ligne', () => {
    expect(splitSentences('Un. Deux ! Trois ?\nQuatre… Cinq')).toEqual([
      'Un.',
      'Deux !',
      'Trois ?',
      'Quatre…',
      'Cinq',
    ]);
  });

  it('compte les mots sans la ponctuation isolée', () => {
    expect(countWords("L'air est froid — vraiment ?")).toBe(4);
    expect(countWords('')).toBe(0);
  });

  it('accepte 25 mots et refuse 26', () => {
    const sentence = (n: number) =>
      `${Array.from({ length: n }, () => 'mot').join(' ')}.`;
    expect(rulesOf(sentence(25))).toEqual([]);
    expect(rulesOf(sentence(26))).toEqual(['phrase-longue']);
  });

  it('mesure chaque phrase séparément', () => {
    const short = Array.from({ length: 20 }, () => 'mot').join(' ');
    expect(rulesOf(`${short}. ${short}.`)).toEqual([]);
  });
});

describe('vouvoiement', () => {
  it.each(['Vous êtes là.', 'Tu sais que vous partez.', 'VOUS ?'])(
    'refuse « %s »',
    (text) => {
      expect(rulesOf(text)).toContain('vouvoiement');
    },
  );

  it('ne confond pas avec un mot voisin', () => {
    expect(rulesOf('Tu es là. Le vousoir n’existe pas.')).toEqual([]);
  });
});

describe('adverbes en -ment', () => {
  it('refuse un adverbe, même accentué ou en majuscule', () => {
    expect(rulesOf('Tu avances lentement.')).toEqual(['adverbe-ment']);
    expect(rulesOf('Tu cours Rapidement.')).toEqual(['adverbe-ment']);
    expect(rulesOf('Tu pars évidemment.')).toEqual(['adverbe-ment']);
  });

  it('laisse passer les noms de la liste d’exceptions', () => {
    expect(rulesOf('Un moment. Ton vêtement est mouillé. Un mouvement.')).toEqual([]);
  });
});

describe('années et références interdites', () => {
  it('refuse une année à 4 chiffres, pas un nombre plus court ou plus long', () => {
    expect(rulesOf('Il y a dix ans, en 1887.')).toEqual(['annee']);
    expect(rulesOf('Il y a 300 ans.')).toEqual([]);
    expect(rulesOf('Il y a 12345 ans.')).toEqual([]);
  });

  it.each([
    'Comme dans Code Quantum.',
    'Un game over.',
    'Dark Souls',
    'Il gagne un level up.',
  ])('refuse « %s »', (text) => {
    expect(rulesOf(text)).toContain('reference-interdite');
  });
});

describe('dialogues à choix', () => {
  const dialogue = (kinds: ('neutral' | 'risky' | 'informative')[]): Dialogue => ({
    npcId: '0',
    lines: [],
    choices: kinds.map((kind, i) => ({ id: `c${i}`, kind, text: 'x', reply: [] })),
  });

  it('accepte 3 ou 4 options avec une de chaque nature', () => {
    expect(
      checkDialogueChoices('d', dialogue(['neutral', 'risky', 'informative'])),
    ).toEqual([]);
    expect(
      checkDialogueChoices('d', dialogue(['neutral', 'risky', 'informative', 'neutral'])),
    ).toEqual([]);
  });

  it('refuse un mauvais nombre d’options', () => {
    expect(
      checkDialogueChoices('d', dialogue(['neutral', 'risky'])).map((v) => v.message),
    ).toEqual(expect.arrayContaining([expect.stringContaining('2 options')]));
    const five = dialogue(['neutral', 'risky', 'informative', 'neutral', 'risky']);
    expect(checkDialogueChoices('d', five)[0]?.message).toContain('5 options');
  });

  it('exige les trois natures', () => {
    const violations = checkDialogueChoices(
      'd',
      dialogue(['neutral', 'neutral', 'risky']),
    );
    expect(violations.map((v) => v.message)).toEqual([
      'Option « informative » manquante.',
    ]);
  });

  it('ignore un dialogue sans choix', () => {
    expect(checkDialogueChoices('d', { npcId: '0', lines: [] })).toEqual([]);
  });
});

describe('prémisses', () => {
  const door: WorldMutation = {
    type: 'addDoor',
    door: { id: 'd', label: 'l', openedInLeap: 'x', epoch: 'e' },
  };
  const door2: WorldMutation = {
    type: 'addDoor',
    door: { id: 'd2', label: 'l', openedInLeap: 'x', epoch: 'e' },
  };
  const truth: WorldMutation = {
    type: 'addTruth',
    truth: { id: 't', summary: 's', leapId: 'x' },
  };

  function premise(overrides: Partial<Premise> = {}): Premise {
    return {
      ...makePremise('premise-01', ['f1', 'f2']),
      orientation: [
        { kind: 'material', text: 'Un seau.' },
        { kind: 'bodily', text: 'Une cicatrice.' },
        { kind: 'social', text: 'Un nom sur la porte.' },
      ],
      resolutions: [
        {
          id: 'r1',
          choiceText: 'Rester.',
          outcome: 'resolved',
          fractureRepaired: true,
          resultText: 'Tu restes.\nLe jour se lève.',
          mutations: [door, truth],
        },
      ],
      ...overrides,
    };
  }

  it('accepte une prémisse conforme', () => {
    expect(checkPremise(premise())).toEqual([]);
  });

  it('exige un indice de chaque nature avant le premier dialogue', () => {
    const violations = checkPremise(
      premise({ orientation: [{ kind: 'material', text: 'Un seau.' }] }),
    );
    expect(violations.map((v) => v.message)).toEqual([
      expect.stringContaining('bodily'),
      expect.stringContaining('social'),
    ]);
  });

  it('refuse plus de 2 mutations ou deux mutations du même type', () => {
    const resolution = (mutations: WorldMutation[]): Premise =>
      premise({
        resolutions: [
          {
            id: 'r',
            choiceText: 'x',
            outcome: 'failed',
            fractureRepaired: false,
            resultText: 'Un.\nDeux.',
            mutations,
          },
        ],
      });
    expect(checkPremise(resolution([door, door2])).map((v) => v.rule)).toEqual([
      'mutations',
    ]);
    expect(
      checkPremise(
        resolution([
          door,
          truth,
          {
            type: 'addScar',
            scar: { id: 's', description: 'd', leapId: 'x', epoch: 'e' },
          },
        ]),
      ).map((v) => v.rule),
    ).toEqual(['mutations']);
  });

  it('exige un resultText de 2 à 5 lignes', () => {
    const withText = (resultText: string): Premise =>
      premise({
        resolutions: [
          {
            id: 'r',
            choiceText: 'x',
            outcome: 'died',
            fractureRepaired: false,
            resultText,
            mutations: [],
          },
        ],
      });
    expect(resultTextLines('a\n\n b \nc')).toBe(3);
    expect(checkPremise(withText('Une seule.')).map((v) => v.rule)).toEqual([
      'resultat-lignes',
    ]);
    expect(checkPremise(withText('1\n2\n3\n4\n5\n6')).map((v) => v.rule)).toEqual([
      'resultat-lignes',
    ]);
    expect(checkPremise(withText('1\n2\n3\n4\n5'))).toEqual([]);
  });

  it('vérifie aussi les choix du dialogue d’ouverture', () => {
    const bad = premise({
      openingDialogue: {
        npcId: '0',
        lines: [],
        choices: [{ id: 'a', kind: 'neutral', text: 'x', reply: [] }],
      },
    });
    expect(checkPremise(bad).every((v) => v.rule === 'choix')).toBe(true);
  });
});

describe('collecte du texte joueur', () => {
  it('parcourt tous les types de contenu et exclut les champs techniques', () => {
    const full: Catalog = {
      premises: [
        {
          ...makePremise('p', ['f1', 'f2']),
          openingDialogue: {
            npcId: '0',
            lines: [{ speaker: 'npc', text: 'Bonjour.' }],
            choices: [
              {
                id: 'c',
                kind: 'neutral',
                text: 'Salut.',
                reply: [{ speaker: 'npc', text: 'Oui.' }],
              },
            ],
          },
          investigation: [{ kind: 'material', text: 'Une clé.' }],
          orientation: [{ kind: 'social', text: 'Un nom.' }],
          resolutions: [
            {
              id: 'r',
              choiceText: 'Partir.',
              outcome: 'resolved',
              fractureRepaired: true,
              resultText: 'Fin.\nSuite.',
              mutations: [],
            },
          ],
        },
      ],
      characters: [
        {
          id: 'c1',
          archetype: 'worried',
          name: 'Mara',
          voice: 'DIRECTIVE INTERNE',
          dialogues: { k: [{ speaker: 'npc', text: 'Chut.' }] },
        },
      ],
      fractures: [{ id: 'f1', title: 'Titre', interpretations: ['A.', 'B.'] }],
      artifacts: [{ id: 'a1', name: 'Clé', description: 'Une clé.' }],
      fragments: [{ id: 'g1', act: 1, order: 1, text: 'Un.' }],
    };
    const texts = collectPlayerTexts(full).map((t) => t.text);
    expect(texts).toEqual(
      expect.arrayContaining([
        'Bonjour.',
        'Salut.',
        'Oui.',
        'Une clé.',
        'Mara',
        'Chut.',
        'A.',
        'Clé',
        'Un.',
        'Fin.\nSuite.',
      ]),
    );
    expect(texts).not.toContain('DIRECTIVE INTERNE');
  });
});
