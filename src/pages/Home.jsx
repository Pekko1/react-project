import { useState } from "react"
import axios from "axios"

import RecipeCard from "../components/RecipeCard"

function Home(){
    
    const [query,setQuery] = useState("")
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function search(){
        console.log(`searched ${query}`)  //test
        setQuery("")
        setLoading(true)
        setError(null)

        const apiKey = import.meta.env.VITE_API_KEY;

        try{
            const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch",{
                params:{
                    query:query,
                    diet: "vegan",
                    apiKey: apiKey
                }
            })

            if(response.data.results.length===0){
                setRecipes([])
                console.log(recipes) //test
            }else{
                setRecipes(response.data.results)
            }

        }catch(error){
            console.error('Error fetching data from Spoonacular API:', error);
            setError("Error fetching data. Please try again later.")
        } finally{
            setLoading(false)
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

            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <>
                    {error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <div className="result-container">
                            {recipes.length > 0 ? (
                                recipes.map(recipe => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))
                            ) : (
                                <div className="error-message">No results found</div>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Home