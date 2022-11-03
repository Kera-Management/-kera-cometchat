"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scopeWrapperStyle = exports.scopeSelectionStyle = exports.scopeIconStyle = exports.scopeColumnStyle = exports.roleStyle = exports.nameStyle = exports.nameColumnStyle = exports.modalRowStyle = exports.kickIconStyle = exports.banIconStyle = exports.avatarStyle = exports.actionColumnStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const modalRowStyle = context => {
  return {
    borderLeft: "1px solid ".concat(context.theme.borderColor.primary),
    borderRight: "1px solid ".concat(context.theme.borderColor.primary),
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    display: "flex",
    width: "100%",
    fontSize: "14px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "8px"
  };
};
exports.modalRowStyle = modalRowStyle;
const nameColumnStyle = (context, participantView) => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  const widthProp = participantView ? {
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
  return _objectSpread({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }, widthProp);
};
exports.nameColumnStyle = nameColumnStyle;
const avatarStyle = (context, participantView) => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  const marginProp = participantView ? {
    marginRight: "8px"
  } : {
    marginRight: "8px",
    [mq[1]]: {
      marginRight: "0"
    }
  };
  return _objectSpread({
    width: "36px",
    height: "36px",
    flexShrink: "0"
  }, marginProp);
};
exports.avatarStyle = avatarStyle;
const nameStyle = (context, participantView) => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  const widthProp = participantView ? {
    width: "100%"
  } : {
    width: "calc(100% - 50px)"
  };
  const displayProp = participantView ? {
    display: "inline",
    [mq[1]]: {
      display: "inline"
    }
  } : {
    display: "inline",
    [mq[1]]: {
      display: "none"
    }
  };
  return _objectSpread(_objectSpread({
    margin: "8px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }, widthProp), displayProp);
};
exports.nameStyle = nameStyle;
const scopeColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "180px",
    "img": {
      width: "24px",
      height: "24px",
      cursor: "pointer"
    },
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
const scopeWrapperStyle = () => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    transition: "opacity .1s linear",
    "img": {
      margin: "0px 4px"
    }
  };
};
exports.scopeWrapperStyle = scopeWrapperStyle;
const scopeSelectionStyle = () => {
  return {
    width: "65%",
    border: "0",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    borderRadius: "8px",
    backgroundColor: "rgba(20, 20, 20, 0.04)",
    padding: "8px",
    color: "rgba(20, 20, 20, 0.6)",
    float: "left"
  };
};
exports.scopeSelectionStyle = scopeSelectionStyle;
const scopeIconStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    cursor: "pointer",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  };
};
exports.scopeIconStyle = scopeIconStyle;
const roleStyle = () => {
  return {
    fontSize: "12px",
    maxWidth: "calc(100% - 20px)"
  };
};
exports.roleStyle = roleStyle;
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
const banIconStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    cursor: "pointer",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  };
};
exports.banIconStyle = banIconStyle;
const kickIconStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    cursor: "pointer",
    background: "url(".concat(img, ") center center no-repeat")
  };
};
exports.kickIconStyle = kickIconStyle;