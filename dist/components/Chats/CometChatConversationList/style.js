"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatsWrapperStyle = exports.chatsMsgTxtStyle = exports.chatsMsgStyle = exports.chatsListStyle = exports.chatsHeaderTitleStyle = exports.chatsHeaderStyle = exports.chatsHeaderCloseStyle = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const chatsWrapperStyle = (props, theme) => {
  const borderStyle = props._parent === "" ? {
    border: "1px solid ".concat(theme.borderColor.primary)
  } : {};
  return _objectSpread(_objectSpread({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box"
  }, borderStyle), {}, {
    "*": {
      boxSizing: "border-box",
      "::-webkit-scrollbar": {
        width: "8px",
        height: "4px"
      },
      "::-webkit-scrollbar-track": {
        background: "#ffffff00"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#ccc",
        "&:hover": {
          background: "#aaa"
        }
      }
    }
  });
};
exports.chatsWrapperStyle = chatsWrapperStyle;
const chatsHeaderStyle = theme => {
  return {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid ".concat(theme.borderColor.primary),
    height: "69px"
  };
};
exports.chatsHeaderStyle = chatsHeaderStyle;
const chatsHeaderCloseStyle = (img, theme) => {
  const mq = [...theme.breakPoints];
  return {
    cursor: "pointer",
    display: "none",
    mask: "url(".concat(img, ") no-repeat left center"),
    backgroundColor: "".concat(theme.primaryColor),
    height: "24px",
    width: "33%",
    ["@media ".concat(mq[0])]: {
      display: "block!important"
    }
  };
};
exports.chatsHeaderCloseStyle = chatsHeaderCloseStyle;
const chatsHeaderTitleStyle = props => {
  const alignment = props.hasOwnProperty("enableCloseMenu") && props.enableCloseMenu.length > 0 ? {
    width: "33%",
    textAlign: "center"
  } : {};
  return _objectSpread(_objectSpread({
    margin: "0",
    display: "inline-block",
    width: "100%",
    textAlign: "left",
    fontSize: "22px",
    fontWeight: "700",
    lineHeight: "26px"
  }, alignment), {}, {
    "&[dir=rtl]": {
      textAlign: "right"
    }
  });
};
exports.chatsHeaderTitleStyle = chatsHeaderTitleStyle;
const chatsMsgStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%"
  };
};
exports.chatsMsgStyle = chatsMsgStyle;
const chatsMsgTxtStyle = theme => {
  return {
    margin: "0",
    minHeight: "36px",
    color: "".concat(theme.color.secondary),
    fontSize: "20px!important",
    fontWeight: "600",
    lineHeight: "30px",
    wordWrap: "break-word",
    padding: "0 16px"
  };
};
exports.chatsMsgTxtStyle = chatsMsgTxtStyle;
const chatsListStyle = () => {
  return {
    height: "calc(100% - 75px)",
    width: "100%",
    overflowY: "auto",
    margin: "0",
    padding: "0"
  };
};
exports.chatsListStyle = chatsListStyle;