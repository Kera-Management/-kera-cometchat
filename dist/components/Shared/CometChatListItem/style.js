"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTitle = exports.listItemIconStyle = exports.listItem = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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