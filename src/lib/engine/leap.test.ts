import { describe, expect, it } from 'vitest';
import { EngineError } from './errors';
import {
  actForLeap,
  advanceMeta,
  generateLeap,
  RECENT_PREMISE_WINDOW,
  resolveLeap,
  startLeap,
  TRACE_PROBABILITY,
} from './leap';
import {
  makeArtifact,
  makeCatalog,
  makeCharacter,
  makeInput,
  makeMeta,
  makeResult,
} from './test-fixtures';
import type { Catalog, WorldMutation } from './types';
import { createChronology, createWorld } from './world';
import { currentSeason, inSeason } from './season';

const catalog = makeCatalog();

function codeOf(fn: () => unknown): string | undefined {
  try {
    fn();
  } catch (error) {
    return error instanceof EngineError ? error.code : 'autre';
  }
  return undefined;
}

function archetypeOf(id: string): string | undefined {
  return catalog.characters.find((c) => c.id === id)?.archetype;
}

describe('actForLeap', () => {
  it.each([
    [1, 1],
    [5, 1],
    [6, 2],
    [12, 2],
    [13, 3],
    [18, 3],
    [19, 4],
    [40, 4],
  ])('saut %i -> acte %i', (leap, act) => {
    expect(actForLeap(leap)).toBe(act);
  });
});

describe('generateLeap', () => {
  it('est déterministe', () => {
    const input = makeInput({ seed: 777 });
    expect(generateLeap(input, catalog)).toEqual(generateLeap(input, catalog));
  });

  it('produit un saut cohérent avec le catalogue', () => {
    for (let seed = 0; seed < 300; seed++) {
      const { leap } = generateLeap(makeInput({ seed }), catalog);
      const premise = catalog.premises.find((p) => p.id === leap.premiseId);
      expect(premise).toBeDefined();
      expect(premise?.fractures).toContain(leap.fractureId);
      expect(leap.characterIds).toHaveLength(2);
      expect(new Set(leap.characterIds.map(archetypeOf)).size).toBe(2);
      expect(leap).toMatchObject({
        id: 'leap-new',
        seed,
        startedAt: 5000,
        suspicion: 0,
        traceId: null,
        visitedBeats: [],
        choices: {},
      });
    }
  });

  it('évite les prémisses des deux derniers sauts', () => {
    const history = [makeResult(0, 'p1'), makeResult(1, 'p2')];
    expect(RECENT_PREMISE_WINDOW).toBe(2);
    for (let seed = 0; seed < 100; seed++) {
      const { leap } = generateLeap(makeInput({ seed, history }), catalog);
      expect(['p3', 'p4']).toContain(leap.premiseId);
    }
  });

  it('retombe sur la prémisse la moins récente quand le catalogue est trop petit', () => {
    const small: Catalog = { ...catalog, premises: catalog.premises.slice(0, 2) };
    const history = [makeResult(0, 'p1'), makeResult(1, 'p2')];
    for (let seed = 0; seed < 20; seed++) {
      expect(generateLeap(makeInput({ seed, history }), small).leap.premiseId).toBe('p1');
    }
  });

  it('change au moins un archétype par rapport au saut précédent', () => {
    // c1 = confident, c2 = worried
    const history = [makeResult(0, 'p1', ['c1', 'c2'])];
    for (let seed = 0; seed < 200; seed++) {
      const { leap } = generateLeap(makeInput({ seed, history }), catalog);
      const archetypes = leap.characterIds.map(archetypeOf);
      expect(archetypes.some((a) => a !== 'confident' && a !== 'worried')).toBe(true);
    }
  });

  it('accepte de répéter les archétypes si le catalogue n’offre pas le choix', () => {
    const narrow: Catalog = {
      ...catalog,
      characters: [makeCharacter('x1', 'confident'), makeCharacter('x2', 'worried')],
    };
    const history = [makeResult(0, 'p1', ['x1', 'x2'])];
    const { leap } = generateLeap(makeInput({ history }), narrow);
    expect([...leap.characterIds].sort()).toEqual(['x1', 'x2']);
  });

  it('ignore les personnages inconnus de l’historique', () => {
    const history = [makeResult(0, 'p1', ['fantome', 'c1'])];
    expect(() => generateLeap(makeInput({ history }), catalog)).not.toThrow();
  });

  it('porte l’objet en transit au lieu d’en créer un', () => {
    const world = { ...createWorld(), artifacts: [makeArtifact('x1')] };
    for (let seed = 0; seed < 50; seed++) {
      expect(generateLeap(makeInput({ seed, world }), catalog).leap.artifactId).toBe(
        'a1',
      );
    }
  });

  it('propose un nouvel objet environ une fois sur deux, jamais un objet déjà possédé', () => {
    const world = { ...createWorld(), artifacts: [makeArtifact('x1', 'leap-1')] };
    let withArtifact = 0;
    const count = 400;
    for (let seed = 0; seed < count; seed++) {
      const { leap } = generateLeap(makeInput({ seed, world }), catalog);
      if (leap.artifactId !== null) {
        withArtifact++;
        expect(leap.artifactId).not.toBe('a1');
      }
    }
    expect(Math.abs(withArtifact / count - 0.5)).toBeLessThan(0.1);
  });

  it('ne propose aucun objet si le catalogue n’en a plus à offrir', () => {
    const none: Catalog = { ...catalog, artifacts: [] };
    for (let seed = 0; seed < 30; seed++) {
      expect(generateLeap(makeInput({ seed }), none).leap.artifactId).toBeNull();
    }
  });

  it('demande une trace environ une fois sur cinq', () => {
    let traces = 0;
    const count = 2000;
    for (let seed = 0; seed < count; seed++) {
      if (generateLeap(makeInput({ seed }), catalog).wantsTrace) traces++;
    }
    expect(Math.abs(traces / count - TRACE_PROBABILITY)).toBeLessThan(0.04);
  });

  it('donne le premier fragment non découvert, dans l’ordre, selon l’acte', () => {
    expect(generateLeap(makeInput(), catalog).leap.fragmentId).toBe('g1');

    const meta = makeMeta({ fragmentsDiscovered: ['g1', 'g2'] });
    // Acte 1 : plus rien à découvrir.
    expect(generateLeap(makeInput({ meta }), catalog).leap.fragmentId).toBeNull();

    // Acte 2 (saut n°6) : g3 devient disponible.
    const history = Array.from({ length: 5 }, (_, i) => makeResult(i, `p${(i % 4) + 1}`));
    expect(generateLeap(makeInput({ meta, history }), catalog).leap.fragmentId).toBe(
      'g3',
    );
  });

  it('ne renvoie pas de fragment quand tous sont découverts', () => {
    const meta = makeMeta({ fragmentsDiscovered: catalog.fragments.map((f) => f.id) });
    expect(generateLeap(makeInput({ meta }), catalog).leap.fragmentId).toBeNull();
  });

  it('signale les catalogues inutilisables', () => {
    expect(codeOf(() => generateLeap(makeInput(), { ...catalog, premises: [] }))).toBe(
      'empty_catalog',
    );
    expect(
      codeOf(() =>
        generateLeap(makeInput(), { ...catalog, characters: [catalog.characters[0]!] }),
      ),
    ).toBe('insufficient_characters');
    expect(codeOf(() => generateLeap(makeInput(), { ...catalog, fractures: [] }))).toBe(
      'unknown_fracture',
    );
  });
});

