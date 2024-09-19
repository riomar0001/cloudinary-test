import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import cors from "cors";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Replace this with your frontend URL
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ensure the uploads directory exists
const UPLOAD_DIR = "uploads/";
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR);
}

// Multer setup for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Endpoint to upload a photo to Cloudinary
app.post("/upload", upload.single("image"), async (req, res) => {
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

    res.json({ url: result.secure_url }); // Respond with the Cloudinary URL
  } catch (uploadError) {
    console.error("Error uploading file:", uploadError); // Log the error for debugging
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
