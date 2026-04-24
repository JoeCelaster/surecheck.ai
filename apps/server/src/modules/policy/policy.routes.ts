import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadPolicy } from "./policy.controller";
import { retrieveChunks } from "../../../../../packages/ai/src/rag/retrieve";
import { listFiles, deleteVectorsByFile } from "../../../../../packages/ai/src/rag/vectorStore";
import { runStructuredAgent } from "../../../../../packages/ai/src/agent/agent";

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
router.get("/files", (req, res) => {
  const files = listFiles();

  res.json({
    files,
  });
});
router.delete("/delete/:fileId", (req, res) => {
  const { fileId } = req.params;

  console.log("🔥 DELETE API HIT:", fileId); // ADD THIS

  deleteVectorsByFile(fileId);

  res.json({
    message: "Deleted",
  });
});

router.post("/recommend", async (req, res) => {
  try {
    console.log("🔥 /recommend HIT");

    const { query, userProfile } = req.body;

    const result = await runStructuredAgent(query, userProfile);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed recommendation" });
  }
});

export default router;
