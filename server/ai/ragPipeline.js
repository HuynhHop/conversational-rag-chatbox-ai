import { createEmbedding } from "./embedding.js";
import { searchVector } from "./vectorSearch.js";
import { rewriteQuery } from "../utils/rewriteQuery.js";
import { askLLM } from "./llm.js";
import { rerank } from "./reranker.js";

export async function ragPipeline(question, history = []) {

  // rewrite query
  const rewritten = await rewriteQuery(question, history);

  console.log("REWRITTEN:", rewritten);

  // embedding
  const queryVector = await createEmbedding(rewritten);

  // vector search
  const retrieved = await searchVector(queryVector, 20);

  console.log("VECTOR RESULTS:", retrieved.length);

  // rerank
  const reranked = await rerank(rewritten, retrieved);

  console.log("RERANKED:", reranked.length);

  // detect intent
  const q = rewritten.toLowerCase();

  const isHotelQuery =
    q.includes("khách sạn") ||
    q.includes("hotel");

  const isFlightQuery =
    q.includes("bay") ||
    q.includes("flight") ||
    q.includes("vé máy bay");

  let filtered = reranked;

  if (isHotelQuery) {
    filtered = reranked.filter(r => r.payload.type === "hotel");
  }

  if (isFlightQuery) {
    filtered = reranked.filter(r => r.payload.type === "flight");
  }

  console.log("FILTERED:", filtered.length);

  // select context docs
  const topDocs = filtered.slice(0,4);

  const context = topDocs.map((r,i)=>{

    const doc = r.payload;

    if (doc.type === "hotel") {
      return `
Hotel ${i+1}
Name: ${doc.name}
Location: ${doc.province} ${doc.district}
Price: ${doc.price}
Star: ${doc.star}
Description: ${doc.description}
`;
    }

    if (doc.type === "flight") {
      return `
Flight ${i+1}
Airline: ${doc.airline}
From: ${doc.from}
To: ${doc.to}
Price: ${doc.price}
Departure: ${doc.departure}
`;
    }

  }).join("\n");

  const historyText = history
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `
Bạn là một trợ lý du lịch thân thiện.

Hãy trả lời tự nhiên như một người tư vấn du lịch, 
không chỉ liệt kê dữ liệu.

Nếu có nhiều khách sạn hoặc chuyến bay, hãy:
- giới thiệu ngắn gọn
- nêu điểm nổi bật
- giúp người dùng dễ lựa chọn

Lịch sử hội thoại:
${historyText}

Thông tin liên quan:
${context}

Câu hỏi của người dùng:
${rewritten}

Hãy trả lời bằng tiếng Việt tự nhiên, thân thiện.
`;

  const answer = await askLLM(prompt);

  return answer;
}
