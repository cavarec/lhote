import { describe, expect, it } from 'vitest';
import { catalog } from '../../../content';
import type { Premise } from '../../../content/premises/types';
import type { LeapState } from '../engine/types';
import { collectedClues, knownTruths } from './beats';
import { buildCarnet, carnetTotals } from './carnet';
import { clueConsequence, choiceConsequence, handConsequence } from './consequences';
import {
  mechanicUsable,
  settleCountdown,
  ticksLeft,
  ticksSpent,
  useMechanic,
} from './mechanics';

const premiseOf = (kind: 'countdown' | 'silence' | 'object'): Premise => {
  const found = catalog.premises.find((p) => p.mechanic?.kind === kind);
  if (!found) throw new Error(`Aucune histoire ${kind}.`);
  return found;
};

const leapFor = (premise: Premise, choices: Record<string, string> = {}): LeapState => ({
  id: 'l',
  seed: 1,
  premiseId: premise.id,
  characterIds: ['a', 'b'],
  fractureId: premise.fractures[0],
  artifactId: 'x',
  fragmentId: null,
  traceId: null,
  startedAt: 0,
  suspicion: 0,
  visitedBeats: [1, 2, 3],
  choices,
});

describe('chaque histoire a sa mécanique', () => {
  it('les sept histoires en ont une, et les trois sortes sont représentées', () => {
    expect(catalog.premises.every((p) => p.mechanic)).toBe(true);
    const kinds = new Set(catalog.premises.map((p) => p.mechanic?.kind));
    expect(kinds).toEqual(new Set(['countdown', 'silence', 'object']));
  });
});

describe('compte à rebours', () => {
  const premise = premiseOf('countdown');
  const ticks = premise.mechanic?.kind === 'countdown' ? premise.mechanic.ticks : 0;

  it('consomme une réponse ou un geste à chaque fois', () => {
    expect(ticksLeft(premise, leapFor(premise))).toBe(ticks);
    expect(ticksSpent(premise, leapFor(premise, { dialogue: 'a' }))).toBe(1);
  });

  it('ne coûte rien tant qu’il en reste, puis une fois seulement', () => {
    const calm = leapFor(premise, { dialogue: 'a' });
    expect(settleCountdown(calm, premise)).toBe(calm);
    const choices: Record<string, string> = { dialogue: 'a', dialogue2: 'b' };
    premise.investigation.forEach((_, i) => (choices[`clue-${i}`] = 'seen'));
    const late = settleCountdown(leapFor(premise, choices), premise);
    expect(late.suspicion).toBe(20);
    expect(settleCountdown(late, premise).suspicion).toBe(20);
  });
});

describe('silence et objet', () => {
  it('le silence apaise une fois', () => {
    const premise = premiseOf('silence');
    const start = { ...leapFor(premise), suspicion: 30 };
    expect(mechanicUsable(premise, start)).toBe(true);
    const done = useMechanic(start, premise);
    expect(done.suspicion).toBe(15);
    expect(mechanicUsable(premise, done)).toBe(false);
    expect(() => useMechanic(done, premise)).toThrow();
  });

  it('l’objet apprend une vérité mais se remarque', () => {
    const premise = premiseOf('object');
    const truth =
      premise.mechanic?.kind === 'object' ? premise.mechanic.revealsTruth : '';
    const start = leapFor(premise);
    expect(knownTruths(premise, start).has(truth)).toBe(false);
    const done = useMechanic(start, premise);
    expect(done.suspicion).toBe(10);
    expect(knownTruths(premise, done).has(truth)).toBe(true);
  });

  it('refuse un compte à rebours', () => {
    const premise = premiseOf('countdown');
    expect(() => useMechanic(leapFor(premise), premise)).toThrow();
  });
});

describe('conséquences lisibles', () => {
  it('dit le sens du changement', () => {
    expect(choiceConsequence('neutral')).toContain('ne se méfient pas plus');
    expect(choiceConsequence('risky')).toContain('beaucoup plus');
    expect(handConsequence('saves')).toContain('moins');
    const set = new Set([1]);
    expect(clueConsequence({ indices: [1] }, set)).toContain('solide');
    expect(clueConsequence({ indices: [2] }, set)).toContain('détail');
  });
});

describe('carnet d’indices', () => {
  it('commence par les indices du réveil et ajoute ce qui est examiné', () => {
    const premise = catalog.premises[0]!;
    const before = collectedClues(premise, leapFor(premise));
    expect(before).toHaveLength(premise.orientation.length);
    const after = collectedClues(premise, leapFor(premise, { 'clue-1': 'seen' }));
    expect(after.length).toBeGreaterThan(before.length);
  });
});

describe('carnet des hôtes', () => {
  const result = (premiseId: string, outcome: 'resolved' | 'died') => ({
    leapId: premiseId + outcome,
    premiseId,
    characterIds: [],
    outcome,
    fractureRepaired: false,
    worldMutations: [],
    resolvedAt: 0,
    finalSuspicion: 0,
  });

  it('ne révèle un hôte qu’une fois habité', () => {
    const carnet = buildCarnet(catalog, [result('premise-01', 'resolved')]);
    expect(carnet).toHaveLength(7);
    expect(carnet[0]?.host?.name).toBe('Gwenn');
    expect(carnet[1]?.host).toBeNull();
  });

  it('compte les fins trouvées, une fois chacune', () => {
    const entries = buildCarnet(catalog, [
      result('premise-01', 'resolved'),
      result('premise-01', 'resolved'),
      result('premise-01', 'died'),
    ]);
    expect(entries[0]?.found).toEqual(['resolved', 'died']);
    const totals = carnetTotals(entries);
    expect(totals.hosts).toBe(1);
    expect(totals.endings).toBe(2);
    expect(totals.endingsMax).toBe(28);
  });
});
