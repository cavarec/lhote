# Recette sur appareils réels

À faire une fois après le premier déploiement (v0.1.0), puis avant chaque release qui touche l'interface, le service worker ou le stockage. Compte une demi-heure par appareil. Les tests automatiques (Playwright, axe, Lighthouse) ne remplacent pas ces vérifications : ils tournent sur Chromium de bureau.

Adresse du jeu : `https://lhote.pages.dev` (ou la valeur de la variable GitHub `SITE_URL`).

## iOS Safari (iPhone, iOS récent)

1. Ouvrir le jeu dans Safari. Vérifier que le texte est net et que la police à empattement s'affiche.
2. Jouer un saut complet. Chaque choix se touche sans erreur et la machine à écrire s'interrompt d'un toucher.
3. Fermer Safari en plein saut, rouvrir : « Reprendre le saut » ramène au bon beat.
4. Partage → _Sur l'écran d'accueil_. Lancer l'icône : plein écran, couleur de barre `#f4ede0`, icône lisible.
5. Mode avion, ouvrir l'application depuis l'écran d'accueil : le bandeau « Hors connexion » s'affiche et le dernier saut se rejoue.
6. Mode avion, terminer un saut : le texte de fin s'affiche avec la mention d'attente. Désactiver le mode avion : la mention disparaît d'elle-même.
7. Réglages → texte « Très grand » : rien ne déborde. Réglages système → _Réduire les animations_ : le texte apparaît d'un bloc.
8. VoiceOver activé : un saut se parcourt, les boutons sont annoncés, la progression est lue.
9. Navigation privée : le jeu s'ouvre et l'avertissement de stockage indisponible s'affiche si IndexedDB est refusé.

## Android Chrome

1. Mêmes points 1 à 3 que sur iOS.
2. Après un saut terminé, l'invite « Installer » apparaît sur l'écran de fin. L'installer : l'icône (maskable) n'est pas rognée.
3. Mode avion, mêmes vérifications que 5 et 6 ci-dessus.
4. TalkBack activé : un saut se parcourt.
5. Rotation de l'écran en plein saut : l'état est conservé.

## Données et vie privée (les deux plates-formes)

- Réglages → _Télécharger mes données_ : un fichier JSON est téléchargé.
- Réglages → _Supprimer mes données_ : la page se recharge sur un accueil vierge ; un nouveau saut est un nouveau joueur.

## Côté serveur

- Dans le tableau de bord Cloudflare : le Worker `lhote-api` existe, son Durable Object `Chronology` a une classe SQLite, et le namespace KV `TRACES` apparaît dans ses liaisons.
- Après deux sauts complets sur le même appareil, la deuxième partie peut afficher une trace d'un autre joueur : jouer depuis deux appareils différents pour la voir.

## Résultat

Noter pour chaque appareil : modèle, version du système, date, anomalies. Une anomalie bloquante (saut injouable, perte de progression) retarde la release ; le reste devient une issue GitHub.
