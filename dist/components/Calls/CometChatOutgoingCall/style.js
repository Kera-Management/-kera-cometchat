"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thumbnailWrapperStyle = exports.thumbnailStyle = exports.iconWrapperStyle = exports.iconStyle = exports.headerStyle = exports.headerNameStyle = exports.headerIconStyle = exports.headerDurationStyle = exports.errorContainerStyle = exports.callScreenWrapperStyle = exports.callScreenContainerStyle = void 0;
var _templateObject;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
const callScreenWrapperStyle = (props, keyframes) => {
  let styles = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "999"
  };
  if (props.widgetsettings) {
    styles = {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "2147483000"
    };
  }
  const fadeAnimation = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }"])));
  return _objectSpread(_objectSpread({}, styles), {}, {
    backgroundColor: "".concat(props.theme.backgroundColor.darkGrey),
    color: "".concat(props.theme.color.white),
    textAlign: "center",
    boxSizing: "border-box",
    animation: "".concat(fadeAnimation, " 250ms ease"),
    fontFamily: "".concat(props.theme.fontFamily),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily)
    }
  });
};
exports.callScreenWrapperStyle = callScreenWrapperStyle;
const callScreenContainerStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  };
};
exports.callScreenContainerStyle = callScreenContainerStyle;
const headerStyle = () => {
  return {
    padding: "20px 10px",
    width: "100%",
    height: "20%"
  };
};
exports.headerStyle = headerStyle;
const headerDurationStyle = () => {
  return {
    fontSize: "13px",
    display: "inline-block",
    padding: "5px"
  };
};
exports.headerDurationStyle = headerDurationStyle;
const headerNameStyle = () => {
  return {
    margin: "0",
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: "16px"
  };
};
exports.headerNameStyle = headerNameStyle;
const thumbnailWrapperStyle = () => {
  return {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
};
exports.thumbnailWrapperStyle = thumbnailWrapperStyle;
const thumbnailStyle = () => {
  return {
    width: "200px",
    flexShrink: "0"
  };
};
exports.thumbnailStyle = thumbnailStyle;
const headerIconStyle = () => {
  return {
    width: "100%",
    height: "15%",
    padding: "10px",
    display: "flex",
    justifyContent: "center"
  };
};
exports.headerIconStyle = headerIconStyle;
const iconWrapperStyle = () => {
  return {
    display: "flex"
  };
};
exports.iconWrapperStyle = iconWrapperStyle;
const iconStyle = img => {
  return {
    width: "50px",
    height: "50px",
    borderRadius: "27px",
    backgroundColor: "red",
    display: "flex",
    margin: "auto 10px",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    "i": {
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "white",
      display: "inline-block",
      width: "24px",
      height: "24px"
    }
  };
};
exports.iconStyle = iconStyle;
const errorContainerStyle = () => {
  return {
    color: "#fff",
    textAlign: "center",
    borderRadius: "2px",
    padding: "13px 10px",
    fontSize: "13px",
    width: "100%",
    height: "10%",
    backgroundColor: "#333"
  };
};
exports.errorContainerStyle = errorContainerStyle;