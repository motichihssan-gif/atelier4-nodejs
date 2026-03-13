const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const JWT_SECRET = "ma_super_cle_ultra_secrete_2026";

// Stockage temporaire en mémoire
const users = [];

// Base de données statique des membres
const members = [
  { id: 1, name: "Alice Martin", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Dupont", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie Durand", email: "charlie@example.com", role: "User" },
  { id: 4, name: "Diana Laurent", email: "diana@example.com", role: "Moderator" },
  { id: 5, name: "Eve Bernard", email: "eve@example.com", role: "User" }
];

// ================= ROUTE DE TEST =================
app.get("/api", (req, res) => {
  res.json({ msg: "Hello Fullstack - Atelier 4" });
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (users.find(user => user.email === email)) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    const token = jwt.sign(
      { email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
});

// ================= MIDDLEWARE JWT =================
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(403).json({ error: "Accès interdit - Token manquant" });
  }

  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "Accès interdit - Token invalide" });
    }
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};

// ================= PROFILE (sécurisé) =================
app.get("/profile", verifyToken, (req, res) => {
  const user = users.find(user => user.email === req.user.email);

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  res.json({
    username: user.username,
    email: user.email
  });
});

// ================= ROUTE MEMBERS (sécurisée) =================
app.get("/api/members", verifyToken, (req, res) => {
  try {
    // Retourner la liste complète des membres
    res.json({
      message: "Liste des membres récupérée avec succès",
      count: members.length,
      members: members
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des membres" });
  }
});

// ================= ROUTE POUR OBTENIR UN MEMBRE PAR ID (sécurisée) =================
app.get("/api/members/:id", verifyToken, (req, res) => {
  try {
    const member = members.find(m => m.id === parseInt(req.params.id));
    
    if (!member) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }

    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du membre" });
  }
});

// ================= ROUTE POUR AJOUTER UN MEMBRE (sécurisée) =================
app.post("/api/members", verifyToken, (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // Vérifier si le member existe déjà
    if (members.find(m => m.email === email)) {
      return res.status(400).json({ error: "Ce membre existe déjà" });
    }

    const newMember = {
      id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1,
      name,
      email,
      role
    };

    members.push(newMember);

    res.status(201).json({
      message: "Membre créé avec succès",
      member: newMember
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création du membre" });
  }
});

// ================= ROUTE POUR SUPPRIMER UN MEMBRE (sécurisée) =================
app.delete("/api/members/:id", verifyToken, (req, res) => {
  try {
    const index = members.findIndex(m => m.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }

    const deletedMember = members.splice(index, 1);

    res.json({
      message: "Membre supprimé avec succès",
      member: deletedMember[0]
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression du membre" });
  }
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur le port ${PORT}`);
  console.log(`📌 Routes disponibles:`);
  console.log(`   - GET  /api`);
  console.log(`   - POST /register`);
  console.log(`   - POST /login`);
  console.log(`   - GET  /profile (sécurisée)`);
  console.log(`   - GET  /api/members (sécurisée)`);
  console.log(`   - GET  /api/members/:id (sécurisée)`);
  console.log(`   - POST /api/members (sécurisée)`);
  console.log(`   - DELETE /api/members/:id (sécurisée)`);
});
