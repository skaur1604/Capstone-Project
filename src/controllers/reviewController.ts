import { Request, Response } from "express";
import { Review } from "../models/review.model";
import { db } from "../config/firebase";

const reviewsCollection = db.collection("reviews");

export const addReview = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;
    const { userId, rating, comment } = req.body;

    const newReview: Review = {
      recipeId,
      userId,
      rating,
      comment,
      createdAt: Date.now(),
    };

    const docRef = await reviewsCollection.add(newReview);

    res.status(201).json({ id: docRef.id, ...newReview });
  } catch (error) {
    res.status(500).json({ error: "Unable to add review" });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;

    const snapshot = await reviewsCollection.where("recipeId", "==", recipeId).get();

    if (snapshot.empty) return res.json([]);

    const reviews = snapshot.docs.map((doc: { id: any; data: () => any; }) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch reviews" });
  }
};
