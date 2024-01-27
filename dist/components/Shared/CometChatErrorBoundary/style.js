"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorContainerStyle = void 0;
const errorContainerStyle = () => {
  return {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "auto",
    padding: "16px",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#F35051",
    color: "#fff"
  };
};
exports.errorContainerStyle = errorContainerStyle;