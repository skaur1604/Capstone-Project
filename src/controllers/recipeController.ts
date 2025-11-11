import { Request, Response } from "express";

let recipes: any[] = [];

export const getAllRecipes = (req: Request, res: Response) => {
res.status(200).json(recipes);
};

export const getRecipeById = (req: Request, res: Response) => {
const recipe = recipes.find(r => r.id === req.params.id);
if (!recipe) return res.status(404).json({ message: "Recipe not found" });
res.status(200).json(recipe);
};

export const createRecipe = (req: Request, res: Response) => {
const newRecipe = { id: Date.now().toString(), ...req.body };
recipes.push(newRecipe);
res.status(201).json(newRecipe);
};

export const updateRecipe = (req: Request, res: Response) => {
const index = recipes.findIndex(r => r.id === req.params.id);
if (index === -1) return res.status(404).json({ message: "Recipe not found" });
recipes[index] = { ...recipes[index], ...req.body };
res.status(200).json(recipes[index]);
};

export const deleteRecipe = (req: Request, res: Response) => {
recipes = recipes.filter(r => r.id !== req.params.id);
res.status(200).json({ message: "Recipe deleted" });
};