describe('prémisses de saison', () => {
  const day = (m: number, d: number): number => Date.UTC(2026, m - 1, d, 12);
  const seasonal: Catalog = {
    ...catalog,
    premises: [
      ...catalog.premises.slice(0, 2),
      {
        ...catalog.premises[2]!,
        id: 'fete',
        season: { from: '10-20', to: '11-10', label: 'La fête' },
      },
    ],
  };

  it('la fenêtre comprend ses bornes et enjambe le nouvel an', () => {
    const noel = { from: '12-01', to: '01-06', label: 'Noël' };
    expect(inSeason(noel, day(12, 1))).toBe(true);
    expect(inSeason(noel, day(1, 6))).toBe(true);
    expect(inSeason(noel, day(1, 7))).toBe(false);
    expect(inSeason(noel, day(11, 30))).toBe(false);
    expect(inSeason(noel, day(12, 25))).toBe(true);
  });

  it('hors saison, la prémisse de saison n’est jamais tirée', () => {
    for (let seed = 0; seed < 200; seed++) {
      const { leap } = generateLeap(makeInput({ seed, now: day(6, 15) }), seasonal);
      expect(leap.premiseId).not.toBe('fete');
    }
  });

  it('en saison, elle sort souvent, mais pas toujours', () => {
    let hits = 0;
    for (let seed = 0; seed < 400; seed++) {
      const { leap } = generateLeap(makeInput({ seed, now: day(10, 31) }), seasonal);
      if (leap.premiseId === 'fete') hits++;
    }
    expect(hits).toBeGreaterThan(100);
    expect(hits).toBeLessThan(400);
  });

  it('une prémisse de saison jouée récemment ne revient pas tout de suite', () => {
    const history = [makeResult(0, 'fete')];
    for (let seed = 0; seed < 100; seed++) {
      const { leap } = generateLeap(
        makeInput({ seed, history, now: day(10, 31) }),
        seasonal,
      );
      expect(leap.premiseId).not.toBe('fete');
    }
  });

  it('nomme la fête en cours', () => {
    expect(currentSeason(seasonal.premises, day(11, 1))?.label).toBe('La fête');
    expect(currentSeason(seasonal.premises, day(3, 1))).toBeNull();
  });
});

