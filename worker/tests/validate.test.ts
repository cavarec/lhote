import { describe, expect, it } from 'vitest';
import { isUuidV4, parseResolveBody, sanitizeText } from '../src/utils/validate';
import { uuid } from './helpers';

describe('isUuidV4', () => {
  it('accepte un UUID v4 et refuse le reste', () => {
    expect(isUuidV4(uuid(1))).toBe(true);
    expect(isUuidV4('00000000-0000-1000-8000-000000000001')).toBe(false);
    expect(isUuidV4('')).toBe(false);
    expect(isUuidV4(42)).toBe(false);
    expect(isUuidV4(undefined)).toBe(false);
  });
});

describe('sanitizeText', () => {
  it('retire le HTML, y compris imbriqué', () => {
    expect(sanitizeText('a <b>gras</b> et <script>x</script>')).toBe('a gras et x');
    expect(sanitizeText('<<b>script>alert(1)<</b>/script>')).not.toMatch(/[<>]/);
    // « < 3 > » ressemble à une balise : retirée par prudence.
    expect(sanitizeText('2 < 3 > 1')).toBe('2 1');
  });

  it('remplace les caractères de contrôle et normalise les espaces', () => {
    expect(sanitizeText('a\u0000b\u007fc\n\td')).toBe('a b c d');
    expect(sanitizeText('   ')).toBe('');
  });

  it('tronque à 500 caractères par défaut, ou à la borne donnée', () => {
    expect(sanitizeText('a'.repeat(900))).toHaveLength(500);
    expect(sanitizeText('abcdef', 3)).toBe('abc');
  });

  it('conserve les accents et les emoji', () => {
    expect(sanitizeText('Été à Rome 🏛️')).toBe('Été à Rome 🏛️');
  });
});

describe('parseResolveBody', () => {
  const base = { leapId: uuid(3), resolutionId: 'repair-1' };

  it('accepte le minimum et ne garde que les champs connus', () => {
    expect(parseResolveBody({ ...base, intrus: true })).toEqual({
      ok: true,
      value: base,
    });
  });

  it('accepte et nettoie les champs optionnels', () => {
    const result = parseResolveBody({
      ...base,
      suspicion: 50,
      choices: { '<i>a</i>': '<b>b</b>' },
      visitedBeats: [0, 3, 5],
    });
    expect(result).toEqual({
      ok: true,
      value: { ...base, suspicion: 50, choices: { a: 'b' }, visitedBeats: [0, 3, 5] },
    });
  });

  it.each([null, 'texte', 12, [1, 2]])('refuse un corps non objet (%j)', (raw) => {
    expect(parseResolveBody(raw)).toMatchObject({ ok: false });
  });

  it('liste chaque champ invalide', () => {
    const result = parseResolveBody({
      leapId: 'x',
      resolutionId: '../etc',
      suspicion: 101,
      choices: { a: 1 },
      visitedBeats: [1.5],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.map((i) => i.field)).toEqual([
        'leapId',
        'resolutionId',
        'suspicion',
        'choices',
        'visitedBeats',
      ]);
    }
  });

  it.each([
    [{ suspicion: -1 }, 'suspicion'],
    [{ suspicion: 1.5 }, 'suspicion'],
    [{ suspicion: '10' }, 'suspicion'],
    [{ choices: [] }, 'choices'],
    [
      {
        choices: Object.fromEntries(Array.from({ length: 51 }, (_, i) => [`k${i}`, 'v'])),
      },
      'choices',
    ],
    [{ visitedBeats: 'x' }, 'visitedBeats'],
    [{ visitedBeats: Array.from({ length: 21 }, () => 1) }, 'visitedBeats'],
    [{ visitedBeats: [99] }, 'visitedBeats'],
  ])('refuse %j', (extra, field) => {
    const result = parseResolveBody({ ...base, ...extra });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues[0]?.field).toBe(field);
  });
});
