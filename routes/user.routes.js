import {
  createUser,
  loginUser,
  getAllUser,
  getSelfData,
  getUser,
  deleteUser,
  updateUser,
  changePassword,
} from "../controller/user.controller.js";
import {
  createOtp,
  verifyAndUpdatePassword,
} from "../controller/otp.controller.js";
import express from "express";
import {
  verifyToken,
  isAdmin,
  loginAccess,
} from "../middleware/jwt.verifyToken.js";
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", verifyToken, isAdmin, getAllUser);
router.get("/current", verifyToken, getSelfData);
router.put("/forgot-password", createOtp);
router.put("/forgot-password-reset", verifyAndUpdatePassword);
router.put("/changePassword", verifyToken, changePassword);
router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);
router.put("/:id", verifyToken, updateUser);

export default router;
