"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navbarStyle = exports.itemStyle = exports.itemLinkTextStyle = exports.itemLinkStyle = exports.footerStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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