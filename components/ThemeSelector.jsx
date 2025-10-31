'use client';

import React, { useState } from "react";
import { useTheme, themes } from "@/context/ThemeContext";
import "./ThemeSelector.css";

function ThemeSelector({ inline = false }) {
  const { currentTheme, changeTheme } = useTheme();
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const themeKeys = Object.keys(themes);
  const currentThemeData = themes[currentTheme];

  // Tạo SVG pie chart với 5 slices
  const createPieSlice = (index, total) => {
    const angle = 360 / total;
    const startAngle = index * angle - 90; // -90 để bắt đầu từ trên
    const endAngle = startAngle + angle;

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate points
    const radius = 60;
    const x1 = 60 + radius * Math.cos(startRad);
    const y1 = 60 + radius * Math.sin(startRad);
    const x2 = 60 + radius * Math.cos(endRad);
    const y2 = 60 + radius * Math.sin(endRad);

    // SVG path for pie slice
    const largeArc = angle > 180 ? 1 : 0;
    const path = `M 60 60 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return path;
  };

  return (
    <div
      className={`theme-selector ${inline ? "inline" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Toggle Button (center) */}
      <button
        className="theme-toggle-btn"
        style={{
          background: currentThemeData.gradient,
          backgroundSize: currentThemeData.gradientSize,
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="theme-emoji">{currentThemeData.emoji}</span>
      </button>

      {/* Pie Chart */}
      {isOpen && (
        <div className="pie-chart-container">
          <svg
            width="140"
            height="140"
            viewBox="0 0 120 120"
            className="pie-chart"
          >
            <defs>
              {themeKeys.map((key) => {
                return (
                  <linearGradient
                    key={`gradient-${key}`}
                    id={`gradient-${key}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    {key === "blue" && (
                      <>
                        <stop offset="0%" stopColor="rgb(139, 183, 255)" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </>
                    )}
                    {key === "rainbow" && (
                      <>
                        <stop offset="0%" stopColor="#ffcdd2" />
                        <stop offset="50%" stopColor="#bbdefb" />
                        <stop offset="100%" stopColor="#e1bee7" />
                      </>
                    )}
                    {key === "pink" && (
                      <>
                        <stop offset="0%" stopColor="#ffeef7" />
                        <stop offset="50%" stopColor="#e6f2ff" />
                        <stop offset="100%" stopColor="#fff0f5" />
                      </>
                    )}
                    {key === "peach" && (
                      <>
                        <stop offset="0%" stopColor="#ffece9" />
                        <stop offset="100%" stopColor="#ffe9e0" />
                      </>
                    )}
                    {key === "dark" && (
                      <>
                        <stop offset="0%" stopColor="#2a1b4d" />
                        <stop offset="100%" stopColor="#1a0d2e" />
                      </>
                    )}
                  </linearGradient>
                );
              })}
            </defs>

            {/* Pie slices */}
            {themeKeys.map((key, index) => {
              const isActive = key === currentTheme;
              const isHovered = hoveredSlice === key;
              const theme = themes[key];

              return (
                <g key={key}>
                  <path
                    d={createPieSlice(index, themeKeys.length)}
                    fill={`url(#gradient-${key})`}
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth={isActive ? "3" : "2"}
                    className={`pie-slice ${isActive ? "active" : ""} ${
                      isHovered ? "hovered" : ""
                    }`}
                    style={{
                      filter: isActive
                        ? "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))"
                        : isHovered
                        ? "brightness(1.2)"
                        : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transformOrigin: "60px 60px",
                    }}
                    onClick={() => {
                      changeTheme(key);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setHoveredSlice(key)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />

                  {/* Emoji ở giữa mỗi slice */}
                  <text
                    x={
                      60 +
                      40 *
                        Math.cos(
                          (((index * 360) / themeKeys.length +
                            360 / themeKeys.length / 2 -
                            90) *
                            Math.PI) /
                            180
                        )
                    }
                    y={
                      60 +
                      40 *
                        Math.sin(
                          (((index * 360) / themeKeys.length +
                            360 / themeKeys.length / 2 -
                            90) *
                            Math.PI) /
                            180
                        )
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="20"
                    style={{
                      pointerEvents: "none",
                      userSelect: "none",
                      filter: isActive
                        ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                        : "none",
                    }}
                  >
                    {theme.emoji}
                  </text>
                </g>
              );
            })}

            {/* Central circle overlay */}
            <circle
              cx="60"
              cy="60"
              r="22"
              fill={`url(#gradient-${currentTheme})`}
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="3"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
              }}
            />

            {/* Current theme emoji in center */}
            <text
              x="60"
              y="60"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="24"
              style={{
                pointerEvents: "none",
                userSelect: "none",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            >
              {currentThemeData.emoji}
            </text>
          </svg>

          {/* Tooltip */}
          {hoveredSlice && (
            <div className="pie-tooltip-new">{themes[hoveredSlice].name}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;
