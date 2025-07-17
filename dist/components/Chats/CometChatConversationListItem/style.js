"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listItem = exports.itemThumbnailStyle = exports.itemRowStyle = exports.itemNameStyle = exports.itemLastMsgTimeStyle = exports.itemLastMsgStyle = exports.itemDetailStyle = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const listItem = props => {
  const selectedState = props.selectedConversation && props.selectedConversation.conversationId === props.conversation.conversationId ? {
    backgroundColor: "".concat(props.theme.backgroundColor.primary)
  } : {};
  return _objectSpread(_objectSpread({
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    padding: "8px 16px",
    position: "relative"
  }, selectedState), {}, {
    '&:hover': {
      backgroundColor: "".concat(props.theme.backgroundColor.primary)
    }
  });
};
exports.listItem = listItem;
const itemThumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0"
  };
};
exports.itemThumbnailStyle = itemThumbnailStyle;
const itemDetailStyle = () => {
  return {
    width: "calc(100% - 45px)",
    flexGrow: "1",
    paddingLeft: "16px",
    "&[dir=rtl]": {
      paddingRight: "16px",
      paddingLeft: "0"
    }
  };
};
exports.itemDetailStyle = itemDetailStyle;
const itemRowStyle = () => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  };
};
exports.itemRowStyle = itemRowStyle;
const itemNameStyle = props => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    display: "block",
    width: "calc(100% - 70px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "22px",
    color: "".concat(props.theme.color.primary)
  };
};
exports.itemNameStyle = itemNameStyle;
const itemLastMsgStyle = props => {
  return {
    margin: "0",
    fontSize: "13px",
    fontWeight: "400",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "20px",
    color: "".concat(props.theme.color.helpText)
  };
};
exports.itemLastMsgStyle = itemLastMsgStyle;
const itemLastMsgTimeStyle = props => {
  return {
    fontSize: "11px",
    width: "70px",
    textAlign: "right",
    color: "".concat(props.theme.color.helpText)
  };
};
exports.itemLastMsgTimeStyle = itemLastMsgTimeStyle;