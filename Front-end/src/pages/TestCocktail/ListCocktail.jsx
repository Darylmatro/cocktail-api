import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProtectedLink from "../Users/ProtectedLink";

function ListCocktail() {
    
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        alcoholFilter: 'all', // 'all', 'alcoholic', 'non-alcoholic'
        ingredients: []
    });
    const [showFilters, setShowFilters] = useState(false);
    const [allIngredients, setAllIngredients] = useState([]);

    const fetchAPI = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cocktail/list');
            console.log(response.data);
            setData(response.data);
            
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

    useEffect(() => {
        fetchAPI();
    }, []);

    // Placeholder image if cocktail doesn't have one
    const getImageUrl = (cocktail) => {
        return cocktail.image_url || `../../../public/Mojito.webp`;
    };

    // Handle ingredient filter toggle
    const toggleIngredientFilter = (ingredient) => {
        setFilters(prevFilters => {
            const newIngredients = [...prevFilters.ingredients];
            if (newIngredients.includes(ingredient)) {
                return {
                    ...prevFilters,
                    ingredients: newIngredients.filter(item => item !== ingredient)
                };
            } else {
                return {
                    ...prevFilters,
                    ingredients: [...newIngredients, ingredient]
                };
            }
        });
    };

    // Filter cocktails based on search and filters
    const filteredCocktails = data.filter(cocktail => {
        // Search term filter
        const matchesSearch = cocktail.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Alcohol filter
        let matchesAlcohol = true;
        if (filters.alcoholFilter === 'alcoholic') {
            matchesAlcohol = cocktail.alcohol === true;
        } else if (filters.alcoholFilter === 'non-alcoholic') {
            matchesAlcohol = cocktail.alcohol === false;
        }
        
        // Ingredients filter
        let matchesIngredients = true;
        if (filters.ingredients.length > 0) {
            matchesIngredients = filters.ingredients.every(ingredient => 
                cocktail.ingredients.some(cocktailIngredient => 
                    cocktailIngredient.toLowerCase().includes(ingredient.toLowerCase())
                )
            );
        }
        
        return matchesSearch && matchesAlcohol && matchesIngredients;
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Nos Délicieux Cocktails</h2>
                
                <ProtectedLink 
                    to="/testCocktail/new" 
                ><div className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Créer un cocktail
                </div></ProtectedLink>
            </div>
            
            {/* Search and filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Rechercher un cocktail..."
                            className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    
                    <div className="flex gap-2">
                        <select
                            className="py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            value={filters.alcoholFilter}
                            onChange={(e) => setFilters({...filters, alcoholFilter: e.target.value})}
                        >
                            <option value="all">Tous les cocktails</option>
                            <option value="alcoholic">Avec alcool</option>
                            <option value="non-alcoholic">Sans alcool</option>
                        </select>
                        
                        <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-full transition duration-300 flex items-center"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                            </svg>
                            Filtres
                            {filters.ingredients.length > 0 && (
                                <span className="ml-1 bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                                    {filters.ingredients.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Ingredient filters */}
                {showFilters && (
                    <div className="mt-4 border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Filtrer par ingrédients</h3>
                        <div className="flex flex-wrap gap-2">
                            {allIngredients.map((ingredient, idx) => (
                                <label key={idx} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-orange-500 rounded focus:ring-orange-500"
                                        checked={filters.ingredients.includes(ingredient)}
                                        onChange={() => toggleIngredientFilter(ingredient)}
                                    />
                                    <span className="text-sm text-gray-700">{ingredient}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : filteredCocktails.length === 0 ? (
                <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun cocktail trouvé</h3>
                    <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredCocktails.map((cocktail, index) => (
                        <div key={index} className="relative group">
                            {/* Circular card with hover effect */}
                            <div className="w-full aspect-square rounded-full overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-95 mx-auto max-w-[250px]">
                                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden relative bg-white">
                                        {/* Cocktail image */}
                                        <img 
                                            src={getImageUrl(cocktail)} 
                                            alt={cocktail.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        
                                        {/* Overlay with name always visible */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                                            <h3 className="text-xl font-bold text-white text-center mb-2 drop-shadow-md">
                                                {cocktail.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Information card that appears on hover */}
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
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListCocktail;