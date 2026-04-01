export async function streamChat({
  messages,
  context,
  onChunk,
  onDone,
  signal,
}) {
  const res = await fetch("/api/v1/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, context }),
    signal,
  });

  if (!res.ok) throw new Error(`Chat failed: ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value).split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ") && !line.includes("[DONE]")) {
        try {
          const { text } = JSON.parse(line.slice(6));
          if (text) onChunk(text);
        } catch {}
      }
    }
  }

  onDone?.();
}
