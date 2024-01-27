"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatScreenStyle = exports.chatScreenSidebarStyle = exports.chatScreenMainStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const chatScreenStyle = props => {
  return {
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    position: "relative",
    fontFamily: "".concat(props.theme.fontFamily),
    border: "1px solid ".concat(props.theme.borderColor.primary),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily),
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
  };
};
exports.chatScreenStyle = chatScreenStyle;
const chatScreenSidebarStyle = (state, props) => {
  const sidebarView = state.sidebarview ? {
    left: "0",
    boxShadow: "rgba(0, 0, 0, .4) -30px 0 30px 30px"
  } : {};
  const mq = [...props.theme.breakPoints];
  return {
    width: "280px",
    borderRight: "1px solid ".concat(props.theme.borderColor.primary),
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    "> .chats": {
      height: "calc(100% - 5px)"
    },
    ["@media ".concat(mq[0])]: _objectSpread({
      position: "absolute!important",
      left: "-100%",
      top: "0",
      bottom: "0",
      width: "100%!important",
      zIndex: "2",
      backgroundColor: "".concat(props.theme.backgroundColor.white),
      transition: "all .3s ease-out"
    }, sidebarView)
  };
};
exports.chatScreenSidebarStyle = chatScreenSidebarStyle;
const chatScreenMainStyle = (state, props) => {
  const mq = [...props.theme.breakPoints];
  return {
    width: "calc(100% - 280px)",
    height: "100%",
    order: "2",
    display: "flex",
    flexDirection: "row",
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      width: "100%"
    }
  };
};
exports.chatScreenMainStyle = chatScreenMainStyle;