import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const RecipeForm = () => {
  const [recipeText, setRecipeText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addRecipe, { error }] = useMutation
  (ADD_RECIPE, {
    refetchQueries: [
      QUERY_RECIPES,
      'getRecipes',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addRecipe({
        variables: { input:{
          recipeText,
          recipeAuthor: Auth.getProfile().data.username,
        }},
      });

      setRecipeText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'recipeText' && value.length <= 280) {
      setRecipeText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="recipeText"
                placeholder="Here's a new recipe..."
                value={recipeText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Recipe
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your recipes. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default RecipeForm;
