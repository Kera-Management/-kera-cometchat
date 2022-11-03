"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pollTotalStyle = exports.pollQuestionStyle = exports.pollPercentStyle = exports.pollAnswerStyle = exports.nameWrapperStyle = exports.nameStyle = exports.messageWrapperStyle = exports.messageTxtWrapperStyle = exports.messageTxtContainerStyle = exports.messageThumbnailStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageDetailStyle = exports.messageContainerStyle = exports.checkIconStyle = exports.answerWrapperStyle = void 0;
require("core-js/modules/es6.regexp.search.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const messageContainerStyle = () => {
  return {
    alignSelf: "flex-start",
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
    width: "100%",
    flex: "1 1",
    alignSelf: "flex-start",
    display: "flex"
  };
};
exports.messageWrapperStyle = messageWrapperStyle;
const messageThumbnailStyle = () => {
  return {
    width: "36px",
    height: "36px",
    margin: "10px 5px",
    float: "left",
    flexShrink: "0"
  };
};
exports.messageThumbnailStyle = messageThumbnailStyle;
const messageDetailStyle = () => {
  return {
    flex: "1 1",
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 36px)"
  };
};
exports.messageDetailStyle = messageDetailStyle;
const nameWrapperStyle = avatar => {
  const paddingValue = avatar ? {
    padding: "3px 5px"
  } : {};
  return _objectSpread({
    alignSelf: "flex-start"
  }, paddingValue);
};
exports.nameWrapperStyle = nameWrapperStyle;
const nameStyle = context => {
  return {
    fontSize: "11px",
    color: "".concat(context.theme.color.search)
  };
};
exports.nameStyle = nameStyle;
const messageTxtContainerStyle = () => {
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-start",
    display: "flex"
  };
};
exports.messageTxtContainerStyle = messageTxtContainerStyle;
const messageTxtWrapperStyle = context => {
  return {
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    backgroundColor: "".concat(context.theme.backgroundColor.secondary),
    padding: "8px 16px",
    alignSelf: "flex-start",
    width: "100%"
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
    li: {
      backgroundColor: "".concat(context.theme.backgroundColor.white),
      margin: "10px 0",
      borderRadius: "8px",
      display: "flex",
      width: "100%",
      cursor: "pointer",
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
const answerWrapperStyle = (state, optionData, context) => {
  var _state$loggedInUser;
  let countPadding = "0px 16px 0px 0px";
  let widthProp = "calc(100% - 40px)";
  if (optionData.hasOwnProperty("voters") && optionData.voters.hasOwnProperty(state === null || state === void 0 ? void 0 : (_state$loggedInUser = state.loggedInUser) === null || _state$loggedInUser === void 0 ? void 0 : _state$loggedInUser.uid)) {
    //countPadding = "0px 8px";
    widthProp = "calc(100% - 80px)";
  }
  return {
    width: "100%",
    color: "".concat(context.theme.color.primary),
    display: "flex",
    alignItems: "center",
    minHeight: "35px",
    padding: "0 16px",
    height: "100%",
    zIndex: "2",
    p: {
      margin: "0",
      width: widthProp,
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      fontSize: "14px"
    },
    span: {
      width: "40px",
      padding: countPadding,
      fontWeight: "bold",
      display: "inline-block",
      fontSize: "13px"
    }
  };
};
exports.answerWrapperStyle = answerWrapperStyle;
const checkIconStyle = (img, context) => {
  return {
    width: "40px",
    height: "24px",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  };
};
exports.checkIconStyle = checkIconStyle;
const messageInfoWrapperStyle = () => {
  return {
    alignSelf: "flex-start",
    padding: "4px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "25px"
  };
};
exports.messageInfoWrapperStyle = messageInfoWrapperStyle;
const messageReactionsWrapperStyle = () => {
  return {
    display: "flex",
    alignSelf: "flex-start",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    minHeight: "36px"
  };
};
exports.messageReactionsWrapperStyle = messageReactionsWrapperStyle;