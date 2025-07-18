"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = void 0;
const theme = exports.theme = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  primaryColor: "#39f",
  secondaryTextColor: "#808080",
  color: {
    primary: "#141414",
    secondary: "#cccccc",
    darkSecondary: "#eaeaea",
    search: "rgba(20, 20, 20, 0.4)",
    tertiary: "rgba(20, 20, 20, 0.5)",
    grey: "rgba(20,20,20,0.04)",
    helpText: "rgba(20, 20, 20, 0.6)",
    blue: "#39f",
    white: "#fff",
    red: "#ff3b30"
  },
  borderColor: {
    primary: "#eaeaea",
    secondary: "#cccccc",
    darkSecondary: "#eaeaea",
    white: "#fff",
    blue: "#39f"
  },
  backgroundColor: {
    white: "#fff",
    primary: "#E6E6E6",
    secondary: "#f6f6f6",
    blue: "#39f",
    red: "#ff3b30",
    grey: "rgba(20,20,20,0.04)",
    lightGrey: "rgba(20, 20, 20, 0.08)",
    darkGrey: "rgba(20,20,20,0.9)",
    callScreenGrey: "#444444",
    silver: "#c4c4c4"
  },
  breakPoints: ["(min-width: 320px) and (max-width: 767px)", "(min-width: 320px) and (max-width: 480px)", "(min-width: 481px) and (max-width: 768px)", "(min-width: 769px) and (max-width: 1024px)", "(min-width: 1025px) and (max-width: 1200px)"]
};