import express from "express";
import { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, filterRecipes } from "../controllers/recipeController";
import upload from "../middleware/upload";
import { authenticate as authMiddleware } from "../middleware/auth";
import { requireOwnershipOrAdmin } from "../middleware/ownership";


const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", authMiddleware, createRecipe);
router.put("/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, requireOwnershipOrAdmin("id"), deleteRecipe);
router.get("/filter", filterRecipes);

router.post("/:id/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.status(200).json({ message: "Image uploaded successfully", file: req.file });
});

export default router;

