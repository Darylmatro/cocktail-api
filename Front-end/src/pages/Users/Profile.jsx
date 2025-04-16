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
  const [allIngredients, setAllIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchFavCocktails = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/cocktail/list');
        console.log(response.data);
        setFavoritesCocktails(response.data);
        
        // Extract all unique ingredients for filters
        const ingredientSet = new Set();
        response.data.forEach(cocktail => {
            cocktail.ingredients.forEach(ingredient => {
                ingredientSet.add(ingredient);
            });
        });
        setAllIngredients(Array.from(ingredientSet).sort());
        
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
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
      fetchFavCocktails();
    }
  }, [user, navigate]);

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

      if (!response.ok) throw new Error(data.error || "Erreur de mise à jour");

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

  if (!user) return <div className="text-center py-10">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mon Profil</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setError("");
                  setSuccessMessage("");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-300"
                disabled={isLoading}
              >
                {isEditing ? "Annuler" : "Modifier"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Déconnection
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className={`w-full ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white py-2 px-4 rounded-md transition duration-300`}
                disabled={isLoading}
              >
                {isLoading ? "Mise à jour..." : "Enregistrer les modifications"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1>Cocktails favoris</h1>
        {/*liste des cocktails favoris*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {favoritesCocktails.map((cocktail, index) => (
                      <div>
                        {user.favorites.includes(cocktail.name) && (
                        <div key={index} className="relative group">
                            {/* Icône avec image cocktail */}
                            <div className="w-full aspect-square rounded-full overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-95 mx-auto max-w-[250px]">
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
                        )}
                      </div>
                    ))}
                </div>

      </div>
    </div>
  );
};

export default Profile;
