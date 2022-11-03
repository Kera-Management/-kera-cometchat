"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imgStyle = exports.imageWrapperStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const imageWrapperStyle = (context, closeIcon, img) => {
  const heightProps = img ? {
    height: "auto"
  } : {
    height: "100%"
  };
  const mq = [...context.theme.breakPoints];
  return _objectSpread(_objectSpread({
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    width: "100%",
    padding: "1.8% 2.3%",
    zIndex: "9999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "url(".concat(closeIcon, ") no-repeat 99% 0.8% #fff"),
    cursor: "pointer"
  }, heightProps), {}, {
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      height: "100%"
    }
  });
};
exports.imageWrapperStyle = imageWrapperStyle;
const imgStyle = image => {
  const sizeProps = !image ? {
    width: "24px",
    height: "24px"
  } : {
    maxHeight: "100%"
  };
  return _objectSpread({
    objectFit: "contain"
  }, sizeProps);
};
exports.imgStyle = imgStyle;