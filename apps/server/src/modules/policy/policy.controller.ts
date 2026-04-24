import { parsePdf } from "../../../../../packages/ai/src/rag/parsePdf";
import { chunkText } from "../../../../../packages/ai/src/rag/chuck";
import { embedDocuments } from "../../../../../packages/ai/src/rag/embed";
import { saveVectors } from "../../../../../packages/ai/src/rag/vectorStore";

export const uploadPolicy = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await parsePdf(req.file.path);

const chunks = await chunkText(text);

const vectors = await embedDocuments(chunks); // ✅ IMPORTANT

console.log("Vectors returned:", vectors);

saveVectors(req.file.filename, vectors);

    res.json({
      message: "Full pipeline success (local embeddings)",
      totalChunks: chunks.length,
      totalVectors: vectors.length,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed" });
  }
};