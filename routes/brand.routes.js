import { Router } from "express";
import { verifyToken, isAdmin } from "../middleware/jwt.verifyToken.js";
import {
  createBrand,
  updateBrand,
  getAllBrand,
  getBrandById,
  deleteBrand,
} from "../controller/brand.controller.js";
const router = Router();
router.post("/", verifyToken, isAdmin, createBrand);
router.put("/:id", verifyToken, isAdmin, updateBrand);
router.get("/:id", verifyToken, isAdmin, getBrandById);
router.delete("/:id", verifyToken, isAdmin, deleteBrand);
router.get("/", verifyToken, getAllBrand);

export default router;
