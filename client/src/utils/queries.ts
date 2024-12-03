import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        recipeText
        createdAt
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipes {
    recipes {
      _id
      recipeText
      recipeAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      recipeText
      recipeAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor {
          username
        }
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      email
      recipes {
        _id
        comments {
          _id
          commentAuthor {
            username
          }
          commentText
          createdAt
        }
        createdAt
        favoritesCount
        likesCount
        recipeDescription
        recipeIngredients
        recipeInstructions
      }
    }
  }
`;
