# Contenu narratif

Le contenu vit ici, en TypeScript typé. Le moteur le reçoit par injection (`content/index.ts`).
Le ton et l'échantillon de référence sont dans `VOIX.md`.

## Conventions

- **Identifiants neutres** : `premise-01`, `fracture-01`. Aucun lieu réel, aucune année.
- **Emplacements de personnage** : `Dialogue.npcId` vaut `'0'` ou `'1'`. Le générateur tire deux
  personnages ; le dialogue de la prémisse vaut pour n'importe lequel. La voix propre à chaque
  archétype vient de `Character.dialogues`.
- **Mutations** : le contenu écrit des identifiants fixes et des champs `leapId` vides. À la
  résolution, `bindMutations` (`src/lib/engine/world.ts`) les suffixe par le saut et les fixe. Une même
  prémisse peut donc revenir sans collision.
  - `characterId` `'0'` ou `'1'` dans un `addPerson` désigne le personnage de cet emplacement.
  - `artifactId: 'leap'` dans un `addArtifact` désigne l'objet proposé par le saut. La mutation
    disparaît s'il n'y en a pas, ou si l'objet était déjà porté.
- **Éléments d'enquête avec `revealsArtifact`** : l'interface ne les affiche que si le saut propose
  un objet.
- **Choix** : 3 ou 4 options, avec au moins une neutre, une risquée et une informative.
- **Verrous d'enquête** : `Resolution.requiresAny` liste des vérités (`revealsTruth` d'un indice) dont
  l'une au moins doit avoir été apprise. Le joueur n'examine que deux natures d'indice sur trois, donc
  ce qu'il a cherché décide des issues praticables. Un test vérifie que la résolution et au moins
  quatre issues restent ouvertes quelle que soit l'enquête.
- **Texte sans genre pour les personnages** : l'emplacement `'0'` ou `'1'` peut être n'importe quel
  personnage ; on écrit « la personne », « quelqu'un », jamais « il » ni « elle » pour lui.
- **Résultats** : `resultText` fait de 2 à 5 lignes, séparées par `\n`.

## Légendes en sous-texte

Chaque légende est suggérée par un détail fonctionnel, jamais nommée ni expliquée (cahier des charges §2.7).
Le joueur qui la connaît la reconnaît ; l'autre passe à côté sans rien perdre.

| Scénario                      | Détail dans le texte                                                         | Écho                            |
| ----------------------------- | ---------------------------------------------------------------------------- | ------------------------------- |
| La mer rend un corps          | un essieu qui grince sans charrette, trois nuits de suite                    | le char de l'Ankou              |
| La mer rend un corps          | la cloche d'en dessous qui sonne dans la baie                                | la ville engloutie              |
| La mer rend un corps          | un peigne d'os aux dents cassées, pris dans les cheveux du mort              | le peigne, objet-trace          |
| Le jour du pardon             | un roi de pierre à cheval tourné vers l'ouest, la cloche sous la rivière     | la ville engloutie              |
| Le jour du pardon             | une statue de bois voilée, un crâne, un long manche, drap soulevé cette nuit | l'Ankou, la faux jamais montrée |
| Une histoire qui te ressemble | la dalle noire et l'écuelle qui appellent l'orage                            | la fontaine de la forêt         |
| Une histoire qui te ressemble | la femme sous l'aubépine qui ne laisse pas repartir l'homme                  | l'enchanteur et sa captive      |
| Une histoire qui te ressemble | une lueur verte que personne ne regarde, qui mène au marais                  | les feux follets                |

L'écran « Sources » de l'application cite les collecteurs (Luzel, Le Braz, Sébillot).

## Inventaire (MVP)

| Contenu                    | Quantité                                                      | Fichier                       |
| -------------------------- | ------------------------------------------------------------- | ----------------------------- |
| Prémisses                  | 7 (dont 2 de saison, voir plus bas)                           | `premises/premise-0{1..7}.ts` |
| Personnages                | 12 (3 par archétype : sûr de lui, inquiet, hostile, innocent) | `characters/archetypes.ts`    |
| Fractures                  | 14 (2 par prémisse)                                           | `fractures/index.ts`          |
| Objets-traces              | 6                                                             | `artifacts/index.ts`          |
| Fragments de méta-histoire | 10 (3 / 3 / 3 / 1 sur les 4 actes)                            | `fragments/index.ts`          |

Le budget du §6.2 prévoyait 4 fractures. Chaque prémisse en a deux, qui tournent autour du même
objet, pour que ses six résolutions restent justes quelle que soit la fracture tirée.

## Répliques des personnages

