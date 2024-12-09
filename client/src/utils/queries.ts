import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        recipeName
        createdAt
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipes {
    recipes {
      _id
      createdAt
      recipeAuthor
      recipeDescription
      recipeIngredients
      recipeInstructions
      recipeName
      recipeLikes {
        _id
      }
      comments {
        _id
        commentText
        createdAt
        commentAuthor {
          _id
        }
      }
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      recipeName
      recipeAuthor
      recipeDescription
      recipeIngredients
      recipeInstructions
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
  query me {
    me {
      _id
      username
      email
      recipes {
        _id
        recipeName
        recipeAuthor
        createdAt
    }
      favorites {
        _id
        recipeName
      }
    }  
  }
`;

export const QUERY_FAVORITES = gql`
query Query {
  me {
    favorites {
      _id
      recipeName
    }
  }
}
`;
