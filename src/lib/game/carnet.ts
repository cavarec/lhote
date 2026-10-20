import type { Outcome } from '../../../content/premises/types';
import type { Catalog, LeapResult } from '../engine/types';

// Le carnet des hôtes : les corps déjà habités et les fins trouvées pour chacun. Tout vient de
// l'historique des sauts ; rien n'est stocké en plus.

export const OUTCOMES: readonly Outcome[] = ['resolved', 'failed', 'exposed', 'died'];

export const OUTCOME_LABEL: Record<Outcome, string> = {
  resolved: 'Réparé',
  failed: 'Raté',
  exposed: 'Démasqué',
  died: 'Mort',
};

export interface CarnetEntry {
  premiseId: string;
  title: string;
  visited: boolean;
  /** Absent tant que le corps n'a pas été habité. */
  host: { name: string; role: string } | null;
  found: Outcome[];
  total: number;
}

export function buildCarnet(
  catalog: Pick<Catalog, 'premises'>,
  history: readonly LeapResult[],
): CarnetEntry[] {
  return catalog.premises.map((premise) => {
    const runs = history.filter((h) => h.premiseId === premise.id);
    const available = new Set(premise.resolutions.map((r) => r.outcome));
    const found = OUTCOMES.filter(
      (o) => available.has(o) && runs.some((r) => r.outcome === o),
    );
    const visited = runs.length > 0;
    return {
      premiseId: premise.id,
      title: premise.title,
      visited,
      host:
        visited && premise.host
          ? { name: premise.host.name, role: premise.host.role }
          : null,
      found,
      total: available.size,
    };
  });
}

export function carnetTotals(entries: readonly CarnetEntry[]): {
  hosts: number;
  endings: number;
  endingsMax: number;
} {
  return {
    hosts: entries.filter((e) => e.visited).length,
    endings: entries.reduce((n, e) => n + e.found.length, 0),
    endingsMax: entries.reduce((n, e) => n + e.total, 0),
  };
}
