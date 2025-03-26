import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Stockage des informations de l'utilisateur
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            email: data.email,
          })
        );

        // Si un token est fourni, le stocker
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        alert("Connexion réussie !");
        navigate("/");
      } else {
        setError(data.error || "Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
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
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>

      <div>
        Pas encore de compte ?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          S'inscrire
        </span>
      </div>
    </div>
  );
}

export default Login;
