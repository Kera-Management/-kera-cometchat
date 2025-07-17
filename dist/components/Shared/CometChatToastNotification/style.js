"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationStyle = exports.notificationMessageStyle = exports.notificationMessageContainerStyle = exports.notificationIconStyle = exports.notificationContainerStyle = exports.notificationCloseButtonStyle = exports.iconStyle = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const notificationContainerStyle = (props, keyframes) => {
  // const toastInRight = keyframes`
  // from {transform: translateX(100%);}
  // to {transform: translateX(0);}`;

  // const toastInLeft = keyframes`
  //     from {transform: translateX(-100%); }
  //     to {transform: translateX(0);}`;

  // let positionProp = {}
  // if (props.position === "top-right") {

  //     positionProp = {
  //         top: "12px",
  //         right: "12px",
  //         transition: "transform .6s ease-in",
  //         animation: `${toastInRight} .5s`
  //     };

  // } else if (props.position === "bottom-right") {

  //     positionProp = {
  //         bottom: "12px",
  //         right: "12px",
  //         transition: "transform .6s ease-in",
  //         animation: `${toastInRight} .5s`
  //     };

  // } else if (props.position === "top-left") {

  //     positionProp = {
  //         top: "12px",
  //         left: "12px",
  //         transition: "transform .6s ease-in",
  //         animation: `${toastInLeft} .5s`
  //     };

  // } else if (props.position === "bottom-left") {

  //     positionProp = {
  //         bottom: "12px",
  //         left: "12px",
  //         transition: "transform .6s ease-in",
  //         animation: `${toastInLeft} .5s`
  //     };
  // }

  return {
    fontSize: "14px",
    boxSizing: "border-box",
    position: "absolute",
    zIndex: "5",
    width: "80%",
    maxWidth: "320px",
    top: "70px",
    left: "50%",
    transform: "translate(-50%, 0)"
  };
};
exports.notificationContainerStyle = notificationContainerStyle;
const notificationStyle = (props, state) => {
  let backgroundColorProp = {
    backgroundColor: "#000"
  };
  if (state.type === "ERROR") {
    backgroundColorProp = {
      backgroundColor: "#d9534f"
    };
  } else if (state.type === "SUCCESS") {
    backgroundColorProp = {
      backgroundColor: "#5cb85c"
    };
  } else if (state.type === "INFO") {
    backgroundColorProp = {
      backgroundColor: "#5bc0de"
    };
  } else if (state.type === "WARNING") {
    backgroundColorProp = {
      backgroundColor: "#f0ad4e"
    };
  }
  return _objectSpread(_objectSpread({
    transition: ".3s ease",
    position: "relative",
    pointerEvents: "auto",
    overflow: "hidden",
    padding: "8px",
    marginBottom: "16px",
    fontSize: "13px",
    width: "100%",
    minHeight: "50px",
    boxShadow: "0 0 10px #999",
    color: "#fff"
  }, backgroundColorProp), {}, {
    backgroundPosition: "15px",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    boxSizing: "border-box"
  });
};
exports.notificationStyle = notificationStyle;
const notificationIconStyle = () => {
  return {
    marginRight: "16px",
    width: "25px",
    height: "25px",
    flexShrink: "0",
    "img": {
      maxWidth: "100%"
    }
  };
};
exports.notificationIconStyle = notificationIconStyle;
const notificationMessageContainerStyle = () => {
  return {
    width: "calc(100% - 60px)"
  };
};
exports.notificationMessageContainerStyle = notificationMessageContainerStyle;
const notificationMessageStyle = () => {
  return {
    margin: "0",
    textAlign: "left",
    marginLeft: "-1px"
  };
};
exports.notificationMessageStyle = notificationMessageStyle;
const notificationCloseButtonStyle = () => {
  return {
    width: "25px",
    height: "25px",
    padding: "0",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    cursor: " pointer",
    "img": {
      flexShrink: "0",
      maxWidth: "100%"
    }
  };
};
exports.notificationCloseButtonStyle = notificationCloseButtonStyle;
const iconStyle = (img, theme) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(theme.color.white)
  };
};
exports.iconStyle = iconStyle;