"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeOptionIconStyle = exports.iconWrapperStyle = void 0;
const removeOptionIconStyle = (img, context) => {
  return {
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.color.red),
    cursor: "pointer",
    display: "block",
    height: "24px",
    width: "24px"
  };
};
exports.removeOptionIconStyle = removeOptionIconStyle;
const iconWrapperStyle = () => {
  return {
    width: "50px"
  };
};
exports.iconWrapperStyle = iconWrapperStyle;