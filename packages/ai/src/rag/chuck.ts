import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const chunkText = async (text: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const docs = await splitter.createDocuments([text]);

  return docs;
};