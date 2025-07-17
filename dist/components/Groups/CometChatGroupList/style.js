"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupWrapperStyle = exports.groupSearchStyle = exports.groupSearchInputStyle = exports.groupSearchButtonStyle = exports.groupMsgTxtStyle = exports.groupMsgStyle = exports.groupListStyle = exports.groupHeaderTitleStyle = exports.groupHeaderStyle = exports.groupHeaderCloseStyle = exports.groupAddStyle = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const groupWrapperStyle = (props, theme) => {
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
exports.groupWrapperStyle = groupWrapperStyle;
const groupHeaderStyle = theme => {
  return {
    padding: "16px",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid ".concat(theme.borderColor.primary),
    height: "70px"
  };
};
exports.groupHeaderStyle = groupHeaderStyle;
const groupHeaderCloseStyle = (img, theme) => {
  const mq = [...theme.breakPoints];
  return {
    cursor: "pointer",
    display: "none",
    mask: "url(".concat(img, ") left center no-repeat"),
    backgroundColor: "".concat(theme.primaryColor),
    height: "24px",
    width: "33%",
    ["@media ".concat(mq[0])]: {
      display: "block!important"
    }
  };
};
exports.groupHeaderCloseStyle = groupHeaderCloseStyle;
const groupHeaderTitleStyle = props => {
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
exports.groupHeaderTitleStyle = groupHeaderTitleStyle;
const groupAddStyle = (img, theme) => {
  return {
    height: "24px",
    cursor: "pointer",
    i: {
      display: "inline-block",
      width: "24px",
      height: "24px",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(theme.primaryColor)
    }
  };
};
exports.groupAddStyle = groupAddStyle;
const groupSearchStyle = () => {
  return {
    margin: "16px",
    position: "relative",
    borderRadius: "8px",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    backgroundColor: "rgba(20, 20, 20, 0.04)",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
};
exports.groupSearchStyle = groupSearchStyle;
const groupSearchButtonStyle = (img, context) => {
  return {
    width: "30px",
    height: "100%",
    padding: "8px 0 8px 8px",
    cursor: "default",
    mask: "url(".concat(img, ") 10px center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor, "!important")
  };
};
exports.groupSearchButtonStyle = groupSearchButtonStyle;
const groupSearchInputStyle = props => {
  return {
    width: "calc(100% - 30px)",
    height: "100%",
    padding: "8px",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "20px",
    outline: "none",
    border: "none",
    color: props.theme.color.search,
    backgroundColor: "transparent"
  };
};
exports.groupSearchInputStyle = groupSearchInputStyle;
const groupMsgStyle = () => {
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
exports.groupMsgStyle = groupMsgStyle;
const groupMsgTxtStyle = theme => {
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
exports.groupMsgTxtStyle = groupMsgTxtStyle;
const groupListStyle = () => {
  return {
    height: "calc(100% - 125px)",
    overflowY: "auto",
    margin: "0",
    padding: "0"
  };
};
exports.groupListStyle = groupListStyle;