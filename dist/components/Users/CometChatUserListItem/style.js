"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listItem = exports.itemThumbnailStyle = exports.itemNameStyle = exports.itemDetailStyle = exports.itemDescStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const listItem = (props, context) => {
  const selectedState = props.selectedUser && props.selectedUser.uid === props.user.uid ? {
    backgroundColor: "".concat(context.theme.backgroundColor.primary)
  } : {};
  return _objectSpread(_objectSpread({
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    padding: "8px 16px"
  }, selectedState), {}, {
    '&:hover': {
      backgroundColor: "".concat(context.theme.backgroundColor.primary)
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
    flexGrow: 1,
    paddingLeft: "16px",
    "&[dir=rtl]": {
      paddingRight: "16px",
      paddingLeft: "0"
    }
  };
};
exports.itemDetailStyle = itemDetailStyle;
const itemNameStyle = context => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    margin: "5px 0 0 0",
    lineHeight: "22px",
    color: "".concat(context.theme.color.primary)
  };
};
exports.itemNameStyle = itemNameStyle;
const itemDescStyle = context => {
  return {
    marginTop: "10px",
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary)
  };
};
exports.itemDescStyle = itemDescStyle;