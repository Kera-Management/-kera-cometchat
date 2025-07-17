"use strict";

require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scopeColumnStyle = exports.nameColumnStyle = exports.modalWrapperStyle = exports.modalListStyle = exports.modalFootStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalCaptionStyle = exports.modalBodyStyle = exports.listStyle = exports.listHeaderStyle = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const modalWrapperStyle = (props, context) => {
  const mq = ["@media (min-width : 320px) and (max-width: 767px)"];
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
    width: "100%"
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
    marginBottom: "8px",
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
    padding: "8px 0",
    height: "31px",
    width: "100%"
  };
};
exports.modalErrorStyle = modalErrorStyle;
const modalListStyle = context => {
  return {
    width: "100%",
    height: "calc(100% - 120px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  };
};
exports.modalListStyle = modalListStyle;
const listHeaderStyle = context => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontWeight: "bold",
    padding: "8px",
    width: "100%",
    border: "1px solid ".concat(context.theme.borderColor.primary)
  };
};
exports.listHeaderStyle = listHeaderStyle;
const listStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "calc(100% - 100px)",
    overflowY: "auto"
  };
};
exports.listStyle = listStyle;
const nameColumnStyle = (props, context) => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "calc(100% - 180px)",
    [mq[1]]: {
      width: "calc(100% - 140px)"
    },
    [mq[2]]: {
      width: "calc(100% - 180px)"
    },
    [mq[3]]: {
      width: "calc(100% - 120px)"
    }
  };
};
exports.nameColumnStyle = nameColumnStyle;
const scopeColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "180px",
    [mq[1]]: {
      width: "140px"
    },
    [mq[2]]: {
      width: "180px"
    },
    [mq[3]]: {
      width: "120px"
    }
  };
};
exports.scopeColumnStyle = scopeColumnStyle;
const modalFootStyle = (state, context, img) => {
  const btnState = !state.newGroupOwner || state.transferringOwnership ? {
    disabled: "true",
    pointerEvents: "none"
  } : {};
  const loadingState = state.transferringOwnership ? {
    background: "url(".concat(img, ") no-repeat right 10px center ").concat(context.theme.backgroundColor.blue)
  } : {};
  const textMargin = state.transferringOwnership ? {
    marginRight: "24px"
  } : {};
  return {
    paddingTop: "24px",
    textAlign: "center",
    button: _objectSpread(_objectSpread(_objectSpread({
      cursor: "pointer",
      padding: "8px 16px",
      backgroundColor: "".concat(context.theme.backgroundColor.blue),
      borderRadius: "5px",
      color: "".concat(context.theme.color.white),
      fontSize: "14px",
      outline: "0",
      border: "0"
    }, btnState), loadingState), {}, {
      span: _objectSpread({}, textMargin)
    })
  };
};
exports.modalFootStyle = modalFootStyle;