import React, { useEffect, createContext, useState } from 'react';

export const RecipesContext = createContext();

export default function FCContextProvider(props) {

    const [RecipeapiUrl, setRecipeapiUrl] = useState('http://localhost:52501/api/Recipes');
    const [IngredientsApi, setIngredientsApi] = useState('http://localhost:52501/api/Ingredient');
const [IngredientInRecipe, setIngredientInRecipe] = useState('http://localhost:52501/api/IngredientsInRecipe');
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsInRecipe, setIngredientsInRecipe] = useState([]);


    useEffect(() => {
       
            fetch(RecipeapiUrl, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
                .then(res => {
                    console.log('res=', res);
                    console.log('res.status', res.status);
                    console.log('res.ok', res.ok);
                    return res.json()

                })
                .then(
                    (result) => {
                        setRecipes(result);

                        console.log(recipes);

                        console.log(result);
                        console.log("fetch btnFetchGetStudents= ", result);
                        result.map(st => console.log(st.name));
                        return result;
                    },
                    (error) => {
                        console.log("err post=", error);
                    });

      

        fetch(IngredientsApi, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(res => { 
                console.log('res=', res);
                console.log('res.status', res.status);
                console.log('res.ok', res.ok);
                return res.json()
            })
            .then(
                (result) => {
                    setIngredients(result);
                    console.log(ingredients)
                    console.log(recipes);
                    console.log("fetch btnFetchGetStudents= ", result);
                    result.map(st => console.log(st.name));
                    console.log('result[0].FullName=', result[0].name);
                },
                (error) => {
                    console.log("err post=", error);
                });



                fetch(IngredientInRecipe, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json; charset=UTF-8',
                    })
                })
                    .then(res => { 
                        console.log('res=', res);
                        console.log('res.status', res.status);
                        console.log('res.ok', res.ok);
                        return res.json()
                    })
                    .then(
                        (result) => {
                            console.log("result is" ,result);
                            setIngredientsInRecipe(result);
                      console.log(ingredientsInRecipe);
                            console.log("fetch btnFetchGetStudents= ", result);
                            result.map(st => console.log(st.name));
                            console.log('result[0].FullName=', result[0].name);
                        },
                        (error) => {
                            console.log("err post=", error);
                        });

    }, []);


    return (
        <RecipesContext.Provider value={{ recipes, setRecipes,ingredients,setIngredients,ingredientsInRecipe, setIngredientsInRecipe }}>
            {props.children}
        </RecipesContext.Provider>
    )
}
