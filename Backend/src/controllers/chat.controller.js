import {
  streamChatResponse,
  listAvailableModels,
} from "../services/chat.service.js";

export async function chatHandler(req, res) {
  try {
    const { messages, context } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ message: "No messages provided" });
    }

    await streamChatResponse({ messages, context, res });
  } catch (err) {
    console.error("❌ Chat error:", err.message);
    if (res.headersSent) return res.end();
    res.status(500).json({ message: err.message });
  }
}

export async function listModelsHandler(req, res) {
  try {
    const data = await listAvailableModels();
    res.json(data);
  } catch (err) {
    console.error("❌ List models error:", err.message);
    res.status(500).json({ message: err.message });
  }
}
