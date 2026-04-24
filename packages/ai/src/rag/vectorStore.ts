let store: any[] = [];

// 🔹 SAVE VECTORS
export const saveVectors = (fileId: string, vectors: any[]) => {
  if (!vectors || !Array.isArray(vectors) || vectors.length === 0) {
    console.error("❌ Invalid vectors:", vectors);
    return;
  }

  // 🚫 Prevent duplicate inserts (important for default load)
  const alreadyExists = store.some((v) => v.id === fileId);
  if (alreadyExists) {
    console.log(`⚡ Skipping ${fileId}, already exists`);
    return;
  }

  console.log("🟡 BEFORE SAVE:", store.length);

  const formatted = vectors.map((v) => ({
    id: fileId,
    content: v.content,
    embedding: v.embedding,
  }));

  store.push(...formatted);

  console.log("🟢 AFTER SAVE:", store.length);
  console.log(`✅ Added ${formatted.length} vectors for file: ${fileId}`);
};

// 🔹 GET ALL VECTORS
export const getVectors = () => {
  return store;
};

// 🔹 LIST UNIQUE FILES
export const listFiles = () => {
  return [...new Set(store.map((v) => v.id))];
};

// 🔹 DELETE BY FILE
export const deleteVectorsByFile = (fileId: string) => {
  console.log("🟡 BEFORE DELETE:", store.length);

  const before = store.length;

  store = store.filter((v) => v.id !== fileId);

  const after = store.length;

  console.log("🟢 AFTER DELETE:", after);
  console.log(`🗑 Deleted ${before - after} vectors for ${fileId}`);
};

// 🔹 OPTIONAL: CLEAR ALL (useful for debugging)
export const clearStore = () => {
  store = [];
  console.log("⚠️ Vector store cleared");
};