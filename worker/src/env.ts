import type { Chronology } from './durable/Chronology';

export interface Env {
  CHRONOLOGY: DurableObjectNamespace<Chronology>;
  TRACES: KVNamespace;
  /** Renseignée au déploiement avec le tag ; « dev » en local. */
  APP_VERSION?: string;
}
