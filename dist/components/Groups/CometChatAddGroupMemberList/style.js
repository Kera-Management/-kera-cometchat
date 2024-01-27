"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchInputStyle = exports.searchButtonStyle = exports.modalWrapperStyle = exports.modalSearchStyle = exports.modalListStyle = exports.modalFootStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalCaptionStyle = exports.modalBodyStyle = exports.contactMsgTxtStyle = exports.contactMsgStyle = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const modalWrapperStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    minWidth: "350px",
    minHeight: "450px",
    width: "40%",
    height: "40%",
    overflow: "hidden",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1002",
    margin: "0 auto",
    boxShadow: "rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px",
    borderRadius: "12px",
    display: "block",
    [mq[0]]: {
      width: "100%",
      height: "100%"
    },
    [mq[1]]: {
      width: "100%",
      height: "100%"
    },
    [mq[2]]: {
      width: "100%",
      height: "100%"
    }
  };
};
exports.modalWrapperStyle = modalWrapperStyle;
const modalCloseStyle = (img, context) => {
  return {
    position: "absolute",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    top: "16px",
    right: "16px",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor),
    cursor: "pointer"
  };
};
exports.modalCloseStyle = modalCloseStyle;
const modalBodyStyle = () => {
  return {
    padding: "24px",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  };
};
exports.modalBodyStyle = modalBodyStyle;
const modalCaptionStyle = dir => {
  const textAlignStyle = dir === "rtl" ? {
    textAlign: "right",
    paddingRight: "32px"
  } : {
    textAlign: "left"
  };
  return _objectSpread(_objectSpread({
    fontSize: "20px",
    marginBottom: "16px",
    fontWeight: "bold"
  }, textAlignStyle), {}, {
    width: "100%"
  });
};
exports.modalCaptionStyle = modalCaptionStyle;
const modalErrorStyle = context => {
  return {
    fontSize: "12px",
    color: "".concat(context.theme.color.red),
    textAlign: "center",
    margin: "8px 0",
    width: "100%"
  };
};
exports.modalErrorStyle = modalErrorStyle;
const modalSearchStyle = () => {
  return {
    fontWeight: "normal",
    marginBottom: "16px",
    width: "100%",
    height: "35px",
    borderRadius: "8px",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    backgroundColor: "rgba(20, 20, 20, 0.04)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
};
exports.modalSearchStyle = modalSearchStyle;
const searchButtonStyle = (img, context) => {
  return {
    width: "30px",
    height: "100%",
    padding: "8px",
    cursor: "default",
    mask: "url(".concat(img, ") 10px center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor, "!important")
  };
};
exports.searchButtonStyle = searchButtonStyle;
const searchInputStyle = () => {
  return {
    width: "calc(100% - 30px)",
    height: "100%",
    padding: "8px",
    fontSize: "15px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent"
  };
};
exports.searchInputStyle = searchInputStyle;
const modalListStyle = context => {
  const mq = [...context.theme.breakPoints];
  return {
    height: "calc(100% - 125px)",
    overflowY: "auto",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      height: "100%"
    }
  };
};
exports.modalListStyle = modalListStyle;
const modalFootStyle = (props, state, img, context) => {
  const loadingState = state.addingMembers ? {
    disabled: "true",
    pointerEvents: "none",
    background: "url(".concat(img, ") ").concat(context.theme.primaryColor, " no-repeat right 10px center")
  } : {};
  const textMargin = state.addingMembers ? {
    marginRight: "24px"
  } : {};
  return {
    margin: "24px auto 0 auto",
    button: _objectSpread(_objectSpread({
      cursor: "pointer",
      padding: "8px 16px",
      backgroundColor: "".concat(context.theme.primaryColor),
      borderRadius: "5px",
      color: "white",
      fontSize: "14px",
      outline: "0",
      border: "0"
    }, loadingState), {}, {
      span: _objectSpread({}, textMargin)
    })
  };
};
exports.modalFootStyle = modalFootStyle;
const contactMsgStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55%"
  };
};
exports.contactMsgStyle = contactMsgStyle;
const contactMsgTxtStyle = context => {
  return {
    margin: "0",
    height: "30px",
    color: "".concat(context.theme.color.secondary),
    fontSize: "20px!important",
    fontWeight: "600"
  };
};
exports.contactMsgTxtStyle = contactMsgTxtStyle;