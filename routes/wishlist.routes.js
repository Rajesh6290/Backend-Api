import { Router } from "express";
import {
  createWishlist,
  getWishlist,
  deleteWishlist,
} from "../controller/wishlist.controller.js";
import { verifyToken } from "../middleware/jwt.verifyToken.js";
const router = Router();

router.post("/", verifyToken, createWishlist);
router.get("/", verifyToken, getWishlist);
router.delete("/:id", verifyToken, deleteWishlist);
export default router;
