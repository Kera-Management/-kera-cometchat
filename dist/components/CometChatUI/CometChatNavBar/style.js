"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navbarStyle = exports.itemStyle = exports.itemLinkTextStyle = exports.itemLinkStyle = exports.footerStyle = void 0;
require("core-js/modules/es.symbol.description.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const footerStyle = () => {
  return {
    width: "100%",
    zIndex: "1",
    height: "64px"
  };
};
exports.footerStyle = footerStyle;
const navbarStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%"
  };
};
exports.navbarStyle = navbarStyle;
const itemStyle = props => {
  return {
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    color: "".concat(props.theme.color.helpText)
  };
};
exports.itemStyle = itemStyle;
const itemLinkStyle = (icon, isActive, context) => {
  let activeStateBg = isActive ? {
    backgroundColor: "".concat(context.theme.primaryColor)
  } : {
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  };
  return _objectSpread({
    height: "24px",
    width: "24px",
    display: "inline-block",
    mask: "url(".concat(icon, ") no-repeat center center")
  }, activeStateBg);
};
exports.itemLinkStyle = itemLinkStyle;
const itemLinkTextStyle = (isActive, context) => {
  const colorProp = isActive ? {
    color: "".concat(context.theme.primaryColor)
  } : {
    color: "".concat(context.theme.secondaryTextColor)
  };
  return _objectSpread(_objectSpread({}, colorProp), {}, {
    paddingTop: "2px"
  });
};
exports.itemLinkTextStyle = itemLinkTextStyle;