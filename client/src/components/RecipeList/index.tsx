// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

interface Recipe {
  _id: string;
  recipeAuthor: string;
  createdAt: string;
  recipeText: string;
}

interface RecipeListProps {
  recipes: Recipe[];
  title: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, title }) => {
  if (!recipes.length) {
    return <h3>No recipes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {recipe.recipeAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this recipe on {new Date(Number(recipe.createdAt)).toLocaleString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{recipe.recipeText}</p>
            </div>
            {/* Create a link to this recipe's page to view its comments using `<Link>` component */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/recipes/${recipe._id}`}
            >
              Join the discussion on this recipe.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default RecipeList;