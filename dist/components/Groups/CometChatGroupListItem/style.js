"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listItemName = exports.listItemIcon = exports.listItem = exports.itemThumbnailStyle = exports.itemNameWrapperStyle = exports.itemIconStyle = exports.itemDetailStyle = exports.itemDescStyle = void 0;
require("core-js/modules/es.symbol.description.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const listItem = (props, context) => {
  const selectedState = props.selectedGroup && props.selectedGroup.guid === props.group.guid ? {
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
    "&:hover": {
      backgroundColor: "".concat(context.theme.backgroundColor.primary)
    }
  });
};
exports.listItem = listItem;
const listItemName = context => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    maxWidth: "calc(100% - 30px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    margin: "0",
    lineHeight: "22px",
    color: "".concat(context.theme.color.primary)
  };
};
exports.listItemName = listItemName;
const listItemIcon = () => {
  return {
    width: "24px",
    height: "auto",
    margin: "0 8px"
  };
};
exports.listItemIcon = listItemIcon;
const itemIconStyle = (img, context) => {
  return {
    display: "inline-block",
    width: "24px",
    height: "24px",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  };
};
exports.itemIconStyle = itemIconStyle;
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
    width: "calc(100% - 70px)",
    flexGrow: "1",
    paddingLeft: "16px",
    "&[dir=rtl]": {
      paddingRight: "16px",
      paddingLeft: "0"
    }
  };
};
exports.itemDetailStyle = itemDetailStyle;
const itemNameWrapperStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "0"
  };
};
exports.itemNameWrapperStyle = itemNameWrapperStyle;
const itemDescStyle = context => {
  return {
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    padding: "0 0 5px 0",
    fontSize: "13px",
    fontWeight: "400",
    lineHeight: "20px",
    color: "".concat(context.theme.color.helpText),
    "&:hover": {
      borderBottom: "1px solid ".concat(context.theme.borderColor.primary)
    }
  };
};
exports.itemDescStyle = itemDescStyle;