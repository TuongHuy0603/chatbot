"use client";

import React from "react";
import "./Dashboard.css";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import ThemeSelector from "./ThemeSelector";

function Dashboard({ messages, handleSendMessage, isThinking }) {
  const metricCards = [
    { icon: "💬", value: "847", label: "Messages Today", color: "blue" },
    { icon: "👥", value: "234", label: "Active Users", color: "pink" },
    { icon: "📈", value: "96%", label: "Satisfaction", color: "green" },
    { icon: "⏱️", value: "0.3s", label: "Avg Response", color: "yellow" },
    { icon: "🧠", value: "AI+", label: "Intelligence", color: "purple" },
    { icon: "🛡️", value: "100%", label: "Secure", color: "blue" },
  ];

  return (
    <div className="dashboard overflow-y-scroll">
      {/* Navbar header */}
      <div className="dashboard-header" style={{ alignItems: "center" }}>
        <div className="nav-left flex-col xl:flex-row items-start xl:items-center">
          {/* Mobile-only sidebar toggle */}
          <button
            className="nav-toggle mobile-only"
            type="button"
            onClick={() => (
              window.dispatchEvent(new CustomEvent("open-mobile-sidebar")), null
            )}
            aria-label="Open navigation"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="dashboard-title">AI Assistant Pro - Trí Tuệ Số123</h1>
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>Online & Ready</span>
          </div>
        </div>
        <div>
          <ThemeSelector inline />
        </div>
      </div>

      {/* Metric Cards */}
      {/* <div className="metrics-grid">
        {metricCards.map((card, index) => (
          <div key={index} className={`metric-card ${card.color}`}>
            <div className="metric-icon">{card.icon}</div>
            <div className="metric-content">
              <div className="metric-number">{card.value}</div>
              <div className="metric-text">{card.label}</div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Chat Box */}
      <ChatBox messages={messages} isThinking={isThinking} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isThinking} />
    </div>
  );
}

export default Dashboard;
