/** 60 requêtes par minute et par joueur (§5.5, D4), en fenêtre glissante. */
export const RATE_LIMIT = 60;
export const RATE_WINDOW_MS = 60_000;

export type RateDecision =
  { allowed: true } | { allowed: false; retryAfterSeconds: number };

/**
 * Compteur en mémoire du Durable Object : aucune écriture KV ni stockage par requête.
 * Limite connue : un DO évincé après inactivité repart de zéro, ce qui est sans
 * conséquence ici (une fenêtre inactive est de toute façon vide).
 */
export class SlidingWindowLimiter {
  private hits: number[] = [];

  constructor(
    private readonly limit: number = RATE_LIMIT,
    private readonly windowMs: number = RATE_WINDOW_MS,
  ) {}

  hit(now: number): RateDecision {
    this.hits = this.hits.filter((t) => now - t < this.windowMs);
    if (this.hits.length >= this.limit) {
      const oldest = this.hits[0] ?? now;
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((oldest + this.windowMs - now) / 1000),
      );
      return { allowed: false, retryAfterSeconds };
    }
    this.hits.push(now);
    return { allowed: true };
  }
}
