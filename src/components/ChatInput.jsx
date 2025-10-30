import React, { useState, useEffect } from "react";
import "./ChatInput.css";

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchSuggestions = async () => {
      try {
        setIsLoadingSuggestions(true);
        setSuggestionsError("");
        const res = await fetch(
          "https://api.aicrm.com.vn/suggestions/random?limit=10"
        );
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid suggestions format");
        if (isMounted) setSuggestions(data);
      } catch (err) {
        if (isMounted) setSuggestionsError("Không tải được gợi ý.");
      } finally {
        if (isMounted) setIsLoadingSuggestions(false);
      }
    };
    fetchSuggestions();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
      // Keep focus on input after submit
      e.target.querySelector("input").focus();
    }
  };

  return (
    <div className="chat-input-container">
      {/* Suggestions bubbles */}
      <div className="suggestions-row">
        {isLoadingSuggestions && (
          <div className="suggestion-loading">Đang tải gợi ý...</div>
        )}
        {!isLoadingSuggestions && suggestionsError && (
          <div className="suggestion-error">{suggestionsError}</div>
        )}
        {!isLoadingSuggestions &&
          !suggestionsError &&
          suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              className={`suggestion-bubble ${disabled ? "disabled" : ""}`}
              onClick={() => {
                if (!disabled && typeof s === "string" && s.trim()) {
                  onSendMessage(s);
                }
              }}
              disabled={disabled}
              title={typeof s === "string" ? s : ""}
            >
              {typeof s === "string" ? s : String(s)}
            </button>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        {/* <button type="button" className="input-icon-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button> */}
        <input
          className={`placeholder:text-lg placeholder:font-600 chat-input !w-full ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          id="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            disabled ? "Bot đang suy nghĩ..." : "Type your message here..."
          }
          disabled={disabled}
        />
        {/* <button type="button" className="input-icon-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 1v6m0 6v6M5.636 5.636l4.243 4.243M14.12 9.878l4.242 4.242M1 12h6m6 0h6M5.636 18.364l4.243-4.243M14.12 14.12l4.242-4.242" />
          </svg>
        </button> */}
        <button type="submit" className="send-button" disabled={disabled}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
