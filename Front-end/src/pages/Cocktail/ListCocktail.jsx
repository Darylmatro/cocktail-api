import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListCocktail() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cocktail/list"
      );
      console.log("Données reçues:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setError("Erreur lors du chargement des cocktails");
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des cocktails</h2>
      {data.length === 0 ? (
        <p>Chargement des cocktails...</p>
      ) : (
        <ul className="space-y-4">
          {data.map((cocktail) => (
            <li key={cocktail._id} className="bg-sky-700 p-4 rounded-lg shadow">
              <h3 className="text-2xl font-bold text-white">{cocktail.name}</h3>
              <p className="text-white">
                Alcool: {cocktail.alcohol ? "Oui" : "Non"}
              </p>
              <p className="text-white">
                Degré d'alcool: {cocktail.alcohol_level}°
              </p>
              <div className="mt-2">
                <h4 className="text-white font-semibold">Ingrédients:</h4>
                <ul className="list-disc list-inside text-white">
                  {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  to={`/cocktail/detail/${cocktail._id}`}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded inline-block"
                >
                  Voir le cocktail
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListCocktail;
