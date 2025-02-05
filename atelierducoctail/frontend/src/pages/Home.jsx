import React, { useState, useEffect } from "react";

const Home = () => {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        setCocktails([
            { name: "Mojito", image: "/assets/mojito.jpg" },
            { name: "Piña Colada", image: "/assets/pina_colada.jpg" },
            { name: "Margarita", image: "/assets/margarita.jpg" },
        ]);
    }, []);

    return (
        <div className="bg-gradient-to-b from-orange-300 to-yellow-100 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenue sur Atelier du Cocktail 🍹</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cocktails.map((cocktail, index) => (
                    <div key={index} className="bg-white p-4 rounded-2xl shadow-lg text-center">
                        <img src={cocktail.image} alt={cocktail.name} className="w-full h-48 object-cover rounded-xl" />
                        <h2 className="text-xl font-semibold mt-3">{cocktail.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;