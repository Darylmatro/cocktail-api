import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetailCocktail() {

    const { name } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [favoritesCocktails, setFavoritesCocktails] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    const fetchAPI = async () => {
        try {
            setLoading(true);
            const url = `http://localhost:5000/api/cocktail/read/${name}`;
            const response = await axios.get(url);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        try {
            const userId = userData.userId
            console.log("Utilisateur: ", userId)
            console.log("Cocktails favori: ", userData.favorites)
            const url = `http://localhost:5000/api/users/favorites`;
            const response = await axios.post(
                url, 
                { userId }, // Données envoyées au serveur
                { headers: { "Content-Type": "application/json" } } // Configuration
            );
            //console.log(response.data)
            setFavoritesCocktails(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAPI();
        fetchFavorites();
    }, [name]);



    const handleFavorite = async (cocktailName, userId) => {
        let newFavoriteCocktail;

        // retirer si déjà dans favoris
        if (favoritesCocktails.includes(cocktailName)) { //cocktail déjà présent dans les favoris
            newFavoriteCocktail = favoritesCocktails.filter(item => item !== cocktailName);

        // ajouter si pas dans favoris
        } else {
            newFavoriteCocktail = [...favoritesCocktails, cocktailName];
        }

        try {
            const url = `http://localhost:5000/api/users/add-favorite`;
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ newFavoriteCocktail , userId}),
              });
              //console.log(response.data)
        } catch (erreur) {
            console.error(erreur);
            fetchFavorites();
        }
        setFavoritesCocktails(newFavoriteCocktail)
    }


    const handleDelete = async (cocktailName) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cocktail ?")) {
            try {
                await axios.post(`http://localhost:5000/api/cocktail/delete/${cocktailName}`, data);
                alert("Cocktail supprimé avec succès !");
                navigate('/testCocktail/list');
            } catch (erreur) {
                console.error(erreur);
                alert("Erreur lors de la suppression du cocktail");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-pink-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-100 rounded-full opacity-50 transform rotate-45"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-30"></div>
            
            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <button 
                        onClick={() => navigate('/testCocktail/list')}
                        className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Retour à la liste
                    </button>
                    
                </div>

                {data.map((cocktail, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 text-white">
                            
                            {userData && (
                                <button 
                                onClick={() => handleFavorite(cocktail.name, userData.userId)} 
                                className="px-4 py-2 bg-white text-pink-600 hover:bg-pink-100 rounded-lg transition-colors shadow-md flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path 
                                        fillRule="evenodd" 
                                        d={favoritesCocktails.includes(cocktail.name) 
                                            ? "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                            : "M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"} 
                                        clipRule="evenodd" 
                                    />
                                </svg>
                                {favoritesCocktails.includes(cocktail.name) ? "Retirer des favoris" : "Ajouter aux favoris"}
                            </button>
                            )}
                            <button 
                                    onClick={() => navigate(`/testCocktail/detail/${name}/api`)} 
                                    className="px-4 py-2 bg-white text-orange-600 hover:bg-orange-100 rounded-lg transition-colors shadow-md flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    API Cocktail
                                </button>

                            <h1 className="text-4xl font-bold mb-2">{cocktail.name}</h1>
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${cocktail.alcohol ? 'bg-orange-600' : 'bg-green-600'}`}>
                                    {cocktail.alcohol ? `${cocktail.alcohol_level}°` : 'Sans alcool'}
                                </span>
                                <span className="text-sm opacity-80">Par {cocktail.author}</span>
                            </div>
                        </div>

                        {/* Image section */}
                        <div className="p-6 flex justify-center">
                            <div className="w-full max-w-md overflow-hidden rounded-xl shadow-lg">
                                <img 
                                    src={cocktail.image_url || "/images/default-cocktail.jpg"} 
                                    alt={`Cocktail ${cocktail.name}`}
                                    className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/images/default-cocktail.jpg";
                                    }}
                                />
                            </div>
                        </div>

                        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Ingrédients
                                </h2>
                                <ul className="space-y-3">
                                    {cocktail.ingredients.map((ingredient, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Préparation
                                </h2>
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                    <p className="text-gray-700 whitespace-pre-line">{cocktail.preparation}</p>
                                </div>
                            </div>
                        </div>

                        {userData && userData.username === cocktail.author && (
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
                                <button 
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md flex items-center"
                                    onClick={() => navigate(`/testCocktail/edit/${cocktail.name}`)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Modifier
                                </button>
                                <button 
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md flex items-center"
                                    onClick={() => handleDelete(cocktail.name)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailCocktail;