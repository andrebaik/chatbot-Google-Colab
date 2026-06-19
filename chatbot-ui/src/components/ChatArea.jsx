import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import WelcomeScreen from "./WelcomeScreen";

export default function ChatArea({
  messages,
  loading,
  streamingContent,
  onSuggestion,
  inputRef,
}) {
  const bottomRef = useRef(null);
  const hasHistory = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent, loading]);

  if (!hasHistory && streamingContent === null && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <WelcomeScreen onSuggestion={onSuggestion} inputRef={inputRef} />
      </div>
    );
  }

  return (
    <>
      <div className="py-6 space-y-5">
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}

        {streamingContent !== null && (
          <MessageBubble
            message={{
              id: "streaming",
              role: "assistant",
              content: streamingContent,
              timestamp: Date.now(),
            }}
            isStreaming
            index={messages.length}
          />
        )}

        {loading && streamingContent === null && <TypingIndicator />}
      </div>
      <div ref={bottomRef} />
    </>
  );
}
