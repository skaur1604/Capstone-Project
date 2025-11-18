import { Router } from "express";
import { addIngredient, getIngredients } from "../controllers/ingredientController";

const router = Router();


router.post("/:recipeId/ingredients", addIngredient);
router.get("/:recipeId/ingredients", getIngredients);

export default router;
