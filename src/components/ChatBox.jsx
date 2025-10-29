import React, { useEffect, useRef } from "react";
import "./ChatBox.css";

function ChatBox({ messages, isThinking }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const formatMessage = (text) => {
    if (!text) return "";
    // Convert \n to actual line breaks and handle <br> tags
    return text
      .replace(/\\n/g, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/&lt;br\s*\/?&gt;/gi, "\n");
  };

  return (
    <div className="chat-box">
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
