"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatUserStyle = exports.chatThumbnailStyle = exports.chatStatusStyle = exports.chatSideBarBtnStyle = exports.chatOptionWrapStyle = exports.chatOptionStyle = exports.chatNameStyle = exports.chatHeaderStyle = exports.chatDetailStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _chat = require("@cometchat-pro/chat");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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