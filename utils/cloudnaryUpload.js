import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "drqrr5plp",
  api_key: "574553999831995",
  api_secret: "OVH9Xb0IsYxHa-FI75Fuk8WrmmA",
});

const cloudinaryUpload = async (fileBuffer, folder) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(fileBuffer);
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed.");
  }
};

export { cloudinaryUpload };
