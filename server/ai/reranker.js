import { pipeline } from "@xenova/transformers";

const model = await pipeline(
  "text-classification",
  "Xenova/ms-marco-MiniLM-L-6-v2"
);

export async function rerank(query, docs) {

  const scored = [];

  for (const doc of docs) {

    const text = JSON.stringify(doc.payload);

    const input = `${query} [SEP] ${text}`;

    const result = await model(input);

    scored.push({
      score: result[0].score,
      payload: doc.payload
    });

  }

  scored.sort((a,b) => b.score - a.score);

  return scored.slice(0,10);
}