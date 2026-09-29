# Atelier Chromatique

Atelier Chromatique est un studio interactif pour explorer, tester et composer des palettes de couleurs. Le catalogue contient **1000 teintes** réparties en douze familles, avec une interface néon responsive et disponible en français ou en anglais.

## Aperçu des outils

- **Explorer** : navigation par douze familles, recherche par nom ou code hexadécimal et palettes repliables.
- **Fiche couleur** : clic sur une couleur pour afficher son aperçu, son nom fictif, son code hexadécimal, ses valeurs RGB/HSL et son contraste ; le code peut être copié depuis la fiche.
- **Favoris** : sauvegarde locale des teintes préférées, avec une zone de favoris repliable.
- **Palette personnelle** : sélection manuelle, suppression individuelle, notes, glisser-déposer, sauvegarde de collections et export en fichier texte.
- **Palette surprise** : génération de cinq couleurs selon une harmonie aléatoire, analogue, complémentaire, triadique ou monochromatique ; couleurs verrouillables, aperçu en dégradé et historique restaurable.
- **Exports avancés** : un menu unique permet de télécharger en PNG, CSS, JSON, configuration Tailwind ou Adobe `.ase`, avec partage par URL.
- **Couleurs d'une image** : import local et extraction des cinq teintes dominantes via Canvas.
- **Contraste et filtres** : zone de filtres toujours visible sous la recherche, avec catégorie, température, luminosité, saturation et contraste minimum ; bouton Réinitialiser, résumé AA/AAA et suggestion accessible.
- **Mode inspiration** : aperçu de la palette en interface, carte ou affiche.
- **Outils** : fausse page de code pour tester la lisibilité en taille réelle, réglage du texte et des couleurs, puis atelier de dégradé avec génération du CSS.
- **Panneaux indépendants** : chaque outil du Studio et Ton espace s'ouvre ou se ferme séparément, avec une animation fluide.
- **Accessibilité** : test de contraste, simulations de vision et interface compatible avec `prefers-reduced-motion`.
- **Interaction** : raccourcis `G` génération, `C` copie, `E` export CSS et `F` filtres.
- **Personnalisation** : thème clair ou sombre, animations, menu responsive et changement de langue.
- **Compte local** : profil facultatif stocké dans le navigateur, avec mot de passe haché et option de mémorisation.

## Parcours rapide

1. Recherche une couleur ou ouvre une famille depuis la navigation.
2. Clique sur une couleur pour ouvrir sa fiche détaillée.
3. Utilise l'étoile pour ajouter une teinte aux favoris.
4. Active **Sélection manuelle** pour construire une palette personnalisée.
5. Utilise directement la zone **Filtres intelligents** pour affiner les résultats, puis **Réinitialiser** pour revenir au catalogue complet.
6. Ouvre le **Studio** pour générer une palette, analyser une image ou contrôler son contraste.
7. Ouvre **Outils** pour tester un texte avec différentes couleurs et créer un dégradé CSS.
8. Ouvre le menu **Exporter** pour choisir PNG, CSS, JSON, Tailwind ou ASE.
9. Clique sur une palette de l'historique pour la restaurer ou sur `×` pour la supprimer.

Les images sont analysées directement dans le navigateur. Elles ne sont envoyées vers aucun serveur.

## Données locales et confidentialité

Les préférences sont conservées dans `localStorage` du navigateur :

- `palette-favorites` : couleurs favorites ;
- `palette-history` : cinq dernières palettes générées ;
- `palette-theme` : thème clair ou sombre ;
- `palette-language` : langue active ;
- `palette-account` et `palette-session` : compte local facultatif.

Le compte local n'est pas une authentification serveur. Les données ne sont pas synchronisées entre appareils et ne remplacent pas un système de comptes avec backend.

## Structure

```text
index.html   Interface et structure des outils
colors.json  Catalogue de base des 208 couleurs
style.css    Thème, responsive et animations
script.js    Rendu, interactions, stockage et exports
README.md    Documentation
```

## Modifier le catalogue

Ajoute une entrée dans `colors.json` en respectant ce format :

```json
{
  "category": "other",
  "name": "Neon Lime",
  "code": "#B7FF00"
}
```

Catégories de base disponibles : `jewel`, `metallic`, `pastel` et `other` (affichée « Créatives »). Au chargement, l'application complète automatiquement le catalogue jusqu'à 1000 couleurs avec `ocean`, `forest`, `sunset`, `neon`, `earth`, `monochrome`, `retro` et `floral`.

Les noms affichés sont volontairement fictifs pour rendre le site plus ludique. Les codes hexadécimaux, RGB et HSL affichés dans les fiches sont calculés à partir des valeurs réelles des couleurs.

## Technologies

- HTML5, CSS3 et JavaScript natif
- Canvas API pour l'analyse des images
- Clipboard API avec solution de secours pour la copie
- LocalStorage pour les préférences et les palettes
- Web Crypto API pour le hachage du mot de passe lorsque disponible
- `<dialog>` pour la fenêtre de compte locale
- `<dialog>` pour les fiches couleur et la vue Outils

## Crédits

Projet imaginé et créé par **Xavier Martineau**.

© 2026 Xavier Martineau. Tous droits réservés.
