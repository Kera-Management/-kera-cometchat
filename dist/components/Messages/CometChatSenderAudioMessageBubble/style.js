"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageWrapperStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageContainerStyle = exports.messageAudioWrapperStyle = void 0;
const messageContainerStyle = () => {
  return {
    alignSelf: "flex-end",
    marginBottom: "16px",
    paddingLeft: "16px",
    paddingRight: "16px",
    maxWidth: "65%",
    clear: "both",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexShrink: "0"
  };
};
exports.messageContainerStyle = messageContainerStyle;
const messageWrapperStyle = () => {
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-end",
    display: "flex"
  };
};
exports.messageWrapperStyle = messageWrapperStyle;
const messageAudioWrapperStyle = () => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    alignSelf: "flex-end",
    ' > audio': {
      maxWidth: "250px",
      display: "inherit",
      outline: "none"
    }
  };
};
exports.messageAudioWrapperStyle = messageAudioWrapperStyle;
const messageInfoWrapperStyle = () => {
  return {
    alignSelf: "flex-end",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "25px"
  };
};
exports.messageInfoWrapperStyle = messageInfoWrapperStyle;
const messageReactionsWrapperStyle = () => {
  return {
    display: "flex",
    alignSelf: "flex-end",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    minHeight: "36px"
  };
};
exports.messageReactionsWrapperStyle = messageReactionsWrapperStyle;