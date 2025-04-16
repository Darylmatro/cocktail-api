import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewCocktail() {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    const [ingredients, setIngredients] = useState([""]);
    const [name, setName] = useState("");
    const [alcohol, setAlcohol] = useState(false);
    const [alcohol_level, setAlcohol_level] = useState(0);
    const [preparation, setPreparation] = useState("");
    const [categorie, setCategorie] = useState("Classiques");
    const [loading, setLoading] = useState(false);

    // Fonction pour ajouter un champ d'ingrédient
    const addIngredient = () => {
        if (ingredients.length < 10) {
            setIngredients([...ingredients, ""]);
        } else {
            alert("Vous ne pouvez ajouter que 10 ingrédients maximum.");
        }
    };
    const updateIngredient = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };
    const removeIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const resetForm = () => {
        setName("");
        setAlcohol(false);
        setAlcohol_level(0);
        setIngredients([""]);
        setPreparation("");
        setCategorie("classique")
    };

    //envoi des données vers l'api falsk
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: name,
            alcohol: alcohol,
            alcohol_level: alcohol_level,
            ingredients: ingredients,
            preparation: preparation,
            categorie: categorie,
            author: userData.username
        };
        console.log(data);
        try {
            const response = await axios.post('http://localhost:5000/api/cocktail/create', data);
            console.log(response.data);
            alert("Le cocktail a été ajouté");
            resetForm();
            navigate('/testCocktail/list');
        } catch (error) {
            alert("Erreur lors de l'ajout du cocktail");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-100 rounded-full opacity-50 transform rotate-45"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-30"></div>
            
            <div className="container mx-auto max-w-3xl relative z-10">
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

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 text-white">
                        <h1 className="text-3xl font-bold">Ajouter un cocktail</h1>
                        <p className="mt-2 opacity-80">Partagez votre recette avec la communauté</p>
                    </div>

                    <form onSubmit={handleSubmit} method='POST' className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom du cocktail
                                </label>
                                <input 
                                    type='text' 
                                    id='name' 
                                    name='name' 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor='categorie' className="block text-sm font-medium text-gray-700 mb-1">
                                    Catégorie
                                </label>
                                <select 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                    name="categorie" 
                                    id="categorie" 
                                    value={categorie}
                                    onChange={(e) => setCategorie(e.target.value)}
                                >
                                    <option value="Classiques">Classiques</option>
                                    <option value="Fruités">Fruités</option>
                                    <option value="Cocktails Tropicaux">Cocktails Tropicaux</option>
                                    <option value="Mocktails">Mocktails</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center">
                                <input 
                                    type='checkbox' 
                                    id='alcohol' 
                                    name='alcohol' 
                                    className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded" 
                                    checked={alcohol} 
                                    onChange={(e) => setAlcohol(e.target.checked)}
                                />
                                <label htmlFor='alcohol' className="ml-2 block text-sm font-medium text-gray-700">
                                    Contient de l'alcool
                                </label>
                            </div>

                            <div className={alcohol ? "opacity-100" : "opacity-50"}>
                                <label htmlFor='alcohol_level' className="block text-sm font-medium text-gray-700 mb-1">
                                    Degré d'alcool
                                </label>
                                <input 
                                    type='number' 
                                    id='alcohol_level' 
                                    name='alcohol_level' 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                    value={alcohol_level} 
                                    onChange={(e) => setAlcohol_level(e.target.value)}
                                    disabled={!alcohol}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Ingrédients
                            </label>
                            <div className="space-y-3">
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => updateIngredient(index, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder={`Ingrédient ${index + 1}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                            className="ml-2 bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                                            disabled={ingredients.length === 1}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {ingredients.length < 10 && (
                                <button
                                    type="button"
                                    onClick={addIngredient}
                                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                    Ajouter un ingrédient
                                </button>
                            )}
                        </div>

                        <div>
                            <label htmlFor='preparation' className="block text-sm font-medium text-gray-700 mb-1">
                                Préparation
                            </label>
                            <textarea 
                                id='preparation' 
                                name='preparation' 
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                                value={preparation} 
                                onChange={(e) => setPreparation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="mr-4 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                            >
                                Réinitialiser
                            </button>
                            <button 
                                type='submit' 
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Création en cours...
                                    </span>
                                ) : "Ajouter le cocktail"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewCocktail;