import { ratingSystem } from "../controller/rating.controller.js";
import { Router } from "express";
import { verifyToken } from "../middleware/jwt.verifyToken.js";

const router = Router();

router.post("/", verifyToken, ratingSystem);
export default router;
