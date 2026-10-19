# Changelog

Tenu à la main à chaque release. Versionnage sémantique strict (`vMAJOR.MINOR.PATCH`) :

- **MAJOR** : changement de schéma du Durable Object incomplet ou incompatible.
- **MINOR** : nouveau contenu narratif, nouvelle fonctionnalité.
- **PATCH** : correction de bug, ajustement de texte.

Chaque release ajoute une entrée `## [X.Y.Z] - AAAA-MM-JJ` : `scripts/check-tag.sh` refuse de déployer un tag sans elle.

## [Non publié]

## [0.11.0] - 2026-10-19

### Modifié

- Les sept histoires sont réécrites pour suivre un fil clair : chaque réplique répond à la précédente, chaque indice sert l'histoire ou dit qui tu es, chaque coup de théâtre découle de ce que tu as appris, chaque issue montre ses conséquences.
- Qui es-tu ? Chaque histoire propose un choix « Qui es-tu ? » au dialogue et un indice d'enquête qui donne le nom du corps que tu habites. L'écran de fin dit qui était ce corps, quelle que soit l'issue.
- Les dix fragments de méta-histoire répondent chacun à une question sur toi (ton nom, ce que tu as promis, qui te l'a demandé) et en ouvrent une nouvelle.
- Les fractures sont reformulées en phrases plus simples.

### Ajouté

- Un bouton « Sauter encore » sur l'écran de fin.

## [0.10.5] - 2026-10-19

### Modifié

- Accueil : une introduction explique qu'à chaque nouvelle lecture, tu es l'hôte d'un nouveau corps.
- Le cadre de l'accueil s'étend à tout le jeu : choix, boutons et réglages n'ont plus de boîte à bord fin. Deux filets ocre, en haut et en bas, terminés par une volute. Les filets entre deux choix sont partagés. Le bouton principal reste plein, avec un filet ocre intérieur.

## [0.10.4] - 2026-10-19

### Modifié

- Accueil : « Nouveautés » et « Partager » remontent sous les boutons, avec une icône devant. « Confidentialité et réglages » et « Sources » descendent en bas de page, en petit et discrets.
- Accueil : les boutons n'ont plus de cadre en boîte. Le bouton principal garde son fond plein avec un filet ocre intérieur ; les autres ont deux filets ocre, en haut et en bas, terminés par une volute.

## [0.10.3] - 2026-10-19

### Modifié

- Lecture plus stable : la place de chaque paragraphe est réservée avant qu'il s'écrive, donc les lignes ne bougent plus pendant l'écriture. La page ne défile plus qu'une fois par nouveau paragraphe, doucement, pour le poser au tiers haut de l'écran. Avant, elle montait à chaque ligne et le regard devait rattraper le texte.

## [0.10.2] - 2026-10-19

### Modifié

- Logo : le parasite frémit à peine, sursaute une fois toutes les 14 secondes, et l'œil ne cligne qu'à cet instant (avant : deux fois toutes les 7 secondes).
- Accueil : tout est composé dans la police du récit. Les boutons discrets, les liens, les avis et le message de partage ne passent plus à une autre police.

## [0.10.1] - 2026-10-19

### Ajouté

- Un logo sur l'accueil : l'œil du jeu, avec un parasite enroulé dans la pupille, comme un hôte qui en loge un autre. Un fil en sort par la paupière. Le parasite sursaute de temps en temps, et l'œil cligne au même instant, sauf si tu as demandé moins de mouvement. Les icônes de l'application et du navigateur reprennent le même dessin.

## [0.10.0] - 2026-10-19

### Ajouté

- Deux histoires hors saison, dans les légendes bretonnes : « Le lavoir de minuit » (les lavandières de la nuit) et « Les cloches d'Ys ». Chacune a une seconde passe de dialogue, quatre coups de théâtre, six issues et ses illustrations. Quatre fractures de plus (14 au total).
- « Laisser ta main faire » : au dialogue et à l'enquête, le corps hérité agit seul. Le résultat est fixé par l'histoire : il sauve, trahit ou révèle.
- L'Observateur : un aparté à la fin d'un saut (utile, inutile, faux ou personnel). Les échos personnels : un souvenir qui n'est pas le tien, glissé dans l'orientation, un saut sur quatre.
- Quatre personnages de métier breton (12 au total).
- Vitesse d'écriture réglable (lente, normale, rapide, tout d'un coup) et bouton « Tout afficher ».

