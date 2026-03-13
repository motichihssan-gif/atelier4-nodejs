# 🚀 GUIDE DE DÉMARRAGE RAPIDE

Ce guide vous aidera à démarrer l'application complète en quelques minutes.

## 📋 Prérequis

- ✅ Node.js (v14+) : https://nodejs.org/
- ✅ npm (inclus avec Node.js)
- ✅ Un terminal/PowerShell
- ✅ Optionnel : Postman ou Thunder Client pour tester l'API

## ⚡ Démarrage en 3 étapes

### 1️⃣ DÉMARRER LE BACKEND

Ouvrez **PowerShell** ou **Terminal** et exécutez :

```powershell
cd backend
npm install
npm start
```

✅ Vous devriez voir :
```
✅ Serveur en écoute sur le port 5000
📌 Routes disponibles:
   - GET  /api
   - POST /register
   - POST /login
   - GET  /profile (sécurisée)
   - GET  /api/members (sécurisée)
   ...
```

**Ne fermez pas ce terminal ! Le serveur doit rester actif.**

---

### 2️⃣ DÉMARRER LE FRONTEND

Ouvrez **un NOUVEAU terminal/PowerShell** et exécutez :

```powershell
cd frontend
npm install
npm run dev
```

✅ Vous devriez voir :
```
  VITE v4.3.0  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

**L'application s'ouvrira dans votre navigateur à http://localhost:3000**

---

### 3️⃣ TESTER L'APPLICATION

#### Option A : UI React
1. Ouvrez http://localhost:3000 dans votre navigateur
2. Cliquez sur "S'inscrire"
3. Créez un compte :
   - Nom : `john_doe`
   - Email : `john@example.com`
   - Mot de passe : `password123`
4. Connectez-vous avec les mêmes identifiants
5. 🎉 Vous verrez la liste des membres !

#### Option B : Postman/Thunder Client

1. **Inscription**
   ```
   POST http://localhost:5000/register
   Content-Type: application/json
   
   {
     "username": "john",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Connexion**
   ```
   POST http://localhost:5000/login
   Content-Type: application/json
   
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   📌 **Copicez le TOKEN reçu en réponse**

3. **Récupérer les membres**
   ```
   GET http://localhost:5000/api/members
   Authorization: Bearer VOTRE_TOKEN_COPIE
   ```

---

## 📂 Ouvrir le projet dans VS Code

```powershell
# Depuis le dossier atelier4-NodeJs
code .
```

## 🛑 Arrêter l'application

- **Backend** : Appuyez sur `Ctrl + C` dans le terminal du backend
- **Frontend** : Appuyez sur `Ctrl + C` dans le terminal du frontend

---

## ❓ Problèmes Courants

### ❌ "Port 5000 déjà utilisé"
```powershell
# Changez le port dans backend/index.js ligne 10
const PORT = 5001; // Changer 5000 en 5001
```

### ❌ "npm: command not found"
- Node.js n'est pas installé : https://nodejs.org/
- Redémarrez le terminal après l'installation

### ❌ "Impossible de charger les membres"
1. Vérifiez que le backend s'exécute sur `http://localhost:5000`
2. Assurez-vous que vous êtes connecté (token valide)
3. Rechargez la page

### ❌ Erreur CORS
- Cela signifie que le backend et frontend ne communiquent pas
- Vérifiez que le backend s'exécute sur le port 5000
- Vérifiez que `cors()` est au début du `index.js` du backend

---

## 📚 Structure des Fichiers

```
atelier4-NodeJs/
├── 📁 backend/
│   ├── index.js              ← Serveur principal
│   ├── package.json
│   └── README.md
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── App.jsx           ← Composant principal
│   │   ├── main.jsx          ← Entry point
│   │   └── App.css           ← Styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── README.md                 ← Documentation complète
└── QUICKSTART.md            ← Ce fichier
```

---

## 🔐 Sécurité

L'application utilise :
- ✅ **JWT** pour l'authentification
- ✅ **bcryptjs** pour hasher les mots de passe
- ✅ **CORS** pour sécuriser les requêtes
- ✅ **Middleware** pour protéger les routes

---

## 📖 Documentation Détaillée

- **Backend** : Lisez [backend/README.md](backend/README.md)
- **Frontend** : Lisez [frontend/README.md](frontend/README.md)
- **Concepts** : Lisez [README.md](README.md)

---

## ✨ Vous êtes prêt !

Maintenant que l'application fonctionne, vous pouvez :
1. ✅ Créer des comptes
2. ✅ Vous connecter avec JWT
3. ✅ Voir la liste des membres (sécurisée)
4. ✅ Ajouter/Supprimer des membres
5. ✅ Voir votre profil

---

## 🎓 Prochaines Étapes

1. **Explorez le code** : Comprenez comment JWT fonctionne
2. **Modifiez l'UI** : Créez une version personnalisée
3. **Améliorez la sécurité** : Ajoutez des validations
4. **Connectez une BD** : Remplacez le stockage en mémoire

---

## 💡 Besoin d'aide ?

Consultez les documentations :
- [JWT.io](https://jwt.io/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Axios](https://axios-http.com/)

---

**Happy Coding! 🚀**
