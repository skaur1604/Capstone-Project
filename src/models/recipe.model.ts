import { db } from "../config/firebase"; 

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  ownerId: string;     
  imageUrl?: string;
  createdAt?: number;
  updatedAt?: number;
}

const collection = db.collection("recipes");
export const createRecipe = async (data: Recipe) => {
  const doc = await collection.add({
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return { id: doc.id, ...data };
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Recipe;
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Recipe[];
};

export const updateRecipe = async (id: string, data: Partial<Recipe>) => {
  await collection.doc(id).update({
    ...data,
    updatedAt: Date.now(),
  });

  return getRecipeById(id);
};
export const deleteRecipe = async (id: string) => {
  await collection.doc(id).delete();
  return true;
};
