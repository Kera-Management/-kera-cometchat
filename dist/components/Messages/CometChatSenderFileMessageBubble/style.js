"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageWrapperStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageFileWrapper = exports.messageContainerStyle = exports.iconStyle = void 0;
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
const messageFileWrapper = context => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    backgroundColor: "".concat(context.theme.primaryColor),
    color: "".concat(context.theme.color.white),
    padding: "8px 16px",
    alignSelf: "flex-end",
    maxWidth: "100%",
    ".message__file": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "0 0",
      textDecoration: "none",
      color: "".concat(context.theme.color.white),
      maxWidth: "100%",
      fontSize: "14px",
      "&:visited, &:active, &:hover": {
        color: "".concat(context.theme.color.white),
        textDecoration: "none"
      },
      "> p": {
        margin: "0",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        textAlign: "left",
        width: "100%",
        fontSize: "14px",
        marginLeft: "8px"
      }
    }
  };
};
exports.messageFileWrapper = messageFileWrapper;
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
const iconStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.color.white),
    flexShrink: "0"
  };
};
exports.iconStyle = iconStyle;