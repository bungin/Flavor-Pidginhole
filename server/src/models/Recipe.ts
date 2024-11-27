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

const recipeSchema = new Schema<IRecipe>({
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
});

export default Recipe;
