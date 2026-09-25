# Atelier Chromatique

Atelier Chromatique est une galerie interactive de couleurs avec une direction visuelle néon futuriste. Le site permet d'explorer des collections, de créer une palette personnalisée et d'extraire des couleurs depuis une image.

## Fonctionnalités

- Navigation fluide entre les collections de couleurs
- Palettes repliables avec flèche et animation d'ouverture et de fermeture
- Recherche par nom ou par code hexadécimal
- Copie d'une couleur en cliquant sur une pastille
- Favoris sauvegardés dans le navigateur
- Zone de favoris affichée en haut de la page et repliable
- Générateur de palettes aléatoires
- Extraction des couleurs dominantes d'une image locale
- Sélection manuelle pour créer une palette personnelle
- Export de la collection complète ou de la palette personnelle en fichier texte
- Thème néon futuriste avec animations fluides et effets lumineux
- Interface responsive pour PC, portable, tablette et téléphone
- Interface disponible en français et en anglais
- Fenêtre de connexion locale avec nom d'utilisateur, mot de passe et option de mémorisation
- Petit panda animé qui suit le champ actif et ferme les yeux pour le mot de passe

## Installation et lancement

Le catalogue étant chargé depuis `colors.json`, utilise un serveur local depuis le dossier du projet :

```powershell
python -m http.server 8000
```

Ouvre ensuite <http://localhost:8000> dans un navigateur moderne.

## Utilisation

1. Utilise la navigation ou la recherche pour explorer les couleurs.
2. Clique sur une pastille pour copier son code hexadécimal.
3. Clique sur l'étoile d'une couleur pour l'ajouter aux favoris.
4. Active **Sélection manuelle** pour composer une palette personnelle.
5. Utilise le **Studio** pour générer une palette ou importer une image.
6. Utilise les boutons d'export pour télécharger tes couleurs.
7. Ouvre **Se connecter** pour créer un compte local facultatif.

Les images importées sont analysées directement dans le navigateur et ne sont envoyées vers aucun serveur.

## Compte local

Le compte est facultatif et fonctionne uniquement dans le navigateur utilisé. Le mot de passe est haché avant d'être enregistré dans le stockage local. La case **Se souvenir de moi** conserve la session après un rechargement.

Ce système n'est pas une authentification serveur : les données ne sont pas partagées entre appareils et ne remplacent pas un vrai système de comptes avec serveur et base de données.

## Structure du projet

```text
index.html   Interface principale
colors.json  Catalogue des noms, catégories et codes couleurs
style.css    Thème néon, responsive et animations
script.js    Recherche, favoris, compte local, export et Studio
README.md    Documentation du projet
```

## Technologies

- HTML5
- CSS3
- JavaScript natif
- Canvas API pour l'analyse des images
- LocalStorage pour les favoris, le compte, le thème et la langue
- Web Crypto API pour le hachage du mot de passe lorsque disponible

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

## Crédits

Projet imaginé et créé par **Xavier Martineau**.

© 2026 Xavier Martineau. Tous droits réservés.
