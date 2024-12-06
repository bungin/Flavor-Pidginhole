export interface Recipe {
    _id?: string;
    recipeAuthor: string;
    createdAt?: string;
    recipeDescription: string;
    recipeName: string;
    recipeIngredients: string[];
    recipeInstructions: string[];
    recipeLikes: {_id: string[]}[];
  }

