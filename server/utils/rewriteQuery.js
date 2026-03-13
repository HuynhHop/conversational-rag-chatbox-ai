import { askLLM } from "../ai/llm.js";

export async function rewriteQuery(question, history) {

  if (!history || history.length === 0) {
    return question;
  }

  const historyText = history
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `
Rewrite the user question so it can be understood without the conversation.

Conversation:
${historyText}

Question:
${question}

Standalone question:
`;

  const rewritten = await askLLM(prompt);

  return rewritten.trim();
}