import React from "react";
import "./RightSidebar.css";

function RightSidebar({ onToggleChat }) {
  const conversations = [
    {
      name: "Sarah Johnson",
      message: "Need help with product recomme",
      time: "2m ago",
      avatar: "👩",
    },
    {
      name: "Mike Chen",
      message: "Looking for technical support...",
      time: "5m ago",
      avatar: "👨",
    },
    {
      name: "Emma Wilson",
      message: "Questions about pricing plans...",
      time: "8m ago",
      avatar: "👩",
    },
  ];

  const capabilities = [
    { icon: "🌐", label: "Multi-Language" },
    { icon: "🖼️", label: "Image Analysis" },
    { icon: "</>", label: "Code Generation" },
    { icon: "📊", label: "Data Analysis" },
  ];

  return (
    <div className="right-sidebar sidebar-section">
      {/* AI Neural Network Status */}
      <div className="sidebar-section ">
        <div className="">
          <div className="section-header ">
            <div className="section-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h3>AI Neural Network</h3>
          </div>
        </div>
        <div className="conversation-item ai-neural-network">
          <div className="network-status ">
            <div className="status-indicator">
              <span className="status-dot-small"></span>
              <span>Processing at 99.7% accuracy</span>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>Learning Progress</span>
              <span>94%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill purple"
                style={{ width: "94%" }}
              ></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>Response Quality</span>
              <span>98%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill green"
                style={{ width: "98%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Conversations */}
      <div className="sidebar-section">
        <div className="section-header">
          <div className="section-icon pink">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3>Active Conversations</h3>
        </div>
        <div className="conversations-list">
          {conversations.map((conv, index) => (
            <div key={index} className="conversation-item">
              <div className="conv-avatar">{conv.avatar}</div>
              <div className="conv-content">
                <div className="conv-header">
                  <span className="conv-name">{conv.name}</span>
                  <span className="conv-time">{conv.time}</span>
                </div>
                <div className="conv-message">{conv.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="sidebar-section">
        <div className="section-header">
          <div className="section-icon purple">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h3>AI Capabilities</h3>
        </div>
        <div className="capabilities-grid">
          {capabilities.map((cap, index) => (
            <div key={index} className="capability-card">
              <div className="capability-icon">{cap.icon}</div>
              <div className="capability-label">{cap.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
