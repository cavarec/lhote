# Worker `lhote-api`

API `/api/*` et Durable Object `Chronology` (un par joueur, stockage SQLite). Le front l'appelle en
same-origin via la Pages Function `functions/api/[[path]].ts` (service binding).

## Contrat

Toutes les routes, sauf `/api/health`, exigent `X-Player-Id` : un UUID v4.
Absent : 400. Invalide : 401.

| Route               | Réponse                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `POST /api/leap`    | `{ leap, world, meta, trace }`. Rend le saut en cours s'il y en a un. |
| `POST /api/resolve` | `{ result, nextLeapAvailable }`. Idempotent sur `leapId`.             |
| `GET /api/state`    | `{ chronology }` (vierge, sans rien écrire, pour un nouveau joueur).  |
| `GET /api/export`   | JSON en téléchargement.                                               |
| `DELETE /api/state` | Supprime le DO et les traces KV du joueur.                            |
| `GET /api/health`   | `{ ok, version }`                                                     |

Erreur : `{ error: { code, message, details? } }`. Statuts : 400, 401, 404, 405, 409
(`leap_mismatch`), 413, 422, 429 (`Retry-After`), 500 (`content_error`, `internal_error`),
503 (`unavailable`, `Retry-After`).

`POST /api/resolve` reçoit `{ leapId, resolutionId, suspicion?, choices?, visitedBeats? }`. **Le client
désigne la résolution par son `id`** : l'issue et les mutations viennent du contenu côté serveur,
jamais du client.

## Limites connues

- **Rate limit** : 60 requêtes par minute et par `playerId`, comptées en mémoire dans le DO
  (aucune écriture KV, D4). Cela ne protège pas contre la création massive de `playerId` ;
  la protection par IP reste celle de Cloudflare.
- Les traces utilisent une lecture `list` KV (une page de 1 000 clés) quand le tirage 1/5 tombe.
- Chronologie supprimée après 365 jours d'inactivité (alarme du DO) [à valider].

## Tests

- `npm test` : service, routeur, validation, limiteur et traces, avec doubles en mémoire.
- Les adaptateurs plateforme (`index.ts`, `durable/Chronology.ts`) sont exclus de la couverture. Ils sont
  vérifiés par le test de fumée ci-dessous, sur le vrai runtime workerd.

## Test de fumée manuel

```bash
cd worker && npx wrangler dev --port 8787 &
B=localhost:8787; H="X-Player-Id: 11111111-1111-4111-8111-111111111111"
curl -s $B/api/health
curl -s -H "$H" -X POST $B/api/leap          # 500 content_error tant que content/ est vide (étape 4)
curl -s -H "$H" $B/api/state
curl -s -D - -H "$H" $B/api/export
curl -s -H "$H" -X DELETE $B/api/state
```
