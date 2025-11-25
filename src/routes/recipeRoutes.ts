import express from "express";
import * as recipeController from "../controllers/recipeController"; 
import upload from "../middleware/upload";
import { authenticate as authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/filter", recipeController.filterRecipes);
router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);
router.put("/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);

router.post(
  "/:id/upload",
  authMiddleware,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ message: "Image uploaded successfully", file: req.file });
  }
);

export default router;
