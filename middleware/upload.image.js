import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
