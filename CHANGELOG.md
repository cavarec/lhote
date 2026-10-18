# Changelog

Tenu à la main à chaque release. Versionnage sémantique strict (`vMAJOR.MINOR.PATCH`) :

- **MAJOR** : changement de schéma du Durable Object incomplet ou incompatible.
- **MINOR** : nouveau contenu narratif, nouvelle fonctionnalité.
- **PATCH** : correction de bug, ajustement de texte.

Chaque release ajoute une entrée `## [X.Y.Z] - AAAA-MM-JJ` : `scripts/check-tag.sh` refuse de déployer un tag sans elle.

## [Non publié]

## [0.5.0] - 2026-10-19

### Modifié

- Nouveaux scénarios, tirés des trois prémisses bretonnes du cahier des charges, à la place du village sous la neige, du fanal et du train :
  - « Ce que rend la mer » : un village de pêcheurs, la mer a rendu un corps, et tu laves les morts ;
  - « Le jour du pardon » : un prêtre fiévreux doit porter la chasse en procession, et il doute ;
  - « Une histoire qui te ressemble » : une veillée en forêt, un conteur dont le récit te ressemble trop, et tu n'entends que d'une oreille.
- Chaque scénario a son miroir (reflet dans l'eau, un autre te regarde, pas de reflet) et son corps hérité (mains qui tremblent, fièvre, surdité) qui sert aussi de clé à l'enquête. Les fractures ont deux lectures opposées (empêcher, laisser faire) et aucune n'est dite juste.
- Trois objets-traces deviennent légendaires : une clé d'or, un peigne d'ivoire, un carnet de contes.
- Les illustrations sont redessinées pour les nouveaux lieux (grève, sacristie, clairière).

### Ajouté

- Des illustrations d'ambiance dessinées en SVG (lavis d'encre, sans image à charger, donc disponibles hors connexion) : une par temps du récit et par prémisse, et une par issue sur l'écran de fin. Elles s'animent doucement et s'immobilisent si le système demande moins de mouvement.
- L'enquête devient un choix : le temps manque pour tout examiner, le joueur n'ouvre que deux natures d'indice sur trois. Selon ce qu'il a appris, certaines issues restent praticables et d'autres sont grisées (« Tu n'en sais pas assez pour tenter cela »). La résolution reste toujours possible, quelle que soit l'enquête.
- Chaque scénario compte environ 1 500 mots : un saut dure 8 à 12 minutes.

## [0.1.1] - 2026-10-18

### Corrigé

- L'enquête regroupe les indices par nature (un bouton « Regarder autour de soi », « Écouter ce corps » ou « Observer les autres » au plus) au lieu de répéter le même libellé pour chaque indice.
- Le contrôle du site en ligne lit l'adresse réelle du déploiement Pages au lieu de supposer `lhote.pages.dev`, qui appartient à un tiers.

## [0.1.0] - 2026-10-18

Première version : le jeu complet, jouable hors connexion.

### Ajouté

- Le déploiement crée le projet Pages au premier passage : plus d'étape manuelle côté Cloudflare, hors jeton d'API.

- Étape 7 : `deploy.yml` vérifie le site en ligne après le déploiement (version du tag, app shell, manifeste, service worker, un vrai saut de bout en bout puis suppression du joueur de test) ; en-têtes de cache (service worker toujours revalidé, fichiers à empreinte immuables) ; recette sur appareils iOS et Android (`docs/RECETTE-APPAREILS.md`).

- Étape 6, PWA : manifeste (icônes 192/512 et maskable, standalone), service worker Workbox (precache de l'app shell et du contenu des 3 prémisses, `/api/leap` et `/api/resolve` en NetworkOnly, `/api/state` en NetworkFirst), bandeau hors connexion, invite d'installation après un saut terminé, mise à jour silencieuse. Tests e2e hors connexion. Lighthouse en local : performance 99, accessibilité 100, bonnes pratiques 100.

- Étape 5c : tests e2e Playwright contre le vrai Worker (parcours complet, reprise après rechargement, résolution hors connexion, réglages, export et suppression) et audit axe WCAG AA de chaque écran et beat. Un clic ou Échap affiche toute la scène d'un coup.

- Étape 5b, écrans : accueil, saut (6 beats, machine à écrire, 5 points de progression), fin de saut, journal, épilogue (débloqué quand tous les fragments sont retrouvés), confidentialité et réglages (taille du texte, animations, export et suppression des données). Chaque écran est un chunk chargé à la demande.

- Étape 5a, fondations du front : design system (`src/app.css`, Crimson Pro auto-hébergée, contrastes AA testés), client d'API résilient (retry 1 s/3 s/9 s, timeout 10 s, disjoncteur), stockage IndexedDB avec repli mémoire, logique de jeu pure (`src/lib/game/beats.ts`), contrôleur hors-ligne avec file de résolutions (`controller.ts`) et magasin réactif Svelte 5 (`stores/game.svelte.ts`).

- Fondations : Vite + Svelte 5 (TypeScript strict), config ESLint 9 / Prettier / commitlint.
- Worker `lhote-api` en squelette (route `/api/health`, classe Durable Object `Chronology`), proxy same-origin Pages → Worker.
- CI (`ci.yml`), déploiement par tag (`deploy.yml`), scripts `release.sh`, `check-tag.sh` et `dev.sh`.
- Moteur (`src/lib/engine`) : types, générateur de sauts déterministe (mulberry32 + SHA-256), mutations du monde, suspicion, résolution idempotente. Couverture supérieure à 98 %.
- Types de contenu (`content/*/types.ts`).
- Worker `lhote-api` complet : routeur, middlewares `auth`, `ratelimit` (60 req/min dans le DO) et `cors` (dev), erreurs typées, Durable Object `Chronology`, traces KV (TTL 90 jours), export et suppression RGPD.
- Règles d'écriture automatiques (`tests/content/rules.ts`, §6.7) : phrases de 25 mots, tutoiement, adverbes en -ment, années, indices, choix, mutations, longueur des résultats.
- 8 personnages archétypes, 6 objets-traces et 10 fragments de méta-histoire ; le catalogue est complet et le jeu se génère de bout en bout. Test d'une campagne de 22 sauts.
- Prémisses 2 « Le fanal » (ville portuaire en reconstruction) et 3 « Le compartiment sept » (train arrêté une nuit d'été), avec leurs fractures. Test d'intégration des 18 issues contre le vrai Worker.
- Prémisse 1 « La réserve d'huile » (`premise-01`, un hiver sans électricité) et ses deux fractures.
- `bindMutations` : identifiants de mutation liés au saut, emplacements de personnage et objet du saut. Corrige les collisions quand une prémisse revient.
- `content/README.md` : conventions de contenu.
- `content/VOIX.md` : principes de voix et échantillon de référence validé (beat 1).
- Type `Choice` : dialogues à choix (3 ou 4 options : neutre, risquée, informative).
- Contrat d'API partagé (`src/lib/api/types.ts`) ; `APP_VERSION` injectée au déploiement.

### Modifié

- Corrigé avant sa sortie : l'état du saut (proxy Svelte) ne pouvait pas s'enregistrer dans IndexedDB ; l'écran de fin est préchargé pour rester disponible hors connexion.

- Runners CI fixés sur `ubuntu-24.04`.
