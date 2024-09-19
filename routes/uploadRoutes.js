import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middlewares/multerConfig.js"; // Multer middleware

const router = express.Router();

// Route to handle the upload
router.post("/", upload.single("image"), uploadImage);

export default router; // Export the router
