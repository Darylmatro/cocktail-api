import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation basique
    if (!username || !email || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          "Inscription réussie ! Vous allez être redirigé vers la page de connexion."
        );
        navigate("/login");
      } else {
        setError(data.error || "Une erreur est survenue lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>

      <div>
        Déjà inscrit ?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Se connecter
        </span>
      </div>
    </div>
  );
}

export default Register;
