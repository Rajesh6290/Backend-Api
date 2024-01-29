import { Router } from "express";
import {
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
} from "../controller/address.controller.js";
import { verifyToken } from "../middleware/jwt.verifyToken.js";
const router = Router();

router.post("/", verifyToken, createAddress);
router.get("/", verifyToken, getAllAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);
router.get("/:id", getAddressById);

export default router;
