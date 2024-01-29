import { Router } from "express";
import {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
} from "../controller/category.controller.js";
import { isAdmin, verifyToken } from "../middleware/jwt.verifyToken.js";

const router = Router();

router.post("/", verifyToken, isAdmin, createCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);
router.get("/:id", verifyToken, isAdmin, getCategoryById);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);
router.get("/", verifyToken, getAllCategory);

export default router;
