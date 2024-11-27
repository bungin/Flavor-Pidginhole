import { useQuery } from '@apollo/client';

import RecipeList from '../components/RecipeList/index.tsx';
import RecipeForm from '../components/RecipeForm/index.tsx';

import { QUERY_RECIPES } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <RecipeForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RecipeList
              recipes={recipes}
              title="Some Feed for recipe(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
