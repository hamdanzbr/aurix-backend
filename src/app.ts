import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import cartRoutes from "./routes/cart.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/wishlist",wishlistRoutes);
app.use("/api/v1/cart",cartRoutes);
export default app;