import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function list() {

  const models = await genAI.listModels();

  for (const m of models.models) {
    console.log(m.name);
  }
}

list();