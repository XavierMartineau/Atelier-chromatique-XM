# Atelier Chromatique

Atelier Chromatique est un studio interactif pour explorer, tester et composer des palettes de couleurs. Le catalogue contient **208 teintes** réparties en quatre familles, avec une interface néon responsive et disponible en français ou en anglais.

## Aperçu des outils

- **Explorer** : navigation par famille, recherche par nom ou code hexadécimal et palettes repliables.
- **Copier** : clic sur une couleur pour copier son code dans le presse-papiers.
- **Favoris** : sauvegarde locale des teintes préférées, avec une zone de favoris repliable.
- **Palette personnelle** : sélection manuelle, suppression individuelle, notes, glisser-déposer, sauvegarde de collections et export en fichier texte.
- **Palette surprise** : génération de cinq couleurs selon une harmonie aléatoire, analogue, complémentaire, triadique ou monochromatique ; couleurs verrouillables, aperçu en dégradé et historique restaurable.
- **Exports avancés** : un menu unique permet de télécharger en PNG, CSS, JSON, configuration Tailwind ou Adobe `.ase`, avec partage par URL.
- **Couleurs d'une image** : import local et extraction des cinq teintes dominantes via Canvas.
- **Contraste et filtres** : filtres par catégorie, température, luminosité, saturation et contraste minimum ; résumé AA/AAA et suggestion accessible.
- **Mode inspiration** : aperçu de la palette en interface, carte ou affiche.
- **Panneaux indépendants** : chaque outil du Studio et Ton espace s'ouvre ou se ferme séparément, avec une animation fluide.
- **Accessibilité** : test de contraste, simulations de vision et interface compatible avec `prefers-reduced-motion`.
- **Interaction** : raccourcis `G` génération, `C` copie, `E` export CSS et `F` filtres.
- **Personnalisation** : thème clair ou sombre, animations, menu responsive et changement de langue.
- **Compte local** : profil facultatif stocké dans le navigateur, avec mot de passe haché et option de mémorisation.

## Installation

Le navigateur doit charger `colors.json` via HTTP. Depuis le dossier du projet, lance un serveur local :

```powershell
python -m http.server 8000
```

Puis ouvre [http://localhost:8000](http://localhost:8000).

Une installation de dépendances n'est pas nécessaire : le projet utilise uniquement HTML, CSS et JavaScript natifs.

## Parcours rapide

1. Recherche une couleur ou ouvre une famille depuis la navigation.
2. Clique sur une pastille pour copier son code hexadécimal.
3. Utilise l'étoile pour ajouter une teinte aux favoris.
4. Active **Sélection manuelle** pour construire une palette personnalisée.
5. Ouvre le **Studio** pour générer une palette, analyser une image ou contrôler son contraste.
6. Ouvre le menu **Exporter** pour choisir PNG, CSS, JSON, Tailwind ou ASE.
7. Clique sur une palette de l'historique pour la restaurer ou sur `×` pour la supprimer.

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
colors.json  Catalogue des 208 couleurs
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

Catégories disponibles : `jewel`, `metallic`, `pastel` et `other`. Le compteur de la page est calculé automatiquement à partir du nombre d'entrées du fichier.

## Technologies

- HTML5, CSS3 et JavaScript natif
- Canvas API pour l'analyse des images
- Clipboard API avec solution de secours pour la copie
- LocalStorage pour les préférences et les palettes
- Web Crypto API pour le hachage du mot de passe lorsque disponible
- `<dialog>` pour la fenêtre de compte locale

## Crédits

Projet imaginé et créé par **Xavier Martineau**.

© 2026 Xavier Martineau. Tous droits réservés.
