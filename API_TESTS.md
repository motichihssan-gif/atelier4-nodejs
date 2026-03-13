# 🧪 Tests API Complets

Ce fichier contient des exemples pour tester toutes les routes de l'API.

## 🚀 Démarrer le serveur

```bash
cd backend
npm install
npm start
```

Le serveur démarrera sur `http://localhost:5000`

---

## 📝 Routes de Test

### 1️⃣ Test Simple (Route Publique)

```bash
# URL Simple
curl http://localhost:5000/api

# Réponse attendue
{
  "msg": "Hello Fullstack - Atelier 4"
}
```

---

## 🔐 AUTHENTIFICATION

### 2️⃣ Inscription (POST /register)

```bash
# Créer un nouveau compte
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Réponse attendue
{
  "message": "Utilisateur créé avec succès"
}
```

### 3️⃣ Connexion (POST /login)

```bash
# Se connecter et obtenir un JWT
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Réponse attendue (copier le token!)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NzcwMDAwMDB9.signature..."
}
```

**📌 IMPORTANT**: Sauvegardez ce TOKEN pour les requêtes suivantes !

---

## 👤 PROFIL UTILISATEUR (Sécurisé)

### 4️⃣ Récupérer le Profil (GET /profile)

```bash
# Remplacez YOUR_TOKEN par le token reçu à la connexion
curl -X GET http://localhost:5000/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Réponse attendue
{
  "username": "john_doe",
  "email": "john@example.com"
}
```

---

## 👥 GESTION DES MEMBRES (Sécurisé)

### 5️⃣ Récupérer Tous les Membres (GET /api/members)

```bash
curl -X GET http://localhost:5000/api/members \
  -H "Authorization: Bearer YOUR_TOKEN"

# Réponse attendue
{
  "message": "Liste des membres récupérée avec succès",
  "count": 5,
  "members": [
    {
      "id": 1,
      "name": "Alice Martin",
      "email": "alice@example.com",
      "role": "Admin"
    },
    ...
  ]
}
```

### 6️⃣ Récupérer un Membre par ID (GET /api/members/:id)

```bash
curl -X GET http://localhost:5000/api/members/1 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Réponse attendue
{
  "id": 1,
  "name": "Alice Martin",
  "email": "alice@example.com",
  "role": "Admin"
}
```

### 7️⃣ Créer un Nouveau Membre (POST /api/members)

```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Frank Mathieu",
    "email": "frank@example.com",
    "role": "User"
  }'

# Réponse attendue
{
  "message": "Membre créé avec succès",
  "member": {
    "id": 6,
    "name": "Frank Mathieu",
    "email": "frank@example.com",
    "role": "User"
  }
}
```

### 8️⃣ Supprimer un Membre (DELETE /api/members/:id)

```bash
curl -X DELETE http://localhost:5000/api/members/1 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Réponse attendue
{
  "message": "Membre supprimé avec succès",
  "member": {
    "id": 1,
    "name": "Alice Martin",
    "email": "alice@example.com",
    "role": "Admin"
  }
}
```

---

## 🐛 Codes d'Erreur

| Code | Erreur | Cause |
|------|--------|-------|
| 200 | ✅ OK | Requête réussie |
| 201 | ✅ Created | Ressource créée |
| 400 | ❌ Bad Request | Paramètres invalides |
| 401 | ❌ Unauthorized | Token invalide ou expiré |
| 403 | ❌ Forbidden | Token manquant |
| 404 | ❌ Not Found | Ressource inexistante |
| 500 | ❌ Server Error | Erreur serveur |

### Exemple Erreur

```bash
# Sans token
curl -X GET http://localhost:5000/api/members

# Réponse (403)
{
  "error": "Accès interdit - Token manquant"
}
```

---

## 📋 Ordre des Tests Recommandé

1. ✅ `/api` (vérifier que le serveur répond)
2. ✅ `/register` (créer un compte)
3. ✅ `/login` (se connecter)
4. ✅ `/profile` (vérifier l'accès sécurisé)
5. ✅ `/api/members` (récupérer les membres)
6. ✅ `/api/members` (ajouter un membre)
7. ✅ `/api/members/:id` (récupérer un membre)
8. ✅ `/api/members/:id` DELETE (supprimer un membre)

---

## 🛠️ Utiliser Postman

### Importer la collection

1. Ouvrez Postman
2. Cliquez sur **"Import"**
3. Collez cet contenu JSON :

```json
{
  "info": {
    "name": "Atelier 4 - Members API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/register",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"john_doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/login",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
        }
      }
    },
    {
      "name": "Get Members",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/members",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ]
      }
    }
  ]
}
```

---

## 🔐 Variables Postman

1. Cliquez sur **"Environments"**
2. Créez un nouvel environment: `Atelier 4`
3. Ajoutez cette variable :

| Key | Value |
|-----|-------|
| token | (vide initialement) |
| api_url | http://localhost:5000 |

4. Après une connexion réussie, copiez le token reçu dans la variable `{{token}}`

---

## 💡 Conseils de Test

✅ **Vérifiez que le serveur s'exécute** avant de tester  
✅ **Utilisez un nouvel token** si vous obtenez une erreur 401  
✅ **Vérifiez les identifiants** avant de tester la connexion  
✅ **Utilisez Thunder Client** (extension VS Code) pour simplifier  
✅ **Consultez les logs du serveur** pour déboguer  

---

## 🚀 Test avec Thunder Client (Extension VS Code)

1. Installez l'extension **Thunder Client**
2. Ouvrez la palette de commandes (`Ctrl+Shift+P`)
3. Cherchez "Thunder Client"
4. Créez des requêtes rapidement dans l'éditeur !

---

**Bon testing ! 🎉**
