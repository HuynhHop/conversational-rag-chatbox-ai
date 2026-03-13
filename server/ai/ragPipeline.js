import { createEmbedding } from "./embedding.js";
import { searchVector } from "./vectorSearch.js";
import { rewriteQuery } from "../utils/rewriteQuery.js";
import { askLLM } from "./llm.js";

export async function ragPipeline(question, history = []) {
  question = await rewriteQuery(question, history);

  console.log("REWRITTEN QUERY:", question);

  const queryVector = await createEmbedding(question);

  const results = await searchVector(queryVector, 10);

  console.log("VECTOR RESULTS:", results.length);

  results.forEach(r => {
    console.log("MATCH:", r.payload.name || r.payload.airline);
  });

  const q = question.toLowerCase();

  const isHotelQuery =
    q.includes("khách sạn") ||
    q.includes("hotel");

  const isFlightQuery =
    q.includes("bay") ||
    q.includes("flight") ||
    q.includes("vé máy bay");

  let filtered = results;

  if (isHotelQuery) {
    filtered = results.filter(r => r.payload.type === "hotel");
  }

  if (isFlightQuery) {
    filtered = results.filter(r => r.payload.type === "flight");
  }

  console.log("FILTERED RESULTS:", filtered.length);

  const topDocs = filtered.slice(0,6);

  const context = topDocs.map((r,i)=>{

    const doc = r.payload;

    if (doc.type === "hotel") {
      return `
Hotel ${i + 1}
Name: ${doc.name}
Location: ${doc.province} ${doc.district}
Price: ${doc.pricePerNight}
Star Rating: ${doc.starRating}
Description: ${doc.description}
`;
    }

    if (doc.type === "flight") {
      return `
Flight ${i + 1}
Airline: ${doc.airline}
From: ${doc.from}
To: ${doc.to}
Price: ${doc.price}
Departure: ${doc.departureTime}
`;
    }

  }).join("\n");

  const historyText = history
  .map(m => `${m.role}: ${m.content}`)
  .join("\n");

  const prompt = `
You are a travel assistant.

Conversation history:
${historyText}

CONTEXT:
${context}

User question:
${question}

If there are multiple relevant results, list ALL of them.

Answer in Vietnamese.
`;

  const answer = await askLLM(prompt);

  return answer;
}


// import { searchSimilar } from "./vectorSearch.js";
// import { askLLM } from "./llm.js";

// export async function askTravelAI(question) {

//   const docs = await searchSimilar(question);

//   const context = docs.map(d => {

//     return `
// Hotel: ${d.payload.name}
// Location: ${d.payload.province}
// Price: ${d.payload.pricePerNight}
// Description: ${d.payload.description}
// `;

//   }).join("\n");

//   const prompt = `
// You are a travel assistant.

// User question:
// ${question}

// Hotels:
// ${context}

// Answer helpfully.
// `;

//   const answer = await askLLM(prompt);

//   return answer;
// }