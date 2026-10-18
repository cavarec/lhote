import { realTimers, sleep, type Timers } from '../utils/time';
import type {
  ApiErrorBody,
  HealthResponse,
  LeapResponse,
  ResolveRequest,
  ResolveResponse,
  StateResponse,
} from './types';

// Client HTTP du jeu (§10.3) : timeout de 10 s, trois nouvelles tentatives (1 s, 3 s, 9 s) et
// disjoncteur après 5 échecs. Seules les erreurs transitoires sont retentées ; les routes de
// l'API sont idempotentes, donc rejouer `leap` ou `resolve` est sans danger.

export const TIMEOUT_MS = 10_000;
export const RETRY_DELAYS_MS: readonly number[] = [1_000, 3_000, 9_000];
export const BREAKER_THRESHOLD = 5;
export const BREAKER_COOLDOWN_MS = 30_000;

export type ApiErrorKind =
  /** Réponse HTTP d'erreur du serveur. */
  | 'http'
  /** Pas de réseau, serveur injoignable ou délai dépassé. */
  | 'network'
  /** Disjoncteur ouvert : aucune requête n'est envoyée. */
  | 'circuit_open';

export class ApiClientError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number | null;
  readonly code: string;
  readonly details: unknown;
  /** Secondes à attendre, quand le serveur l'indique (429, 503). */
  readonly retryAfter: number | null;

  constructor(
    kind: ApiErrorKind,
    code: string,
    message: string,
    options: { status?: number; details?: unknown; retryAfter?: number } = {},
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.kind = kind;
    this.code = code;
    this.status = options.status ?? null;
    this.details = options.details;
    this.retryAfter = options.retryAfter ?? null;
  }

  /** Vrai quand le problème vient du réseau : le jeu doit se replier sur le hors-ligne. */
  get offline(): boolean {
    return this.kind === 'network' || this.kind === 'circuit_open';
  }

  /** Une erreur transitoire vaut une nouvelle tentative ; une erreur de requête, jamais. */
  get retryable(): boolean {
    return (
      this.kind === 'network' ||
      this.status === 502 ||
      this.status === 503 ||
      this.status === 504
    );
  }
}

export interface ApiClientOptions {
  playerId: string;
  baseUrl?: string;
  fetchFn?: typeof fetch;
  sleepFn?: (ms: number) => Promise<void>;
  timers?: Timers;
  now?: () => number;
  timeoutMs?: number;
  retryDelaysMs?: readonly number[];
  /** Le navigateur se sait hors ligne : inutile d'insister (par défaut `navigator.onLine`). */
  isOnline?: () => boolean;
}

export class ApiClient {
  private readonly playerId: string;
  private readonly baseUrl: string;
  private readonly fetchFn: typeof fetch;
  private readonly sleepFn: (ms: number) => Promise<void>;
  private readonly timers: Timers;
  private readonly now: () => number;
  private readonly timeoutMs: number;
  private readonly retryDelays: readonly number[];
  private readonly isOnline: () => boolean;

  private failures = 0;
  private openUntil = 0;

  constructor(options: ApiClientOptions) {
    this.playerId = options.playerId;
    this.baseUrl = options.baseUrl ?? '';
    this.fetchFn = options.fetchFn ?? ((input, init) => fetch(input, init));
    this.sleepFn = options.sleepFn ?? sleep;
    this.timers = options.timers ?? realTimers;
    this.now = options.now ?? Date.now;
    this.timeoutMs = options.timeoutMs ?? TIMEOUT_MS;
    this.retryDelays = options.retryDelaysMs ?? RETRY_DELAYS_MS;
    this.isOnline = options.isOnline ?? browserIsOnline;
  }

  /** Vrai tant que le disjoncteur refuse d'envoyer des requêtes. */
  get circuitOpen(): boolean {
    return this.now() < this.openUntil;
  }

  leap(): Promise<LeapResponse> {
    return this.request<LeapResponse>('POST', '/api/leap');
  }

  resolve(body: ResolveRequest): Promise<ResolveResponse> {
    return this.request<ResolveResponse>('POST', '/api/resolve', body);
  }