describe('advanceMeta', () => {
  const { leap } = generateLeap(makeInput(), catalog);

  it('ajoute le fragment une seule fois et recalcule l’acte', () => {
    const once = advanceMeta(makeMeta(), leap, 5);
    expect(once).toEqual({ fragmentsDiscovered: ['g1'], act: 2 });
    expect(advanceMeta(once, leap, 5).fragmentsDiscovered).toEqual(['g1']);
  });

  it('gère un saut sans fragment', () => {
    const meta = makeMeta();
    expect(advanceMeta(meta, { ...leap, fragmentId: null }, 1)).toEqual(meta);
  });
});

describe('startLeap / resolveLeap', () => {
  const addDoor: WorldMutation = {
    type: 'addDoor',
    door: { id: 'd1', label: 'Porte', openedInLeap: 'leap-new', epoch: 'e' },
  };
  const resolution = {
    leapId: 'leap-new',
    outcome: 'resolved' as const,
    fractureRepaired: true,
    mutations: [addDoor],
    now: 9000,
  };

  function started() {
    const { leap } = generateLeap(makeInput({ seed: 3 }), catalog);
    return { leap, chronology: startLeap(createChronology('joueur', 1), leap) };
  }

  it('démarre un saut et refuse d’en démarrer un second', () => {
    const { leap, chronology } = started();
    expect(chronology.currentLeap).toEqual(leap);
    expect(codeOf(() => startLeap(chronology, leap))).toBe('leap_in_progress');
  });

  it('livre l’objet en transit au saut qui le porte', () => {
    const base = createChronology('joueur', 1);
    const withTransit = {
      ...base,
      world: { ...base.world, artifacts: [makeArtifact('x1')] },
    };
    const { leap } = generateLeap(makeInput({ world: withTransit.world }), catalog);
    const result = startLeap(withTransit, leap);
    expect(result.world.artifacts[0]?.toLeap).toBe('leap-new');
  });

  it('laisse l’objet en transit si le saut ne le porte pas', () => {
    const base = createChronology('joueur', 1);
    const withTransit = {
      ...base,
      world: { ...base.world, artifacts: [makeArtifact('x1')] },
    };
    const { leap } = generateLeap(makeInput({ seed: 3 }), catalog);
    const result = startLeap(withTransit, { ...leap, artifactId: null });
    expect(result.world.artifacts[0]?.toLeap).toBeNull();
  });

  it('résout le saut : historique, monde, méta, saut courant vidé', () => {
    const { leap, chronology } = started();
    const resolved = resolveLeap(chronology, resolution);
    expect(resolved.currentLeap).toBeNull();
    expect(resolved.history).toHaveLength(1);
    expect(resolved.history[0]).toMatchObject({
      leapId: 'leap-new',
      premiseId: leap.premiseId,
      characterIds: leap.characterIds,
      outcome: 'resolved',
      fractureRepaired: true,
      resolvedAt: 9000,
      finalSuspicion: 0,
    });
    expect(resolved.world.doors).toHaveLength(1);
    expect(resolved.metaProgress.fragmentsDiscovered).toEqual(
      leap.fragmentId ? [leap.fragmentId] : [],
    );
    expect(chronology.history).toHaveLength(0);
  });

  it('est idempotent', () => {
    const { chronology } = started();
    const once = resolveLeap(chronology, resolution);
    expect(resolveLeap(once, resolution)).toBe(once);
  });

  it('refuse une résolution qui ne correspond pas au saut en cours', () => {
    const { chronology } = started();
    expect(
      codeOf(() => resolveLeap(chronology, { ...resolution, leapId: 'autre' })),
    ).toBe('leap_mismatch');
    expect(codeOf(() => resolveLeap(createChronology('joueur', 1), resolution))).toBe(
      'leap_mismatch',
    );
  });

  it('refuse des mutations invalides', () => {
    const { chronology } = started();
    const second: WorldMutation = {
      type: 'addDoor',
      door: { id: 'd2', label: 'Autre', openedInLeap: 'leap-new', epoch: 'e' },
    };
    expect(
      codeOf(() =>
        resolveLeap(chronology, { ...resolution, mutations: [addDoor, second] }),
      ),
    ).toBe('invalid_mutations');
  });
});
