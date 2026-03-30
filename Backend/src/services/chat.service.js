import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/product.model.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function streamChatResponse({ messages, context, res }) {
  let productInfo = "";
  if (context?.productId) {
    const product = await Product.findById(context.productId).lean();
    if (product)
      productInfo = `\nProduct the user is viewing: ${JSON.stringify(product)}`;
  }

  const systemPrompt = `You are TechNest's helpful shopping assistant.
You help customers find tech products, answer questions about specs,
shipping, and returns (30-day policy). Be concise and friendly.
${productInfo}
If asked anything unrelated to shopping, politely redirect.`;

  const geminiHistory = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastUserMessage = messages[messages.length - 1].content;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({ history: geminiHistory });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const result = await chat.sendMessageStream(lastUserMessage);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }
  }

  res.write("data: [DONE]\n\n");
  res.end();
}

export async function listAvailableModels() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
  );
  return response.json();
}
