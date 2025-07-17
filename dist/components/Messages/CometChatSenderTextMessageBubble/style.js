"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageWrapperStyle = exports.messageTxtWrapperStyle = exports.messageTxtStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageContainerStyle = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    alignSelf: "flex-end",
    display: "flex",
    flex: "1 1"
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
    width: "auto"
  };
};
exports.messageTxtWrapperStyle = messageTxtWrapperStyle;
const messageTxtStyle = (props, showVariation, count) => {
  let emojiAlignmentProp = {
    " > img": {
      width: "24px",
      height: "24px",
      display: "inline-block",
      verticalAlign: "top",
      zoom: "1",
      margin: "0 2px"
    }
  };
  let emojiProp = {};
  let heightProp = {};
  if (count === 1) {
    emojiProp = {
      "> img": {
        width: "48px",
        height: "48px"
      }
    };
    heightProp = {
      height: "48px"
    };
  } else if (count === 2) {
    emojiProp = {
      "> img": {
        width: "36px",
        height: "36px"
      }
    };
    heightProp = {
      height: "36px"
    };
  } else if (count > 2) {
    emojiProp = {
      "> img": {
        width: "24px",
        height: "24px"
      }
    };
  }
  if (showVariation === false) {
    emojiProp = {
      "> img": {
        width: "24px",
        height: "24px"
      }
    };
  }
  return _objectSpread(_objectSpread(_objectSpread({
    margin: "0",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "left",
    width: "auto"
  }, heightProp), {}, {
    " a": {
      color: "#0432FF",
      "&:hover": {
        color: "#04009D"
      }
    },
    " a[href^='mailto:']": {
      color: "#F38C00",
      "&:hover": {
        color: "#F36800"
      }
    },
    " a[href^='tel:']": {
      color: "#3802DA",
      "&:hover": {
        color: "#2D038F"
      }
    }
  }, emojiAlignmentProp), emojiProp);
};
exports.messageTxtStyle = messageTxtStyle;
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