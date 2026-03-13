import React from "react";
import axios from "axios";
import "./App.css";

// S'assure de supprimer le '/' final s'il est présent dans la variable d'environnement pour éviter "url//login"
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

function App() {
  // ==================== STATES ====================
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = React.useState(null);
  const [members, setMembers] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState(""); // success, error, info
  const [loadingMembers, setLoadingMembers] = React.useState(false);
  const [loadingInitial, setLoadingInitial] = React.useState(!!localStorage.getItem("token")); // État pour le chargement initial
  const [showAddMember, setShowAddMember] = React.useState(false);
  const [isLoginView, setIsLoginView] = React.useState(true);
  const [newMember, setNewMember] = React.useState({
    name: "",
    email: "",
    role: "User"
  });

  // ==================== FONCTIONS UTILITAIRES ====================
  const showNotification = (msg, type = "info") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  // 📌 Récupérer le profil
  const loadProfile = async (authToken = token) => {
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setProfile(res.data);
    } catch (err) {
      // Si erreur 401 (Unauthorized), le token est expiré
      if (err.response?.status === 401) {
        setToken("");
        localStorage.removeItem("token");
        showNotification("⏰ Votre session a expiré. Veuillez vous reconnecter.", "error");
      } else {
        showNotification("❌ Impossible de récupérer le profil", "error");
      }
    }
  };

  // 📌 Récupérer la liste des membres
  const loadMembers = async (authToken = token) => {
    setLoadingMembers(true);
    try {
      const res = await axios.get(`${API_URL}/api/members`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setMembers(res.data.members || []);
    } catch (err) {
      // Si erreur 401 (Unauthorized), le token est expiré
      if (err.response?.status === 401) {
        setToken("");
        localStorage.removeItem("token");
        showNotification("⏰ Votre session a expiré. Veuillez vous reconnecter.", "error");
      } else {
        showNotification("❌ Impossible de charger les membres", "error");
      }
    } finally {
      setLoadingMembers(false);
    }
  };

  // ==================== VÉRIFICATION TOKEN AU DÉMARRAGE ====================
  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Charger le profil et les membres avec le token stocké
      const loadData = async () => {
        await loadProfile(storedToken);
        await loadMembers(storedToken);
        setLoadingInitial(false);
      };
      loadData();
    } else {
      setLoadingInitial(false);
    }
  }, []);

  // ==================== AUTHENTIFICATION ====================
  // 📌 Inscription
  const register = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      showNotification("Veuillez remplir tous les champs", "error");
      return;
    }
    try {
      await axios.post(`${API_URL}/register`, { username, email, password });
      showNotification("✅ Inscription réussie ! Connectez-vous maintenant.", "success");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Erreur lors de l'inscription";
      showNotification("❌ " + errorMsg, "error");
    }
  };

  // 📌 Connexion
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification("Veuillez remplir tous les champs", "error");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      showNotification("✅ Connexion réussie ! Bienvenue.", "success");
      setEmail("");
      setPassword("");
      // Charger le profil et les membres après la connexion
      loadProfile(token);
      loadMembers(token);
    } catch (err) {
      showNotification("❌ Email ou mot de passe incorrect", "error");
    }
  };

  // 📌 Ajouter un nouveau membre
  const addMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email || !newMember.role) {
      showNotification("Veuillez remplir tous les champs", "error");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/members`, newMember, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers([...members, res.data.member]);
      showNotification("✅ Membre créé avec succès", "success");
      setNewMember({ name: "", email: "", role: "User" });
      setShowAddMember(false);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Erreur lors de la création";
      showNotification("❌ " + errorMsg, "error");
    }
  };

  // 📌 Supprimer un membre
  const deleteMember = async (memberId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/api/members/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(members.filter(m => m.id !== memberId));
      showNotification("✅ Membre supprimé avec succès", "success");
    } catch (err) {
      showNotification("❌ Erreur lors de la suppression", "error");
    }
  };

  // ==================== DÉCONNEXION ====================
  // 📌 Déconnexion
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setProfile(null);
    setMembers([]);
    setShowAddMember(false);
    showNotification("✅ Vous avez été déconnecté", "info");
  };

  // ==================== RENDU ====================
  return (
    <div className="app">
      {/* 🎨 HEADER */}
      <header className="header">
        <div className="header-content">
          <h1>👥 Gestion des Membres</h1>
          {token && profile && (
            <div className="header-user">
              <span className="user-info">
                Connecté en tant que : <strong>{profile.username}</strong>
              </span>
              <button onClick={logout} className="btn btn-logout">
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 📢 NOTIFICATIONS */}
      {message && (
        <div className={`notification notification-${messageType}`}>
          {message}
        </div>
      )}

      {/* 📱 CONTENU PRINCIPAL */}
      <main className="container">
        {loadingInitial && token ? (
          // ⏳ ÉCRAN DE CHARGEMENT
          <div className="auth-container">
            <div className="loading-spinner">
              <p>⏳ Chargement des données...</p>
            </div>
          </div>
        ) : !token ? (
          // 🔐 FORMULAIRE D'AUTHENTIFICATION
          <div className="auth-container">
            <div className="auth-box">
              <h2>{isLoginView ? "🔐 Connexion" : "📝 Inscription"}</h2>

              <div className="auth-tabs" style={{ display: 'flex', marginBottom: '20px', borderBottom: '2px solid var(--light-color)' }}>
                <button 
                  type="button"
                  className={`tab-btn ${isLoginView ? 'active' : ''}`} 
                  onClick={() => setIsLoginView(true)}
                  style={{ flex: 1, padding: '10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: isLoginView ? 'var(--primary-color)' : 'var(--gray-color)', borderBottom: isLoginView ? '3px solid var(--primary-color)' : 'none', outline: 'none' }}
                >
                  Se connecter
                </button>
                <button 
                  type="button"
                  className={`tab-btn ${!isLoginView ? 'active' : ''}`} 
                  onClick={() => setIsLoginView(false)}
                  style={{ flex: 1, padding: '10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: !isLoginView ? 'var(--primary-color)' : 'var(--gray-color)', borderBottom: !isLoginView ? '3px solid var(--primary-color)' : 'none', outline: 'none' }}
                >
                  Créer un compte
                </button>
              </div>

              {!isLoginView ? (
                /* FORMULAIRE D'INSCRIPTION */
                <div className="form-section">
                  <form onSubmit={register}>
                    <div className="form-group">
                      <label htmlFor="register-username">Nom d'utilisateur</label>
                      <input
                        id="register-username"
                        type="text"
                        placeholder="ihssan motich"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        required
                        minLength={3}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-email">Email</label>
                      <input
                        id="register-email"
                        type="email"
                        placeholder="ihssan@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-password">Mot de passe</label>
                      <input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                        minLength={6}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                      S'inscrire
                    </button>
                  </form>
                </div>
              ) : (
                /* FORMULAIRE DE CONNEXION */
                <div className="form-section">
                  <form onSubmit={login}>
                    <div className="form-group">
                      <label htmlFor="login-email">Email</label>
                      <input
                        id="login-email"
                        type="email"
                        placeholder="ihssan@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="login-password">Mot de passe</label>
                      <input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                        minLength={6}
                      />
                    </div>
                    <button type="submit" className="btn btn-success" style={{ width: '100%', marginTop: '10px' }}>
                      Se connecter
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        ) : (
          // 📊 DASHBOARD (Après connexion)
          <div className="dashboard">
            {/* PROFIL */}
            {profile && (
              <section className="section">
                <h2>👤 Profil utilisateur</h2>
                <div className="profile-card">
                  <p><strong>Nom d'utilisateur :</strong> {profile.username}</p>
                  <p><strong>Email :</strong> {profile.email}</p>
                </div>
              </section>
            )}

            {/* GESTION DES MEMBRES */}
            <section className="section">
              <div className="section-header">
                <h2>📋 Liste des Membres</h2>
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="btn btn-primary"
                >
                  {showAddMember ? "✖️ Annuler" : "➕ Ajouter un membre"}
                </button>
              </div>

              {/* FORMULAIRE AJOUTER MEMBRE */}
              {showAddMember && (
                <form onSubmit={addMember} className="form-add-member">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="member-name">Nom</label>
                      <input
                        id="member-name"
                        type="text"
                        placeholder="ihssan motich"
                        value={newMember.name}
                        onChange={(e) =>
                          setNewMember({ ...newMember, name: e.target.value })
                        }
                        className="input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="member-email">Email</label>
                      <input
                        id="member-email"
                        type="email"
                        placeholder="ihssan@gmail.com"
                        value={newMember.email}
                        onChange={(e) =>
                          setNewMember({ ...newMember, email: e.target.value })
                        }
                        className="input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="member-role">Rôle</label>
                      <select
                        id="member-role"
                        value={newMember.role}
                        onChange={(e) =>
                          setNewMember({ ...newMember, role: e.target.value })
                        }
                        className="input"
                      >
                        <option value="User">User</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success">
                      ✅ Créer
                    </button>
                  </div>
                </form>
              )}

              {/* LISTE DES MEMBRES */}
              {loadingMembers ? (
                <p className="loading">⏳ Chargement des membres...</p>
              ) : members.length > 0 ? (
                <div className="members-grid">
                  {members.map((member) => (
                    <div key={member.id} className="member-card">
                      <div className="member-header">
                        <h3>{member.name}</h3>
                        <span className="badge">{member.role}</span>
                      </div>
                      <p className="member-email">📧 {member.email}</p>
                      <div className="member-actions">
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="btn btn-danger btn-small"
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">Aucun membre trouvé.</p>
              )}
            </section>
          </div>
        )}
      </main>

      {/* 🔗 FOOTER */}
      <footer className="footer">
        <p>🔐 Atelier 4: API Sécurisée avec JWT | ReactJS + Express</p>
      </footer>
    </div>
  );
}

export default App;
