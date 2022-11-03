"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msgTimestampStyle = exports.iconStyle = void 0;
require("core-js/modules/es6.regexp.search.js");
const msgTimestampStyle = (context, props, loggedInUser) => {
  return {
    display: "flex",
    fontSize: "11px",
    fontWeight: "500",
    lineHeight: "12px",
    textTransform: "uppercase",
    color: "".concat(context.theme.color.search)
  };
};
exports.msgTimestampStyle = msgTimestampStyle;
const iconStyle = (img, color) => {
  return {
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(color),
    display: "inline-block",
    width: "24px",
    height: "24px"
  };
};
exports.iconStyle = iconStyle;