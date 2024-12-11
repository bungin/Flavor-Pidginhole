export interface Recipe {
    _id?: string;
    recipeAuthor: string;
    createdAt?: Date;
    recipeDescription: string;
    recipeName: string;
    recipeIngredients: string[];
    recipeInstructions: string[];
<<<<<<< HEAD
    recipeLikes: {_id: string[]}[];
  };
=======
    recipeLikes?: {_id: string[]}[];
  }
>>>>>>> d13ea2327c345ac96d9cafa7878483ba6bb73431

