import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetails() {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const API_KEY = "";

        async function fetchRecipeDetails() {
            try {
                if (!id) return;
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                    params: {
                        apiKey: API_KEY
                    }
                });
                setRecipeDetails(response.data);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }  
        }
        fetchRecipeDetails();
    }, [id]);

    if (!recipeDetails) {
        return (
            <div>Loading...</div>
        );
    }

    function parseHTMLText(htmlText) {
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(htmlText, "text/html");
        return parsedHtml.body.textContent || "";
    }

    const parsedDescription = parseHTMLText(recipeDetails.summary);

    return (
        <div className="recipe-details">
            <Link to="/" className="back-link">&lt; Back</Link>
            <h1>{recipeDetails.title}</h1>
            <img src={recipeDetails.image} alt={recipeDetails.title} />
            <h2>Ingredients:</h2>
            <ul>
                {recipeDetails.extendedIngredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            <p>{parsedDescription}</p>
        </div>
    );
}

export default RecipeDetails;
