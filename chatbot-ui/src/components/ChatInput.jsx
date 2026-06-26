import { useEffect, useRef } from "react";

export default function ChatInput({ input, setInput, onSend, onStop, loading, isStreaming, inputRef, onFocus, onBlur, onUpload }) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  useEffect(() => {
    autoResize();
  }, [input]);

  function handleInput(event) {
    setInput(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey && !loading) {
      event.preventDefault();
      onSend();
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      onUpload?.(file);
    }
    event.target.value = "";
  }

  return (
    <div className="shrink-0 px-4 pb-4 pt-2">
      <div className="flex items-end gap-2 bg-stone-900 rounded-xl px-4 py-3 border border-stone-800 focus-within:border-stone-600 transition-colors">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="shrink-0 text-stone-500 hover:text-stone-300 disabled:text-stone-700 transition-colors pb-0.5"
          title="Upload PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <textarea
          ref={(el) => {
            textareaRef.current = el;
            if (typeof inputRef === "function") inputRef(el);
            else if (inputRef) inputRef.current = el;
          }}
          className="flex-1 bg-transparent text-stone-200 text-[14px] outline-none placeholder:text-stone-600 resize-none overflow-y-auto leading-[1.4] transition-[height] duration-200 ease-out"
          placeholder="Tulis pesan..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={loading}
          rows={1}
          style={{ minHeight: "20px", maxHeight: "160px" }}
        />
        {isStreaming ? (
          <button
            onClick={onStop}
            className="shrink-0 bg-red-600/80 text-white hover:bg-red-500 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="1"/>
            </svg>
            Stop
          </button>
        ) : (
          <button
            onClick={onSend}
            disabled={loading || !input.trim()}
            className="shrink-0 bg-orange-600 text-white hover:bg-orange-500 disabled:bg-stone-800 disabled:text-stone-600 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors"
          >
            Kirim
          </button>
        )}
      </div>
    </div>
  );
}
