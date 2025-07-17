"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unblockButtonStyle = exports.bockedSubTitleStyle = exports.blockedTitleStyle = exports.blockedMessageWrapperStyle = exports.blockedMessageContainerStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const blockedMessageWrapperStyle = () => {
  return {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    zIndex: "1",
    order: "3",
    position: "relative",
    flex: "none",
    minHeight: "105px",
    width: "100%",
    margin: "auto"
  };
};
exports.blockedMessageWrapperStyle = blockedMessageWrapperStyle;
const blockedMessageContainerStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };
};
exports.blockedMessageContainerStyle = blockedMessageContainerStyle;
const blockedTitleStyle = () => {
  return {
    fontSize: "20px",
    fontWeight: "700",
    textAlign: "center"
  };
};
exports.blockedTitleStyle = blockedTitleStyle;
const bockedSubTitleStyle = context => {
  return {
    margin: "16px 0",
    textAlign: "center",
    color: context.theme.color.helpText
  };
};
exports.bockedSubTitleStyle = bockedSubTitleStyle;
const unblockButtonStyle = context => {
  const mq = [...context.theme.breakPoints];
  const widthProp = {
    width: "15%",
    ["@media ".concat(mq[1])]: {
      width: "70%"
    },
    ["@media ".concat(mq[2])]: {
      width: "50%"
    },
    ["@media ".concat(mq[3])]: {
      width: "30%"
    },
    ["@media ".concat(mq[4])]: {
      width: "20%"
    }
  };
  return _objectSpread(_objectSpread({}, widthProp), {}, {
    padding: "8px 16px",
    margin: "0",
    borderRadius: "12px",
    backgroundColor: "".concat(context.theme.primaryColor, "!important"),
    color: "".concat(context.theme.color.white)
  });
};
exports.unblockButtonStyle = unblockButtonStyle;