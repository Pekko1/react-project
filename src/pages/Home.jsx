import { useState } from "react"
import axios from "axios"

import RecipeCard from "../components/RecipeCard"

function Home(){
    
    const [query,setQuery] = useState("")
    const [recipes, setRecipes] = useState([])

    async function search(){
        console.log(`searched ${query}`)  //test
        setQuery("")

        const apiKey = import.meta.env.VITE_API_KEY;

        try{
            const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch",{
                params:{
                    query:query,
                    diet: "vegan",
                    apiKey: apiKey
                }
            })
            setRecipes(response.data.results)
            console.log(recipes) //test
        }catch(error){
            console.error('Error fetching data from Spoonacular API:', error);
        }
    }

    return(
        <>
            <h1>Vegetarian Recipes!</h1>
            <div className="search-container">
                <input
                type="text" 
                placeholder="Search.."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                />
                <button onClick={search}>Search</button>
            </div>

            <div className="result-container">
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </>
    )
}

export default Home