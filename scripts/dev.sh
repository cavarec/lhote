#!/usr/bin/env bash
# Développement local complet, sans aucun déploiement :
#   - Worker `lhote-api` (API + Durable Object + KV simulés)   http://localhost:8787
#   - Pages Functions + front construit (dist/), via Miniflare  http://localhost:8788  <- URL principale
#   - Vite en `build --watch` : dist/ se reconstruit à chaque modification (recharge la page à la main)
# Pour le rechargement à chaud (HMR), lance en plus `npm run dev:vite` dans un autre
# terminal : http://localhost:5173, avec /api renvoyé vers le port 8788.
# Tout tourne sur Miniflare (fourni par Wrangler). Arrêt : Ctrl+C.
#
# Note : `wrangler pages dev --proxy` est incompatible avec `pages_build_output_dir`
# (wrangler.toml) et n'accepte pas de --config personnalisé : d'où le mode répertoire.
set -euo pipefail
cd "$(dirname "$0")/.."

cleanup() {
  # Arrête les processus lancés en arrière-plan par ce script.
  # shellcheck disable=SC2046
  kill $(jobs -p) 2> /dev/null || true
}
trap cleanup EXIT INT TERM

# 1. Premier build (Pages exige que dist/ existe), puis reconstruction en continu.
npm run build
npx vite build --watch &

# 2. Le Worker (état local persisté dans .wrangler/state).
npx wrangler dev --config worker/wrangler.toml --port 8787 --persist-to .wrangler/state &

# 3. Pages Functions + dist/. Le binding API vient de wrangler.toml (service lhote-api),
#    résolu via le Worker lancé ci-dessus.
npx wrangler pages dev dist --port 8788
