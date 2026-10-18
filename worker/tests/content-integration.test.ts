import { describe, expect, it } from 'vitest';
import { catalog as realCatalog } from '../../content';
import type { ResolveResponse } from '../../src/lib/api/types';
import { startLeap } from '../../src/lib/engine/leap';
import type { Catalog, LeapState } from '../../src/lib/engine/types';
import { createChronology } from '../../src/lib/engine/world';
import { ChronologyService } from '../src/durable/service';
import { makeDeps, uuid } from './helpers';

// Chaque issue du contenu réel doit pouvoir être résolue par le vrai Worker.
const catalog: Catalog = realCatalog;

const PLAYER = uuid(42);

function leapFor(
  premiseId: string,
  fractureId: string,
  n: number,
  artifactId: string | null,
): LeapState {
  return {
    id: uuid(0x500 + n),
    seed: n,
    premiseId,
    characterIds: ['c1', 'c2'],
    fractureId,
    artifactId,
    fragmentId: null,
    traceId: null,
    startedAt: 1,
    suspicion: 0,
    visitedBeats: [],
    choices: {},
  };
}

describe('toutes les issues du contenu réel', () => {
  const cases = catalog.premises.flatMap((premise) =>
    premise.resolutions.map((resolution) => [premise.id, resolution.id] as const),
  );
  it('couvre 18 issues', () => {
    expect(cases).toHaveLength(18);
  });

  it.each(cases)(
    '%s / %s se résout, avec ou sans objet, et deux fois de suite',
    async (premiseId, resolutionId) => {
      const premise = catalog.premises.find((p) => p.id === premiseId)!;
      for (const artifactId of [null, 'a1']) {
        const ctx = makeDeps({ catalog });
        const service = new ChronologyService(ctx.deps);
        let chronology = createChronology(PLAYER, 1);

        for (let round = 0; round < 2; round++) {
          const leap = leapFor(
            premiseId,
            premise.fractures[round] ?? premise.fractures[0],
            round,
            artifactId,
          );
          chronology = startLeap(chronology, leap);
          ctx.storage.value = structuredClone(chronology);
          const response = await service.handle({
            op: 'resolve',
            playerId: PLAYER,
            body: { leapId: leap.id, resolutionId },
          });
          expect(response.status, JSON.stringify(response.body)).toBe(200);
          chronology = ctx.storage.value!;
          expect((response.body as ResolveResponse).result.leapId).toBe(leap.id);
        }

        const world = chronology.world;
        const touched = Object.values(world).filter((list) => list.length > 0).length;
        expect(touched).toBeLessThanOrEqual(2);
        expect(world.artifacts.length).toBeLessThanOrEqual(1);
      }
    },
  );
});
