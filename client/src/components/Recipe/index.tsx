import React, { useState } from "react";
import RecipeForm from "../RecipeForm/index";
import RecipeList from "../RecipeList/index";
import { Recipe } from "../../interfaces/Recipe";
import "./index.css";

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddRecipe = (newRecipe: Recipe) => {
    console.log(newRecipe);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);  
  };

  return (
    <div>
      <div className="header">
        {/* Create a Post text wrapped in a button */}
        <button
          className="create-post-button"
          onClick={toggleForm}  
        >
          <span className="title-text">Create a Post</span>
        </button>
        
        {/* Separate button for the plus icon */}
        <button
          className="plus-button"
          aria-label="Create a Post"
          onClick={toggleForm} 
        >
          <span className="plus-icon">&#128993;</span>
        </button>
      </div>

      {/* Conditionally render RecipeForm */}
      {showForm && <RecipeForm onAddRecipe={handleAddRecipe} />}

      <RecipeList recipes={recipes} title="All Recipes" />
    </div>
  );
};

export default Recipes;
