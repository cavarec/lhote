import { DurableObject } from 'cloudflare:workers';
import { catalog } from '../../../content';
import type { Chronology as ChronologyData } from '../../../src/lib/engine/types';
import type { Env } from '../env';
import { KvTraceStore } from '../utils/traces';
import type { ServiceResponse } from '../utils/errors';
import {
  ChronologyService,
  type ChronologyStorage,
  type ServiceRequest,
} from './service';

const KEY = 'chronology';

/** Adaptateur fin entre `ChronologyService` et le stockage SQLite du Durable Object. */
class DoStorage implements ChronologyStorage {
  constructor(private readonly storage: DurableObjectStorage) {}

  async load(): Promise<ChronologyData | null> {
    return (await this.storage.get<ChronologyData>(KEY)) ?? null;
  }

  async save(chronology: ChronologyData): Promise<void> {
    await this.storage.put(KEY, chronology);
  }

  async clear(): Promise<void> {
    await this.storage.deleteAlarm();
    await this.storage.deleteAll();
  }

  async scheduleExpiry(at: number): Promise<void> {
    await this.storage.setAlarm(at);
  }
}

/** Un Durable Object par joueur (`idFromName(playerId)`). */
export class Chronology extends DurableObject<Env> {
  private readonly service: ChronologyService;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.service = new ChronologyService({
      catalog,
      storage: new DoStorage(ctx.storage),
      traces: new KvTraceStore(env.TRACES),
      now: () => Date.now(),
      uuid: () => crypto.randomUUID(),
      random: () => Math.random(),
    });
  }

  /** Point d'entrée RPC unique : le routeur lui passe l'opération demandée. */
  handle(request: ServiceRequest): Promise<ServiceResponse> {
    return this.service.handle(request);
  }

  override async alarm(): Promise<void> {
    await this.service.expire();
  }
}
