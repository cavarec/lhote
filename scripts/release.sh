#!/usr/bin/env bash
# Usage : scripts/release.sh [--dry-run] [--yes]
#
# Pose et pousse le tag vX.Y.Z qui correspond à la version de package.json.
# NE COMMIT RIEN : main est protégée, la version et le CHANGELOG arrivent par la
# PR de release (voir README, « Publier une version »).
#
# Pousse UNIQUEMENT le tag créé ici, jamais `git push --tags` (qui enverrait aussi
# d'anciens tags locaux et déclencherait plusieurs déploiements).
set -euo pipefail

DRY_RUN=0
ASSUME_YES=0

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --yes | -y) ASSUME_YES=1 ;;
    -h | --help)
      sed -n '2,8p' "$0"
      exit 0
      ;;
    *)
      echo "Argument inconnu : $arg" >&2
      exit 2
      ;;
  esac
done

die() {
  echo "✗ $*" >&2
  exit 1
}

command -v git > /dev/null || die "git introuvable."
command -v node > /dev/null || die "node introuvable."

cd "$(git rev-parse --show-toplevel)"

# --- État git ------------------------------------------------------------------
branch="$(git rev-parse --abbrev-ref HEAD)"
[[ "$branch" == "main" ]] || die "Release uniquement depuis main (branche actuelle : $branch)."
[[ -z "$(git status --porcelain)" ]] || die "Arbre de travail non propre : commit ou stash d'abord."

git fetch origin main --tags --quiet || die "git fetch a échoué (réseau ? remote « origin » ?)."
[[ "$(git rev-parse HEAD)" == "$(git rev-parse origin/main)" ]] \
  || die "main local et origin/main diffèrent : fais un pull, et attends une CI verte."

# --- Version -------------------------------------------------------------------
version="$(node -p "require('./package.json').version")"
[[ "$version" != "0.0.0" ]] || die "package.json est en 0.0.0 : prépare d'abord la PR de release."
tag="v${version}"

if git rev-parse -q --verify "refs/tags/${tag}" > /dev/null; then
  die "Le tag ${tag} existe déjà en local."
fi
if git ls-remote --exit-code --tags origin "refs/tags/${tag}" > /dev/null 2>&1; then
  die "Le tag ${tag} existe déjà sur origin."
fi

last_tag="$(git tag --list 'v[0-9]*.[0-9]*.[0-9]*' | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' \
  | sort -V | tail -n1 || true)"
if [[ -n "$last_tag" ]]; then
  highest="$(printf '%s\n%s\n' "$last_tag" "$tag" | sort -V | tail -n1)"
  [[ "$highest" == "$tag" ]] || die "${tag} n'est pas supérieur à la dernière version (${last_tag})."
fi

bash scripts/check-tag.sh "$tag" || die "check-tag.sh a refusé ${tag}."

echo "Dernière version : ${last_tag:-(aucune)}"
echo "À publier        : ${tag}"
echo "Commit           : $(git log -1 --format='%h %s')"
echo "Effet            : tag annoté + push de ${tag} seul -> déclenche UN déploiement."

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "(dry-run : rien n'a été modifié)"
  exit 0
fi

if [[ "$ASSUME_YES" -ne 1 ]]; then
  read -r -p "Continuer ? [o/N] " answer
  [[ "$answer" =~ ^[oOyY]$ ]] || die "Annulé."
fi

git tag -a "$tag" -m "Release ${tag}"

if ! git push origin "refs/tags/${tag}"; then
  git tag -d "$tag" > /dev/null
  die "Le push a échoué. Tag local supprimé, rien n'a été déployé."
fi

echo "✓ ${tag} poussé. Suivi du déploiement : onglet Actions du dépôt GitHub."
