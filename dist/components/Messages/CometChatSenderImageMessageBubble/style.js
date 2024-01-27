"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageWrapperStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageImgWrapper = exports.messageContainerStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
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
const messageImgWrapper = context => {
  const mq = [...context.theme.breakPoints];
  return {
    display: "inline-block",
    alignSelf: "flex-end",
    maxWidth: "300px",
    height: "200px",
    cursor: "pointer",
    flexShrink: "0",
    img: {
      borderRadius: "8px",
      height: "100%"
    },
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      minWidth: "50px",
      maxWidth: "150px",
      height: "100px",
      padding: "2px 2px"
    }
  };
};
exports.messageImgWrapper = messageImgWrapper;
const messageInfoWrapperStyle = () => {
  return {
    alignSelf: "flex-end",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "25px",
    padding: "4px 8px"
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