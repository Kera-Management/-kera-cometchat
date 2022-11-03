"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupScreenStyle = exports.groupScreenSidebarStyle = exports.groupScreenMainStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const groupScreenStyle = props => {
  return {
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
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
exports.groupScreenStyle = groupScreenStyle;
const groupScreenSidebarStyle = (state, props) => {
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
    ".groups": {
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
exports.groupScreenSidebarStyle = groupScreenSidebarStyle;
const groupScreenMainStyle = (state, props) => {
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
exports.groupScreenMainStyle = groupScreenMainStyle;