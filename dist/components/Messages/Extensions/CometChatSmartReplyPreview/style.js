"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.previewWrapperStyle = exports.previewOptionsWrapperStyle = exports.previewOptionStyle = exports.previewHeadingStyle = exports.previewCloseStyle = void 0;
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
const previewWrapperStyle = (context, keyframes) => {
  const slideAnimation = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    from {\n        bottom: -55px\n    }\n    to {\n        bottom: 0px\n    }"])));
  return {
    padding: "8px 8px 16px 8px",
    marginBottom: "-8px",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    border: "1px solid ".concat(context.theme.borderColor.primary),
    fontSize: "13px",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    animation: "".concat(slideAnimation, " 0.5s ease-out"),
    position: "relative"
  };
};
exports.previewWrapperStyle = previewWrapperStyle;
const previewHeadingStyle = () => {
  return {
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
  };
};
exports.previewHeadingStyle = previewHeadingStyle;
const previewCloseStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor),
    cursor: "pointer"
  };
};
exports.previewCloseStyle = previewCloseStyle;
const previewOptionsWrapperStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%"
  };
};
exports.previewOptionsWrapperStyle = previewOptionsWrapperStyle;
const previewOptionStyle = context => {
  return {
    padding: "8px",
    margin: "0 8px",
    backgroundColor: "".concat(context.theme.backgroundColor.grey),
    border: "1px solid ".concat(context.theme.borderColor.primary),
    borderRadius: "10px",
    cursor: "pointer",
    height: "100%",
    textAlign: "center"
  };
};
exports.previewOptionStyle = previewOptionStyle;