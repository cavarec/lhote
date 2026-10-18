# L'Hôte

Jeu narratif PWA : tu ouvres les yeux dans le corps d'un inconnu, à une autre époque.

Front Vite + Svelte 5 (TypeScript strict) sur Cloudflare Pages. API dans un Worker `lhote-api`, avec un Durable Object `Chronology` par joueur et un KV de traces anonymisées. Pages appelle le Worker en same-origin, via une Function proxy et un service binding.

## Publier une version (l'essentiel)

`main` est protégée : la version et le CHANGELOG passent par une PR. Un push sur `main` ne déploie jamais rien (il lance seulement la CI). **Seul un tag `vX.Y.Z` déploie**, et seul `npm run release` pousse ce tag.

```bash
git switch -c release/0.1.0
npm version minor --no-git-tag-version   # patch | minor | major
# CHANGELOG.md : renommer « Non publié » en « [0.1.0] - AAAA-MM-JJ » (et garder un « Non publié » vide au-dessus)
git commit -am "chore(release): v0.1.0"
git push -u origin release/0.1.0         # ouvre la PR, attends la CI verte, merge

git switch main && git pull
npm run release -- --dry-run             # simule : vérifications, aucun effet
npm run release                          # tag annoté + push de CE tag seul = UN déploiement
```

Ne pousse jamais un tag à la main et n'utilise jamais `git push --tags` : il enverrait aussi d'anciens tags locaux.

## Ce qui déclenche quoi

| Événement                                    | Workflow                               | Déploiement ?    |
| -------------------------------------------- | -------------------------------------- | ---------------- |
| Pull request                                 | `ci.yml` : lint, types, tests, e2e     | Non              |
| Push sur `main`                              | `ci.yml` seulement                     | Non              |
| Push d'un tag `vX.Y.Z`                       | `deploy.yml`                           | **Oui, un seul** |
| Push d'un tag mal formé (`v1`, `v1.0.0-rc1`) | `deploy.yml` s'arrête à `check-tag.sh` | Non              |

`deploy.yml` enchaîne : `check-tag.sh` (format `vX.Y.Z`, `package.json` égal au tag, entrée CHANGELOG, aucun `REMPLACER_` dans les `wrangler.toml`) → commit taggé présent dans `main` → `npm ci` → lint → typecheck → tests → build → déploiement du Worker → déploiement de Pages. Un seul déploiement à la fois, jamais annulé en cours.

Le build tourne sur GitHub Actions et `wrangler pages deploy` envoie `dist/` à Cloudflare (Direct Upload). Cloudflare n'exécute donc aucun build de son côté. D'après sa documentation, le quota de 500 builds du plan gratuit concerne les builds lancés par l'intégration Git de Pages, pas les envois Direct Upload : à confirmer dans ton tableau de bord après le premier mois.

## Mise en place unique

1. **Projet Pages en Direct Upload**, jamais connecté à Git :
   ```bash
   npx wrangler pages project create lhote --production-branch=main
   ```
   Cloudflare ne permet pas de convertir un projet connecté à Git en Direct Upload (à vérifier dans le tableau de bord). Si `lhote` est déjà connecté à GitHub, supprime-le et recrée-le ainsi. Il n'y a alors ni déploiement automatique à désactiver, ni branche de preview.
2. **Namespace KV** des traces, puis colle les deux identifiants dans `worker/wrangler.toml` (en remplacement de `REMPLACER_PAR_ID_KV` et `REMPLACER_PAR_ID_KV_PREVIEW`) :
   ```bash
   npx wrangler kv namespace create TRACES
   npx wrangler kv namespace create TRACES --preview
   ```
   Tant qu'un `REMPLACER_` reste dans un `wrangler.toml`, `check-tag.sh` refuse le déploiement.
