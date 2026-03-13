# 🔐 Comprendre JWT (JSON Web Token) - Guide Complet

## Qu'est-ce qu'un JWT ?

Un **JWT (JSON Web Token)** est un standard ouvert (RFC 7519) pour créer un accès sécurisé entre deux parties.

Il permet d'authentifier et d'autoriser les utilisateurs de manière sécurisée sur le web, sans avoir besoin d'envoyer le mot de passe à chaque requête.

## Comment fonctionne JWT ?

### Flux général

```
1. L'utilisateur se connecte
   ↓
2. Le serveur vérifie les identifiants
   ↓
3. Si c'est correct, le serveur génère un JWT
   ↓
4. Le client stocke le JWT (localStorage, sessionStorage, ou cookie)
   ↓
5. À chaque nouvelle requête, le client ajoute le JWT dans les headers
   ↓
6. Le serveur vérifie le JWT avant de permettre l'accès
```

## Structure d'un JWT

Un JWT est composé de **3 parties séparées par des points** :

```
Header.Payload.Signature
```

Exemple complet :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NzcwMDAwMDB9.
TYJqGCZqXXX7Qj3YX4X7QYZZZ4X4QZZZ4X4QZZZ4
```

### 1️⃣ Header (En-tête)

Indique le type de jeton et l'algorithme utilisé.

**Contenu décodé** :
```json
{
  "alg": "HS256",    // Algorithme de signature
  "typ": "JWT"       // Type de jeton
}
```

**Base64 encodé** :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### 2️⃣ Payload (Charge utile)

Contient les données de l'utilisateur (claims).

**Contenu décodé** :
```json
{
  "email": "john@example.com",
  "username": "john",
  "iat": 1677000000,      // Issued at (timestamp)
  "exp": 1677003600       // Expiration (timestamp)
}
```

**Base64 encodé** :
```
eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NzcwMDAwMDB9
```

### 3️⃣ Signature

Garantit que le token n'a pas été modifié. Elle est générée en signant les 2 premières parties avec une clé secrète.

**Calcul** :
```javascript
SIGNATURE = HMAC-SHA256(
  Base64Url(Header) + "." + Base64Url(Payload),
  SecretKey
)
```

**Exemple** :
```
TYJqGCZqXXX7Qj3YX4X7QYZZZ4X4QZZZ4X4QZZZ4
```

## Visualiser et Décoder un JWT

Vous pouvez utiliser [jwt.io](https://jwt.io/) pour :
- ✅ Décoder un JWT
- ✅ Vérifier la signature
- ✅ Générer un JWT personnalisé

## Avantages de JWT

| Avantage | Explication |
|----------|-------------|
| **Stateless** | Pas besoin de stocker les sessions sur le serveur |
| **Sécurisé** | Signé cryptographiquement, impossible à modifier |
| **Portable** | Peut être utilisé dans l'URL, headers, ou cookies |
| **Scalable** | Fonctionne bien avec les architectures distribuées |
| **Cross-domain** | Supporte CORS (requêtes cross-origin) |
| **Mobile-friendly** | Parfait pour les applications mobiles |

## Inconvénients de JWT

| Inconvénient | Solution |
|-------------|----------|
| **Revocation** | Difficile de révoquer avant l'expiration | Utiliser refresh tokens |
| **Taille** | Peut être volumineux | Minifier les claims |
| **Stockage** | Risque XSS en localStorage | Utiliser des cookies SecureHTTP |
| **Expiration** | Doit expirer rapidement pour la sécurité | Utiliser des refresh tokens |

## Implémentation dans Atelier 4

### Backend (Node.js)

#### 1️⃣ Générer un JWT

```javascript
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ma_super_cle_ultra_secrete_2026';

