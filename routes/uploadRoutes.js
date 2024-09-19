import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middlewares/multerConfigMiddleware.js"; // Multer middleware

const router = express.Router();

// Route to handle the upload
router.post("/", upload.single("image"), uploadImage);

export default router;
