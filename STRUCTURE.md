# 📦 Structure du Projet - Atelier 4 Complète

## 🎯 Vue d'ensemble

```
atelier4-NodeJs/
│
├── 📄 README.md                 ← 📌 Voir d'abord !
├── 📄 QUICKSTART.md             ← Guide rapide de démarrage
├── 📄 JWT_GUIDE.md              ← Explication détaillée JWT
├── 📄 API_TESTS.md              ← Exemples de test API
├── 📄 .gitignore                ← Configuration Git
│
├── 📁 backend/                  ← ⚙️ API Node.js/Express
│   ├── 📄 index.js              ← 🔥 Serveur principal (PORT 5000)
│   ├── 📄 package.json          ← Dépendances npm
│   ├── 📄 .env.example          ← Template variables d'env
│   ├── 📄 README.md             ← Documentation backend
│   └── 📄 .gitignore            ← Ignorer node_modules
│
└── 📁 frontend/                 ← 🎨 Application React
    ├── 📁 src/                  ← Code source
    │   ├── 📄 App.jsx           ← Composant principal React
    │   ├── 📄 App.css           ← Styles CSS
    │   └── 📄 main.jsx          ← Entry point React
    │
    ├── 📄 index.html            ← Template HTML
    ├── 📄 vite.config.js        ← Config Vite (PORT 3000)
    ├── 📄 package.json          ← Dépendances npm
    ├── 📄 README.md             ← Documentation frontend
    └── 📄 .gitignore            ← Ignorer node_modules
```

---

## 📚 Fichiers Importants

### 🔴 Backend

| Fichier | Contenu | Ligne |
|---------|---------|-------|
| `backend/index.js` | Serveur Express complet avec JWT | 1-350 |
| Routes | GET `/api`, `/api/members` | 100-250 |
| Middleware | `verifyToken` | 80-95 |
| Auth | `/login`, `/register` | 40-80 |

### 🔵 Frontend

| Fichier | Contenu | Ligne |
|---------|---------|-------|
| `frontend/src/App.jsx` | App React avec authentification | 1-400 |
| Forms | Inscription, Connexion | 50-150 |
| Members | Affichage, ajout, suppression | 200-350 |
| Styles | `frontend/src/App.css` | 1-600 |

---

## 🚀 Démarrage Complet

### Terminal 1 : Backend
```bash
cd backend
npm install
npm start
```

★ Output :
```
✅ Serveur en écoute sur le port 5000
📌 Routes disponibles:
   - GET  /api
   - POST /register
   - POST /login
   ...
```

### Terminal 2 : Frontend
```bash
cd frontend
npm install
npm run dev
```

★ Output :
```
  ➜  Local:   http://localhost:3000/
```

**Ouvrez http://localhost:3000 dans le navigateur ! 🌐**

---

## 📋 Routes API Disponibles

### 🔓 Publiques (Sans JWT)

```
GET  http://localhost:5000/api
     → Réponse: { "msg": "Hello Fullstack - Atelier 4" }

POST http://localhost:5000/register
     → Body: { "username", "email", "password" }
     → Réponse: { "message": "Utilisateur créé avec succès" }

POST http://localhost:5000/login
     → Body: { "email", "password" }
     → Réponse: { "token": "eyJhb..." }
```

### 🔒 Sécurisées (Nécessite JWT)

```
GET  http://localhost:5000/profile
     → Headers: Authorization: Bearer TOKEN
     → Réponse: { "username", "email" }

GET  http://localhost:5000/api/members
     → Réponse: { "message": "...", "members": [...] }

GET  http://localhost:5000/api/members/:id
     → Réponse: { "id", "name", "email", "role" }

POST http://localhost:5000/api/members
     → Body: { "name", "email", "role" }
     → Réponse: { "message": "...", "member": {...} }

DELETE http://localhost:5000/api/members/:id
       → Réponse: { "message": "...", "member": {...} }
```

---

## 🎯 Fonctionnalités Implémentées

### ✅ Partie 1 : Backend Node.js

