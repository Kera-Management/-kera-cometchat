"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchInputStyle = exports.searchButtonStyle = exports.modalWrapperStyle = exports.modalSearchStyle = exports.modalListStyle = exports.modalFootStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalCaptionStyle = exports.modalBodyStyle = exports.contactMsgTxtStyle = exports.contactMsgStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    "button": _objectSpread(_objectSpread({
      cursor: "pointer",
      padding: "8px 16px",
      backgroundColor: "".concat(context.theme.primaryColor),
      borderRadius: "5px",
      color: "white",
      fontSize: "14px",
      outline: "0",
      border: "0"
    }, loadingState), {}, {
      "span": _objectSpread({}, textMargin)
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