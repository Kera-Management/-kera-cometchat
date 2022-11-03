"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTitle = exports.listItemIconStyle = exports.listItem = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const listItem = props => {
  return _objectSpread({}, props.style);
};
exports.listItem = listItem;
const listTitle = props => {
  return {
    margin: "0 6px",
    background: "transparent",
    textTransform: "capitalize",
    font: props.style.textFont,
    color: props.style.textColor,
    wordWrap: "break-word"
  };
};
exports.listTitle = listTitle;
const listItemIconStyle = props => {
  return {
    WebkitMask: "url(".concat(props.iconURL, ") center center no-repeat"),
    background: props.style.iconBackground,
    transform: props.style.iconTransform,
    color: props.style.iconTint,
    marginLeft: "0px",
    width: "24px",
    height: "24px"
  };
};
exports.listItemIconStyle = listItemIconStyle;