import React, { useState , useEffect } from 'react';
import axios from 'axios';

function Home() {

    const [data, setData] = useState(null);

    const fetchAPI = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/test');
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
            <h2>Page d'accueil</h2>
        </div>
    );
}

export default Home;