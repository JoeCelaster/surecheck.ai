import { getVectors } from "./vectorStore";
import { getEmbeddingModel } from "./embed";

// cosine similarity
const cosineSimilarity = (a: number[], b: number[]) => {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};

export const retrieveChunks = async (query: string, topK = 5) => {
  const model = await getEmbeddingModel();

  const queryEmbeddingRaw = await model(query, {
    pooling: "mean",
    normalize: true,
  });

  const queryEmbedding = Array.from((queryEmbeddingRaw as any).data);

  const vectors = getVectors();
  
  const scored = vectors.map((v) => ({
    content: v.content,
    score: cosineSimilarity(queryEmbedding, v.embedding),
    }));
    console.log("Total vectors:", getVectors().length);

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
};