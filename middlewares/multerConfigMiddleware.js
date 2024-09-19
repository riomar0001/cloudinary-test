import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";

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

export default upload; 
