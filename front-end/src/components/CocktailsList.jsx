import { useEffect, useState } from "react";
import axios from "axios";

function CocktailList() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/read")
      .then((response) => setCocktails(response.data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Nos Cocktails</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cocktails.map((cocktail, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={cocktail.image || "https://via.placeholder.com/150"}
              alt={cocktail.Nom}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{cocktail.Nom}</h2>
              <p className="text-gray-600">
                {cocktail.Alcool ? "Alcoolisé" : "Sans alcool"}
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Voir recette
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CocktailList;
