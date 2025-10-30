import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import LeftSidebar from "./components/LeftSidebar";
import MobileSidebarSheet from "./components/MobileSidebarSheet";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 1024;
  });

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Listen mobile header toggle request
  useEffect(() => {
    const handler = () => setIsSidebarOpen(true);
    window.addEventListener("open-mobile-sidebar", handler);
    return () => window.removeEventListener("open-mobile-sidebar", handler);
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isSidebarOpen]);

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

    const normalized = (messageText || "").trim().toLowerCase();
    if (normalized.includes("wanpachi")) {
      const aiResponse = {
        text: "",
        image: "/images/wanpachi.png",
        sender: "ai",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);
      setTimeout(() => {
        const input = document.getElementById("chat-input");
        if (input) input.focus();
      }, 100);
      return;
    }

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

  // XÓA HẾT useEffect phức tạp!
  // CSS đã handle tất cả trong theme-variables.css

  return (
    <div
      className="flex flex-row w-full h-screen transition-all duration-500 overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        background: theme.gradient,
        backgroundSize: theme.gradientSize,
      }}
    >
      <LeftSidebar
        isOpen={!isMobile && isSidebarOpen}
        onToggle={() => setIsSidebarOpen((v) => !v)}
      />
      <div className="flex flex-col overflow-hidden flex-1 lg:px-24 px-4 container-color">
        <Dashboard
          messages={messages}
          handleSendMessage={handleSendMessage}
          isThinking={isThinking}
        />
      </div>
      {/* Mobile Sidebar via Radix Sheet */}
      {isMobile && (
        <MobileSidebarSheet
          open={isSidebarOpen}
          onOpenChange={(v) => setIsSidebarOpen(v)}
        />
      )}
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
