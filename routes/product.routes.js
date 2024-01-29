import express from "express";
import {
  createProduct,
  UpdateProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  addToWishlist,
  giveRating,
} from "../controller/product.controller.js";
import { isAdmin, verifyToken } from "../middleware/jwt.verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, isAdmin, createProduct);
router.put("/wishlist", verifyToken, addToWishlist);
router.put("/rating", verifyToken, giveRating);
router.put("/:id", verifyToken, isAdmin, UpdateProduct);
router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);
export default router;
