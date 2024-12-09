import React, { useState } from "react";
// import { Link } from "react-router-dom"; 
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
  const [showForm, setShowForm] = useState(false);  // State to control form visibility

  const { loading, data } = useQuery(QUERY_ME);  // Query the logged-in user's data
 // }

  const user = data?.me || {};

  const handleAddRecipe = (newRecipe: Recipe) => {
    console.log(newRecipe);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);  // Toggle the form visibility when button is clicked
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
  }

  return (
    <div>
        <>
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
    
          {showForm && <RecipeForm onAddRecipe={handleAddRecipe} />}
    
          <RecipeList recipes={recipes} title="All Recipes" />
        </>
    </div>
  );
};

export default Recipes;
