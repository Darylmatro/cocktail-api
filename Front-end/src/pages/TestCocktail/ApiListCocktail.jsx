import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function APIListCocktail() {

    const { name } = useParams();
    const [data, setData] = useState([]);

    const fetchAPI = async () => {
        try {
            const url = `http://localhost:5000/api/cocktail/list`;
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
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}

export default APIListCocktail;