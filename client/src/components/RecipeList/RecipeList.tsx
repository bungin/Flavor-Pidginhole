import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import { UserData } from '../../interfaces/UserData';
import ReactionButton from '../ReactionButton';
import styles from './RecipeList.module.css';

interface RecipeListProps {
  recipes: Recipe[];
  title: string;
  favorites?: UserData[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, title }) => {
  if (!recipes.length) {
    return <h3>No recipes Yet</h3>;
  }

  return (
    <div className={styles.pageContainer}>
      <h3 className={styles.recipesTitle}>{title}</h3>
      <div className={styles.recipeGrid}>
        {recipes
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
                  <div className={styles.reactionButton}>
                    <ReactionButton
                      recipe={recipe}
                      data={recipe.recipeLikes}
                      mode="like"
                    />
                    <span className={styles.reactionText}></span>
                  </div>
                  <div className={styles.reactionButton}>
                    <ReactionButton
                      recipe={recipe}
                      mode="favorite"
                    />
                    <span className={styles.reactionText}></span>
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