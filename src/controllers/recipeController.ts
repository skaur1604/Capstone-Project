import { Request, Response } from "express";
import { db } from "../config/firebase";

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

export const filterRecipes = async (req: any, res: any) => {
  try {
    const { category, minRating, search, sortBy, order, page, limit } = req.query;

    let queryRef: FirebaseFirestore.Query = db.collection("recipes");

    if (category) {
      queryRef = queryRef.where("category", "==", category);
    }

    if (minRating) {
      queryRef = queryRef.where("rating", ">=", Number(minRating));
    }
    if (search) {
      const keyword = search.toLowerCase();
      queryRef = queryRef.where("keywords", "array-contains", keyword);
    }
    if (sortBy) {
      queryRef = queryRef.orderBy(sortBy, order === "desc" ? "desc" : "asc");
    }

    const snapshot = await queryRef.get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const start = (pageNum - 1) * limitNum;
    const paginated = data.slice(start, start + limitNum);

    return res.status(200).json({
      success: true,
      total: data.length,
      page: pageNum,
      limit: limitNum,
      results: paginated,
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: "Unknown error occurred" }); 
  }
};
