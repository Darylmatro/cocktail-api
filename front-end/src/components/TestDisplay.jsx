import { useState, useEffect } from 'react';
import axios from "axios";

function TestDisplay() {
  const [cocktailArray, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/display");
    //console.log(response.data);
    setArray(response.data);
  };

  useEffect(() => {
    fetchAPI()
  }, []);



  const alcoholArray = []
  cocktailArray.forEach(cocktail => {
      if (cocktail.alcohol == true) {
          alcoholArray.push("Yes");
      } else {alcoholArray.push("No")}
  })


  const cocktailsIngredientsArray = []
  cocktailArray.forEach(cocktail => {
    const ingredientArry = []
    const ingredientList = cocktail.ingredients_list
    ingredientList.forEach(ingredient => {
      ingredientArry.push(ingredient.ingredient)
    })
    cocktailsIngredientsArray.push(ingredientArry)
  })
  console.log(cocktailsIngredientsArray)



  return (
    <>
        <div>
          <h2>Cocktais list:</h2>
            {
                cocktailArray.map((cocktail, index) => {
                  return (
                    <div key={index}>
                        <span>Cocktail: {cocktail.name}</span><br/>
                        <span>Alcohol: {alcoholArray[index]}</span><br/>
                        <span>Ingredients:
                          {cocktailsIngredientsArray[index].map((ingredient, indexI) => (
                            <div key={indexI}>
                              <li>{ingredient}</li>
                            </div>
                          ))
                          }
                        </span><br/><br/>
                    </div>
                )})
            }
        </div>
    </>
  )
}

export default TestDisplay



