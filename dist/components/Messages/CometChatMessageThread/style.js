"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapperStyle = exports.parentMessageStyle = exports.messageSeparatorStyle = exports.messageReplyStyle = exports.messageContainerStyle = exports.headerWrapperStyle = exports.headerTitleStyle = exports.headerStyle = exports.headerNameStyle = exports.headerDetailStyle = exports.headerCloseStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const wrapperStyle = context => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    fontFamily: "".concat(context.theme.fontFamily),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(context.theme.fontFamily)
    }
  };
};
exports.wrapperStyle = wrapperStyle;
const headerStyle = context => {
  return {
    padding: "16px",
    width: "100%",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    zIndex: "1",
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    height: " 69px",
    display: "flex"
  };
};
exports.headerStyle = headerStyle;
const headerWrapperStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  };
};
exports.headerWrapperStyle = headerWrapperStyle;
const headerDetailStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 40px)"
  };
};
exports.headerDetailStyle = headerDetailStyle;
const headerTitleStyle = () => {
  return {
    margin: "0",
    fontSize: "15px",
    fontWight: "600",
    lineHeight: "22px",
    width: "100%"
  };
};
exports.headerTitleStyle = headerTitleStyle;
const headerNameStyle = () => {
  return {
    fontSize: "13px",
    lineHeight: "20px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };
};
exports.headerNameStyle = headerNameStyle;
const headerCloseStyle = (img, context) => {
  return {
    cursor: "pointer",
    width: "24px",
    height: "24px",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor)
  };
};
exports.headerCloseStyle = headerCloseStyle;
const messageContainerStyle = event => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "background .3s ease-out .1s",
    width: "100%",
    zIndex: "100",
    minHeight: "calc(100% - 68px)",
    order: "2",
    ".chat__list": {
      minHeight: "250px",
      ".list__wrapper": {
        "::-webkit-scrollbar": {
          display: "none"
        },
        scrollbarWidth: "none"
      }
    }
  };
};
exports.messageContainerStyle = messageContainerStyle;
const parentMessageStyle = message => {
  const alignment = message.messageFrom === "sender" ? {
    justifyContent: "flex-end"
  } : {
    justifyContent: "flex-start"
  };
  return _objectSpread(_objectSpread({
    padding: "14px 16px",
    display: "flex",
    alignItems: "center"
  }, alignment), {}, {
    ".sender__message__container, .receiver__message__container": {
      maxWidth: "100%",
      "&:hover": {
        ".message__actions": {
          display: "none"
        }
      }
    },
    ".replycount": {
      display: "none"
    }
  });
};
exports.parentMessageStyle = parentMessageStyle;
const messageSeparatorStyle = context => {
  return {
    display: "flex",
    alignItems: "center",
    position: "relative",
    margin: "7px 16px",
    height: "15px",
    hr: {
      flex: "1",
      margin: "1px 0 0 0",
      borderTop: "1px solid ".concat(context.theme.borderColor.primary)
    }
  };
};
exports.messageSeparatorStyle = messageSeparatorStyle;
const messageReplyStyle = () => {
  return {
    marginRight: "12px",
    fontSize: "12px"
  };
};
exports.messageReplyStyle = messageReplyStyle;