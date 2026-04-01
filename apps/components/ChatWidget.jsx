"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useChat } from "@/lib/hooks/useChat";

function TypingDots() {
  return (
    <span className="flex gap-1 items-center h-4">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ background: "#93c5fd", animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="text-sm px-3 py-2.5 max-w-[80%] leading-relaxed"
        style={{
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser ? "#1a56db" : "#EFF6FF",
          color: isUser ? "white" : "#1e40af",
        }}
      >
        {message.content || <TypingDots />}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-32 gap-3">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "#EFF6FF" }}
      >
        <Bot size={24} style={{ color: "#1a56db" }} />
      </div>
      <p className="text-zinc-400 text-xs text-center leading-relaxed">
        Hi! Ask me about products,
        <br />
        shipping, deals, or bundles.
      </p>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, streaming, sendMessage } = useChat();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSend() {
    if (!input.trim() || streaming) return;
    const text = input;
    setInput("");
    await sendMessage(text);
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden border border-blue-100 bg-white dark:bg-zinc-900 dark:border-zinc-700"
          style={{ boxShadow: "0 8px 32px rgba(26, 86, 219, 0.15)" }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: "#1a56db" }}
          >
            <div
              className="rounded-full p-1.5 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <Bot size={17} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm leading-tight">
                TechNest Assistant
              </p>
              <p
                className="text-xs leading-tight"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Ask me anything about our products
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <X size={14} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96 min-h-48 bg-white dark:bg-zinc-900">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              messages.map((m, i) => <ChatMessage key={i} message={m} />)
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-blue-50 dark:border-zinc-700 p-3 flex gap-2 items-center bg-white dark:bg-zinc-900">
            <input
              ref={inputRef}
              className="flex-1 text-sm rounded-xl px-3 py-2 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:bg-zinc-800"
              style={{
                background: "#F0F7FF",
                color: "#1e3a5f",
                border: "0.5px solid #bfdbfe",
              }}
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={streaming}
            />
            <button
              onClick={handleSend}
              disabled={streaming || !input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              style={{ background: "#1a56db" }}
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95"
        style={{
          background: "#1a56db",
          boxShadow: "0 4px 20px rgba(26, 86, 219, 0.4)",
        }}
        aria-label="Toggle chat"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>
    </>
  );
}
