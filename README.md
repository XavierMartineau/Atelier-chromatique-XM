# Atelier Chromatique

Atelier Chromatique est une galerie interactive de couleurs avec une direction visuelle néon futuriste. Le site permet d'explorer des collections, de creer une palette personnalisee et d'extraire des couleurs depuis une image.

## Fonctionnalites

- Navigation fluide entre les collections de couleurs
- Palettes repliables avec animation d'ouverture et de fermeture
- Recherche par nom ou par code hexadecimal
- Copie d'une couleur en cliquant sur une pastille
- Favoris sauvegardes dans le navigateur
- Zone de favoris affichee en haut de la page
- Generateur de palettes aleatoires
- Extraction des couleurs dominantes d'une image locale
- Selection manuelle de couleurs pour creer sa propre palette
- Export de la collection complete ou de la palette personnelle en fichier texte
- Theme neon futuriste avec animations et effets lumineux
- Interface responsive pour PC, portable, tablette et telephone
- Interface disponible en francais et en anglais
- Connexion locale optionnelle avec nom d'utilisateur, mot de passe et option de memorisation

## Utilisation

Lance un petit serveur local depuis le dossier du projet :

```powershell
python -m http.server 8000
```

Puis ouvre <http://localhost:8000> dans un navigateur moderne. Le serveur est nécessaire pour charger correctement `colors.json`.

Dans le site :

1. Utilise la navigation ou la recherche pour explorer les couleurs.
2. Clique sur une pastille pour copier son code hexadecimal.
3. Active **Selection manuelle** pour composer une palette personnelle.
4. Utilise le **Studio** pour generer une palette ou importer une image.
5. Exporte tes couleurs depuis les boutons d'export.

Les images importees sont analysees directement dans le navigateur et ne sont envoyees vers aucun serveur.

Le compte est volontairement local : le nom d'utilisateur et le mot de passe hache sont conserves dans le navigateur utilise. Il ne s'agit pas d'une authentification serveur et les donnees ne sont pas partagees entre appareils.

## Structure

```text
index.html   Interface principale
colors.json  Catalogue des noms, catégories et codes couleurs
style.css    Theme neon, responsive et animations
script.js    Recherche, favoris, export, Studio et interactions
README.md    Documentation du projet
```

## Technologies

- HTML5
- CSS3
- JavaScript natif
- Canvas API pour l'analyse des images
- LocalStorage pour les favoris, le theme et la langue

## Modifier le catalogue

Pour ajouter ou modifier une couleur, ouvre `colors.json` et change une entrée :

```json
{
  "category": "other",
  "name": "Neon Lime",
  "code": "#B7FF00"
}
```

Les catégories disponibles sont `jewel`, `metallic`, `pastel` et `other`.

## Credit

Projet imagine et cree par **Xavier Martineau**.

© 2026 Xavier Martineau. Tous droits reserves.
