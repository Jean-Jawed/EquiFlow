# Guide d'installation EquiFlow

## 📋 Prérequis

- Node.js 18+ installé
- npm ou yarn
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation rapide

### 1. Ouvrir le projet

```bash
cd equiflow
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande va installer toutes les dépendances nécessaires:
- React 18
- Firebase
- TailwindCSS
- jsPDF
- Vite
- etc.

### 3. Ajouter le logo

Placez votre fichier logo dans `public/logo_equiflow.jpg`

Si vous n'avez pas de logo:
- Ouvrez `create_logo.html` dans un navigateur
- Un logo basique sera généré automatiquement
- Ou créez votre propre logo (200x200px minimum)

### 4. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur: **http://localhost:5173**

## ✅ Vérification

Une fois lancé, vous devriez voir:
1. La page d'accueil avec le logo EquiFlow
2. Deux boutons: "Créer un groupe" et "Rejoindre un groupe"
3. Aucune erreur dans la console

## 🔥 Firebase

La configuration Firebase est déjà en place et fonctionnelle:
- ✅ Firestore Database configuré
- ✅ Anonymous Auth activé
- ✅ Règles de sécurité définies

Vous n'avez **rien à configurer** !

## 🏗️ Build pour production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## 🐛 Dépannage

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 déjà utilisé
```bash
npm run dev -- --port 3000
```

### Problème avec le logo
- Vérifiez que le fichier est bien dans `public/`
- Vérifiez que le nom est exactement `logo_equiflow.jpg`
- Essayez de vider le cache du navigateur (Ctrl+Shift+R)

## 📱 Test de l'application

### Créer un groupe
1. Cliquez sur "Créer un groupe"
2. Entrez un nom (ex: "Vacances 2025")
3. Sélectionnez une devise (EUR par défaut)
4. Cliquez sur "Créer"

### Ajouter une dépense
1. Cliquez sur le bouton "+" en bas à droite
2. Remplissez les informations
3. Choisissez qui a payé et pour qui
4. Cliquez sur "Enregistrer"

### Voir les équilibres
1. Cliquez sur l'onglet "⚖️ Équilibres"
2. Consultez les balances
3. Voyez les remboursements proposés
4. Exportez en PDF si besoin

## 🌐 Déploiement

### Option 1: Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Glissez-déposez le dossier dist/ sur netlify.com/drop
```

### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez la console du navigateur (F12)
2. Consultez le fichier ARCHITECTURE.md
3. Assurez-vous que toutes les dépendances sont installées

## 🎉 C'est prêt !

Votre application EquiFlow est maintenant opérationnelle.
Commencez à créer des groupes et gérer vos dépenses !
