import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);

// Controller function for handling the upload
export const uploadImage = async (req, res) => {
  try {

    console.log("File received:", req.file);

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary upload result:", result);



    // Remove the uploaded file from the server after successful Cloudinary upload
    try {
      await fs.unlink(req.file.path); // Remove the file from the local server
      console.log("File removed from server:", req.file.path);
    } catch (unlinkError) {
      console.error("Error removing file from server:", unlinkError);
    }



    // Send the response with the Cloudinary URL
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to upload image" });
  }
};
