# Contenu narratif

Le contenu vit ici, en TypeScript typé. Le moteur le reçoit par injection (`content/index.ts`).
Le ton et l'échantillon de référence sont dans `VOIX.md`. 4d complètera ce fichier (budget, probabilités).

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
- **Résultats** : `resultText` fait de 2 à 5 lignes, séparées par `\n`.

## Règles vérifiées par la CI

`tests/content/rules.test.ts` échoue si le texte joueur contient une phrase de plus de 25 mots, un
« vous », un adverbe en -ment, une année à 4 chiffres, ou une référence interdite. Il vérifie aussi
les indices, les choix, les mutations et la longueur des résultats.

### Exceptions -ment

Les noms et formes verbales en -ment ne sont pas des adverbes. La liste est dans
`MENT_EXCEPTIONS` (`tests/content/rules.ts`). Pour un vrai adverbe nécessaire, ajouter le mot à cette
liste avec un commentaire qui justifie le choix.
