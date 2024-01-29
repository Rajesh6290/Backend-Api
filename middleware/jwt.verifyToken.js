import Jwt from "jsonwebtoken";
import "dotenv/config";
import { Users } from "../models/user.models.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      res.json({
        msg: "There is no token attached to headers",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    const user = await Users.findById(decoded?.id);
    req.user = user;
    // console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.json({ msg: error.message });
  }
};
const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await Users.findOne({ email });
  if (adminUser?.role !== "ADMIN") {
    res.json({ msg: "You are not admin" });
  } else {
    next();
  }
};
const loginAccess = async (req, res, next) => {
  const { email } = req.user;
  const searchUser = await Users.findOne({ email });
  if (!searchUser?.isRegistered) {
    res.json({ msg: "User is not registered" });
  } else {
    next();
  }
};
export { verifyToken, isAdmin, loginAccess };
