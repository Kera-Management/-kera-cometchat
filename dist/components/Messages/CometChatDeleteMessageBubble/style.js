"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nameWrapperStyle = exports.nameStyle = exports.messageWrapperStyle = exports.messageTxtWrapperStyle = exports.messageTxtStyle = exports.messageTimeStampStyle = exports.messageThumbnailStyle = exports.messageInfoWrapperStyle = exports.messageDetailStyle = exports.messageContainerStyle = void 0;
var _chat = require("@cometchat-pro/chat");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const messageContainerStyle = (props, loggedInUser) => {
  var _props$message;
  const alignment = ((_props$message = props.message) === null || _props$message === void 0 || (_props$message = _props$message.sender) === null || _props$message === void 0 ? void 0 : _props$message.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
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
  var _props$message2;
  const alignment = ((_props$message2 = props.message) === null || _props$message2 === void 0 || (_props$message2 = _props$message2.sender) === null || _props$message2 === void 0 ? void 0 : _props$message2.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
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
  var _props$message3;
  const alignment = ((_props$message3 = props.message) === null || _props$message3 === void 0 || (_props$message3 = _props$message3.sender) === null || _props$message3 === void 0 ? void 0 : _props$message3.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
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
  var _props$message4;
  const alignment = ((_props$message4 = props.message) === null || _props$message4 === void 0 || (_props$message4 = _props$message4.sender) === null || _props$message4 === void 0 ? void 0 : _props$message4.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
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
  var _props$message5;
  let paddingSpace = {};
  if (((_props$message5 = props.message) === null || _props$message5 === void 0 || (_props$message5 = _props$message5.sender) === null || _props$message5 === void 0 ? void 0 : _props$message5.uid) !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) && props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
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
  var _props$message6;
  let paddingSpace = {};
  if (((_props$message6 = props.message) === null || _props$message6 === void 0 || (_props$message6 = _props$message6.sender) === null || _props$message6 === void 0 ? void 0 : _props$message6.uid) !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) && props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
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