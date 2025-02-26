import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CocktailList from "../components/CocktailsList";

function Home() {
  const [cocktails, setCocktails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/read")
      .then((response) => setCocktails(response.data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
    <div>
      <h1>Bienvenue sur CocktailApp</h1>
      <button onClick={() => navigate("/auth")}>Se connecter</button>
      <h2>Liste des cocktails</h2>
      <ul>
        {cocktails.map((cocktail, index) => (
          <li key={index}>
            {cocktail.Nom} - {cocktail.Alcool ? "Alcoolisé" : "Sans alcool"}
          </li>
        ))}
      </ul>
      <CocktailList />
    </div>
  );
}

export default Home;
