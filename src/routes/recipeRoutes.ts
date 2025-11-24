import express from "express";
import { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipeController";
import upload from "../middleware/upload";
import { filterRecipes } from "../controllers/recipeController";

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);
router.get("/filter", filterRecipes);

router.post("/:id/upload", upload.single("image"), (req, res) => {
res.status(200).json({ message: "Image uploaded successfully", file: req.file });
});

export default router;
