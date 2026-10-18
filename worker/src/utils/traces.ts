import type { Trace } from '../../../src/lib/api/types';
import { sanitizeText } from './validate';

/** TTL des traces : 90 jours (§5.4). */
export const TRACE_TTL_SECONDS = 90 * 24 * 60 * 60;
export const TRACE_FRAGMENT_MAX = 200;
const PREFIX = 'trace:';

export interface TraceStore {
  /** Une trace au hasard parmi celles des autres joueurs. */
  pickOther(
    ownHash: string,
    random: () => number,
  ): Promise<{ key: string; trace: Trace } | null>;
  get(key: string): Promise<Trace | null>;
  put(key: string, trace: Trace): Promise<void>;
  deleteByOwner(ownHash: string): Promise<void>;
}

export function traceKey(playerHash: string, leapId: string): string {
  return `${PREFIX}${playerHash}:${leapId}`;
}

/** Première phrase du texte de résolution, nettoyée : la trace reste discrète (§2.3). */
export function makeTraceFragment(text: string): string {
  const clean = sanitizeText(text, 1000);
  const end = clean.search(/[.!?…]/);
  const sentence = end === -1 ? clean : clean.slice(0, end + 1);
  return sanitizeText(sentence, TRACE_FRAGMENT_MAX);
}

/** Les valeurs de KV sont relues comme non fiables : forme vérifiée, texte re-nettoyé. */
export function parseTrace(raw: unknown): Trace | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const { fragment, timestamp, epoch } = raw as Record<string, unknown>;
  if (typeof fragment !== 'string' || typeof epoch !== 'string') return null;
  if (typeof timestamp !== 'number' || !Number.isFinite(timestamp)) return null;
  return {
    fragment: sanitizeText(fragment, TRACE_FRAGMENT_MAX),
    timestamp,
    epoch: sanitizeText(epoch, 100),
  };
}

export class KvTraceStore implements TraceStore {
  constructor(private readonly kv: KVNamespace) {}

  async pickOther(
    ownHash: string,
    random: () => number,
  ): Promise<{ key: string; trace: Trace } | null> {
    const own = `${PREFIX}${ownHash}:`;
    const listed = await this.kv.list({ prefix: PREFIX, limit: 1000 });
    const candidates = listed.keys
      .map((k) => k.name)
      .filter((name) => !name.startsWith(own));
    // Cast justifié : l'index est borné par candidates.length, vérifié non nul juste avant.
    const key =
      candidates.length === 0
        ? null
        : (candidates[Math.floor(random() * candidates.length)] as string);
    if (key === null) return null;
    const trace = await this.get(key);
    return trace ? { key, trace } : null;
  }

  async get(key: string): Promise<Trace | null> {
    return parseTrace(await this.kv.get(key, 'json'));
  }

  async put(key: string, trace: Trace): Promise<void> {
    await this.kv.put(key, JSON.stringify(trace), { expirationTtl: TRACE_TTL_SECONDS });
  }

  async deleteByOwner(ownHash: string): Promise<void> {
    const prefix = `${PREFIX}${ownHash}:`;
    let cursor: string | undefined;
    do {
      const page = await this.kv.list({ prefix, ...(cursor ? { cursor } : {}) });
      await Promise.all(page.keys.map((k) => this.kv.delete(k.name)));
      cursor = page.list_complete ? undefined : page.cursor;
    } while (cursor);
  }
}
