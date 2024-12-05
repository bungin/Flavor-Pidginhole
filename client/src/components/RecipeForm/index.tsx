import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_RECIPE } from "../../utils/mutations";
import { QUERY_RECIPES, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

import { Recipe } from "../../interfaces/Recipe";

interface RecipeFormProps {
  onAddRecipe: (recipe:Recipe) => void;
}

const RecipeForm:React.FC<RecipeFormProps> = ({onAddRecipe}) => {
  //State for the recipe text
  const [recipe, setRecipe] = useState<Recipe>({
    recipeName: "",
    recipeDescription: "",
    recipeIngredients: [],
    recipeInstructions: [],
    recipeAuthor: "",
  });

  //Mutation Setup
  const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    refetchQueries: [QUERY_RECIPES, "getRecipes", QUERY_ME, "me"],
  });

  //Function to handle the form submission
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const newRecipe = {
      ...recipe,
      recipeAuthor: Auth.getProfile().data.username,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    try {
      await addRecipe({
        variables: {
          input: {
            ...recipe,
          },
        },
      });

      onAddRecipe(newRecipe);

      setRecipe({
        recipeName: "",
        recipeDescription: "",
        recipeIngredients: [],
        recipeInstructions: [],
        recipeAuthor: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  //Function to handle the change in the textarea
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  //Handle changes in an ingredient input
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredient = [...recipe.recipeIngredients];
    updatedIngredient[index] = value;
    setRecipe((prevState) => ({
      ...prevState,
      recipeIngredients: updatedIngredient,
    }));
  };

  //Handle adding an ingredient
  const handleAddIngredient = () => {
    setRecipe((prevState) => ({
      ...prevState,
      recipeIngredients: [...prevState.recipeIngredients, ""],
    }));
  };

  //Handle removing an ingredient
  const handleRemoveIngredient = (index: number) => {
    setRecipe((prevState) => ({
      ...prevState,
      recipeIngredients: prevState.recipeIngredients.filter(
        (_ingredient, idx) => idx !== index
      ),
    }));
  };

  //Handle changes in an instruction input
  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstruction = [...recipe.recipeInstructions];
    updatedInstruction[index] = value;
    setRecipe((prevState) => ({
      ...prevState,
      recipeInstructions: updatedInstruction,
    })
  )
};

  //Handle adding an instruction
  const handleAddInstruction = () => {
      setRecipe((prevState) => ({
        ...prevState,
        recipeInstructions: [...prevState.recipeInstructions, ""],
      }));
    };

  //Handle removing an instruction
  const handleRemoveInstruction = (index: number) => {
      setRecipe((prevState) => ({
        ...prevState,
        recipeInstructions: prevState.recipeInstructions.filter(
          (_instruction, idx) => idx !== index
        ),
      }));
    };

  return (
      <div>
        <h3>What Is the name of your recipe?</h3>

        {Auth.loggedIn() ? (
          <>
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              {/* Recipe Name */}
              <div className="col-12 col-lg-9">
                <textarea
                  name="recipeName"
                  placeholder="What is your recipe name?"
                  value={recipe.recipeName}
                  className="form-input w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Recipe Description */}
              <div className="col-12">
                <h4>How would you describe your recipe?</h4>
                <textarea
                  name="recipeDescription"
                  placeholder="Describe your recipe"
                  value={recipe.recipeDescription}
                  className="form-input w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="column-container">
              {/* Ingredients */}
              <div className="column">
                <h4>Ingredients</h4>
                {recipe.recipeIngredients.map((ingredient, index) => {
                  return (
                    <div
                      key={index}
                      className="flex-row justify-space-between my-2"
                    >
                      <input
                        type="text"
                        placeholder={`Ingredient #${index + 1}`}
                        value={ingredient}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className="btn btn-danger"
                      >
                        -
                      </button>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="btn btn-secondary mt-2"
                >
                  Add Ingredient
                </button>
              </div>

              {/* Instructions */}
              <div className="column">
                <h4>Instructions</h4>
                {recipe.recipeInstructions.map((instruction, index) => {
                  return (
                    <div
                      key={index}
                      className="flex-row my-2"
                    >
                      <input
                        type="text"
                        placeholder={`Step #${index + 1}`}
                        value={instruction}
                        onChange={(e) =>
                          handleInstructionChange(index, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveInstruction(index)}
                        className="btn btn-danger"
                      >
                        -
                      </button>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={handleAddInstruction}
                  className="btn btn-secondary mt-2"
                >
                  Add Instruction
                </button>
              </div>
                </div>
                {/* Submit */}
              <div className="col-12 col-lg-3">
                <button
                  className="btn btn-primary btn-block py-3"
                  type="submit"
                >
                  Add Recipe
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
          </>
        ) : (
          // If user is not logged in
          <p>
            You need to be logged in to share your recipes. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    );
  };


export default RecipeForm;
