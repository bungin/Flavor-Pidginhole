import React from "react";
import { Link } from "react-router-dom"; 
import RecipeForm from "../RecipeForm/index";
import RecipeList from "../RecipeList/index";
import { Recipe } from "../../interfaces/Recipe";
import "./index.css";

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  const handleAddRecipe = (newRecipe: Recipe) => {
    console.log(newRecipe);
  };

  return (
    <div>
      <div className="header">
        <h1>My Recipe App</h1>
        <Link to="/newpost">
          <button className="plus-button" aria-label="Create a Post">
            <span className="plus-icon">+</span>
          </button>
        </Link>
      </div>
      <RecipeForm onAddRecipe={handleAddRecipe} />
      <RecipeList recipes={recipes} title="All Recipes" />
    </div>
  );
};

export default Recipes;
