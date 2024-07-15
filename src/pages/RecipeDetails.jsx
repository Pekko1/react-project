import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function RecipeDetails() {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const apiKey = import.meta.env.VITE_API_KEY;

        async function fetchRecipeDetails() {
            try {
                if (!id) return;
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                    params: {
                        apiKey: apiKey
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
        <>
            <Helmet>
                <title>{recipeDetails.title} - Vegetarian Recipes</title>
                <meta name="description" content={parsedDescription} />
                <meta property="og:title" content={recipeDetails.title} />
                <meta property="og:description" content={parsedDescription} />
                <meta property="og:image" content={recipeDetails.image} />
            </Helmet>
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
        </>
    );
}

export default RecipeDetails;
