import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailCocktail() {

    const { name } = useParams();
    const [data, setData] = useState([]);

    const fetchAPI = async () => {
        try {
            const url = `http://localhost:5000/api/cocktail/read/${name}`;
            const response = await axios.get(url);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, [name]);

    return (
        <div>
            <h2>Information sur le cocktail {}</h2>
            <div>
            {data.map((cocktail, index) => (

                <div key={index} className='bg-sky-700 p-2 my-2'>
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
                        <p>Préparation: </p>
                        <p>{cocktail.preparation}</p>
                    </div>
                </div>
            ))
            }
            </div>
            <a href={`/cocktail/update/${name}`} className='m-2 p-2 rounded bg-sky-700 text-white'>Modifier le cocktail</a>
            <a href='' className='m-2 p-2 rounded bg-sky-700 text-white'>Supprimer le cocktail</a>
        </div>
    );
}

export default DetailCocktail;