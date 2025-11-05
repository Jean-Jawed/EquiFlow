# Architecture EquiFlow

## 📁 Structure complète du projet

```
equiflow/
├── public/
│   ├── logo_equiflow.jpg          # Logo (à fournir)
│   └── README_LOGO.txt            # Instructions pour le logo
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthProvider.jsx   # Context auth Firebase anonyme
│   │   │
│   │   ├── balances/
│   │   │   └── BalanceView.jsx    # Vue équilibres + remboursements
│   │   │
│   │   ├── expenses/
│   │   │   ├── AddExpenseModal.jsx    # Ajout dépense
│   │   │   ├── EditExpenseModal.jsx   # Édition dépense
│   │   │   ├── ExpenseCard.jsx        # Carte dépense
│   │   │   └── ExpenseList.jsx        # Liste + filtres
│   │   │
│   │   ├── groups/
│   │   │   ├── CreateGroupModal.jsx   # Création groupe
│   │   │   ├── JoinGroupModal.jsx     # Rejoindre groupe
│   │   │   └── ShareGroupModal.jsx    # Partage lien
│   │   │
│   │   ├── participants/
│   │   │   ├── AddParticipantModal.jsx  # Ajout participant
│   │   │   └── ParticipantList.jsx      # Liste participants
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx         # Boutons 3D
│   │       ├── Card.jsx           # Cartes
│   │       ├── Input.jsx          # Inputs
│   │       └── Modal.jsx          # Modals
│   │
│   ├── pages/
│   │   ├── GroupDashboard.jsx     # Dashboard principal
│   │   ├── Home.jsx               # Landing page
│   │   └── NotFound.jsx           # Page 404
│   │
│   ├── utils/
│   │   ├── calculations.js        # Calculs balances
│   │   ├── colors.js              # Couleurs aléatoires
│   │   ├── formatters.js          # Formatage dates/montants
│   │   ├── pdfExport.js           # Export PDF
│   │   └── toast.js               # Notifications
│   │
│   ├── styles/
│   │   └── global.css             # Styles globaux + 3D
│   │
│   ├── App.jsx                    # Routing
│   ├── main.jsx                   # Point d'entrée
│   └── firebase.js                # Config Firebase
│
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🔥 Configuration Firebase

### Firestore Database

**Collection: `groups`**
```
groups/{groupId}/
  {
    name: string
    description: string
    currency: string
    createdAt: timestamp
    createdBy: string
    shareLink: string
  }
```

**Sous-collections:**

```
groups/{groupId}/participants/{participantId}
  {
    name: string
    color: string
    joinedAt: timestamp
    userId: string
  }

groups/{groupId}/expenses/{expenseId}
  {
    title: string
    amount: number
    currency: string
    date: timestamp
    category: string
    paidBy: string (participantId)
    participants: array<string>
    splits: object { participantId: amount }
    splitType: 'equal' | 'custom'
    createdBy: string
    createdAt: timestamp
  }
```

### Authentication
- Firebase Anonymous Auth (automatique, transparent)

## 🎨 Design System

### Couleurs
- **Primary**: #3B82F6 (Bleu)
- **Secondary**: #06B6D4 (Turquoise)
- **Success**: #10B981 (Vert)
- **Error**: #EF4444 (Rouge)
- **Accent**: #F97316 (Orange)

### Composants 3D
- Boutons avec shadow + inset
- Transform au hover (-2px)
- Transitions 0.2s ease
- Border-radius 12px

### Typographie
- Font: Inter (Google Fonts)
- Mono: JetBrains Mono
- H1: 2.5rem
- Body: 1rem

## 🔄 Flux de données

### Création de groupe
1. User clique "Créer un groupe"
2. Modal avec formulaire (nom, devise)
3. Création document dans Firestore
4. Ajout créateur comme participant
5. Génération shareLink
6. Redirection vers dashboard

### Ajout de dépense
1. User clique FAB "+"
2. Modal formulaire complet
3. Validation côté client
4. Calcul automatique des splits
5. Sauvegarde dans Firestore
6. Mise à jour temps réel (onSnapshot)

### Calcul des équilibres
1. Récupération de toutes les dépenses
2. Calcul balance par participant
3. Algorithme glouton pour minimiser transactions
4. Affichage remboursements optimisés

## 📱 Responsive

### Mobile (< 640px)
- Navigation en bas
- FAB pour ajout
- Formulaires plein écran
- Stack vertical

### Desktop (> 1024px)
- Header fixe
- Sidebar optionnelle
- Modals centrés
- Grilles multi-colonnes

## 🚀 Commandes

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

## 🔐 Sécurité

### Règles Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /groups/{groupId} {
      allow read, create, update, delete: if true;
      
      match /{subcollection}/{doc} {
        allow read, write: if true;
      }
    }
  }
}
```

⚠️ **Note**: Ces règles sont permissives pour le développement. 
En production, ajouter des validations strictes.

## 📊 Algorithme de rééquilibrage

```
1. Calculer balance de chaque participant
   balance = totalPayé - totalDû

2. Séparer en créditeurs (balance > 0) et débiteurs (balance < 0)

3. Trier par montant décroissant

4. Algorithme glouton:
   - Apparier plus gros débiteur avec plus gros créditeur
   - Transférer min(dette, crédit)
   - Ajuster balances
   - Répéter jusqu'à équilibre
```

## 🎯 Fonctionnalités implémentées

✅ Auth anonyme automatique
✅ Création/Rejoindre groupe
✅ Partage de groupe (lien)
✅ Ajout dépenses (répartition équitable/personnalisée)
✅ Édition/Suppression (créateur uniquement)
✅ Calcul équilibres optimisé
✅ Gestion participants
✅ Export PDF
✅ Synchronisation temps réel
✅ Design 3D moderne
✅ Responsive mobile/desktop
✅ Filtres dépenses
✅ Validation formulaires
✅ Toast notifications
✅ Gestion erreurs

## 🐛 Points d'attention

1. **Logo**: Placer `logo_equiflow.jpg` dans `public/`
2. **Firebase**: Config déjà fournie et fonctionnelle
3. **Dépendances**: Toutes listées dans package.json
4. **Build**: Vérifier que tous les imports sont corrects

## 📦 Dépendances principales

- react 18.2.0
- react-router-dom 6.20.0
- firebase 10.7.1
- jspdf 2.5.1
- tailwindcss 3.3.6
- vite 5.0.8
