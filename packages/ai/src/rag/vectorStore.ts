let store: any[] = [];

export const saveVectors = (fileId: string, vectors: any[]) => {
  if (!vectors || !Array.isArray(vectors)) {
    console.error("❌ Invalid vectors:", vectors);
    throw new Error("Vectors invalid");
  }

  console.log("🟡 BEFORE SAVE:", store.length);

  const formatted = vectors.map((v) => ({
    id: fileId,
    content: v.content,
    embedding: v.embedding,
  }));

  store.push(...formatted);

  console.log("🟢 AFTER SAVE:", store.length);
  console.log(`Added ${formatted.length} vectors for file: ${fileId}`);
};

export const getVectors = () => {
  return store;
};

export const listFiles = () => {
  return [...new Set(store.map((v) => v.id))];
};

export const deleteVectorsByFile = (fileId: string) => {
  console.log("🟡 BEFORE DELETE:", store.length);

  const before = store.length;

  store = store.filter((v) => v.id !== fileId);

  const after = store.length;

  console.log("🟢 AFTER DELETE:", after);
  console.log(`Deleted ${before - after} vectors for ${fileId}`);
};