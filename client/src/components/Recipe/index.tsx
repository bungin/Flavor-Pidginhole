import RecipeForm from "../RecipeForm/index";
import RecipeList from "../RecipeList/index";
import { Recipe } from "../../interfaces/Recipe";

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  const handleAddRecipe = (newRecipe: Recipe) => {
    console.log(newRecipe);
  };

  return (
    <div>
      <h1>My Recipe App</h1>
      <RecipeForm onAddRecipe={handleAddRecipe} />
      <RecipeList recipes={recipes} title="All Recipes" />
    </div>
  );
};

export default Recipes;
