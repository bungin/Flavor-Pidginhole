import React, { useState } from "react";
import RecipeForm from "../RecipeForm/index";
import RecipeList from "../RecipeList/index";
import { Recipe } from "../../interfaces/Recipe";
import "./index.css";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  const [showForm, setShowForm] = useState(false);

  const { loading, data } = useQuery(QUERY_ME);  // Query the logged-in user's data
 // }

  const user = data?.me || {};

  const handleAddRecipe = (newRecipe: Recipe) => {
    console.log(newRecipe);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);  
  };

  if(loading) return <div>Loading...</div>;

  if (!user?.username) {
    return (
      <div>
        <>
         <h4>If you would like to create a post, sign in or sign up!</h4>

          <RecipeList recipes={recipes} title="All Recipes" />
        </>
    </div>
  );
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

      <RecipeList recipes={[...recipes]} title="All Recipes" />
    </div>
  );
};

export default Recipes;
