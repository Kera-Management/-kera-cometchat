"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scopeColumnStyle = exports.nameColumnStyle = exports.modalWrapperStyle = exports.modalListStyle = exports.modalErrorStyle = exports.modalCloseStyle = exports.modalCaptionStyle = exports.modalBodyStyle = exports.listStyle = exports.listHeaderStyle = exports.actionColumnStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const modalWrapperStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
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
    [mq[1]]: {
      width: "100%",
      height: "100%"
    },
    [mq[2]]: {
      width: "100%",
      height: "100%"
    },
    [mq[3]]: {
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
const nameColumnStyle = (context, editAccess) => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  const widthProp = editAccess === null ? {
    width: "calc(100% - 180px)",
    [mq[1]]: {
      width: "calc(100% - 140px)"
    },
    [mq[2]]: {
      width: "calc(100% - 180px)"
    }
  } : {
    width: "calc(100% - 260px)",
    [mq[1]]: {
      width: "calc(100% - 220px)"
    },
    [mq[2]]: {
      width: "calc(100% - 260px)"
    },
    [mq[3]]: {
      width: "calc(100% - 240px)"
    }
  };
  return _objectSpread({}, widthProp);
};
exports.nameColumnStyle = nameColumnStyle;
const scopeColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "180px",
    marginRight: "8px",
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
const actionColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "70px",
    [mq[1]]: {
      width: "40px"
    },
    [mq[2]]: {
      width: "40px"
    }
  };
};
exports.actionColumnStyle = actionColumnStyle;