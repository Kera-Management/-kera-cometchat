"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapperStyle = exports.parentMessageStyle = exports.messageSeparatorStyle = exports.messageReplyStyle = exports.messageContainerStyle = exports.headerWrapperStyle = exports.headerTitleStyle = exports.headerStyle = exports.headerNameStyle = exports.headerDetailStyle = exports.headerCloseStyle = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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