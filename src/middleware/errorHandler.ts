import { Request, Response } from "express";
import { db } from "../config/firebase";

export const uploadRecipeImage = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    await db.collection("recipes").doc(recipeId).update({
      imageUrl: imageUrl,
      updatedAt: Date.now(),
    });

    res.json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};
