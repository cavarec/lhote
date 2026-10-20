# Animations Lottie

Dépose ici les fichiers `.json` générés (voir `content/ILLUSTRATIONS.md` pour les prompts). Ils sont
repérés tout seuls au build : aucun code à modifier. Sans fichier, le jeu garde ses gravures SVG.

Noms attendus, du plus précis au plus général :

- `premise-01-wakeup.json`, `premise-01-orientation.json`, `premise-01-dialogue.json`,
  `premise-01-investigation.json`, `premise-01-fracture.json` : une animation pour un moment précis ;
- `premise-01.json` : une animation pour tous les moments de cette histoire (de `premise-01` à
  `premise-07`) ;
- `mood-resolved.json`, `mood-failed.json`, `mood-exposed.json`, `mood-died.json` : les images de fin.

Un nom précis l'emporte sur le nom général. Format conseillé : 400 × 220, fond transparent, 30 i/s,
6 à 10 s en boucle, moins de 80 Ko, sans texte ni expressions (le lecteur léger ne les gère pas).
