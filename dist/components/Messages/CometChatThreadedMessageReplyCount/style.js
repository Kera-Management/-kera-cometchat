"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replyCountStyle = void 0;
const replyCountStyle = context => {
  return {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "500",
    lineHeight: "12px",
    textTransform: "lowercase",
    padding: "0 10px",
    cursor: "pointer",
    color: context.theme.color.blue,
    "&:hover": {
      textDecoration: "underline"
    }
  };
};
exports.replyCountStyle = replyCountStyle;