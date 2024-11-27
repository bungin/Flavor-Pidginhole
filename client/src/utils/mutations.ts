import { gql } from '@apollo/client';

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
      recipeText
      recipeAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      _id
      recipeText
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
