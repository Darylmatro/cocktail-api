import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"; // Assure-toi que le chemin est correct

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [favoritesCocktails, setFavoritesCocktails] = useState([]);
  const [cocktailsList, setCocktailsList] = useState([]);
  

  const fetchFavCocktails = async () => {
    try {
      const userId = user.userId
      console.log("USERNAME", userId)
      const url = `http://localhost:5000/api/users/favorites`;
      const response = await axios.post(
          url, 
          { userId }, // Données envoyées au serveur
          { headers: { "Content-Type": "application/json" } } // Configuration
      );
      //console.log(response.data)
      setFavoritesCocktails(response.data)
      console.log("FAVCOCKTAIL: ", response.data)
  } catch (error) {
      console.error(error);
  }
  }

  const fetchCocktailsList = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/cocktail/list');
        setCocktailsList(response.data);
        
        // Extract all unique ingredients for filters
        const ingredientSet = new Set();
        response.data.forEach(cocktail => {
            cocktail.ingredients.forEach(ingredient => {
                ingredientSet.add(ingredient);
            });
        });
    } catch (error) {
        console.error(error);
    }
  };

  // Si aucun utilisateur n'est présent, redirige vers la page de connection
  useEffect(() => {
    if (!user) {
      navigate("/connexion");
    } else {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
      fetchCocktailsList();
      fetchFavCocktails();
    }
  }, [user, navigate]);

  /*useEffect(() => {
    if (user) {
      console.log("Favoris de l'utilisateur:", user.favorites);
      console.log("Tous les cocktails:", cocktailsList);
    }
  }, [user, cocktailsList]);*/
  

  const getImageUrl = (cocktail) => {
    return cocktail.image_url || `../../../public/Mojito.webp`;
  };

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccessMessage("");
  };

  // Soumission du formulaire de mise à jour du profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {

      if (!user._id || !formData.username || !formData.email) {
        throw new Error("Le nom d'utilisateur et l'email sont requis");
      }

      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          username: formData.username,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server response:", data);
        throw new Error(data.error || "Erreur de mise à jour");
      }

      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccessMessage("Profil mis à jour avec succès !");
      setIsEditing(false);
    } catch (err) {
      console.error("Erreur de mise à jour:", err);
      setError(err.message || "Erreur de connexion au serveur");
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion de la déconnection : on vide le localStorage, on met à jour le contexte et on redirige
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/connection");
  };

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-pink-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-100 rounded-full opacity-50 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full opacity-50"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-30"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 text-white">
            <h1 className="text-3xl font-bold">Mon Profil</h1>
            <p className="text-white opacity-80">Gérez vos informations personnelles</p>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-sm">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>{successMessage}</p>
                </div>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className={`flex-1 ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    } text-white py-3 px-6 rounded-lg shadow-md transition duration-300 flex justify-center items-center`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mise à jour...
                      </>
                    ) : (
                      "Enregistrer"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        username: user.username || "",
                        email: user.email || "",
                      });
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg shadow-md transition duration-300"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Modifier
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Nom d'utilisateur</h3>
                        <p className="text-lg text-gray-800">{user.username}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                        <p className="text-lg text-gray-800">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="place-items-center mt-20">
        <h1 className="text-5xl font-bold">Cocktails favoris</h1>
        {/*liste des cocktails favoris*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
                    {cocktailsList.map((cocktail, index) => 
                        favoritesCocktails && favoritesCocktails.includes(cocktail.name) ? (
                        <div className="relative group">
                            {/* Icône avec image cocktail */}
                            <div key={index} className="w-full aspect-square rounded-full overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-95 mx-auto max-w-[250px]">
                                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
                                        {/* Recherche de l'image */}
                                        <img 
                                            src={getImageUrl(cocktail)} 
                                            alt={cocktail.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        
                                        {/* Overlay de l'icône */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                                            <h3 className="text-xl font-bold text-white text-center mb-2 drop-shadow-md">
                                                {cocktail.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Carte d'information hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-full max-w-[280px] transform transition-transform duration-300 scale-90 group-hover:scale-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{cocktail.name}</h3>
                                    
                                    <div className="flex justify-center mb-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${cocktail.alcohol ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                            {cocktail.alcohol ? `${cocktail.alcohol_level}°` : 'Sans alcool'}
                                        </span>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Ingrédients:</h4>
                                        <ul className="space-y-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 pr-2">
                                            {cocktail.ingredients.map((ingredient, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-1.5 flex-shrink-0"></span>
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="flex justify-center">
                                        <Link 
                                            to={`/testCocktail/detail/${cocktail.name}`} 
                                            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium py-2 px-5 rounded-full transition duration-300 text-sm"
                                        >
                                            Voir la recette
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : (null)
                    )}
                </div>

      </div>
    </div>
  );
};

export default Profile;
