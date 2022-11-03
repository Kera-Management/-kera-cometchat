"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatUserStyle = exports.chatThumbnailStyle = exports.chatStatusStyle = exports.chatSideBarBtnStyle = exports.chatOptionWrapStyle = exports.chatOptionStyle = exports.chatNameStyle = exports.chatHeaderStyle = exports.chatDetailStyle = void 0;
var _chat = require("@cometchat-pro/chat");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const chatHeaderStyle = context => {
  return {
    padding: "16px",
    width: "100%",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    zIndex: "1",
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  };
};
exports.chatHeaderStyle = chatHeaderStyle;
const chatDetailStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "calc(100% - 116px)"
  };
};
exports.chatDetailStyle = chatDetailStyle;
const chatSideBarBtnStyle = (img, props, context) => {
  const displayValue = props.hasOwnProperty("sidebar") && props.sidebar === 0 ? {
    display: "none!important"
  } : {};
  const mq = [...context.theme.breakPoints];
  return _objectSpread({
    cursor: "pointer",
    display: "none",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor),
    width: "24px",
    height: "24px",
    float: "left",
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      display: "block"
    }
  }, displayValue);
};
exports.chatSideBarBtnStyle = chatSideBarBtnStyle;
const chatThumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0",
    margin: "0 16px"
  };
};
exports.chatThumbnailStyle = chatThumbnailStyle;
const chatUserStyle = context => {
  const mq = [...context.theme.breakPoints];
  return {
    width: "calc(100% - 50px)",
    padding: "0",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      width: "calc(100% - 80px)!important"
    }
  };
};
exports.chatUserStyle = chatUserStyle;
const chatNameStyle = context => {
  return {
    margin: "0",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "22px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "".concat(context.theme.primary)
  };
};
exports.chatNameStyle = chatNameStyle;
const chatStatusStyle = (state, context) => {
  let status = {};
  if (context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
    status = {
      color: "".concat(context.theme.color.blue),
      textTransform: "capitalize"
    };
    if (state.presence === "offline") {
      status = {
        color: "".concat(context.theme.color.helpText),
        textTransform: "capitalize"
      };
    }
    if (state.typing) {
      status = {
        color: "".concat(context.theme.color.helpText),
        textTransform: "none",
        fontStyle: "italic"
      };
    }
  } else if (context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
    status = {
      color: "".concat(context.theme.color.helpText)
    };
    if (state.typing) {
      status = {
        color: "".concat(context.theme.color.helpText),
        fontStyle: "italic"
      };
    }
  }
  return _objectSpread({
    fontSize: "13px",
    width: "100%"
  }, status);
};
exports.chatStatusStyle = chatStatusStyle;
const chatOptionWrapStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto"
  };
};
exports.chatOptionWrapStyle = chatOptionWrapStyle;
const chatOptionStyle = (img, context, ongoingCall) => {
  const bgColor = ongoingCall ? {
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  } : {
    backgroundColor: "".concat(context.theme.primaryColor)
  };
  return {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    margin: "0 0 0 16px",
    "i": _objectSpread({
      width: "24px",
      height: "24px",
      display: "inline-block",
      mask: "url(".concat(img, ") center center no-repeat")
    }, bgColor)
  };
};
exports.chatOptionStyle = chatOptionStyle;