# 🔐 Atelier 4 : Sécurisation d'une API Members avec JWT

Une application complète de gestion des membres utilisant JWT pour l'authentification et l'autorisation sécurisée.

## 📋 Vue d'ensemble

Ce projet implémente une solution d'authentification sécurisée avec JWT (JSON Web Token) comprenant :
- **Backend** : API Node.js/Express sécurisée avec authentification JWT
- **Frontend** : Application React moderne avec interface utilisateur réactive

### Caractéristiques principales

✅ **Authentification JWT** : Tokens sécurisés pour authentifier les utilisateurs  
✅ **Inscription/Connexion** : Créer des comptes et se connecter de manière sécurisée  
✅ **Gestion des membres** : CRUD complet des membres (sécurisé)  
✅ **Middleware de sécurité** : Protection des routes avec vérification JWT  
✅ **Interface moderne** : UI responsive et intuitive  
✅ **Hashage des mots de passe** : Utilisation de bcryptjs pour la sécurité  

## 🏗️ Structure du Projet

```
atelier4-NodeJs/
├── backend/                  # API Node.js/Express
│   ├── index.js             # Serveur principal
│   ├── package.json         # Dépendances backend
│   ├── README.md            # Documentation backend
│   └── .gitignore
│
├── frontend/                # Application React
│   ├── src/
│   │   ├── App.jsx          # Composant principal
│   │   ├── App.css          # Styles
│   │   ├── main.jsx         # Entry point
│   │   └── index.html       # Template HTML
│   ├── vite.config.js       # Configuration Vite
│   ├── package.json         # Dépendances frontend
│   ├── README.md            # Documentation frontend
│   └── .gitignore
│
├── README.md                # Ce fichier
└── .gitignore              # Git ignore global
```

## 🚀 Démarrage Rapide

### ✨ Prérequis

