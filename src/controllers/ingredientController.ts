import { Request, Response } from "express";
import { Ingredient } from "../models/ingredient.model";
import { db } from "../config/firebase";

const ingredientsCollection = db.collection("ingredients");

export const addIngredient = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;
    const { name, quantity } = req.body;

    const newIngredient: Ingredient = {
      recipeId,
      name,
      quantity,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const docRef = await ingredientsCollection.add(newIngredient);

    res.status(201).json({ id: docRef.id, ...newIngredient });
  } catch (error) {
    res.status(500).json({ error: "Failed to add ingredient" });
  }
};

export const getIngredients = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;

    const snapshot = await ingredientsCollection.where("recipeId", "==", recipeId).get();

    if (snapshot.empty) return res.json([]);

    const ingredients = snapshot.docs.map((doc: { id: any; data: () => any; }) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ingredients" });
  }
};
