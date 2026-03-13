# Frontend Members - React avec JWT

## 📋 Description
Application React moderne pour gérer les membres avec authentification JWT sécurisée. Interface professionnelle et responsive.

## 🚀 Démarrage rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancer l'application en développement
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### 3. Build pour production
```bash
npm run build
```

## 🎯 Fonctionnalités

### ✅ Authentification
- ✔️ **Inscription** : Créer un nouveau compte avec username, email et mot de passe
- ✔️ **Connexion** : Se connecter avec email et mot de passe
- ✔️ **JWT Storage** : Le token JWT est sauvegardé dans localStorage
- ✔️ **Déconnexion** : Supprimer le token et se déconnecter

### 👥 Gestion des Membres
- ✔️ **Afficher les membres** : Récupérer et afficher la liste de tous les membres (sécurisé)
- ✔️ **Ajouter un membre** : Créer un nouveau membre avec nom, email et rôle (sécurisé)
- ✔️ **Supprimer un membre** : Supprimer un membre de la liste (sécurisé)

### 🔐 Sécurité
- ✔️ **JWT Authentication** : Toutes les routes sensibles nécessitent un JWT valide
- ✔️ **Token Expiration** : Gestion automatique de l'expiration du token
- ✔️ **Redirection automatique** : Redirection vers login si token expiré

### 📱 Interface
- ✔️ **Design Moderne** : Interface épurée et professionnelle
- ✔️ **Responsive** : Compatible desktop, tablette et mobile
- ✔️ **Notifications** : Messages de succès, erreur et information
- ✔️ **Cards Grid** : Affichage des membres en grille responsive

## 📂 Structure du Projet

```
frontend/
├── src/
│   ├── App.jsx           # Composant principal
│   ├── App.css           # Styles de l'application
│   ├── main.jsx          # Entry point
│   └── index.html        # HTML template
├── vite.config.js        # Configuration Vite
├── package.json          # Dépendances
└── README.md            # Ce fichier
```

## 🔑 Identifiants de Test

Pour tester rapidement l'application, vous pouvez :

### Option 1 : Créer un nouveau compte
1. Remplissez le formulaire d'inscription
2. Cliquez sur "S'inscrire"
3. Connectez-vous avec vos identifiants

### Option 2 : Utiliser les identifiants proposés (si vous les avez créés)
Prenez note des identifiants affichés dans la boîte "Identifiants de test"

## 🛠️ Variables d'Environnement

L'API est configurée sur `http://localhost:5000` par défaut.

Si vous déployez le backend ailleurs, modifiez cette ligne dans `App.jsx` :
```javascript
const API_URL = "http://localhost:5000"; // ← Changez l'URL ici
```

## 📦 Dépendances principales

- **React 18.2.0** : Framework UI
- **Vite 4.3.0** : Build tool et dev server
- **Axios 1.4.0** : Client HTTP pour les requêtes API
- **React Router DOM 6.0.0** : Routeur (prêt pour expansion future)

## 📡 Communication avec l'API

### Workflow d'authentification

1. **Inscription**
   ```javascript
   POST /register
   {
     "username": "john_doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Connexion**
   ```javascript
   POST /login
   {
     "email": "john@example.com",
     "password": "password123"
   }
   // Réponse: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
   ```

3. **Requêtes sécurisées**
   ```javascript
   GET /api/members
   Headers: {
     "Authorization": "Bearer YOUR_TOKEN_HERE"
   }
   ```

## 🎨 Personnalisation des Couleurs

Les variables de couleurs CSS peuvent être modifiées dans [App.css](src/App.css) :

```css
:root {
  --primary-color: #3498db;      /* Bleu principal */
  --success-color: #27ae60;       /* Vert succès */
  --danger-color: #e74c3c;        /* Rouge danger */
  --warning-color: #f39c12;       /* Orange warning */
  --info-color: #2980b9;          /* Bleu info */
  --dark-color: #2c3e50;          /* Sombre */
  --light-color: #ecf0f1;         /* Clair */
}
```

## 🌐 Déploiement

### Déployer sur Netlify
```bash
npm run build
# Uploadez le dossier dist/ sur Netlify
```

### Déployer sur Vercel
```bash
npm run build
# Connectez votre repository à Vercel
```

## 🤝 Support du Backend

⚠️ **Important** : Le frontend nécessite le backend Node.js/Express en cours d'exécution sur `http://localhost:5000`

Pour lancer le backend :
```bash
cd ../backend
npm install
npm start
```

## 📝 Notes Importantes

- Le JWT est stocké dans `localStorage` pour la persistence
- L'application vérifie automatiquement si le token est valide
- Les requêtes sans token valide reçoivent une erreur 401
- L'interface se réinitialise automatiquement après une déconnexion

## 🐛 Dépannage

### Erreur: "Impossible de charger les membres"
- Vérifiez que le backend est en cours d'exécution sur le port 5000
- Vérifiez que vous êtes connecté (le token doit être valide)

### Erreur: "Email ou mot de passe incorrect"
- Vérifiez que l'email et le mot de passe sont exacts
- Assurez-vous que le compte a été créé avec succès auparavant

### Le token reste après rechargement
- C'est normal ! Le localStorage persiste les données
- Pour vous déconnecter complètement, cliquez sur "Se déconnecter"

## 📞 Besoin d'aide ?

Consultez les fichiers :
- [Backend README](../backend/README.md) - Documentation du backend
- [Documentation JWT](https://jwt.io/) - Comprendre JWT
