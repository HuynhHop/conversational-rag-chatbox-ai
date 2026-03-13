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

    const score = cosineSimilarity(queryVector, doc.embedding);

    return {
      score,
      payload: doc
    };

  });

  scored.sort((a,b) => b.score - a.score);

  return scored.slice(0, topK);
}