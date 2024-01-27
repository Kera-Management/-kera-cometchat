"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableFootStyle = exports.tableCaptionStyle = exports.tableBodyStyle = exports.modalWrapperStyle = exports.modalTableStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalBodyStyle = exports.iconWrapperStyle = exports.addOptionIconStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const modalWrapperStyle = context => {
  const mq = [...context.theme.breakPoints];
  return {
    minWidth: "350px",
    minHeight: "450px",
    width: "50%",
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
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
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
const modalTableStyle = context => {
  return {
    borderCollapse: "collapse",
    margin: "0",
    padding: "0",
    width: "100%",
    height: "90%",
    tr: {
      borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
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
        padding: "8px 16px",
        fontSize: "14px",
        input: {
          width: "100%",
          border: "none",
          padding: "8px 16px",
          fontSize: "14px",
          "&:focus": {
            outline: "none"
          }
        },
        label: {
          padding: "8px 16px"
        },
        ":first-of-type": {
          width: "120px"
        }
      }
    }
  };
};
exports.tableBodyStyle = tableBodyStyle;
const tableFootStyle = (context, state, img) => {
  let loadingState = {};
  let textMargin = {};
  if (state.creatingPoll) {
    loadingState = {
      disabled: "true",
      pointerEvents: "none",
      background: "url(".concat(img, ") no-repeat right 10px center ").concat(context.theme.primaryColor)
    };
    textMargin = {
      marginRight: "24px"
    };
  }
  return {
    display: "inline-block",
    tr: {
      border: "none",
      td: {
        textAlign: "center",
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
        })
      }
    }
  };
};
exports.tableFootStyle = tableFootStyle;
const iconWrapperStyle = () => {
  return {
    width: "50px"
  };
};
exports.iconWrapperStyle = iconWrapperStyle;
const addOptionIconStyle = (img, context) => {
  return {
    backgroundSize: "28px 28px",
    cursor: "pointer",
    display: "block",
    height: "24px",
    width: "24px",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  };
};
exports.addOptionIconStyle = addOptionIconStyle;