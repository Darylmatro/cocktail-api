import React, { useState , useEffect } from 'react';
import axios from 'axios';

function ListCocktail() {

    const [data, setData] = useState([]);

    const fetchAPI = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cocktail/list');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    console.log(data);

    return (
        <div>
            <h2>Liste des cocktails</h2>
            <ul>
                {data.map((cocktail, index) => (

                    <li key={index} className='bg-sky-700 p-2 my-2'>
                        <h3 className='text-3xl t-bold'>{cocktail.name}</h3>
                        <p>Alcool: {cocktail.alcohol ? "Oui" : "Non"}</p>
                        <p>Degré d'alcool: {cocktail.alcohol_level}°</p>
                        <ul>
                            {cocktail.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <p className='text-xs'>{ingredient}</p>
                                </li>
                            ))
                            }
                        </ul>
                        <div className='bg-sky-500 p-2 my-2'>
                            <p>Préparation: (à retirer, juste pour le test d'affichage)</p>
                            <p>{cocktail.preparation}</p>
                        </div>
                        <a href={`/cocktail/detail/${cocktail.name}`} className='bg-sky-500 hover:bg-sky-600 p-2 m-2 rounded'>Voir le cocktail</a>
                    </li>
                ))
                }
            </ul>
        </div>
    );
}

export default ListCocktail;