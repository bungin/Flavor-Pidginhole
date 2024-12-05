import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList/index.tsx";
import CommentForm from "../components/CommentForm/index.tsx";

import { QUERY_SINGLE_RECIPE } from "../utils/queries.ts";

const SingleRecipe = () => {
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    variables: { recipeId: recipeId },
  });

  const recipe = data?.recipe || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-page">
      {/* Hero Section */}
      <div className="recipe-hero">
        <h1>{recipe.recipeName}</h1>
        <p>
          By <strong>{recipe.recipeAuthor}</strong> on{" "}
          {new Date(Number(recipe.createdAt)).toLocaleDateString()}
        </p>
        {/* {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.recipeTitle}
            className="recipe-image"
          />
        )} */}
      </div>
      <div><p>{recipe.recipeDescription}</p></div>
      {/* Ingredients & Instructions */}
      <div className="recipe-details">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.recipeIngredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.recipeInstructions.map((instruction:string, index:number) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Comments Section */}
      <div className="recipe-comments">
        <CommentList comments={recipe.comments} />
        <CommentForm recipeId={recipe._id} />
      </div>
    </div>
  );
};

export default SingleRecipe;
