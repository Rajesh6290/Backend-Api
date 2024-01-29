import { Router } from "express";
import {
  addToCart,
  getAllProductInCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
} from "../controller/cart.controller.js";
import { verifyToken } from "../middleware/jwt.verifyToken.js";
const router = Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getAllProductInCart);
router.delete("/:prodId", verifyToken, removeCart);
router.put("/increase/:id", verifyToken, increaseQuantity);
router.put("/decrease/:id", verifyToken, decreaseQuantity);
export default router;