  state(): Promise<StateResponse> {
    return this.request<StateResponse>('GET', '/api/state');
  }

  /** Export RGPD : le JSON tel que renvoyé par le serveur. */
  exportData(): Promise<unknown> {
    return this.request<unknown>('GET', '/api/export');
  }

  deleteState(): Promise<{ deleted: true }> {
    return this.request<{ deleted: true }>('DELETE', '/api/state');
  }

  health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('GET', '/api/health');
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    if (this.circuitOpen) {
      throw new ApiClientError(
        'circuit_open',
        'circuit_open',
        'Trop d’échecs récents : nouvelle tentative dans un instant.',
      );
    }

    let lastError: ApiClientError | null = null;
    for (let attempt = 0; attempt <= this.retryDelays.length; attempt++) {
      try {
        const result = await this.attempt<T>(method, path, body);
        this.failures = 0;
        return result;
      } catch (error) {
        const failure = error instanceof ApiClientError ? error : toNetworkError(error);
        lastError = failure;
        const delay = this.retryDelays[attempt];
        if (!failure.retryable || delay === undefined) break;
        // Hors ligne, les reprises à 1, 3 et 9 s ne servent à rien : on bascule tout de suite.
        if (failure.kind === 'network' && !this.isOnline()) break;
        await this.sleepFn(
          failure.retryAfter !== null ? Math.min(failure.retryAfter, 30) * 1000 : delay,
        );
      }
    }

    const error = lastError ?? toNetworkError(null);
    // Seules les pannes comptent pour le disjoncteur : une erreur de requête (4xx) n'en est pas une.
    if (error.retryable) {
      this.failures += 1;
      if (this.failures >= BREAKER_THRESHOLD) {
        this.openUntil = this.now() + BREAKER_COOLDOWN_MS;
        this.failures = 0;
      }
    } else {
      this.failures = 0;
    }
    throw error;
  }

  private async attempt<T>(method: string, path: string, body: unknown): Promise<T> {
    const controller = new AbortController();
    const cancelTimer = this.timers.set(() => controller.abort(), this.timeoutMs);
    try {
      const headers: Record<string, string> = { 'X-Player-Id': this.playerId };
      const init: RequestInit = { method, headers, signal: controller.signal };
      if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
        init.body = JSON.stringify(body);
      }
      const response = await this.fetchFn(`${this.baseUrl}${path}`, init);
      if (!response.ok) throw await toHttpError(response);
      // Cast justifié : le serveur et le client partagent src/lib/api/types.ts.
      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof ApiClientError) throw error;
      throw toNetworkError(error);
    } finally {
      cancelTimer();
    }
  }
}

function toNetworkError(error: unknown): ApiClientError {
  const timedOut = error instanceof DOMException && error.name === 'AbortError';
  return new ApiClientError(
    'network',
    timedOut ? 'timeout' : 'network_error',
    timedOut ? 'Le serveur met trop de temps à répondre.' : 'Connexion impossible.',
  );
}

async function toHttpError(response: Response): Promise<ApiClientError> {
  let code = 'http_error';
  let message = `Erreur ${response.status}.`;
  let details: unknown;
  try {
    const parsed = (await response.json()) as Partial<ApiErrorBody>;
    if (parsed.error) {
      code = parsed.error.code;
      message = parsed.error.message;
      details = parsed.error.details;
    }
  } catch {
    // corps absent ou illisible : on garde le message générique
  }
  const header = Number(response.headers.get('Retry-After'));
  return new ApiClientError('http', code, message, {
    status: response.status,
    details,
    ...(Number.isFinite(header) && header > 0 ? { retryAfter: header } : {}),
  });
}

/**
 * Lit `navigator.onLine` sans dépendre des types DOM : ce fichier est aussi compilé pour le
 * Worker, qui n'a pas de `navigator.onLine`. Le cast est volontaire et limité à cette lecture.
 */
function browserIsOnline(): boolean {
  const nav = (globalThis as { navigator?: { onLine?: boolean } }).navigator;
  return nav?.onLine !== false;
}
