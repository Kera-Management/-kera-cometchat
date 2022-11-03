"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageWrapperStyle = exports.messageTxtWrapperStyle = exports.messageTxtStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageContainerStyle = void 0;
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