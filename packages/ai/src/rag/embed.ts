// @ts-ignore
import { pipeline } from "@xenova/transformers";
// load model once
let extractor: any;

export const getEmbeddingModel = async () => {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return extractor;
};

export const embedDocuments = async (docs: any[]) => {
  const model = await getEmbeddingModel();

  const vectors = [];

  for (const doc of docs) {
    const output = await model(doc.pageContent, {
      pooling: "mean",
      normalize: true,
    });

    vectors.push({
      content: doc.pageContent,
      embedding: Array.from(output.data),
    });
  }

  return vectors;
};