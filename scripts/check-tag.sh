#!/usr/bin/env bash
# Usage : scripts/check-tag.sh vX.Y.Z
# Vérifie qu'un tag est déployable. Utilisé par release.sh (avant de taguer)
# et par deploy.yml (avant de déployer). Quitte avec 1 à la moindre anomalie.
#   1. le tag est sémantique strict (vX.Y.Z) ;
#   2. la version de package.json est égale au tag ;
#   3. CHANGELOG.md contient une entrée « ## [X.Y.Z] » ;
#   4. aucun placeholder « REMPLACER_ » ne reste dans les wrangler.toml.
set -euo pipefail

tag="${1:-}"
if [[ -z "$tag" ]]; then
  echo "Usage : $0 vX.Y.Z" >&2
  exit 2
fi

cd "$(dirname "$0")/.."
fail=0
err() {
  echo "✗ $*" >&2
  fail=1
}

if [[ ! "$tag" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  err "Tag '$tag' invalide : format attendu vX.Y.Z (ex. v0.1.0)."
else
  version="${tag#v}"

  pkg="$(node -p "require('./package.json').version")"
  if [[ "$pkg" != "$version" ]]; then
    err "package.json ($pkg) ne correspond pas au tag ($version)."
  fi

  if ! grep -qE "^## \[$version\]" CHANGELOG.md; then
    err "CHANGELOG.md n'a pas d'entrée « ## [$version] »."
  fi
fi

if grep -nE '^[^#]*REMPLACER_' wrangler.toml worker/wrangler.toml >&2; then
  err "Placeholders REMPLACER_ à renseigner dans les wrangler.toml (voir README)."
fi

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi
echo "✓ $tag est déployable."
