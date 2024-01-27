"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nameWrapperStyle = exports.nameStyle = exports.messageWrapperStyle = exports.messageTxtWrapperStyle = exports.messageTxtStyle = exports.messageTimeStampStyle = exports.messageThumbnailStyle = exports.messageInfoWrapperStyle = exports.messageDetailStyle = exports.messageContainerStyle = void 0;
var _chat = require("@cometchat-pro/chat");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const messageContainerStyle = (props, loggedInUser) => {
  var _props$message, _props$message$sender;
  const alignment = ((_props$message = props.message) === null || _props$message === void 0 ? void 0 : (_props$message$sender = _props$message.sender) === null || _props$message$sender === void 0 ? void 0 : _props$message$sender.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
    alignSelf: "flex-end"
  } : {
    alignSelf: "flex-start"
  };
  return _objectSpread({
    marginBottom: "16px",
    paddingLeft: "16px",
    paddingRight: "16px",
    maxWidth: "65%",
    clear: "both",
    flexShrink: "0"
  }, alignment);
};
exports.messageContainerStyle = messageContainerStyle;
const messageWrapperStyle = (props, loggedInUser) => {
  var _props$message2, _props$message2$sende;
  const alignment = ((_props$message2 = props.message) === null || _props$message2 === void 0 ? void 0 : (_props$message2$sende = _props$message2.sender) === null || _props$message2$sende === void 0 ? void 0 : _props$message2$sende.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
    display: "flex",
    flexDirection: "column"
  } : {};
  return _objectSpread({
    flex: "1 1",
    position: "relative",
    width: "100%"
  }, alignment);
};
exports.messageWrapperStyle = messageWrapperStyle;
const messageTxtWrapperStyle = (props, context, loggedInUser) => {
  var _props$message3, _props$message3$sende;
  const alignment = ((_props$message3 = props.message) === null || _props$message3 === void 0 ? void 0 : (_props$message3$sende = _props$message3.sender) === null || _props$message3$sende === void 0 ? void 0 : _props$message3$sende.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
    alignSelf: "flex-end"
  } : {
    alignSelf: "flex-start"
  };
  return _objectSpread({
    display: "inline-block",
    borderRadius: "12px",
    padding: "8px 12px",
    alignSelf: "flex-end",
    Width: "100%",
    backgroundColor: "".concat(context.theme.backgroundColor.secondary),
    fontStyle: "italic"
  }, alignment);
};
exports.messageTxtWrapperStyle = messageTxtWrapperStyle;
const messageTxtStyle = context => {
  return {
    fontSize: "14px!important",
    margin: "0",
    lineHeight: "20px!important",
    color: "".concat(context.theme.color.helpText)
  };
};
exports.messageTxtStyle = messageTxtStyle;
const messageInfoWrapperStyle = (props, loggedInUser) => {
  var _props$message4, _props$message4$sende;
  const alignment = ((_props$message4 = props.message) === null || _props$message4 === void 0 ? void 0 : (_props$message4$sende = _props$message4.sender) === null || _props$message4$sende === void 0 ? void 0 : _props$message4$sende.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
    alignSelf: "flex-end"
  } : {
    alignSelf: "flex-start"
  };
  return _objectSpread({}, alignment);
};
exports.messageInfoWrapperStyle = messageInfoWrapperStyle;
const messageTimeStampStyle = context => {
  return {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: "12px",
    textTransform: "uppercase",
    color: "".concat(context.theme.color.helpText)
  };
};
exports.messageTimeStampStyle = messageTimeStampStyle;
const messageThumbnailStyle = () => {
  return {
    width: "36px",
    height: "36px",
    margin: "12px 0",
    float: "left"
  };
};
exports.messageThumbnailStyle = messageThumbnailStyle;
const messageDetailStyle = (props, loggedInUser) => {
  var _props$message5, _props$message5$sende;
  let paddingSpace = {};
  if (((_props$message5 = props.message) === null || _props$message5 === void 0 ? void 0 : (_props$message5$sende = _props$message5.sender) === null || _props$message5$sende === void 0 ? void 0 : _props$message5$sende.uid) !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) && props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
    paddingSpace = {
      paddingLeft: "5px"
    };
  }
  return _objectSpread({
    flex: "1 1",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  }, paddingSpace);
};
exports.messageDetailStyle = messageDetailStyle;
const nameWrapperStyle = (props, loggedInUser) => {
  var _props$message6, _props$message6$sende;
  let paddingSpace = {};
  if (((_props$message6 = props.message) === null || _props$message6 === void 0 ? void 0 : (_props$message6$sende = _props$message6.sender) === null || _props$message6$sende === void 0 ? void 0 : _props$message6$sende.uid) !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) && props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
    paddingSpace = {
      padding: "3px 5px"
    };
  }
  return _objectSpread({
    alignSelf: "flex-start"
  }, paddingSpace);
};
exports.nameWrapperStyle = nameWrapperStyle;
const nameStyle = context => {
  return {
    fontSize: "10px",
    color: "".concat(context.theme.color.helpText)
  };
};
exports.nameStyle = nameStyle;