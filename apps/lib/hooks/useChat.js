import { useState, useRef, useCallback } from "react";
import { streamChat } from "../api/chatApi";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const sendMessage = useCallback(
    async (input) => {
      if (!input.trim() || streaming) return;

      const userMsg = { role: "user", content: input };
      const newMessages = [...messages, userMsg];

      setMessages([...newMessages, { role: "assistant", content: "" }]);
      setStreaming(true);
      setError(null);

      // Cancel any ongoing stream
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      try {
        await streamChat({
          messages: newMessages,
          context: { page: window.location.pathname },
          signal: abortRef.current.signal,
          onChunk: (text) => {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: updated[updated.length - 1].content + text,
              };
              return updated;
            });
          },
          onDone: () => setStreaming(false),
        });
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Something went wrong. Please try again.");
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: "Sorry, something went wrong. Please try again.",
          };
          return updated;
        });
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming],
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, streaming, error, sendMessage, clearMessages };
}