3. **Token API Cloudflare** : modèle « Edit Cloudflare Workers », plus la permission _Cloudflare Pages : Edit_ (compte).
4. **Secrets GitHub** (_Settings → Secrets and variables → Actions_) : `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`.
5. **Règles GitHub** (_Settings → Rules → Rulesets_) :
   - `main` : PR obligatoire, checks `check` et `e2e` obligatoires.
   - Tags `v*` : création réservée à toi.

## Développement local (aucun déploiement de test)

Prérequis : Node 22 ou plus récent, npm 10+.

```bash
npm ci
npm run dev
```

| Adresse               | Contenu                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| http://localhost:8788 | **URL principale** : front construit + Pages Functions + Worker (Durable Object et KV simulés par Miniflare)         |
| http://localhost:8787 | Le Worker seul                                                                                                       |
| http://localhost:5173 | Optionnel, via `npm run dev:vite` dans un autre terminal : front avec rechargement à chaud, `/api` renvoyé vers 8788 |

`npm run dev` construit `dist/`, le reconstruit à chaque modification (recharge la page à la main) et lance les deux serveurs Wrangler. L'état local est écrit dans `.wrangler/state` ; supprime ce dossier pour repartir de zéro. Pourquoi pas `--proxy` ? `wrangler pages dev --proxy` est incompatible avec `pages_build_output_dir`, et Pages n'accepte pas de `--config` personnalisé.

Contrôles locaux, identiques à la CI :

```bash
npm run lint        # ESLint + Prettier (--check)
npm run typecheck   # svelte-check (front) + tsc (Worker)
npm test            # Vitest
npm run build
```

`npm run format` applique Prettier. Les messages de commit suivent Conventional Commits (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `content`) et sont vérifiés par la CI sur les PR.

## Architecture de déploiement

```
wrangler.toml          Pages : front, Function proxy /api/*, service binding API -> lhote-api
worker/wrangler.toml   Worker lhote-api : Durable Object CHRONOLOGY, KV TRACES, migration SQLite
```

Pages ne contient ni Durable Object ni KV. Le binding de Pages pointe sur le Worker, qui doit donc exister avant : `deploy.yml` déploie le Worker en premier. Si tu modifies la classe `Chronology` de façon incompatible (renommage, suppression), ajoute une nouvelle entrée `[[migrations]]` avec un nouveau `tag` dans `worker/wrangler.toml`. Ne modifie jamais une migration déjà déployée.

## Revenir en arrière

- **Rapide** : tableau de bord Cloudflare → Pages → `lhote` → Deployments → déploiement précédent → _Rollback_. Cela ne concerne que Pages ; le Worker reste à sa version.
- **Propre** : corrige sur `main` par PR, puis nouvelle release (tag patch).
- **Relancer un déploiement raté** (secret manquant, panne réseau) : _Actions → Deploy → Re-run jobs_. Cela ne crée pas de nouveau tag.

## Dépannage

- _« Tag invalide »_ ou _« package.json ne correspond pas au tag »_ : le tag a été créé hors `npm run release`. Supprime-le (`git push origin :refs/tags/<tag> && git tag -d <tag>`) puis reprends la procédure de release.
- _`npm run release` refuse de continuer_ : il exige `main`, un arbre propre, synchronisé avec `origin/main`, une version de `package.json` supérieure à la dernière release et acceptée par `check-tag.sh`.
- _« Placeholders REMPLACER\_ à renseigner »_ : crée les namespaces KV (mise en place, point 2).

## État d'avancement

Étapes 1 (fondations), 2 (moteur déterministe), 3 (Worker et Durable Object, voir `worker/README.md`) et 4 (contenu MVP : 3 prémisses, 8 personnages, 6 fractures, 6 objets, 10 fragments) en place. Le rate limiting ne protège pas contre la création massive de `playerId` (limite connue, v1). L'étape 5 (UI) est en cours : les fondations (5a : design system, client d'API, IndexedDB, logique de jeu, magasin) sont en place ; restent les écrans (5b) et l'accessibilité avec les tests e2e (5c). La PWA (étape 6) reste à faire.
