"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageActionStyle = exports.groupButtonStyle = exports.actionGroupStyle = void 0;
var _chat = require("@cometchat-pro/chat");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const messageActionStyle = (props, context, loggedInUser) => {
  var _props$message$sender, _props$message, _props$message2;
  const topPos = ((_props$message$sender = props.message.sender) === null || _props$message$sender === void 0 ? void 0 : _props$message$sender.uid) !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) && props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? {
    top: "-4px"
  } : {
    top: "-30px"
  };
  const alignment = ((_props$message = props.message) === null || _props$message === void 0 || (_props$message = _props$message.sender) === null || _props$message === void 0 ? void 0 : _props$message.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
    alignSelf: "flex-end"
  } : {
    alignSelf: "flex-start"
  };
  const direction = ((_props$message2 = props.message) === null || _props$message2 === void 0 || (_props$message2 = _props$message2.sender) === null || _props$message2 === void 0 ? void 0 : _props$message2.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
    "li:not(:last-of-type)": {
      marginRight: "8px"
    }
  } : {
    flexDirection: "row-reverse",
    "li:not(:first-of-type)": {
      marginRight: "8px"
    }
  };
  return _objectSpread(_objectSpread(_objectSpread({
    position: "absolute",
    zIndex: "1",
    display: "flex",
    listStyleType: "none",
    padding: "8px",
    margin: "0",
    height: "35px",
    border: "1px solid ".concat(context.theme.borderColor.primary),
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center"
  }, alignment), topPos), direction);
};
exports.messageActionStyle = messageActionStyle;
const actionGroupStyle = props => {
  return {
    display: "flex",
    position: "relative"
  };
};
exports.actionGroupStyle = actionGroupStyle;
const groupButtonStyle = (img, context, deleteOption) => {
  const backgroundProp = deleteOption ? {
    backgroundColor: "".concat(context.theme.color.red, "!important")
  } : {
    backgroundColor: "".concat(context.theme.secondaryTextColor, "!important")
  };
  return _objectSpread({
    outline: "0",
    border: "0",
    height: "24px",
    width: "24px",
    borderRadius: "4px",
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    position: "relative",
    mask: "url(".concat(img, ") center center no-repeat")
  }, backgroundProp);
};
exports.groupButtonStyle = groupButtonStyle;