"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatsWrapperStyle = exports.chatsMsgTxtStyle = exports.chatsMsgStyle = exports.chatsListStyle = exports.chatsHeaderTitleStyle = exports.chatsHeaderStyle = exports.chatsHeaderCloseStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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