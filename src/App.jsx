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
    } catch (error) {
      console.error("Error calling API:", error);
      // Không fallback, giữ trạng thái thinking để user biết đang có lỗi
      // isThinking vẫn là true
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
