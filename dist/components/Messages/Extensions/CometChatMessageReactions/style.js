"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactionCountStyle = exports.messageReactionsStyle = exports.emojiButtonStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    "i": {
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