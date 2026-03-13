# API Members avec JWT - Backend

## 📋 Description
API sécurisée de gestion des membres utilisant JWT (JSON Web Token) pour l'authentification.

## 🚀 Démarrage

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancer le serveur
```bash
npm start
```

Le serveur démarrera sur `http://localhost:5000`

## 🔐 Routes API

### Routes Publiques

#### 1️⃣ GET /api
Test simple pour vérifier que le serveur fonctionne
```
GET http://localhost:5000/api
```

#### 2️⃣ POST /register
Créer un nouveau compte
```
POST http://localhost:5000/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3️⃣ POST /login
Se connecter et obtenir un JWT
```
POST http://localhost:5000/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

✅ Réponse :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Routes Sécurisées (Nécessite un JWT)

Pour toutes les routes sécurisées, ajoutez le header :
```
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4️⃣ GET /profile
Récupérer les informations du profil de l'utilisateur connecté
```
GET http://localhost:5000/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 5️⃣ GET /api/members
Récupérer la liste de tous les membres
```
GET http://localhost:5000/api/members
Authorization: Bearer YOUR_TOKEN_HERE
```

✅ Réponse :
```json
{
  "message": "Liste des membres récupérée avec succès",
  "count": 5,
  "members": [
    {
      "id": 1,
      "name": "Alice Martin",
      "email": "alice@example.com",
      "role": "Admin"
    }
  ]
}
```

#### 6️⃣ GET /api/members/:id
Récupérer un membre spécifique par ID
```
GET http://localhost:5000/api/members/1
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 7️⃣ POST /api/members
Créer un nouveau membre (sécurisé)
```
POST http://localhost:5000/api/members
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Frank Mathieu",
  "email": "frank@example.com",
  "role": "User"
}
```

#### 8️⃣ DELETE /api/members/:id
Supprimer un membre (sécurisé)
```
DELETE http://localhost:5000/api/members/1
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🧪 Test avec Postman ou Thunder Client

### Workflow de test :

1. **Inscription (Register)**
   - URL: `http://localhost:5000/register`
   - Méthode: POST
   - Body:
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "123456"
     }
     ```

2. **Connexion (Login)**
   - URL: `http://localhost:5000/login`
   - Méthode: POST
   - Body:
     ```json
     {
       "email": "test@example.com",
       "password": "123456"
     }
     ```
   - 📌 Copier le token reçu

3. **Récupérer les membres**
   - URL: `http://localhost:5000/api/members`
   - Méthode: GET
   - Headers:
     ```
     Authorization: Bearer YOUR_COPIED_TOKEN
     ```

---

## 💾 Données de test

Membres par défaut dans la base de données :
- Alice Martin (alice@example.com) - Admin
- Bob Dupont (bob@example.com) - User
- Charlie Durand (charlie@example.com) - User
- Diana Laurent (diana@example.com) - Moderator
- Eve Bernard (eve@example.com) - User

---

## 📌 Codes HTTP utilisés

| Code | Signification |
|------|--------------|
| 200 | ✅ Succès |
| 201 | ✅ Ressource créée |
| 400 | ❌ Requête invalide |
| 401 | ❌ Token invalide ou expiré |
| 403 | ❌ Token manquant / Accès interdit |
| 404 | ❌ Ressource non trouvée |
| 500 | ❌ Erreur serveur |

---

## 🔑 Variables d'environnement

```
PORT=5000
JWT_SECRET=ma_super_cle_ultra_secrete_2026
```

---

## 📚 Dépendances

- **express** : Framework web
- **jsonwebtoken** : Gestion des JWT
- **bcryptjs** : Hashage des mots de passe
- **cors** : Gestion CORS
- **nodemon** : Rechargement automatique (dev)

Pour plus d'informations, consultez la documentation officielle de [jwt.io](https://jwt.io/)
