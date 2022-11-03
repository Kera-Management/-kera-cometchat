"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactionEmojiStyle = exports.reactionContainerStyle = void 0;
const reactionContainerStyle = () => {
  return {
    width: "100px",
    height: "calc(100% - 120px)",
    overflow: "hidden",
    position: "absolute",
    top: "70px",
    right: "0"
  };
};
exports.reactionContainerStyle = reactionContainerStyle;
const reactionEmojiStyle = () => {
  return {
    position: "absolute",
    color: "#DD4144",
    visibility: "hidden",
    width: "20px",
    height: "20px",
    opacity: "1",
    transition: "opacity 3s",
    "&.fade": {
      opacity: "0"
    }
  };
};
exports.reactionEmojiStyle = reactionEmojiStyle;