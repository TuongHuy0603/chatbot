import React from "react";
import { useTheme, themes } from "../context/ThemeContext";
import "./ThemeSelector.css";

function ThemeSelector() {
  const { currentTheme, changeTheme } = useTheme();

  return (
    <div className="theme-selector">
      <div className="theme-options">
        <button
          className={`theme-option ${currentTheme === "blue" ? "active" : ""}`}
          onClick={() => changeTheme("blue")}
          style={{
            background: themes.blue.gradient,
            backgroundSize: themes.blue.gradientSize,
          }}
        >
          <span className="theme-emoji">🌊</span>
          <span className="theme-name">{themes.blue.name}</span>
        </button>

        <button
          className={`theme-option ${
            currentTheme === "rainbow" ? "active" : ""
          }`}
          onClick={() => changeTheme("rainbow")}
          style={{
            background: themes.rainbow.gradient,
            backgroundSize: themes.rainbow.gradientSize,
          }}
        >
          <span className="theme-emoji">🌈</span>
          <span className="theme-name">{themes.rainbow.name}</span>
        </button>

        <button
          className={`theme-option ${currentTheme === "pink" ? "active" : ""}`}
          onClick={() => changeTheme("pink")}
          style={{
            background: themes.pink.gradient,
            backgroundSize: themes.pink.gradientSize,
          }}
        >
          <span className="theme-emoji">🌸</span>
          <span className="theme-name">{themes.pink.name}</span>
        </button>

        <button
          className={`theme-option ${currentTheme === "peach" ? "active" : ""}`}
          onClick={() => changeTheme("peach")}
          style={{
            background: themes.peach.gradient,
            backgroundSize: themes.peach.gradientSize,
          }}
        >
          <span className="theme-emoji">🍑</span>
          <span className="theme-name">{themes.peach.name}</span>
        </button>
      </div>
    </div>
  );
}

export default ThemeSelector;
