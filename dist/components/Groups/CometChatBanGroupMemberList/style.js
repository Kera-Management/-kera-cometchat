"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleColumnStyle = exports.nameColumnStyle = exports.modalWrapperStyle = exports.modalListStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalCaptionStyle = exports.modalBodyStyle = exports.listStyle = exports.listHeaderStyle = exports.contactMsgTxtStyle = exports.contactMsgStyle = exports.actionColumnStyle = void 0;
require("core-js/modules/es.symbol.description.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const modalWrapperStyle = context => {
  const mq = context.theme.breakPoints.map(x => "".concat(x));
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
    width: "100%",
    height: "31px"
  };
};
exports.modalErrorStyle = modalErrorStyle;
const modalListStyle = () => {
  return {
    width: "100%",
    height: "calc(100% - 70px)",
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
const nameColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "calc(100% - 220px)",
    [mq[0]]: {
      width: "calc(100% - 185px)"
    },
    [mq[1]]: {
      width: "calc(100% - 185px)"
    },
    [mq[2]]: {
      width: "calc(100% - 185px)"
    }
  };
};
exports.nameColumnStyle = nameColumnStyle;
const roleColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "150px",
    [mq[0]]: {
      width: "115px"
    },
    [mq[1]]: {
      width: "115px"
    },
    [mq[2]]: {
      width: "115px"
    }
  };
};
exports.roleColumnStyle = roleColumnStyle;
const actionColumnStyle = () => {
  return {
    width: "70px"
  };
};
exports.actionColumnStyle = actionColumnStyle;
const listStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "calc(100% - 33px)",
    overflowY: "auto"
  };
};
exports.listStyle = listStyle;
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