import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function test(){

  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "hotel near beach"
  });

  console.log(embedding.data[0].embedding.length);
}

test();