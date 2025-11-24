import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import { getRecipeById } from "../models/recipe.model";

export const requireOwnershipOrAdmin = (resourceParam = "id") => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params[resourceParam];

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
	
    if ((req.user as any).admin === true) {
      return next();
    }

    const recipe = await getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.ownerId !== req.user.uid) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
};

