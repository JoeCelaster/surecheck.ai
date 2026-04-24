import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadPolicy } from "./policy.controller";
import { retrieveChunks } from "../../../../../packages/ai/src/rag/retrieve";

const router = Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "apps/server/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// File filter (only PDF)
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Route
router.post("/upload", upload.single("file"), uploadPolicy);
router.get("/search", async (req, res) => {
  const query = req.query.q as string;

  const results = await retrieveChunks(query);

  res.json(results);
});

export default router;