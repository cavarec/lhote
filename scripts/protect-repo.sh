#!/usr/bin/env bash
# Usage : scripts/protect-repo.sh [--dry-run]
#
# Pose les deux règles GitHub décrites dans le README (« Mise en place unique », point 5) :
#   - main : PR obligatoire, checks « check » et « e2e » obligatoires, pas de force-push ;
#   - tags v* : création, modification et suppression réservées aux administrateurs.
# À lancer UNE fois, par toi, avec `gh` connecté en administrateur du dépôt. Relançable :
# une règle déjà présente (même nom) est mise à jour au lieu d'être dupliquée.
set -euo pipefail

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

command -v gh > /dev/null || { echo "✗ gh introuvable." >&2; exit 1; }
repo="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"
echo "Dépôt : $repo"

branch_rules='{
  "name": "protection-main",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "bypass_actors": [],
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request", "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false } },
    { "type": "required_status_checks", "parameters": {
        "strict_required_status_checks_policy": false,
        "required_status_checks": [ { "context": "check" }, { "context": "e2e" } ] } }
  ]
}'

# actor_id 5 = rôle « Admin » du dépôt : toi seul peux poser un tag, donc seul `npm run release` déploie.
tag_rules='{
  "name": "tags-de-release",
  "target": "tag",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/tags/v*"], "exclude": [] } },
  "bypass_actors": [ { "actor_id": 5, "actor_type": "RepositoryRole", "bypass_mode": "always" } ],
  "rules": [
    { "type": "creation" },
    { "type": "update" },
    { "type": "deletion" },
    { "type": "non_fast_forward" }
  ]
}'

apply() {
  local name="$1" body="$2" id
  id="$(gh api "repos/$repo/rulesets" --jq ".[] | select(.name==\"$name\") | .id" || true)"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    if [[ -n "$id" ]]; then echo "(dry-run) $name : mise à jour de #$id"; else echo "(dry-run) $name : création"; fi
    return
  fi
  if [[ -n "$id" ]]; then
    echo "$body" | gh api -X PUT "repos/$repo/rulesets/$id" --input - > /dev/null
    echo "✓ $name mise à jour (#$id)"
  else
    echo "$body" | gh api -X POST "repos/$repo/rulesets" --input - > /dev/null
    echo "✓ $name créée"
  fi
}

apply "protection-main" "$branch_rules"
apply "tags-de-release" "$tag_rules"
echo "Vérification : https://github.com/$repo/settings/rules"
