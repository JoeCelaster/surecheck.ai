import fs from "fs";
import pdfParse from "pdf-parse";

export const parsePdf = async (filePath: string) => {
  try {
    const buffer = fs.readFileSync(filePath);

    const data = await pdfParse(buffer);

    const text = data.text?.trim();

    if (!text || text.length < 50) {
      throw new Error("Invalid or empty PDF text");
    }

    console.log("PDF parsed, length:", text.length);

    return text;
  } catch (error) {
    console.error("PDF parsing failed:", error);
    throw new Error("Failed to parse PDF");
  }
};