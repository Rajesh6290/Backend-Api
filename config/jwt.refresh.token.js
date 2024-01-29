import Jwt from "jsonwebtoken";
import "dotenv/config";
const generateRefreshToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "3d" });
};
export { generateRefreshToken };
