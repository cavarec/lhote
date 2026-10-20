# Illustrations Lottie : prompts

Ces prompts servent à générer les animations avec un outil « texte vers Lottie » (LottieFiles,
par exemple). Les fichiers `.json` obtenus se déposent dans `src/assets/lottie/` : le jeu les repère au
build (voir le README de ce dossier). Sans fichier, il garde ses gravures SVG.

## Ce qu'il faut garder à chaque génération

Colle ce bloc de style à la fin de chaque prompt :

> Style: ink engraving with Celtic spiral ornament, flat vector shapes, thin ochre outlines, no gradients, no text, no real faces. Palette only: ink #1a1a1a, ochre #9a6532, blood red #8b2e2e, sea green #3f7f77. Transparent background (the page is parchment #f4ede0). Canvas 400 × 220 px, 30 fps, seamless loop of 6 to 8 seconds, slow and quiet movement, under 80 KB, no expressions.

À vérifier avant de me les donner : fond transparent, boucle sans saut, rien d'écrit, pas de visage
réaliste, mouvement lent (le jeu est une lecture, pas un dessin animé).

## Une animation par histoire (7 fichiers)

Nom du fichier : `premise-01.json` à `premise-07.json`. Chacune sert à tous les moments de
l'histoire. Pour une animation propre à un moment, ajoute le moment au nom
(`premise-01-fracture.json`, etc.).

1. **`premise-01` : Ce que rend la mer.** A low fisherman's house at dawn, a shrouded figure lying on a table, a wet bundle of linen. A knotted cord swings slowly from a hook, a small bronze bell rings silently in the distance. Sea salt crystals drift in the air, a thin red thread runs along the table.
2. **`premise-02` : Le jour du pardon.** The inside of a small Breton chapel. A carved reliquary chest on the altar, its lid lifting a few millimetres and settling again. Three candles burning down, flames trembling. A broken red wax seal glows faintly. Slow dust in a shaft of light.
3. **`premise-03` : Une histoire qui te ressemble.** A circle of listeners around a night fire under an old hawthorn tree. A storyteller's silhouette, hands moving. Sparks rise from the fire, and a stone bowl of water on a flat rock ripples as if someone had just spoken. An oak leaf turns slowly in the air.
4. **`premise-04` : La table des absents.** A farmhouse table set for thirteen, the thirteenth place empty with a small wooden bowl. Peat fire glowing, a hollowed turnip lantern flickering. Tiny wet bare footprints appear one by one on the floor and fade.
5. **`premise-05` : La nuit où les bêtes parlent.** A stable on Christmas night, frost on the window. An ox and two cows turn their heads slowly toward the viewer, breath rising in clouds. A terracotta ox with a glued horn sits in a nativity scene, a lamp swings softly. A bell hangs still, waiting for midnight.
6. **`premise-06` : Le lavoir de minuit.** A stone washhouse basin at midnight, black water. Two long white sheets twist together in a slow spiral held by unseen hands. Wooden beaters float and turn on the water. Faint ripples spread, a pale moon reflected.
7. **`premise-07` : Les cloches d'Ys.** A low-tide beach at dusk, a green bronze door with scales set in a stone slab, a large ring on it. Grains of salt fall onto the lock and glitter. Far below the horizon, bells sway under the sea, and a rake with a red wool ribbon stands in the sand.

## Une image de fin par issue (4 fichiers)

Nom du fichier : `mood-resolved.json`, `mood-failed.json`, `mood-exposed.json`, `mood-died.json`.

- **`mood-resolved` : réparé.** A closed door slowly opening onto warm ochre light, a spiral unwinding into calm, small points of light rising upward.
- **`mood-failed` : raté.** A spiral that fails to close, its end drifting away; a flame guttering and relighting dimly; slow grey ash falling.
- **`mood-exposed` : démasqué.** A single large eye opening in the dark, ink around it, a thin red line sweeping across like a searching glance.
- **`mood-died` : mort.** A candle flame going out in slow motion, a thread of smoke curling into a spiral, then the dark softly returning.

## Si l'outil sort autre chose

- Trop chargé : ajoute « minimal, at most 6 shapes, single focal point ».
- Mouvement trop vif : ajoute « very slow ease-in-out motion, 8 second loop ».
- Couleurs hors palette : redonne les quatre valeurs hexadécimales, et rien d'autre.
