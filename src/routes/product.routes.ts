import { Router } from "express";

import { createProductController, getProductBySlugController, getProductsController } from "../controllers/product.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/:slug", getProductBySlugController);
export default router;