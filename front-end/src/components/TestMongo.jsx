import { useState, useEffect } from 'react';
import axios from "axios";


// Inutilisé pour le moment


function TestMongo() {
  const [array, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/");
    console.log(response.data.tests);
    setArray(response.data.tests);
  };

  useEffect(() => {
    fetchAPI()
  }, []);

  return (
    <>
      <div>
          {
            array.map((test, index) => (
                <div key={index}>
                <span>{test}</span><br/>
                </div>
              ))
          }
      </div>
    </>
  )
}

export default TestMongo
