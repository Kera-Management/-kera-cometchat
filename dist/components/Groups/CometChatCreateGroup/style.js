"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableFootStyle = exports.tableCaptionStyle = exports.tableBodyStyle = exports.modalWrapperStyle = exports.modalTableStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalBodyStyle = exports.inputStyle = void 0;
require("core-js/modules/es.symbol.description.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const modalWrapperStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    minWidth: "350px",
    minHeight: "350px",
    width: "40%",
    height: "40%",
    overflow: "hidden",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "4",
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
    width: "100%"
  };
};
exports.modalBodyStyle = modalBodyStyle;
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
const modalTableStyle = props => {
  return {
    borderCollapse: "collapse",
    margin: "0",
    padding: "0",
    width: "100%",
    height: "90%",
    tr: {
      display: "table",
      width: "100%",
      tableLayout: "fixed"
    }
  };
};
exports.modalTableStyle = modalTableStyle;
const tableCaptionStyle = () => {
  return {
    fontSize: "20px",
    marginBottom: "15px",
    fontWeight: "bold",
    textAlign: "left"
  };
};
exports.tableCaptionStyle = tableCaptionStyle;
const tableBodyStyle = () => {
  return {
    height: "calc(100% - 40px)",
    overflowY: "auto",
    display: "block",
    tr: {
      td: {
        padding: "8px 0",
        fontSize: "14px",
        input: {
          width: "100%",
          border: "none",
          padding: "8px 16px",
          fontSize: "14px",
          outline: "none"
        },
        select: {
          outline: "none",
          padding: "8px 16px"
        }
      }
    }
  };
};
exports.tableBodyStyle = tableBodyStyle;
const tableFootStyle = (context, state, img) => {
  const loadingState = state.creatingGroup ? {
    disabled: "true",
    pointerEvents: "none",
    background: "url(".concat(img, ") no-repeat right 10px center ").concat(context.theme.primaryColor)
  } : {};
  const textMargin = state.creatingGroup ? {
    marginRight: "24px"
  } : {};
  return {
    display: "inline-block",
    button: _objectSpread(_objectSpread({
      cursor: "pointer",
      padding: "8px 16px",
      backgroundColor: "".concat(context.theme.primaryColor),
      borderRadius: "5px",
      color: "".concat(context.theme.color.white),
      fontSize: "14px",
      outline: "0",
      border: "0"
    }, loadingState), {}, {
      span: _objectSpread({}, textMargin)
    }),
    tr: {
      border: "none",
      td: {
        textAlign: "center"
      }
    }
  };
};
exports.tableFootStyle = tableFootStyle;
const inputStyle = context => {
  return {
    display: "block",
    width: "100%",
    border: "0",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    backgroundColor: "".concat(context.theme.backgroundColor.grey),
    color: "".concat(context.theme.color.helpText),
    fontSize: "14px"
  };
};
exports.inputStyle = inputStyle;