// Générer un token
const token = jwt.sign(
  { email: user.email, username: user.username },  // Payload
  JWT_SECRET,                                      // Secret
  { expiresIn: '1h' }                             // Options
);
```

#### 2️⃣ Vérifier un JWT

```javascript
// Middleware pour vérifier le token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Token manquant' });
  }
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;  // Ajouter les infos de l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};
```

#### 3️⃣ Utiliser le middleware

```javascript
// Route protégée
app.get('/api/members', verifyToken, (req, res) => {
  // req.user contient maintenant les données de l'utilisateur
  res.json({
    message: 'Voici les membres',
    user: req.user
  });
});
```

### Frontend (React)

#### 1️⃣ Stocker le JWT

```javascript
// Après la connexion
const login = async () => {
  const res = await axios.post('/login', { email, password });
  const token = res.data.token;
  localStorage.setItem('token', token);  // Stocker dans localStorage
};
```

#### 2️⃣ Envoyer le JWT dans les requêtes

```javascript
// Envoyer une requête avec le token
const loadMembers = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('/api/members', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
```

#### 3️⃣ Gérer l'expiration

```javascript
// Si le token expire, l'utilisateur est redirigé vers le login
const handleApiError = (error) => {
  if (error.response?.status === 401) {
    // Token expiré ou invalide
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};
```

## Types de Claims JWT

### Claims Standardisés (Registered)

| Claim | Signification | Exemple |
|-------|---|---------|
| `iss` | Issuer (Émetteur) | `"https://example.com"` |
| `sub` | Subject (Sujet) | `"user@example.com"` |
| `aud` | Audience | `"app"` |
| `exp` | Expiration Time | `1677003600` |
| `nbf` | Not Before | `1677000000` |
| `iat` | Issued At | `1677000000` |
| `jti` | JWT ID (unique) | `"unique-id-123"` |

### Claims Personnalisés

Vous pouvez ajouter des données personnalisées :

```javascript
const token = jwt.sign({
  email: 'john@example.com',     // Claim personnalisé
  username: 'john',               // Claim personnalisé
  role: 'admin',                  // Claim personnalisé
  preferences: { theme: 'dark' }  // Claim personnalisé
}, JWT_SECRET);
```

## Sécurité JWT

### ✅ Bonnes Pratiques

1. **Secret fort** : Utilisez une clé secrète longue et aléatoire
   ```javascript
   // ✅ Bon
   const JWT_SECRET = 'aBcDeFgHiJkLmNoPqRsT1234567890!!';
   
   // ❌ Mauvais
   const JWT_SECRET = 'secret';
   ```

2. **HTTPS obligatoire** : Ne transmettez jamais le token en HTTP non chiffré

3. **Expiration courte** : Les tokens doivent expirer rapidement
   ```javascript
   { expiresIn: '15m' }  // 15 minutes
   ```

4. **Refresh tokens** : Utilisez des refresh tokens pour obtenir de nouveaux accès
   ```javascript
   // Short-lived access token
   const accessToken = jwt.sign(payload, SECRET, { expiresIn: '15m' });
   
   // Long-lived refresh token
   const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
   ```

5. **Validation stricte** : Vérifiez toujours la signature et l'expiration

6. **Stockage sécurisé** (Frontend) :
   ```javascript
   // ✅ Bon (mais attention aux XSS)
   localStorage.setItem('token', token);
   
   // ✅ Meilleur (http-only cookie)
   // Mettre en place un cookie http-only côté serveur
   ```

### ⚠️ Risques Potentiels

1. **XSS (Cross-Site Scripting)** : Lire le token en localStorage
   - Solution : HttpOnly cookies

2. **Token replay** : Rejouer le token capturé
   - Solution : HTTPS + Expiration courte

3. **Révocation impossible** : Difficile d'invalider un token actif
   - Solution : Blacklist des tokens ou tokens courts

4. **Algorithme faible** : Utiliser SHA256 au minimum
   - ✅ HS256 (HMAC SHA256)
   - ✅ RS256 (RSA SHA256)
   - ❌ HS1 (obsolète)

## Comparaison avec les Sessions

| Aspect | JWT | Sessions |
|--------|-----|----------|
| **Stockage** | Client | Serveur |
| **Scalabilité** | Excellent | Difficile |
| **Revocation** | Difficile | Facile |
| **Performance** | Rapide | Plus lent |
| **Sécurité** | Bonne | Bonne |
| **Cas d'usage** | APIs, SPAs | Applications web |

## Exemple Complet de Flux

### 1. Inscription & Connexion

```
Client: POST /login
        { email: "john@example.com", password: "123456" }
        
Serveur: Vérifie les identifiants
         Génère un JWT signé
         Retourne { token: "eyJhb..." }
         
Client: Stocke le token dans localStorage
        localStorage.setItem('token', token)
```

### 2. Requête Protégée

```
Client: GET /api/members
        Headers: {
          Authorization: "Bearer eyJhb..."
        }
        
Serveur: Extrait le token du header
         Vérifie la signature avec la clé secrète
         Vérifie l'expiration
         Si valide → répond normalement
         Si invalide → retourne 401 Unauthorized
         
Client: Affiche les données
        OU redirige vers /login si erreur 401
```

## Ressources Utiles

- [JWT.io Official](https://jwt.io/) - Site officiel JWT
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - Spécification JWT
- [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken) - Librairie Node.js
- [JWT Security Best Practices](https://tools.ietf.org/html/rfc8725) - Bonnes pratiques

## Résumé

✅ **JWT** = Token Stateless sécurisé pour l'authentification  
✅ **3 parties** = Header.Payload.Signature  
✅ **Sécurisé** = Signé cryptographiquement  
✅ **Scalable** = Pas besoin de session serveur  
✅ **Parfait pour les APIs** = Utilisé dans Atelier 4!  

---

Maintenant que vous comprenez JWT, explorez le code dans `backend/index.js` et `frontend/src/App.jsx` pour voir la mise en pratique !
