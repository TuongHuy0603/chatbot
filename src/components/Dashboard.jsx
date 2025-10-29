import React from "react";
import "./Dashboard.css";
import ChatBox from "./ChatBox";

function Dashboard({ messages, isThinking }) {
  const metricCards = [
    { icon: "💬", value: "847", label: "Messages Today", color: "blue" },
    { icon: "👥", value: "234", label: "Active Users", color: "pink" },
    { icon: "📈", value: "96%", label: "Satisfaction", color: "green" },
    { icon: "⏱️", value: "0.3s", label: "Avg Response", color: "yellow" },
    { icon: "🧠", value: "AI+", label: "Intelligence", color: "purple" },
    { icon: "🛡️", value: "100%", label: "Secure", color: "blue" },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">AI Assistant Pro - Trí Tuệ Số</h1>
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>Online & Ready</span>
          </div>
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
    </div>
  );
}

export default Dashboard;
