import { useEffect, useRef } from "react";

export default function ChatInput({ input, setInput, onSend, loading, inputRef, onFocus, onBlur }) {
  const textareaRef = useRef(null);

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

  return (
    <div className="shrink-0 px-4 pb-4 pt-2">
      <div className="flex items-end gap-2 bg-stone-900 rounded-xl px-4 py-3 border border-stone-800 focus-within:border-stone-600 transition-colors">
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
        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="shrink-0 bg-orange-600 text-white hover:bg-orange-500 disabled:bg-stone-800 disabled:text-stone-600 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
