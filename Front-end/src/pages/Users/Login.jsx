// src/pages/Users/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

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
        // Stockage dans le localStorage et mise à jour du contexte
        localStorage.setItem("user", JSON.stringify(data));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setUser(data);
        // Redirection immédiate vers la page d'accueil
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate("/inscription")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
