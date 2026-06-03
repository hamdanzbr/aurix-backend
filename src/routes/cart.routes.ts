import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  addToCart,
  getCart,
  updateCart,
  removeCartItem,
} from "../controllers/cart.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", addToCart);

router.get("/", getCart);

router.patch(
  "/:cartId",
  updateCart
);

router.delete(
  "/:cartId",
  removeCartItem
);

export default router;