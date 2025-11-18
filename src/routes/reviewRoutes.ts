import { Router } from "express";
import { addReview, getReviews } from "../controllers/reviewController";

const router = Router();

router.post("/:recipeId/reviews", addReview);
router.get("/:recipeId/reviews", getReviews);

export default router;