`Character.dialogues` a trois clés, présentes pour chaque personnage : `greeting` (première prise de
parole), `doubt` (quand l'hôte se conduit de façon étrange) et `farewell` (dernière réplique). Elles ne
citent ni lieu ni époque. `voice` est une consigne d'écriture interne, jamais affichée.

## Probabilités du générateur

Fixées dans `src/lib/engine/leap.ts` :

- nouvel objet-trace proposé quand aucun objet n'est en transit : 1 saut sur 2 ;
- trace d'un autre joueur : 1 saut sur 5 ;
- fragment : le prochain non découvert, dans l'ordre des actes, un par saut.

## Règles vérifiées par la CI

`tests/content/rules.test.ts` échoue si le texte joueur contient une phrase de plus de 25 mots, un
« vous », un adverbe en -ment, une année à 4 chiffres, ou une référence interdite. Il vérifie aussi
les indices, les choix, les mutations et la longueur des résultats.

### Exceptions -ment

Les noms et formes verbales en -ment ne sont pas des adverbes. La liste est dans
`MENT_EXCEPTIONS` (`tests/content/rules.ts`). Pour un vrai adverbe nécessaire, ajouter le mot à cette
liste avec un commentaire qui justifie le choix.

## Seconde passe et coups de théâtre

- `openingDialogue.secondRound` : une seconde passe de dialogue (réplique d'ouverture, puis 3 ou 4 choix) après la réponse au premier choix. Mêmes règles que le premier : au moins un choix neutre, un informatif et un risqué. La suspicion s'ajoute.
- `twists` : coups de théâtre joués entre l'enquête et la fracture. Le premier dont toutes les vérités de `requires` sont connues est joué ; celui sans `requires` est le repli et vient en dernier. Chaque prémisse en a quatre : deux vérités, la nature du corps, la nature sociale, repli.
- Chaque résolution se termine par une ligne de chute, qui laisse une inquiétude plutôt qu'une conclusion.

## Prémisses de saison

- `Premise.season` : `{ from: 'MM-JJ', to: 'MM-JJ', label }`, en UTC, bornes comprises. `from` après `to` enjambe le nouvel an (Noël : `12-01` à `01-06`).
- Hors saison, la prémisse n'est jamais tirée. En saison, quand elle n'a pas été jouée dans les deux derniers sauts, elle sort une fois sur deux (`SEASONAL_PROBABILITY`). Sans prémisse de saison ouverte, le tirage est identique à avant.
- `label` s'affiche sur l'accueil pendant la saison : « Ces jours-ci, c'est {label}. »
- Saisons en place : Kalan Goañv (`premise-04`, 20 octobre au 10 novembre) et Nedeleg (`premise-05`, 1er décembre au 6 janvier). Chaque saison a deux fractures qui tournent autour du même objet.

## Qui était ce corps

- `Premise.host` : `{ name, role, story, truth }`. Obligatoire. Le joueur se demande qui il est : un choix `qui-es-tu` au dialogue (réponse partielle du personnage), une vérité d'enquête (`truth`) qui donne le nom, et l'écran de fin qui donne la réponse complète (`story`, 1 à 3 phrases sans « il » ni « elle »).
- Chaque histoire commence par un commentaire de colonne vertébrale : qui demande quoi, ce qui est en jeu, le piège, ce que le joueur peut faire. Les indices d'une même nature sont lus d'un coup : écris-les pour qu'ils se lisent seuls.
- Les fragments répondent chacun à une question sur le joueur et en ouvrent une autre (voir `fragments/index.ts`).

## Histoires hors saison

- `premise-06`, « Le lavoir de minuit » : les lavandières de la nuit demandent d'aider à tordre un drap. On le tord à contre-main. Vérités : `sens-du-poignet` (corps), `drap-de-la-maison-du-bas` (social).
- `premise-07`, « Les cloches d'Ys » : une grève à marée basse, une dalle et son anneau de bronze. Le sel que tu portes est la clé. Vérités : `le-sel-est-la-cle` (corps), `la-porte-est-ouverte` (social).
- Ces deux histoires se jouent toute l'année, au même rang que les trois premières.

## Observateur, échos, geste de la main

- `content/observers/` : messages de l'Observateur, tirés à la fin d'un saut (poids 40 / 30 / 20 / 10 : utile, inutile, faux, personnel). Le message est un aparté : jamais signalé comme faux.
- `content/echoes/` : un écho personnel, une fois sur quatre, glissé dans l'orientation. Il ne dit jamais qu'il vient du joueur.
- `Premise.handLetGo` : « Laisser ta main faire ». Un geste pour le dialogue, un pour l'enquête, fixés par l'histoire. Résultat : `saves` (suspicion −15), `betrays` (+25) ou `reveals` (+10). Un geste d'enquête peut révéler une vérité qui existe vraiment dans l'enquête.
- Les tirages supplémentaires utilisent leur propre graine salée : les suites de tirage existantes ne changent pas.
