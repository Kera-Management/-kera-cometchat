"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageWrapperStyle = exports.messageTxtWrapperStyle = exports.messageTxtStyle = exports.messageTxtIconStyle = exports.messageTxtContainerStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageContainerStyle = exports.messageBtnStyle = void 0;
const messageContainerStyle = () => {
  return {
    alignSelf: "flex-end",
    marginBottom: "16px",
    paddingLeft: "16px",
    paddingRight: "16px",
    maxWidth: "305px",
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
const messageTxtWrapperStyle = context => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    backgroundColor: "".concat(context.theme.primaryColor),
    color: "".concat(context.theme.color.white),
    padding: "16px",
    alignSelf: "flex-end",
    width: "auto"
  };
};
exports.messageTxtWrapperStyle = messageTxtWrapperStyle;
const messageTxtContainerStyle = () => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "> img": {
      backgroundColor: "white"
    }
  };
};
exports.messageTxtContainerStyle = messageTxtContainerStyle;
const messageTxtStyle = () => {
  return {
    margin: "0",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "calc(100% - 24px)",
    fontSize: "14px",
    paddingLeft: "8px"
  };
};
exports.messageTxtStyle = messageTxtStyle;
const messageTxtIconStyle = (img, context) => {
  return {
    mask: "url(".concat(img, ") no-repeat left center"),
    backgroundColor: "".concat(context.theme.color.white),
    width: "24px",
    height: "24px"
  };
};
exports.messageTxtIconStyle = messageTxtIconStyle;
const messageBtnStyle = context => {
  return {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    width: "100%",
    li: {
      backgroundColor: "".concat(context.theme.backgroundColor.white),
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      position: "relative",
      margin: "16px 0 0 0",
      padding: "8px",
      cursor: "pointer",
      "> p": {
        background: "0 0",
        textAlign: "center",
        color: "".concat(context.theme.primaryColor),
        width: "100%",
        fontWeight: "600",
        display: "inline-block",
        fontSize: "14px",
        margin: "0"
      }
    }
  };
};
exports.messageBtnStyle = messageBtnStyle;
const messageInfoWrapperStyle = () => {
  return {
    alignSelf: "flex-end",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "4px 8px",
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