import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../utils/queries.ts';
import Recipes from '../components/Recipe/index.tsx';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Recipes
              recipes={recipes}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
