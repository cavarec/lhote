# Changelog

Tenu à la main à chaque release. Versionnage sémantique strict (`vMAJOR.MINOR.PATCH`) :

- **MAJOR** : changement de schéma du Durable Object incomplet ou incompatible.
- **MINOR** : nouveau contenu narratif, nouvelle fonctionnalité.
- **PATCH** : correction de bug, ajustement de texte.

Chaque release ajoute une entrée `## [X.Y.Z] - AAAA-MM-JJ` : `scripts/check-tag.sh` refuse de déployer un tag sans elle.

## [Non publié]

### Ajouté

- Fondations : Vite + Svelte 5 (TypeScript strict), config ESLint 9 / Prettier / commitlint.
- Worker `lhote-api` en squelette (route `/api/health`, classe Durable Object `Chronology`), proxy same-origin Pages → Worker.
- CI (`ci.yml`), déploiement par tag (`deploy.yml`), scripts `release.sh`, `check-tag.sh` et `dev.sh`.
- Moteur (`src/lib/engine`) : types, générateur de sauts déterministe (mulberry32 + SHA-256), mutations du monde, suspicion, résolution idempotente. Couverture supérieure à 98 %.
- Types de contenu (`content/*/types.ts`).
- Worker `lhote-api` complet : routeur, middlewares `auth`, `ratelimit` (60 req/min dans le DO) et `cors` (dev), erreurs typées, Durable Object `Chronology`, traces KV (TTL 90 jours), export et suppression RGPD.
- Règles d'écriture automatiques (`tests/content/rules.ts`, §6.7) : phrases de 25 mots, tutoiement, adverbes en -ment, années, indices, choix, mutations, longueur des résultats.
- `content/VOIX.md` : principes de voix et échantillon de référence validé (beat 1).
- Type `Choice` : dialogues à choix (3 ou 4 options : neutre, risquée, informative).
- Contrat d'API partagé (`src/lib/api/types.ts`) ; `APP_VERSION` injectée au déploiement.

### Modifié

- Runners CI fixés sur `ubuntu-24.04`.
