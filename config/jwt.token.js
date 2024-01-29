import Jwt from "jsonwebtoken";
import "dotenv/config";
const generateToken = async (id) =>
  await Jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1d" });

export { generateToken };
