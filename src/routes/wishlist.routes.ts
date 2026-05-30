import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", addToWishlist);

router.get("/", getWishlist);

router.delete("/:productId",removeFromWishlist);

export default router;