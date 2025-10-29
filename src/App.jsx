import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import LeftSidebar from "./components/LeftSidebar";
import Dashboard from "./components/Dashboard";
import RightSidebar from "./components/RightSidebar";
import ChatInput from "./components/ChatInput";
import ChatBox from "./components/ChatBox";
import ThemeSelector from "./components/ThemeSelector";
import { getAIResponse } from "./services/chatService";

function AppContent() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [conversationId] = useState(() => `conv_${Date.now()}`);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      text: messageText,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      const response = await fetch("https://api.aicrm.com.vn/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: messageText,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const aiResponse = {
        text:
          data.answer ||
          data.response ||
          data.message ||
          "Xin lỗi, tôi không thể trả lời lúc này.",
        sender: "ai",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);

      // Focus input sau khi state update xong
      setTimeout(() => {
        const input = document.getElementById("chat-input");
        if (input) {
          input.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Error calling API:", error);
      setIsThinking(false);
      
      // Focus input để user có thể gõ lại
      setTimeout(() => {
        const input = document.getElementById("chat-input");
        if (input) {
          input.focus();
        }
      }, 100);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", theme.primary);
    root.style.setProperty("--theme-secondary", theme.secondary);
    root.style.setProperty("--theme-tertiary", theme.tertiary);
    root.style.setProperty("--theme-accent", theme.accent);
    root.style.setProperty("--theme-text", theme.text);
    root.style.setProperty("--theme-glass-bg", theme.glassBg);
    root.style.setProperty("--theme-border", theme.border);
    root.style.setProperty("--theme-gradient", theme.gradient);
    root.style.setProperty("--theme-gradient-size", theme.gradientSize);
    root.style.setProperty("--border-color", theme.border);
    root.style.setProperty("--shadow-color", `${theme.primary}60`);

    // Scrollbar colors with opacity
    const hexToRgba = (hex, opacity) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const thumbColor = hexToRgba(theme.primary, 0.7);
    const thumbHoverColor = hexToRgba(theme.secondary, 0.9);
    const thumbActiveColor = hexToRgba(theme.accent, 1);

    root.style.setProperty("--scrollbar-thumb", thumbColor);
    root.style.setProperty("--scrollbar-thumb-hover", thumbHoverColor);
    root.style.setProperty("--scrollbar-thumb-active", thumbActiveColor);

    // Inject dynamic scrollbar styles for better browser compatibility
    let styleId = "global-scrollbar-theme";
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Dynamic styles with higher specificity - Chrome only
    styleEl.textContent = `
      /* Chrome scrollbar - dynamically themed */
      ::-webkit-scrollbar-thumb {
        background: ${thumbColor} !important;
        background-color: ${thumbColor} !important;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${thumbHoverColor} !important;
        background-color: ${thumbHoverColor} !important;
        box-shadow: 0 0 12px ${thumbHoverColor} !important;
      }
      ::-webkit-scrollbar-thumb:active {
        background: ${thumbActiveColor} !important;
        background-color: ${thumbActiveColor} !important;
      }
    `;
  }, [theme]);

  return (
    <div
      className="flex flex-row w-full h-screen transition-all duration-500 overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        background: "var(--theme-gradient)",
        backgroundSize: "var(--theme-gradient-size)",
      }}
    >
      <ThemeSelector />
      <LeftSidebar />
      <div className="flex flex-col overflow-hidden flex-1">
        <Dashboard messages={messages} isThinking={isThinking} />
        <ChatInput onSendMessage={handleSendMessage} disabled={isThinking} />
      </div>
      <RightSidebar />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
