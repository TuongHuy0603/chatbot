'use client';

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import "./ChatBox.css";

function ChatBox({ messages, isThinking }) {
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // XÓA HẾT useEffect scrollbar!
  // CSS đã handle trong theme-variables.css

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
              {msg.image ? (
                <div className="message-text !p-2 !bg-transparent !border-0">
                  <Image
                    src={msg.image}
                    alt="wanpachi"
                    width={320}
                    height={320}
                    style={{
                      borderRadius: 16,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    }}
                    onLoad={() => scrollToBottom()}
                  />
                </div>
              ) : (
                <div
                  className="message-text"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {formatMessage(msg.text)}
                </div>
              )}
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
