"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thumbnailWrapperStyle = exports.thumbnailStyle = exports.iconWrapperStyle = exports.iconStyle = exports.headerStyle = exports.headerNameStyle = exports.headerIconStyle = exports.headerDurationStyle = exports.errorContainerStyle = exports.callScreenWrapperStyle = exports.callScreenContainerStyle = void 0;
var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const callScreenWrapperStyle = (props, keyframes) => {
  let styles = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "999"
  };
  if (props.widgetsettings) {
    styles = {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "2147483000"
    };
  }
  const fadeAnimation = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }"])));
  return _objectSpread(_objectSpread({}, styles), {}, {
    backgroundColor: "".concat(props.theme.backgroundColor.darkGrey),
    color: "".concat(props.theme.color.white),
    textAlign: "center",
    boxSizing: "border-box",
    animation: "".concat(fadeAnimation, " 250ms ease"),
    fontFamily: "".concat(props.theme.fontFamily),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily)
    }
  });
};
exports.callScreenWrapperStyle = callScreenWrapperStyle;
const callScreenContainerStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  };
};
exports.callScreenContainerStyle = callScreenContainerStyle;
const headerStyle = () => {
  return {
    padding: "20px 10px",
    width: "100%",
    height: "20%"
  };
};
exports.headerStyle = headerStyle;
const headerDurationStyle = () => {
  return {
    fontSize: "13px",
    display: "inline-block",
    padding: "5px"
  };
};
exports.headerDurationStyle = headerDurationStyle;
const headerNameStyle = () => {
  return {
    margin: "0",
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: "16px"
  };
};
exports.headerNameStyle = headerNameStyle;
const thumbnailWrapperStyle = () => {
  return {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
};
exports.thumbnailWrapperStyle = thumbnailWrapperStyle;
const thumbnailStyle = () => {
  return {
    width: "200px",
    flexShrink: "0"
  };
};
exports.thumbnailStyle = thumbnailStyle;
const headerIconStyle = () => {
  return {
    width: "100%",
    height: "15%",
    padding: "10px",
    display: "flex",
    justifyContent: "center"
  };
};
exports.headerIconStyle = headerIconStyle;
const iconWrapperStyle = () => {
  return {
    display: "flex"
  };
};
exports.iconWrapperStyle = iconWrapperStyle;
const iconStyle = img => {
  return {
    width: "50px",
    height: "50px",
    borderRadius: "27px",
    backgroundColor: "red",
    display: "flex",
    margin: "auto 10px",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    "i": {
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "white",
      display: "inline-block",
      width: "24px",
      height: "24px"
    }
  };
};
exports.iconStyle = iconStyle;
const errorContainerStyle = () => {
  return {
    color: "#fff",
    textAlign: "center",
    borderRadius: "2px",
    padding: "13px 10px",
    fontSize: "13px",
    width: "100%",
    height: "10%",
    backgroundColor: "#333"
  };
};
exports.errorContainerStyle = errorContainerStyle;