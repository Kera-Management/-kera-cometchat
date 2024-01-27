"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactionCountStyle = exports.messageReactionsStyle = exports.emojiButtonStyle = void 0;
require("core-js/modules/es.symbol.description.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const messageReactionsStyle = (props, reactionData, context, loggedInUser) => {
  const uid = loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid;
  let borderStyle = {};
  let hoveredBorderStyle = {};
  if (reactionData.hasOwnProperty(uid)) {
    borderStyle = {
      border: "1px solid ".concat(context.theme.primaryColor)
    };
    hoveredBorderStyle = _objectSpread({}, borderStyle);
  } else {
    borderStyle = {
      border: "1px solid transparent"
    };
    hoveredBorderStyle = {
      border: "1px solid ".concat(context.theme.borderColor.primary)
    };
  }
  return _objectSpread(_objectSpread({
    fontSize: "11px",
    padding: "2px 6px",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    backgroundColor: "".concat(context.theme.backgroundColor.secondary),
    borderRadius: "12px",
    margin: "4px 4px 0 0",
    cursor: "pointer"
  }, borderStyle), {}, {
    ".emoji": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "16px"
    },
    "&:hover": _objectSpread({}, hoveredBorderStyle)
  });
};
exports.messageReactionsStyle = messageReactionsStyle;
const emojiButtonStyle = (img, context) => {
  return {
    outline: "0",
    border: "0",
    borderRadius: "4px",
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    position: "relative",
    i: {
      height: "24px",
      width: "24px",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor)
    }
  };
};
exports.emojiButtonStyle = emojiButtonStyle;
const reactionCountStyle = context => {
  return {
    color: "".concat(context.theme.color.primary),
    padding: "0 1px 0 3px"
  };
};
exports.reactionCountStyle = reactionCountStyle;