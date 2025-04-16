import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [featuredCocktails, setFeaturedCocktails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch featured cocktails
                const cocktailsResponse = await axios.get('http://localhost:5000/api/cocktail/list');
                
                // Get 3 random cocktails for the featured section
                const randomCocktails = cocktailsResponse.data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                
                setFeaturedCocktails(randomCocktails);
                
                // Create categories based on available cocktails
                const categoriesData = [
                    {
                        id: 1,
                        name: "Cocktails Tropicaux",
                        description: "Découvrez des saveurs exotiques",
                        image: "./CocktailTropicaux.webp"
                    },
                    {
                        id: 2,
                        name: "Mocktails",
                        description: "Sans alcool mais pleins de saveurs",
                        image: "./Mocktails.webp"
                    },
                    {
                        id: 3,
                        name: "Classiques",
                        description: "Les incontournables revisités",
                        image: "./Classiques.webp"
                    },
                    {
                        id: 4,
                        name: "Fruités",
                        description: "Explosions de saveurs fruitées",
                        image: "./Fruités.webp"
                    }
                ];
                
                setCategories(categoriesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Here you would connect to your API to save the email
        console.log("Email submitted:", email);
        // Reset the form
        setEmail('');
        // Show success message (you could add a state for this)
        alert("Merci pour votre inscription!");
    };

    // Get image for a cocktail or use placeholder
    const getCocktailImage = (cocktail) => {
        return cocktail.image_url || `../../../public/Mojito.webp`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
            {/* Hero Section */}
            <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/cocktailhome.webp')" }}>
                <div className="relative container mx-auto px-6 flex items-center justify-center h-full">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Découvrez des Cocktails Rafraîchissants</h1>
                        <p className="text-xl text-white mb-8 drop-shadow-lg">Parfaits pour vos soirées d'été</p>
                        <Link to="/testCocktail/list" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg inline-block">
                            Explorer
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Catégories Populaires</h2>
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((category) => (
                            <Link 
                                key={category.id} 
                                to={`/testCocktail/list?category=${encodeURIComponent(category.name)}`}
                                className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
                            >
                                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${category.image}')` }}></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                                    <p className="text-gray-600">{category.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Featured Cocktails */}
            <div className="bg-blue-50 py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Cocktails Tendance</h2>
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCocktails.map((cocktail, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
                                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${getCocktailImage(cocktail)}')` }}></div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-xl font-semibold text-gray-800">{cocktail.name}</h3>
                                            <span className={`${cocktail.alcohol ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'} text-xs font-semibold px-3 py-1 rounded-full`}>
                                                {cocktail.alcohol ? `${cocktail.alcohol_level}°` : 'Sans alcool'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">
                                            {cocktail.ingredients.slice(0, 3).join(', ')}
                                            {cocktail.ingredients.length > 3 ? '...' : ''}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span className="text-gray-600 ml-1">{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                                            </div>
                                            <Link to={`/testCocktail/detail/${cocktail.name || index}`} className="text-blue-500 hover:text-blue-700 font-medium">
                                                Voir la recette
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl shadow-xl p-10 md:p-16">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Recevez nos recettes exclusives</h2>
                        <p className="text-white text-lg mb-8">Inscrivez-vous à notre newsletter pour découvrir chaque semaine de nouvelles recettes de cocktails.</p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Votre adresse email" 
                                className="flex-grow py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-white text-orange-500 hover:bg-orange-100 font-semibold py-3 px-8 rounded-full transition duration-300">
                                S'inscrire
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;