- **Node.js** (v14 ou supérieur)
- **npm** ou **yarn**
- **Postman** ou **Thunder Client** (pour tester l'API)

### 1️⃣ Cloner et naviguer

```bash
cd atelier4-NodeJs
```

### 2️⃣ Configuration du Backend

```bash
cd backend
npm install
npm start
```

Le serveur démarre sur `http://localhost:5000`

### 3️⃣ Configuration du Frontend (dans un nouveau terminal)

```bash
cd frontend
npm install
npm run dev
```

L'app React démarrera sur `http://localhost:3000`

## 🔐 Comment ça fonctionne

### Flux d'authentification JWT

```
1. Utilisateur s'inscrit/se connecte
         ↓
2. Serveur vérifie les identifiants
         ↓
3. Serveur génère un JWT signé
         ↓
4. Client stocke le JWT dans localStorage
         ↓
5. Client ajoute le JWT dans chaque requête (header Authorization)
         ↓
6. Serveur vérifie le JWT avant d'autoriser l'accès
```

### Structure d'un JWT

Un JWT se compose de 3 parties séparées par des points :

```
Header.Payload.Signature

Exemple:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.sig
```

1. **Header** : Indique le type de token et l'algorithme
2. **Payload** : Contient les données de l'utilisateur
3. **Signature** : Vérifie que le token n'a pas été modifié

## 📡 API Endpoints

### Routes Publiques

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/register` | Créer un nouveau compte |
| POST | `/login` | Se connecter et obtenir un JWT |

### Routes Sécurisées (nécessite JWT)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/profile` | Récupérer le profil de l'utilisateur connecté |
| GET | `/api/members` | Récupérer tous les membres |
| GET | `/api/members/:id` | Récupérer un membre par ID |
| POST | `/api/members` | Créer un nouveau membre |
| DELETE | `/api/members/:id` | Supprimer un membre |

## 🧪 Test de l'API

### Avec Postman

1. **Inscription**
   - URL: `POST http://localhost:5000/register`
   - Body JSON:
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Connexion**
   - URL: `POST http://localhost:5000/login`
   - Body JSON:
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - 📌 Copier le token reçu

3. **Accéder aux membres (sécurisé)**
   - URL: `GET http://localhost:5000/api/members`
   - Header: `Authorization: Bearer YOUR_COPIED_TOKEN`

## 💾 Données de Test

Le backend inclut 5 membres prédéfinis :

| ID | Nom | Email | Rôle |
|----|-----|-------|------|
| 1 | Alice Martin | alice@example.com | Admin |
| 2 | Bob Dupont | bob@example.com | User |
| 3 | Charlie Durand | charlie@example.com | User |
| 4 | Diana Laurent | diana@example.com | Moderator |
| 5 | Eve Bernard | eve@example.com | User |

## 🔑 Codes HTTP Utilisés

| Code | Signification | Exemple |
|------|--------------|---------|
| 200 | ✅ Succès | GET /profile |
| 201 | ✅ Créé | POST /register |
| 400 | ❌ Requête invalide | Champs manquants |
| 401 | ❌ Token invalide | Token expiré |
| 403 | ❌ Accès refusé | Token manquant |
| 404 | ❌ Non trouvé | Membre inexistant |
| 500 | ❌ Erreur serveur | Erreur interne |

## 📚 Concepts Clés

### 🔐 JWT (JSON Web Token)

**Avantages** :
- Sécurisé (signé avec une clé secrète)
- Stateless (pas besoin de session serveur)
- Portable (peut être encodé dans l'URL)
- Cross-domain compatible (CORS)

### 🛡️ Middleware de Sécurité

```javascript
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token manquant" });
  
  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};
```

### 🔐 Hashage des Mots de Passe

Les mots de passe sont hashés avec **bcryptjs** :
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

## 🌐 Variables d'Environnement

### Backend (à créer dans `/backend/.env`)

```env
PORT=5000
JWT_SECRET=ma_super_cle_ultra_secrete_2026
```

### Frontend (dans `App.jsx`)

```javascript
const API_URL = "http://localhost:5000";
```

## 🎯 Objectifs de l'Atelier Complétés

✅ Initialisation du projet Node.js avec Express  
✅ Installation des dépendances (JWT, bcrypt, CORS)  
✅ Création de la route d'authentification (/api/login)  
✅ Création de la route sécurisée /api/members  
✅ Middleware verifyToken pour protéger les routes  
✅ Tests avec Postman/Thunder Client  
✅ Application React complète  
✅ Formulaire de connexion et inscription  
✅ Affichage et gestion des membres  
✅ Gestion des tokens JWT côté client  
✅ Interface responsive et sécurisée  

## 🐛 Dépannage

### Le backend ne démarre pas
```bash
# Vérifier que le port 5000 est libre
# ou changer le port dans index.js
```

### Erreur CORS
- Vérifiez que `cors()` est activé dans le backend
- Vérifiez que l'API_URL est correcte dans le frontend

### Token expiré
- Les tokens expirent après 1 heure
- Reconnectez-vous pour obtenir un nouveau token

## 📖 Ressources Utiles

- [Documentation JWT.io](https://jwt.io/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Axios HTTP Client](https://axios-http.com/)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

## 📁 Documentation Complète

Pour plus de détails, consultez :
- [Backend README](backend/README.md) - Documentation API détaillée
- [Frontend README](frontend/README.md) - Guide d'utilisation React

## 🚀 Prochaines Étapes

Améliorations possibles pour l'atelier :

1. **Refresh Token** : Implémenter des refresh tokens pour plus de sécurité
2. **Rôles et Permissions** : Ajouter un système de rôles avancé
3. **Validation des données** : Valider les emails et mots de passe forts
4. **Base de données** : Remplacer le stockage en mémoire par une BD (MongoDB, PostgreSQL)
5. **Logging** : Ajouter des logs d'audit
6. **Rate Limiting** : Limiter le nombre de tentatives de connexion
7. **2FA** : Authentification à deux facteurs
8. **Tests** : Ajouter des tests unitaires et d'intégration

## 📝 Licence

Ce projet est créé à des fins éducatives pour l'Atelier 4.

## 👨‍💻 Auteur

Atelier 4 - Sécurisation d'une API Members avec JWT  
Formation : Cours Node.js

---

**Bon développement ! 🚀**

Des questions ? Consultez les documentations détaillées dans le dossier `backend` et `frontend`.
