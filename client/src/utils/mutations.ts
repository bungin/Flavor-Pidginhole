import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
      user {
        username
        _id
      }
      token
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe($input: RecipeInput!) {
    addRecipe(input: $input) {
      _id
      recipeName
      recipeAuthor
      recipeIngredients
      recipeInstructions
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      _id
      recipeName
      recipeDescription
      recipeAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($recipeId: ID!) {
    addLike(recipeId: $recipeId) {
      _id
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation removeLike($recipeId: ID!) {
    removeLike(recipeId: $recipeId) {
      _id
    }
  }
`;
