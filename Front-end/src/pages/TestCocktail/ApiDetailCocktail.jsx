import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function APIDetailCocktail() {

    const { name } = useParams();
    const navigate = useNavigate();
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
    }, []);

    return (
        <div>
            <button onClick={() => navigate(`/testCocktail/detail/${name}`)} className='bg-orange-500 p-5'>Retour au Cocktail</button>

            <pre>
                {JSON.stringify(data[0], null, 2)}
            </pre>
        </div>
        
    );
}

export default APIDetailCocktail;