import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */

function RecipeCard(props) {
    return (
        <div className="recipe-card">
            <h2>{props.recipe.title}</h2>
            <img src={props.recipe.image} alt={props.recipe.title} />
            <Link to={`/recipe/${props.recipe.id}`}>View Details</Link>
        </div>
    );
}

export default RecipeCard;
