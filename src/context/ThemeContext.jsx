import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const themes = {
  blue: {
    name: "Blue Ocean",
    gradient: "linear-gradient(135deg,  rgb(139 183 255) 0%, #06b6d4 100%)",
    gradientSize: "400% 400%",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    tertiary: "#0ea5e9",
    accent: "#0891b2",
    text: "#ffffff",
    glassBg: "rgba(255, 255, 255, 0.2)",
    border: "rgba(59, 130, 246, 0.6)",
  },
  rainbow: {
    name: "Rainbow Pastel",
    gradient:
      "linear-gradient(135deg, #ffcdd2 0%, #fff9c4 17%, #c8e6c9 33%, #bbdefb 50%, #e1bee7 67%, #f0cfd6 83%, #ffcdd2 100%)",
    gradientSize: "400% 400%",
    primary: "#ff6b9d",
    secondary: "#ffc371",
    tertiary: "#ffd54f",
    accent: "#4ecdc4",
    text: "#5a3d5c",
    glassBg: "rgba(255, 255, 255, 0.35)",
    border: "rgba(255, 107, 157, 0.6)",
  },
  pink: {
    name: "Pink Delight",
    gradient:
      "linear-gradient(135deg, #ffeef7 0%, #f0e6ff 25%, #e6f2ff 50%, #fff0f5 75%, #ffeef7 100%)",
    gradientSize: "400% 400%",
    primary: "#ff6b9d",
    secondary: "#c77dff",
    tertiary: "#9d6aff",
    accent: "#ff9eb3",
    text: "#4b3a5a",
    glassBg: "rgba(255, 255, 255, 0.4)",
    border: "rgba(199, 125, 255, 0.6)",
  },
  peach: {
    name: "Peach Bliss",
    gradient:
      "linear-gradient(135deg, #ffece9 0%, #fff0e6 25%, #ffe9e0 50%, #fff0e6 75%, #ffece9 100%)",
    gradientSize: "400% 400%",
    primary: "#ffb8a3",
    secondary: "#ffd4c8",
    tertiary: "#ffe9e0",
    accent: "#ffc5b8",
    text: "#8b6b5c",
    glassBg: "rgba(255, 255, 255, 0.35)",
    border: "rgba(255, 184, 163, 0.7)",
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved : "blue";
  });

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme: themes[currentTheme],
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
