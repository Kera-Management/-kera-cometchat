"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionMessageTxtStyle = exports.actionMessageStyle = void 0;
const actionMessageStyle = () => {
  return {
    padding: "8px 16px",
    marginBottom: "16px",
    textAlign: "center",
    height: "36px"
  };
};
exports.actionMessageStyle = actionMessageStyle;
const actionMessageTxtStyle = () => {
  return {
    fontSize: "13.5px",
    margin: "0",
    lineHeight: "20px"
  };
};
exports.actionMessageTxtStyle = actionMessageTxtStyle;