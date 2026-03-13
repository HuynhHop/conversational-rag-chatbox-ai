// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function createEmbedding(text) {

//   const model = genAI.getGenerativeModel({
//     model: "text-embedding-004"
//   });

//   const result = await model.embedContent({
//     content: {
//       parts: [{ text }]
//     }
//   });

//   return result.embedding.values;
// }

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export async function createEmbedding(text) {

//   const response = await openai.embeddings.create({
//     model: "text-embedding-3-small",
//     input: text
//   });

//   return response.data[0].embedding;
// }

import { pipeline } from "@xenova/transformers";

let extractor;

export async function createEmbedding(text) {

  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true
  });

  return Array.from(output.data);
}