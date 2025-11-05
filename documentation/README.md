# EquiFlow

Application web moderne de gestion de dépenses partagées en groupe.

## 🚀 Installation

```bash
npm install
```

## 🔧 Configuration

1. Le projet est déjà configuré avec Firebase
2. Placez votre logo dans `public/logo_equiflow.jpg`

## 💻 Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 📦 Structure du projet

```
src/
├── components/
│   ├── auth/          # Authentification
│   ├── groups/        # Gestion des groupes
│   ├── expenses/      # Gestion des dépenses
│   ├── balances/      # Équilibres et remboursements
│   ├── participants/  # Gestion des participants
│   └── ui/            # Composants UI réutilisables
├── pages/             # Pages principales
├── utils/             # Utilitaires
├── styles/            # Styles globaux
└── firebase.js        # Configuration Firebase
```

## ✨ Fonctionnalités

- ✅ Création et partage de groupes
- ✅ Ajout de dépenses avec répartition flexible
- ✅ Calcul automatique des équilibres
- ✅ Propositions de remboursement optimisées
- ✅ Export PDF des récapitulatifs
- ✅ Synchronisation temps réel
- ✅ Design responsive et moderne

## 🎨 Technologies

- React 18 + Vite
- Firebase (Firestore + Auth)
- TailwindCSS
- jsPDF

## 📝 Licence

Propriétaire
