import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js"; // Import routes

dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace this with your frontend URL
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors());

// Routes
app.use("/upload", uploadRoutes); // Register the upload routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
