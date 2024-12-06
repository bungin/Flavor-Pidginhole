export interface Recipe {
    _id?: string;
    recipeAuthor: string;
    createdAt?: Date;
    recipeDescription: string;
    recipeName: string;
    recipeIngredients: string[];
    recipeInstructions: string[];
    recipeLikes: {_id: string[]}[];
  }

