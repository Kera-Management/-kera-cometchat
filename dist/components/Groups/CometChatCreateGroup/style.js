"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableFootStyle = exports.tableCaptionStyle = exports.tableBodyStyle = exports.modalWrapperStyle = exports.modalTableStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalBodyStyle = exports.inputStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    "tr": {
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
    "tr": {
      "td": {
        padding: "8px 0",
        fontSize: "14px",
        "input": {
          width: "100%",
          border: "none",
          padding: "8px 16px",
          fontSize: "14px",
          outline: "none"
        },
        "select": {
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
    "button": _objectSpread(_objectSpread({
      cursor: "pointer",
      padding: "8px 16px",
      backgroundColor: "".concat(context.theme.primaryColor),
      borderRadius: "5px",
      color: "".concat(context.theme.color.white),
      fontSize: "14px",
      outline: "0",
      border: "0"
    }, loadingState), {}, {
      "span": _objectSpread({}, textMargin)
    }),
    "tr": {
      border: "none",
      "td": {
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
    border: '0',
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    backgroundColor: "".concat(context.theme.backgroundColor.grey),
    color: "".concat(context.theme.color.helpText),
    fontSize: "14px"
  };
};
exports.inputStyle = inputStyle;