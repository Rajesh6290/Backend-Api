import mongoose from "mongoose";
import "dotenv/config";
const dbConfig = () => {
  try {
    const dbConnection = mongoose.connect(process.env.DB_URL);
    console.log(`Database connected`);
  } catch (error) {
    console.log(error);
  }
};
export default dbConfig;
