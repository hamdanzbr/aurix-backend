import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import {
  cancelOrderController,
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
  getOrderStatsController,
} from "../controllers/order.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createOrderController);

router.get("/my-orders", getMyOrdersController);

router.get("/my-orders/stats", getOrderStatsController);

router.get("/:orderId", getOrderByIdController);

router.patch("/:orderId/cancel", cancelOrderController);

export default router;
