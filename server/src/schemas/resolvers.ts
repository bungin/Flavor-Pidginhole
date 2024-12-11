import { Recipe, User } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface RecipeArgs {
  recipeId: string;
}

interface AddRecipeArgs {
  input: {
    recipeName: string;
    recipeDescription: string;
    recipeAuthor: string;
  };
}

interface AddCommentArgs {
  recipeId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  recipeId: string;
  commentId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("recipes");
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate("recipes");
    },
    recipes: async () => {
      const recipes = await Recipe.find().sort({ createdAt: -1 });
      return recipes;
    },
    recipe: async (_parent: any, { recipeId }: RecipeArgs) => {
      return await Recipe.findOne({ _id: recipeId }).populate({
        path: "comments",
        populate: "commentAuthor",
      });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their recipes
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("recipes").populate("favorites");
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError("Could not authenticate user.");
    },
    favorites: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("favorites");
      }
      throw new AuthenticationError("Could not authenticate");
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
    addRecipe: async (_parent: any, { input }: AddRecipeArgs, context: any) => {
      if (context.user) {
        const recipe = await Recipe.create({
          ...input,
          recipeAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } },
          { new: true }
        );

        return recipe;
      }
      throw AuthenticationError;
    },
    addComment: async (
      _parent: any,
      { recipeId, commentText }: AddCommentArgs,
      context: any
    ) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { _id: recipeId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user._id },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    addLike: async (
      _parent: any,
      { recipeId }: { recipeId: string },
      context: any
    ) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { _id: recipeId },
          {
            $addToSet: {
              recipeLikes: context.user._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      return null;
    },
    removeLike: async (
      _parent: any,
      { recipeId }: { recipeId: string },
      context: any
    ) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { _id: recipeId },
          {
            $pull: {
              recipeLikes: context.user._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      return null;
    },
    removeRecipe: async (
      _parent: any,
      { recipeId }: RecipeArgs,
      context: any
    ) => {
      if (context.user) {
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId,
          recipeAuthor: context.user.username,
        });

        if (!recipe) {
          throw AuthenticationError;
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw AuthenticationError;
    },
    removeComment: async (
      _parent: any,
      { recipeId, commentId }: RemoveCommentArgs,
      context: any
    ) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { _id: recipeId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateUser: async (_: any, { displayName, pronouns, bio, location }: any, context: any) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { displayName, pronouns, bio, location },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addFavorite: async (
      _parent: any,
      { recipeId }: { recipeId: string },
      context: any
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: recipeId } },
          { new: true }
        ).populate("recipes");
      }
      return null;
    },
    removeFavorite: async (
      _parent: any,
      { recipeId }: { recipeId: string },
      context: any
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: recipeId } },
          { new: true }
        ).populate("recipes");
      }
      return null;
    },
  },
};

export default resolvers;
