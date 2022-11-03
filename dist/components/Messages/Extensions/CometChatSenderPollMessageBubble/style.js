"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pollTotalStyle = exports.pollQuestionStyle = exports.pollPercentStyle = exports.pollAnswerStyle = exports.messageWrapperStyle = exports.messageTxtWrapperStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageContainerStyle = exports.answerWrapperStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
const messageTxtWrapperStyle = context => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    backgroundColor: "".concat(context.theme.primaryColor),
    color: "".concat(context.theme.color.white),
    padding: "8px 16px",
    alignSelf: "flex-end",
    width: "auto"
  };
};
exports.messageTxtWrapperStyle = messageTxtWrapperStyle;
const pollQuestionStyle = () => {
  return {
    margin: "0",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    textAlign: "left",
    width: "100%",
    fontSize: "14px"
  };
};
exports.pollQuestionStyle = pollQuestionStyle;
const pollAnswerStyle = context => {
  return {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    width: "100%",
    li: {
      backgroundColor: "".concat(context.theme.backgroundColor.white),
      margin: "10px 0",
      borderRadius: "8px",
      display: "flex",
      width: "100%",
      position: "relative"
    }
  };
};
exports.pollAnswerStyle = pollAnswerStyle;
const pollTotalStyle = () => {
  return {
    fontSize: "13px",
    margin: "0",
    alignSelf: "flex-end"
  };
};
exports.pollTotalStyle = pollTotalStyle;
const pollPercentStyle = (context, width) => {
  const curvedBorders = width === "100%" ? {
    borderRadius: "8px"
  } : {
    borderRadius: "8px 0 0 8px"
  };
  return _objectSpread(_objectSpread({
    maxWidth: "100%",
    width: width
  }, curvedBorders), {}, {
    backgroundColor: "".concat(context.theme.backgroundColor.primary),
    minHeight: "35px",
    height: "100%",
    position: "absolute",
    zIndex: "1"
  });
};
exports.pollPercentStyle = pollPercentStyle;
const answerWrapperStyle = (context, width) => {
  return {
    width: "100%",
    color: "".concat(context.theme.color.primary),
    display: "flex",
    alignItems: "center",
    minHeight: "35px",
    padding: "0 16px",
    height: "100%",
    zIndex: "2",
    "p": {
      margin: "0",
      width: "calc(100% - 40px)",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      fontSize: "14px"
    },
    "span": {
      maxWidth: "40px",
      padding: "0px 16px 0px 0px",
      fontWeight: "bold",
      display: "inline-block",
      fontSize: "13px"
    }
  };
};
exports.answerWrapperStyle = answerWrapperStyle;
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