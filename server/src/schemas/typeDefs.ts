const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  type Recipe {
    _id: ID
    recipeAuthor: String
    recipeDescription: String
    recipeIngredients: [String]!
    recipeInstructions: [String]!
    likesCount: Int
    favoritesCount: Int
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentAuthor: User
    commentText: String
    createdAt: String
  }

  input RecipeInput {
    recipeText: String!
    recipeAuthor: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipes: [Recipe]!
    recipe(recipeId: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(input: RecipeInput!): Recipe
    addComment(recipeId: ID!, commentText: String!): Recipe
    removeRecipe(recipeId: ID!): Recipe
    removeComment(recipeId: ID!, commentId: ID!): Recipe
  }
`;

export default typeDefs;
