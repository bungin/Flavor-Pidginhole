import { Schema, model, Document } from "mongoose";
import User from "./User.js";

interface IComment extends Document {
  commentAuthor: typeof User;
  commentText: string;
  createdAt: Date;
}

interface IRecipe extends Document {
  recipeAuthor: string;
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: string[];
  recipeInstructions: string[];
  recipeComments: IComment[];
  likesCount: number;
  favoritesCount: number;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    commentAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

const recipeSchema = new Schema<IRecipe>(
  {
    recipeAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    recipeName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
      trim: true,
    },
    recipeDescription: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
      trim: true,
    },
    recipeIngredients: {
      type: [String],
      required: true,
      validate: {
        validator: (ingredients: string[]) => ingredients.length > 0,
        message: "Must have at least one ingredient",
      },
    },
    recipeInstructions: {
      type: [String],
      required: true,
      validate: {
        validator: (instructions: string[]) => instructions.length > 0,
        message: "Must have at least one instruction",
      },
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    favoritesCount: {
        type: Number,
        default: 0,
    },
    recipeComments: [commentSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
