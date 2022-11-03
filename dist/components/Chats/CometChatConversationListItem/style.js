"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listItem = exports.itemThumbnailStyle = exports.itemRowStyle = exports.itemNameStyle = exports.itemLastMsgTimeStyle = exports.itemLastMsgStyle = exports.itemDetailStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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