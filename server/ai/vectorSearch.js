import { qdrant } from "../vector/qdrantClient.js";

export async function searchVector(queryVector, limit = 20) {

  const results = await qdrant.search("travel", {
    vector: queryVector,
    limit: limit
  });

  return results;
}
