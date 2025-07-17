"use strict";

require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scopeWrapperStyle = exports.scopeSelectionStyle = exports.scopeIconStyle = exports.scopeColumnStyle = exports.roleStyle = exports.nameStyle = exports.nameColumnStyle = exports.modalRowStyle = exports.kickIconStyle = exports.banIconStyle = exports.avatarStyle = exports.actionColumnStyle = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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