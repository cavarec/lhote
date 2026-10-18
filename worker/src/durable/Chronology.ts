import { DurableObject } from 'cloudflare:workers';

// Squelette de l'étape 1 : la classe doit exister pour que le Worker se déploie
// (migration SQLite déclarée dans worker/wrangler.toml). Méthodes réelles à l'étape 3.
export class Chronology extends DurableObject {}
