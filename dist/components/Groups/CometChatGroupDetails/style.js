"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sectionStyle = exports.sectionHeaderStyle = exports.sectionContentStyle = exports.itemLinkStyle = exports.headerTitleStyle = exports.headerStyle = exports.headerCloseStyle = exports.detailStyle = exports.detailPaneStyle = exports.contentItemStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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