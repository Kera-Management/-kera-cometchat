"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presenceStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const presenceStyle = props => {
  let presenceStatus = {
    backgroundColor: "#C4C4C4"
  };
  if (props.status === "online" || props.status === "available") {
    presenceStatus = {
      backgroundColor: "#3BDF2F"
    };
  }
  return _objectSpread({
    width: "9px",
    height: "9px",
    top: "-12px",
    float: "right",
    position: "relative"
  }, presenceStatus);
};
exports.presenceStyle = presenceStyle;