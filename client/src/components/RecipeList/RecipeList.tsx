import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import { UserData } from '../../interfaces/UserData';
import ReactionButton from '../ReactionButton';
import styles from './RecipeList.module.css';
import { QUERY_FAVORITES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

interface RecipeListProps {
  recipes: Recipe[];
  title: string;
  favorites?: UserData[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, title }) => {
  const { data: favoritesData } = useQuery(QUERY_FAVORITES);
  if (!recipes.length) {
    return <h3>No recipes Yet</h3>;
  }

  return (
    <div className={styles.pageContainer}>
      <h3 className={styles.recipesTitle}>{title}</h3>
      <div className={styles.recipeGrid}>
        {[...recipes]
          .sort((a: Recipe, b: Recipe) => {
            return Number(b.createdAt) - Number(a.createdAt);
          })
          .map((recipe) => (
            <div key={recipe._id} >
              <div className={styles.recipeCard}>
                <div className={styles.cardHeader}>
                  <h5>{recipe.recipeName}</h5>
                </div>

                <div className={styles.cardBody}>
                  <p>{recipe.recipeDescription}</p>
                </div>

                <Link
                  className={styles.viewButton}
                  to={`/recipes/${recipe._id}`}
                >
                  View Recipe
                </Link>

                <div className={styles.reactionContainer}>
                  <div className={styles.reactionGroup}>
                    <ReactionButton
                      recipe={recipe}
                      data={recipe.recipeLikes}
                      mode="like"
                    />
                    <div className={styles.countDisplay}>
                      <span>{recipe.recipeLikes?.length || 0}</span>
                      <span className={styles.countLabel}>likes</span>
                    </div>
                  </div>

                  {/* Favorite Button Group */}
                  <div className={styles.reactionGroup}>
                    <ReactionButton
                      recipe={recipe}
                      data={recipe.recipeFavorites}
                      mode="favorite"
                    />
                    <div className={styles.countDisplay}>
                      <span>{favoritesData?.favorites.favorites.filter((f: any) => f._id === recipe._id).length}</span>
                      <span className={styles.countLabel}>favorites</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};



export default RecipeList;