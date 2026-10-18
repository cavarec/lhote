import { describe, expect, it } from 'vitest';
import { catalog } from '../../content';
import { countWords } from './rules';

describe('catalogue de prémisses', () => {
  it('contient trois prémisses aux identifiants neutres et uniques', () => {
    const ids = catalog.premises.map((p) => p.id);
    expect(ids).toEqual(['premise-01', 'premise-02', 'premise-03']);
  });

  it('n’utilise chaque fracture qu’une fois, et toutes existent', () => {
    const used = catalog.premises.flatMap((p) => p.fractures);
    expect(new Set(used).size).toBe(used.length);
    for (const id of used) {
      expect(catalog.fractures.some((f) => f.id === id)).toBe(true);
    }
    expect(catalog.fractures.map((f) => f.id).sort()).toEqual([...used].sort());
  });

  it('donne à chaque prémisse des époques différentes', () => {
    const epochs = catalog.premises.map((p) => p.epoch);
    expect(new Set(epochs).size).toBe(epochs.length);
  });
});

describe.each(catalog.premises.map((p) => [p.id, p] as const))('%s', (_id, premise) => {
  it('a deux fractures distinctes', () => {
    expect(new Set(premise.fractures).size).toBe(2);
  });

  it('a des identifiants de résolution, de choix et de mutation uniques', () => {
    const resolutionIds = premise.resolutions.map((r) => r.id);
    expect(new Set(resolutionIds).size).toBe(resolutionIds.length);
    const choiceIds = (premise.openingDialogue.choices ?? []).map((c) => c.id);
    expect(new Set(choiceIds).size).toBe(choiceIds.length);
    const mutationIds = premise.resolutions.flatMap((r) =>
      r.mutations.map((m) => {
        switch (m.type) {
          case 'addDoor':
            return m.door.id;
          case 'addPerson':
            return m.person.id;
          case 'addTruth':
            return m.truth.id;
          case 'addArtifact':
            return m.artifact.id;
          case 'addScar':
            return m.scar.id;
        }
      }),
    );
    expect(new Set(mutationIds).size).toBe(mutationIds.length);
  });

  it('propose une issue de chaque nature : résolue, échec, exposée, morte', () => {
    const outcomes = new Set(premise.resolutions.map((r) => r.outcome));
    expect(outcomes).toEqual(new Set(['resolved', 'failed', 'exposed', 'died']));
    expect(premise.resolutions.filter((r) => r.fractureRepaired)).toHaveLength(1);
  });

  it('parle à un emplacement (0 ou 1), pas à un personnage nommé', () => {
    expect(['0', '1']).toContain(premise.openingDialogue.npcId);
  });

  it('place au plus un objet « leap » et seulement avec un élément d’enquête qui le révèle', () => {
    const leapArtifacts = premise.resolutions.flatMap((r) =>
      r.mutations.filter(
        (m) => m.type === 'addArtifact' && m.artifact.artifactId === 'leap',
      ),
    );
    expect(leapArtifacts.length).toBeLessThanOrEqual(premise.resolutions.length);
    if (leapArtifacts.length > 0) {
      expect(premise.investigation.some((i) => i.revealsArtifact === 'leap')).toBe(true);
    }
  });

  it('a un volume jouable (la cible du budget est de 1 500 mots avec les fractures et les PNJ)', () => {
    const texts = [
      premise.wakeup,
      ...premise.orientation.map((o) => o.text),
      ...premise.openingDialogue.lines.map((l) => l.text),
      ...(premise.openingDialogue.choices ?? []).flatMap((c) => [
        c.text,
        ...c.reply.map((l) => l.text),
      ]),
      ...premise.investigation.map((i) => i.text),
      ...premise.resolutions.flatMap((r) => [r.choiceText, r.resultText]),
    ];
    expect(texts.reduce((sum, text) => sum + countWords(text), 0)).toBeGreaterThan(700);
  });
});

describe('verrous d’enquête', () => {
  const natures = ['material', 'bodily', 'social'] as const;
  for (const premise of catalog.premises) {
    const truths = new Set(
      premise.investigation.flatMap((i) => (i.revealsTruth ? [i.revealsTruth] : [])),
    );
    it(`${premise.id} : les vérités exigées existent`, () => {
      for (const r of premise.resolutions) {
        for (const t of r.requiresAny ?? [])
          expect(truths.has(t), `${r.id} → ${t}`).toBe(true);
      }
    });
    it(`${premise.id} : quelle que soit l’enquête, la résolution et une fuite restent possibles`, () => {
      // Tous les couples de natures que le joueur peut choisir d’examiner.
      for (let skip = 0; skip < natures.length; skip++) {
        const seen = new Set(natures.filter((_, i) => i !== skip));
        const known = new Set(
          premise.investigation.flatMap((i) =>
            seen.has(i.kind) && i.revealsTruth ? [i.revealsTruth] : [],
          ),
        );
        const open = premise.resolutions.filter(
          (r) => !r.requiresAny?.length || r.requiresAny.some((t) => known.has(t)),
        );
        expect(
          open.some((r) => r.outcome === 'resolved'),
          `sans ${natures[skip]}`,
        ).toBe(true);
        expect(open.length).toBeGreaterThanOrEqual(4);
      }
    });
  }
});
