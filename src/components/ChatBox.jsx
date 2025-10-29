import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ChatBox.css";

function ChatBox({ messages, isThinking }) {
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Update scrollbar colors based on theme
  useEffect(() => {
    const hexToRgba = (hex, opacity) => {
      if (!hex || !hex.startsWith("#")) return `rgba(59, 130, 246, ${opacity})`;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const thumbColor = hexToRgba(theme.primary, 0.85);
    const thumbHoverColor = hexToRgba(theme.secondary, 0.95);
    const thumbActiveColor = hexToRgba(theme.accent, 1);

    console.log("🎨 Scrollbar colors:", {
      primary: theme.primary,
      thumbColor,
      thumbHoverColor,
      thumbActiveColor,
    });

    // Create or update style element for scrollbar
    let styleId = "chat-box-scrollbar-style";
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
      console.log("✅ Created scrollbar style element");
    }

    // Chrome scrollbar only
    styleEl.textContent = `
      .chat-box::-webkit-scrollbar-thumb {
        background: ${thumbColor} !important;
        background-color: ${thumbColor} !important;
        background-image: none !important;
      }
      .chat-box::-webkit-scrollbar-thumb:hover {
        background: ${thumbHoverColor} !important;
        background-color: ${thumbHoverColor} !important;
        background-image: none !important;
      }
      .chat-box::-webkit-scrollbar-thumb:active {
        background: ${thumbActiveColor} !important;
        background-color: ${thumbActiveColor} !important;
        background-image: none !important;
      }
    `;

    console.log("✅ Scrollbar styles updated", {
      thumbColor,
      thumbHoverColor,
      thumbActiveColor,
    });
  }, [theme]);

  const formatMessage = (text) => {
    if (!text) return "";
    // Convert \n to actual line breaks and handle <br> tags
    return text
      .replace(/\\n/g, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/&lt;br\s*\/?&gt;/gi, "\n");
  };

  return (
    <div className="chat-box" ref={chatBoxRef}>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "ai"}`}
          >
            <div className="message-content">
              {msg.sender === "ai" && <div className="message-avatar">🤖</div>}
              <div className="message-text" style={{ whiteSpace: "pre-line" }}>
                {formatMessage(msg.text)}
              </div>
              {msg.sender === "user" && (
                <div className="message-avatar">👤</div>
              )}
            </div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}

        {isThinking && (
          <div className="chat-message ai">
            <div className="message-content w-full">
              <div className="message-avatar">🤖</div>
              <div className="message-text thinking !w-fit !max-w-full">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Bot đang suy nghĩ...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatBox;
