import Hotel from "../models/Hotel.js";
import Flight from "../models/Flight.js";
import cosineSimilarity from "compute-cosine-similarity";

export async function searchVector(queryVector, topK = 5) {

  const hotels = await Hotel.find();
  const flights = await Flight.find();

  const docs = [
    ...hotels.map(h => ({ ...h.toObject(), type: "hotel" })),
    ...flights.map(f => ({ ...f.toObject(), type: "flight" }))
  ];

  const scored = docs.map(doc => {

    if (!doc.embedding) return { score: -1, payload: doc };

    const score = cosineSimilarity(queryVector, doc.embedding);

    return {
      score,
      payload: doc
    };

  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}

// import { vectorStore } from "../vector/vectorStore.js";
// import { createEmbedding } from "./embedding.js";

// function cosineSimilarity(a, b) {

//   const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);

//   const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
//   const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));

//   return dot / (magA * magB);
// }

// export async function searchSimilar(text, topK = 3) {

//   const queryVector = await createEmbedding(text);

//   const scores = vectorStore.map(item => {

//     const score = cosineSimilarity(queryVector, item.vector);

//     return {
//       score,
//       payload: item.payload
//     };

//   });

//   scores.sort((a, b) => b.score - a.score);

//   return scores.slice(0, topK);
// }