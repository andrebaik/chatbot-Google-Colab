import { useState, useRef, useCallback, useEffect } from "react";
import { nanoid } from "nanoid";
import useLocalStorage from "./hooks/useLocalStorage";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import { GridScan } from "./components/GridScan";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

function sanitizeContent(text) {
  return text.replace(/<\|im_end\|>/g, "").replace(/<\|im_start\|>/g, "").trim();
}

const SUGGESTIONS = [
  "Apa itu AI?",
  "Bantu coding Python",
  "Jelaskan neural network",
  "Siapa namamu?",
];

export default function App() {
  const [messages, setMessages] = useLocalStorage("chatbot-messages", []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const abortRef = useRef(null);
  const inputRef = useRef(null);

  const hasHistory = messages.length > 0;
  const isExpanded = hasHistory || inputFocused;

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = useCallback(async () => {
    const userText = input.trim();
    if (!userText || loading) return;

    const userMessage = {
      id: nanoid(),
      role: "user",
      content: userText,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Stream not available");

      setStreamingContent("");

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") continue;

          try {
            const parsed = JSON.parse(payload);
            if (parsed.token) {
              fullContent += parsed.token;
              setStreamingContent(sanitizeContent(fullContent));
            }
          } catch {
          }
        }
      }

      setMessages([
        ...updatedMessages,
        {
          id: nanoid(),
          role: "assistant",
          content: sanitizeContent(fullContent),
          timestamp: Date.now(),
        },
      ]);
      setStreamingContent(null);
    } catch (error) {
      if (error.name === "AbortError") return;
      setStreamingContent(null);

      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            history: messages,
          }),
        });

        const data = await response.json();

        setMessages([
          ...updatedMessages,
          {
            id: nanoid(),
            role: "assistant",
            content: sanitizeContent(data.reply),
            timestamp: Date.now(),
          },
        ]);
      } catch {
        setMessages([
          ...updatedMessages,
          {
            id: nanoid(),
            role: "assistant",
            content: "Gagal nyambung ke server bg",
            timestamp: Date.now(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, setMessages]);

  function handleClearChat() {
    setMessages([]);
    setInputFocused(false);
  }

  function handleSuggestion(text) {
    setInput(text);
    setInputFocused(true);
    inputRef.current?.focus();
  }

  function handleInputFocus() {
    setInputFocused(true);
  }

  function handleInputBlur() {
    if (!hasHistory) {
      setInputFocused(false);
    }
  }

  return (
    <div className="h-dvh bg-stone-950 text-stone-200 flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GridScan
          active={inputFocused}
          linesColor="#0a0908"
          scanColor="#ff8c00"
          scanOpacity={0.4}
          gridScale={0.1}
          lineThickness={1.5}
          lineJitter={0.05}
          scanDuration={1.4}
          scanDelay={9999}
          scanDirection="forward"
          scanSoftness={2.5}
          scanGlow={0.35}
          noiseIntensity={0.001}
          chromaticAberration={0.002}
          enablePost
          bloomIntensity={0.3}
          bloomThreshold={0.1}
          bloomSmoothing={0.1}
        />
      </div>
      <div className={`relative z-10 w-full max-w-3xl bg-stone-950 border border-stone-900 rounded-2xl flex flex-col overflow-hidden transition-all duration-500 ease-out card-texture ${
        isExpanded
          ? "max-h-[900px] py-8 sm:py-10"
          : "max-h-[440px] sm:max-h-[480px] py-0"
      }`}>
        {hasHistory && (
          <div className="shrink-0 flex justify-end px-5 pt-3">
            <button
              onClick={handleClearChat}
              className="text-xs text-stone-600 hover:text-stone-400 transition-colors px-2 py-1 rounded-md hover:bg-stone-800"
            >
              Percakapan baru
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
            <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col">
              <ChatArea
                messages={messages}
                loading={loading}
                streamingContent={streamingContent}
                onSuggestion={handleSuggestion}
                inputRef={inputRef}
              />
            </div>
          </div>
        </div>

        <div className="shrink-0 max-w-2xl mx-auto w-full px-4 sm:px-6 pb-4">
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={sendMessage}
            loading={loading}
            inputRef={inputRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      </div>
    </div>
  );
}
