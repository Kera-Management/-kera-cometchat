"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unblockButtonStyle = exports.bockedSubTitleStyle = exports.blockedTitleStyle = exports.blockedMessageWrapperStyle = exports.blockedMessageContainerStyle = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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