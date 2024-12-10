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
    recipeName: String
    recipeAuthor: String
    createdAt: String
    comments: [Comment]!
    recipeIngredients: [String]
    recipeInstructions: [String]
    recipeLikes: [User]
    recipeDescription: String
  }

  type Comment {
    _id: ID
    commentAuthor: User
    commentText: String
    createdAt: String
  }

  input RecipeInput {
    recipeName: String!
    recipeDescription: String!
    recipeIngredients: [String!]!
    recipeInstructions: [String!]!
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
    addLike(recipeId: ID!): Recipe
    removeLike(recipeId: ID!): Recipe

    updateUser(displayName:String, pronouns: String, bio: String, location: String): User
  }
`;

export default typeDefs;
