import React, { useState } from 'react';
import axios from 'axios';

function NewCocktail() {

    const [ingredients, setIngredients] = useState([""]);
    const [name, setName] = useState("");
    const [alcohol, setAlcohol] = useState(false);
    const [alcohol_level, setAlcohol_level] = useState(0);
    const [preparation, setPreparation] = useState("");

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
    };


    //envoi des données vers l'api falsk
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            alcohol: alcohol,
            alcohol_level: alcohol_level,
            ingredients: ingredients,
            preparation: preparation,
        };
        console.log(data);
        try {
            const response = await axios.post('http://localhost:5000/api/cocktail/create', data);
            console.log(response.data);
            alert(response.data.message);
            resetForm();
            window.location.reload();
        } catch (error) {
            alert("Erreur lors de l'ajout du cocktail");
            console.error(error);
        }
        
    }


    return (
        <div>
            <h2>Ajouter un cocktail</h2>
            <form className='bg-sky-700 p-2 my-2 felx flex-col' onSubmit={handleSubmit} method='POST'>

                <div className='grid grid-cols-2 justify-around bg-sky-500 p-2 my-2'>
                    <label htmlFor='name'>Nom du cocktail</label>
                    <input type='text' id='name' name='name' className='bg-gray-100 text-black' 
                    value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className='grid grid-cols-2 justify-around bg-sky-500 p-2 my-2'>
                    <label htmlFor='alcohol'>Alcool</label>
                    <input type='checkbox' id='alcohol' name='alcohol' 
                    checked={alcohol} onChange={(e) => setAlcohol(e.target.value)}/>
                </div>

                <div className='grid grid-cols-2 justify-around bg-sky-500 p-2 my-2'>
                    <label htmlFor='alcohol_level'>Degré d'alcool</label>
                    <input type='number' id='alcohol_level' name='alcohol_level' className='bg-gray-100 text-black' 
                    value={alcohol_level} onChange={(e) => setAlcohol_level(e.target.value)}/>
                </div>

                <div className="bg-sky-500 p-2 my-2">
                    <label>Ingrédients</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center my-2">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => updateIngredient(index, e.target.value)}
                                className="bg-gray-100 text-black p-2 flex-1"
                                placeholder={`Ingrédient ${index + 1}`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeIngredient(index)}
                                className="bg-sky-700 text-white px-2 ml-2 rounded"
                            >
                                -
                            </button>
                        </div>
                    ))}
                    {ingredients.length < 10 && (
                        <button
                            type="button"
                            onClick={addIngredient}
                            className="bg-sky-700 text-white px-4 py-2 rounded mt-2"
                        >
                            + Ajouter un ingrédient
                        </button>
                    )}
                </div>

                <div className='grid grid-cols-2 justify-around bg-sky-500 p-2 my-2'>
                    <label htmlFor='preparation'>Préparation</label>
                    <textarea id='preparation' name='preparation' className='bg-gray-100 text-black' 
                    value={preparation} onChange={(e) => setPreparation(e.target.value)}/>
                </div>

                <div className='flex justify-around p-2 my-2'>
                    <button type='submit' className='text-white bg-sky-500'>Ajouter</button>
                </div>
            </form>
        </div>
    );
}

export default NewCocktail;