- [x] Initialisation du projet `npm init -y`
- [x] Installation dépendances: express, jsonwebtoken, bcryptjs, cors
- [x] Configuration du serveur sur port 5000
- [x] Route simple `/api`
- [x] Route `/register` (création compte)
- [x] Route `/login` (obtenir JWT)
- [x] Middleware `verifyToken` (vérifier JWT)
- [x] Route `/profile` (sécurisée)
- [x] Route `/api/members` GET (sécurisée)
- [x] Route `/api/members/:id` GET (sécurisée)
- [x] Route `/api/members` POST (sécurisée)
- [x] Route `/api/members/:id` DELETE (sécurisée)

### ✅ Partie 2 : Frontend React

- [x] Initialisation projet React + Vite
- [x] Installation dépendances: axios, react-router-dom
- [x] Formulaire d'inscription
- [x] Formulaire de connexion
- [x] Stockage JWT dans localStorage
- [x] Récupération et affichage des membres
- [x] Ajout de nouveaux membres
- [x] Suppression de membres
- [x] Gestion de la déconnexion
- [x] Interface responsive et moderne
- [x] Système de notifications
- [x] Gestion des erreurs

### ✅ Sécurité

- [x] Authentification JWT
- [x] Hashage des mots de passe (bcryptjs)
- [x] Middleware de vérification
- [x] CORS configuré
- [x] Cookies/Storage sécurisé
- [x] Validation des tokens

### ✅ Documentation

- [x] README.md (global)
- [x] backend/README.md (documentation API)
- [x] frontend/README.md (documentation React)
- [x] QUICKSTART.md (guide rapide)
- [x] JWT_GUIDE.md (explication JWT)
- [x] API_TESTS.md (exemples de test)

---

## 💾 Données de Test (Pré-chargées)

### Membres Statiques

```json
[
  { "id": 1, "name": "Alice Martin", "email": "alice@example.com", "role": "Admin" },
  { "id": 2, "name": "Bob Dupont", "email": "bob@example.com", "role": "User" },
  { "id": 3, "name": "Charlie Durand", "email": "charlie@example.com", "role": "User" },
  { "id": 4, "name": "Diana Laurent", "email": "diana@example.com", "role": "Moderator" },
  { "id": 5, "name": "Eve Bernard", "email": "eve@example.com", "role": "User" }
]
```

---

## 🔐 Flux d'Authentification

```
1️⃣ INSCRIPTION
   Client → POST /register
   Serveur → Hash password + Stocke utilisateur
   Réponse ← { "message": "Succès" }

2️⃣ CONNEXION
   Client → POST /login
   Serveur → Vérifie password + Génère JWT
   Réponse ← { "token": "eyJhb..." }

3️⃣ STOCKAGE
   Client → localStorage.setItem('token', token)
   Client → Sauvegarde le JWT

4️⃣ REQUÊTE SÉCURISÉE
   Client → GET /api/members
            Authorization: Bearer TOKEN
   Serveur → Middleware verifyToken
            → Décide si autorisé (401) ou non (200)
   Réponse ← Données sécurisées ou erreur
```

---

## 📱 Interface React

### Écrans Disponibles

#### 1️⃣ Authentification (Sans JWT)
```
┌─────────────────────────────────┐
│      🔐 Inscription/Connexion   │
├─────────────────────────────────┤
│ Créer un compte                 │
│ ├─ Nom d'utilisateur: [_______] │
│ ├─ Email: [_________________]  │
│ ├─ Mot de passe: [___________]  │
│ └─ [S'inscrire]                │
│                                 │
│ ──────── OU ────────            │
│                                 │
│ Se connecter                    │
│ ├─ Email: [_________________]  │
│ ├─ Mot de passe: [___________]  │
│ └─ [Se connecter]              │
└─────────────────────────────────┘
```

#### 2️⃣ Dashboard (Avec JWT)
```
┌─────────────────────────────────────────────┐
│ 👥 Gestion des Membres  [Se déconnecter]    │
├─────────────────────────────────────────────┤
│                                             │
│ 👤 Profil utilisateur                       │
│ ├─ Nom: john_doe                           │
│ └─ Email: john@example.com                 │
│                                             │
│ 📋 Liste des Membres [➕ Ajouter membre]   │
│ ┌──────────────────────────────────────┐   │
│ │ Alice Martin           [Admin]        │   │
│ │ alice@example.com      [🗑️ Supprimer]│   │
│ └──────────────────────────────────────┘   │
│ ┌──────────────────────────────────────┐   │
│ │ Bob Dupont              [User]        │   │
│ │ bob@example.com        [🗑️ Supprimer]│   │
│ └──────────────────────────────────────┘   │
│ ...                                         │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Outils Utilisés

| Outil | Version | Utilisation |
|-------|---------|------------|
| **Node.js** | v14+ | Runtime JavaScript |
| **Express** | ^4.18.2 | Framework web/API |
| **jsonwebtoken** | ^9.0.0 | Génération JWT |
| **bcryptjs** | ^2.4.3 | Hashage mots de passe |
| **CORS** | ^2.8.5 | Cross-origin requests |
| **React** | ^18.2.0 | Framework UI |
| **Vite** | ^4.3.0 | Build tool |
| **Axios** | ^1.4.0 | HTTP client |

---

## 📈 Taille du Code

| Composant | Lignes |
|-----------|--------|
| Backend (index.js) | ~350 |
| Frontend (App.jsx) | ~400 |
| Styles (App.css) | ~600 |
| **Total** | **~1.350** |

---

## 🎓 Concepts Couverts

✅ **Backend**
- Express.js (routing, middleware)
- JWT (génération, vérification)
- bcryptjs (hashage sensible)
- CORS (cross-origin)
- Gestion d'erreurs

✅ **Frontend**
- React Hooks (useState, useEffect)
- Axios (requêtes HTTP)
- localStorage (stockage client)
- Gestion d'état
- Responsive design

✅ **Sécurité**
- Authentification JWT
- Hashage de mots de passe
- Vérification de tokens
- Gestion d'auto​risations
- HTTPS recommandé

---

## 🚀 Prochaines Étapes

### Niveau 1 : Améliorations Simples
- [ ] Ajouter validation des emails
- [ ] Améliorer le design CSS
- [ ] Ajouter pagination des membres
- [ ] Implémenter un dark mode

### Niveau 2 : Fonctionnalités
- [ ] Édition de profil
- [ ] Photo de profil
- [ ] Recherche de membres
- [ ] Filtrage par rôle

### Niveau 3 : Sécurité
- [ ] Refresh tokens
- [ ] 2FA (Two-Factor Authentication)
- [ ] Blacklist des tokens
- [ ] Rate limiting

### Niveau 4 : Infrastructure
- [ ] Base de données (MongoDB/PostgreSQL)
- [ ] Environnement de production
- [ ] Déploiement (Heroku/Vercel)
- [ ] Tests unitaires

---

## 📞 Support

Si vous avez des questions :

1. **Vérifiez les READMEs** :
   - [README.md](README.md) - Vue d'ensemble
   - [backend/README.md](backend/README.md) - API détails
   - [frontend/README.md](frontend/README.md) - React détails

2. **Consultez les guides** :
   - [QUICKSTART.md](QUICKSTART.md) - Démarrage rapide
   - [JWT_GUIDE.md](JWT_GUIDE.md) - Expliquer JWT
   - [API_TESTS.md](API_TESTS.md) - Exemples de tests

3. **Ressources externes** :
   - [jwt.io](https://jwt.io/) - Documentation JWT
   - [expressjs.com](https://expressjs.com/) - Express guide
   - [react.dev](https://react.dev/) - React documentation

---

## ✨ Points Clés à Retenir

✅ Le **Backend** reçoit les demandes et valide les JWT  
✅ Le **Frontend** ajoute le JWT à chaque requête  
✅ **JWT** = Token sécurisé pour l'authentification  
✅ **Middleware** = Fonction qui vérifie la permission  
✅ **localStorage** = Stockage du token côté client  
✅ **CORS** = Permet au frontend d'accéder au backend  

---

**🎉 Atelier 4 Complété avec Succès !**

Vous avez maintenant une application sécurisée complète avec :
- ✅ API Node.js avec JWT
- ✅ Interface React moderne
- ✅ Authentification sécurisée
- ✅ Gestion des membres
- ✅ Documentation complète

**Bon développement ! 🚀**
