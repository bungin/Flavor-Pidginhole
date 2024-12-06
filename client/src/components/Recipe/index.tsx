import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import RecipeForm from "../RecipeForm/index";
import RecipeList from "../RecipeList/index";
import { Recipe } from "../../interfaces/Recipe";
import "./index.css";

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  const [showForm, setShowForm] = useState(false);  // State to control form visibility

  const handleAddRecipe = (newRecipe: Recipe) => {
    console.log(newRecipe);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);  // Toggle the form visibility when button is clicked
  };

  return (
    <div>
      <div className="header">
        <h1>Create a Post</h1>
        <button 
          className="plus-button" 
          aria-label="Create a Post" 
          onClick={toggleForm}  // Toggle the visibility of RecipeForm
        >
          <span className="plus-icon">	
          &#128993;</span>
        </button>
      </div>

      {/* Conditionally render RecipeForm */}
      {showForm && <RecipeForm onAddRecipe={handleAddRecipe} />}

      <RecipeList recipes={recipes} title="All Recipes" />
    </div>
  );
};

export default Recipes;
