import fs from "fs";
import path from "path";
import { parsePdf } from "./rag/parsePdf";
import { chunkText } from "./rag/chuck";
import { embedDocuments } from "./rag/embed";
import { saveVectors } from "./rag/vectorStore";

let initialized = false;

export const initDefaultData = async () => {
  if (initialized) return;

  console.log("🚀 Loading default policies...");

  const folder = path.join(__dirname, "default-data");
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const filePath = path.join(folder, file);

    console.log("Processing:", file);

    const text = await parsePdf(filePath);
    const chunks = await chunkText(text);
    const vectors = await embedDocuments(chunks);

    saveVectors(file, vectors);
  }

  initialized = true;

  console.log("✅ Default policies loaded");
};