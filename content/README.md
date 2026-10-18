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

## Inventaire (MVP)

| Contenu                    | Quantité                                                         | Fichier                        |
| -------------------------- | ---------------------------------------------------------------- | ------------------------------ |
| Prémisses                  | 3 : la mer rend un corps, le jour du pardon, la veillée en forêt | `premises/premise-0{1,2,3}.ts` |
| Personnages                | 8 (2 par archétype : sûr de lui, inquiet, hostile, innocent)     | `characters/archetypes.ts`     |
| Fractures                  | 6 (2 par prémisse)                                               | `fractures/index.ts`           |
| Objets-traces              | 6                                                                | `artifacts/index.ts`           |
| Fragments de méta-histoire | 10 (3 / 3 / 3 / 1 sur les 4 actes)                               | `fragments/index.ts`           |

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
