/**
 * Générateur pseudo-aléatoire déterministe mulberry32 : mêmes seeds, mêmes tirages,
 * sur le front comme dans le Worker. Aucune dépendance, aucun Math.random.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rng {
  /** Flottant dans [0, 1). */
  next(): number;
  /** Entier dans [0, maxExclusive). */
  int(maxExclusive: number): number;
  /** Élément tiré dans une liste non vide. */
  pick<T>(items: readonly T[]): T;
  /** Vrai avec la probabilité donnée (0 : jamais, 1 : toujours). */
  chance(probability: number): boolean;
  /** Copie mélangée (Fisher-Yates), sans modifier l'original. */
  shuffle<T>(items: readonly T[]): T[];
}

export function createRng(seed: number): Rng {
  const next = mulberry32(seed);

  function int(maxExclusive: number): number {
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
      throw new RangeError(`int : borne invalide (${maxExclusive}).`);
    }
    return Math.floor(next() * maxExclusive);
  }

  function pick<T>(items: readonly T[]): T {
    if (items.length === 0) {
      throw new RangeError('pick : liste vide.');
    }
    // Cast justifié : l'index est borné par items.length (vérifié non nul ci-dessus),
    // et T peut légitimement contenir undefined, donc on ne peut pas tester la valeur.
    return items[int(items.length)] as T;
  }

  function chance(probability: number): boolean {
    return next() < probability;
  }

  function shuffle<T>(items: readonly T[]): T[] {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = int(i + 1);
      // Cast justifié : i et j sont dans [0, copy.length).
      [copy[i], copy[j]] = [copy[j] as T, copy[i] as T];
    }
    return copy;
  }

  return { next, int, pick, chance, shuffle };
}
