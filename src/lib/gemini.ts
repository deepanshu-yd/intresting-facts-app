import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// pick a quick model for latency; adjust as needed
const MODEL = "gemini-1.5-flash";

export async function oneInterestingFact(topic: string) {
  const model = genAI.getGenerativeModel({ model: MODEL });
  const prompt = [
    "You are a precise fact generator.",
    "Return exactly ONE interesting, non-obvious, factual tidbit about the given topic.",
    "Constraints:",
    "- <= 40 words",
    "- no opinions, no lists, no sources/links",
    "- avoid trivia everyone knows",
    `Topic: "${topic}"`
  ].join("\n");

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  return text;
}