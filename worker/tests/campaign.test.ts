import { describe, expect, it } from 'vitest';
import { catalog } from '../../content';
import type { LeapResponse, StateResponse } from '../../src/lib/api/types';
import { ChronologyService } from '../src/durable/service';
import { makeDeps, uuid } from './helpers';

// Une campagne entière de 22 sauts avec le contenu réel, du premier appel API à la fin du dernier
// acte : le jeu se génère, se résout et se souvient de bout en bout.
describe('campagne de 22 sauts', () => {
  it('enchaîne génération et résolution sans erreur, et respecte les règles du générateur', async () => {
    const ctx = makeDeps({ catalog, random: () => 0.5 });
    const service = new ChronologyService(ctx.deps);
    const player = uuid(77);
    const premises: string[] = [];
    const fragmentsSeen: string[] = [];

    for (let i = 0; i < 22; i++) {
      const leapResponse = await service.handle({ op: 'leap', playerId: player });
      expect(leapResponse.status, JSON.stringify(leapResponse.body)).toBe(200);
      const { leap } = leapResponse.body as LeapResponse;

      premises.push(leap.premiseId);
      if (leap.fragmentId) fragmentsSeen.push(leap.fragmentId);

      const premise = catalog.premises.find((p) => p.id === leap.premiseId)!;
      expect(premise.fractures).toContain(leap.fractureId);
      expect(new Set(leap.characterIds).size).toBe(2);

      const resolution = premise.resolutions[i % premise.resolutions.length]!;
      const resolved = await service.handle({
        op: 'resolve',
        playerId: player,
        body: { leapId: leap.id, resolutionId: resolution.id },
      });
      expect(resolved.status, JSON.stringify(resolved.body)).toBe(200);
    }

    // Jamais la même prémisse dans les deux sauts précédents.
    premises.forEach((id, i) => {
      expect(premises.slice(Math.max(0, i - 2), i)).not.toContain(id);
    });

    // Les dix fragments sortent dans l'ordre, un par saut, et le dernier après le saut 18.
    expect(fragmentsSeen).toEqual(catalog.fragments.map((f) => f.id));

    const state = await service.handle({ op: 'state', playerId: player });
    const { chronology } = state.body as StateResponse;
    expect(chronology.history).toHaveLength(22);
    expect(chronology.metaProgress.act).toBe(4);
    expect(chronology.metaProgress.fragmentsDiscovered).toHaveLength(10);
    expect(
      chronology.world.artifacts.filter((a) => a.toLeap === null).length,
    ).toBeLessThanOrEqual(1);
  });
});
