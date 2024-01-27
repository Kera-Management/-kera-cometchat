"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.previewTitleStyle = exports.previewTextStyle = exports.previewLinkStyle = exports.previewImageStyle = exports.previewDescStyle = exports.previewDataStyle = exports.messagePreviewWrapperStyle = exports.messagePreviewContainerStyle = void 0;
const messagePreviewContainerStyle = context => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    boxShadow: "0px 1px 2px 1px rgba(0,0,0,0.18)",
    alignSelf: "flex-start",
    width: "auto"
  };
};
exports.messagePreviewContainerStyle = messagePreviewContainerStyle;
const messagePreviewWrapperStyle = () => {
  return {
    display: "flex",
    flexDirection: "column"
  };
};
exports.messagePreviewWrapperStyle = messagePreviewWrapperStyle;
const previewImageStyle = img => {
  return {
    background: "url(".concat(img, ") no-repeat center center"),
    backgroundSize: "contain",
    height: "150px",
    margin: "12px 0"
  };
};
exports.previewImageStyle = previewImageStyle;
const previewDataStyle = context => {
  return {
    borderTop: "1px solid  ".concat(context.theme.borderColor.primary),
    borderBottom: "1px solid  ".concat(context.theme.borderColor.primary),
    padding: "16px"
  };
};
exports.previewDataStyle = previewDataStyle;
const previewTitleStyle = context => {
  return {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto",
    color: "".concat(context.theme.color.helpText),
    fontWeight: "700",
    marginBottom: "8px"
  };
};
exports.previewTitleStyle = previewTitleStyle;
const previewDescStyle = context => {
  return {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto",
    color: "".concat(context.theme.color.helpText),
    fontStyle: "italic",
    fontSize: "13px"
  };
};
exports.previewDescStyle = previewDescStyle;
const previewTextStyle = context => {
  return {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto",
    ".message__txt__wrapper": {
      backgroundColor: "transparent",
      color: "".concat(context.theme.color.helpText),
      fontStyle: "normal",
      padding: "8px 0"
    }
  };
};
exports.previewTextStyle = previewTextStyle;
const previewLinkStyle = context => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    "> a": {
      display: "inline-block",
      color: "".concat(context.theme.color.blue),
      fontWeight: "700"
    }
  };
};
exports.previewLinkStyle = previewLinkStyle;