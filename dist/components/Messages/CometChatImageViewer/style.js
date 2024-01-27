"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imgStyle = exports.imageWrapperStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    cursor: "pointer",
    paddingTop: "26px"
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