"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageActionStyle = exports.groupButtonStyle = exports.actionGroupStyle = void 0;
var _chat = require("@cometchat-pro/chat");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const messageActionStyle = (props, context, loggedInUser) => {
  var _props$message$sender, _props$message, _props$message$sender2, _props$message2, _props$message2$sende;
  const topPos = ((_props$message$sender = props.message.sender) === null || _props$message$sender === void 0 ? void 0 : _props$message$sender.uid) !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) && props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? {
    top: "-4px"
  } : {
    top: "-30px"
  };
  const alignment = ((_props$message = props.message) === null || _props$message === void 0 ? void 0 : (_props$message$sender2 = _props$message.sender) === null || _props$message$sender2 === void 0 ? void 0 : _props$message$sender2.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
    alignSelf: "flex-end"
  } : {
    alignSelf: "flex-start"
  };
  const direction = ((_props$message2 = props.message) === null || _props$message2 === void 0 ? void 0 : (_props$message2$sende = _props$message2.sender) === null || _props$message2$sende === void 0 ? void 0 : _props$message2$sende.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid) ? {
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