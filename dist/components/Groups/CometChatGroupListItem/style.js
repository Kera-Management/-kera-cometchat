"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listItemName = exports.listItemIcon = exports.listItem = exports.itemThumbnailStyle = exports.itemNameWrapperStyle = exports.itemIconStyle = exports.itemDetailStyle = exports.itemDescStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    '&:hover': {
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