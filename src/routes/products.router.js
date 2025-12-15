import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
const router = Router();

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.delete("/products/:id", auth, deleteProduct);

export default router;

