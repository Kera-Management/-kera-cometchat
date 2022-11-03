"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nameWrapperStyle = exports.nameStyle = exports.messageWrapperStyle = exports.messageThumbnailStyle = exports.messageReactionsWrapperStyle = exports.messageInfoWrapperStyle = exports.messageFileWrapperStyle = exports.messageFileContainerStyle = exports.messageDetailStyle = exports.messageContainerStyle = exports.iconStyle = void 0;
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
    width: "auto",
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
    flexDirection: "column"
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
const messageFileContainerStyle = () => {
  return {
    width: "auto",
    flex: "1 1",
    alignSelf: "flex-start",
    display: "flex"
  };
};
exports.messageFileContainerStyle = messageFileContainerStyle;
const messageFileWrapperStyle = context => {
  return {
    display: "inline-block",
    borderRadius: "12px",
    color: "".concat(context.theme.color.secondary),
    backgroundColor: "".concat(context.theme.backgroundColor.secondary),
    padding: "8px 16px",
    alignSelf: "flex-start",
    width: "auto",
    "> a": {
      background: "0 0",
      textDecoration: "none",
      backgroundColor: "transparent",
      color: "".concat(context.theme.color.primary),
      width: "auto",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:visited, &:active, &:hover": {
        color: "".concat(context.theme.color.primary),
        textDecoration: "none"
      },
      label: {
        cursor: "pointer"
      }
    }
  };
};
exports.messageFileWrapperStyle = messageFileWrapperStyle;
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
const iconStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor),
    marginRight: "8px"
  };
};
exports.iconStyle = iconStyle;