### Modifié

- Tutoiement partout dans l'interface, messages d'erreur compris. Un test le vérifie.

## [0.9.2] - 2026-10-19

### Corrigé

- Pendant que le texte s'écrit, la page suit : le dernier paragraphe et les choix restent visibles sur un petit écran au lieu de disparaître sous le bas. Si tu remontes la page pour relire, elle ne te ramène pas de force.

## [0.9.1] - 2026-10-19

### Modifié

- Le lien « S'abonner aux nouveautés » menait à une impasse sur iPhone (Safari propose de chercher un lecteur de flux dans l'App Store). Il est remplacé par un bouton « Nouveautés » qui ouvre une page lisible dans le jeu. Le flux Atom reste disponible, en lien discret au bas de cette page, pour ceux qui ont un lecteur de flux.

## [0.9.0] - 2026-10-19

### Ajouté

- Deux histoires de saison, dans l'esprit des légendes bretonnes. « La table des absents » se joue autour de Kalan Goañv, la nuit des morts, du 20 octobre au 10 novembre : une table dressée, un couvert de trop, une lanterne de navet au carrefour. « La nuit où les bêtes parlent » se joue pour Nedeleg, de décembre à l'Épiphanie : à minuit, dans l'étable, les bêtes parlent, et celui qui les entend ne passe pas l'année. Chacune a sa seconde passe de dialogue, ses coups de théâtre, ses illustrations et six fins.
- Une prémisse peut être réservée à une fenêtre de dates. Hors saison, elle ne sort jamais. En saison, elle sort une fois sur deux quand elle n'a pas été jouée récemment. L'accueil nomme la fête en cours.
- Sur l'accueil, deux liens discrets : « Partager » (la feuille de partage du téléphone, sinon le lien est copié) et « S'abonner aux nouveautés » (un flux Atom généré depuis ce journal des versions, sans compteur ni traceur).

## [0.8.0] - 2026-10-19

### Ajouté

- Les trois histoires sont plus longues et plus tendues. Le dialogue a une seconde passe : la situation se resserre (la famille arrive en avance, l'envoyé de l'évêché monte l'escalier, le conteur approche de la fin) et tu choisis de nouveau, ce qui pèse sur la suspicion.
- Un coup de théâtre éclate entre l'enquête et la fracture. Il dépend de ce que tu as appris : deux vérités, une seule, ou aucune. Ce que tu as cherché change donc ce qui t'arrive.
- Deux indices de plus par histoire et une ligne de chute à chaque fin, qui laisse une inquiétude.

## [0.7.0] - 2026-10-19

### Modifié

- Les illustrations sont redessinées dans l'esprit de l'art celtique d'ornement : gravures au trait ocre sur parchemin, spirales, triskèles et volutes, filet d'ornement en haut et en bas. Les motifs sont construits par le code et ne copient aucune œuvre. Chaque histoire a ses images : vagues enroulées, cloche engloutie, roue du char et peigne pour la mer ; cloche, chasse et triskèle pour le pardon ; feu, fontaine noire et lueur pour la forêt. Les cinq images par histoire et les quatre ambiances de fin sont refaites.

## [0.6.0] - 2026-10-19

### Modifié

- Les légendes bretonnes sont plus présentes dans les trois histoires, toujours en sous-texte : un essieu qui grince sans charrette, une cloche qui sonne sous la baie, une statue voilée à la faux suggérée, un roi de pierre tourné vers la mer, une fontaine qui appelle l'orage, une femme sous une aubépine, une lueur verte qu'on ne regarde pas. Aucune n'est nommée ni expliquée.

### Ajouté

- Un écran « Sources », accessible depuis l'accueil, qui cite les collecteurs dont le travail a nourri le jeu (Luzel, Le Braz, Sébillot).

## [0.5.1] - 2026-10-19

### Corrigé

- La publication automatique décrite dans le README n'était pas présente sur `main` : la fusion d'une nouvelle version ne déployait rien. Elle y est maintenant : fusionner une PR qui change la version de `package.json` déploie, vérifie le site, puis pose le tag `vX.Y.Z` (après le succès, jamais avant). La voie manuelle `npm run release` reste possible.

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
