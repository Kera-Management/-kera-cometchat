"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sectionStyle = exports.sectionHeaderStyle = exports.sectionContentStyle = exports.itemLinkStyle = exports.headerTitleStyle = exports.headerStyle = exports.headerCloseStyle = exports.detailStyle = exports.detailPaneStyle = exports.contentItemStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const detailStyle = context => {
  return {
    height: "100%",
    position: "relative",
    boxSizing: "border-box",
    fontFamily: "".concat(context.theme.fontFamily),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(context.theme.fontFamily)
    }
  };
};
exports.detailStyle = detailStyle;
const headerStyle = context => {
  return {
    padding: "16px",
    position: "relative",
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "69px"
  };
};
exports.headerStyle = headerStyle;
const headerCloseStyle = (img, context) => {
  const mq = [...context.theme.breakPoints];
  return {
    cursor: "pointer",
    display: "none",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor),
    width: "24px",
    height: "24px",
    ["@media ".concat(mq[1], ", ").concat(mq[2], ", ").concat(mq[3], ", , ").concat(mq[4])]: {
      display: "block"
    }
  };
};
exports.headerCloseStyle = headerCloseStyle;
const headerTitleStyle = () => {
  return {
    margin: "0",
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "26px"
  };
};
exports.headerTitleStyle = headerTitleStyle;
const detailPaneStyle = () => {
  return {
    margin: "0",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "calc(100% - 70px)"
  };
};
exports.detailPaneStyle = detailPaneStyle;
const sectionStyle = () => {
  return {
    width: "100%"
  };
};
exports.sectionStyle = sectionStyle;
const sectionHeaderStyle = context => {
  return {
    margin: "0",
    width: "100%",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "20px",
    color: "".concat(context.theme.color.secondary),
    textTransform: "uppercase"
  };
};
exports.sectionHeaderStyle = sectionHeaderStyle;
const sectionContentStyle = () => {
  return {
    width: "100%",
    margin: "6px 0",
    '&:not(:last-of-type)': {
      marginBottom: "16px"
    }
  };
};
exports.sectionContentStyle = sectionContentStyle;
const contentItemStyle = () => {
  return {
    position: "relative",
    display: "flex",
    clear: "both",
    width: "100%",
    padding: " 6px 0",
    '&:first-of-type': {
      paddingTop: "0"
    },
    '&:last-of-type': {
      paddingBottom: "0"
    }
  };
};
exports.contentItemStyle = contentItemStyle;
const itemLinkStyle = (context, deleteLink) => {
  const deleteCss = deleteLink ? {
    color: "".concat(context.theme.color.red)
  } : {
    color: "".concat(context.theme.color.primary)
  };
  return _objectSpread({
    fontSize: "15px",
    lineHeight: "20px",
    display: "inline-block",
    cursor: "pointer",
    fontWeight: "600"
  }, deleteCss);
};
exports.itemLinkStyle = itemLinkStyle;