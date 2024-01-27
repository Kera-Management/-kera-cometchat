"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iconStyle = exports.headerTitleStyle = exports.headerButtonStyle = exports.callScreenWrapperStyle = exports.callScreenResizerStyle = exports.callScreenInnerBackgroundStyle = exports.callScreenHeaderStyle = exports.callScreenContainerStyle = exports.callScreenBackgroundStyle = void 0;
var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const callScreenWrapperStyle = (props, keyframes) => {
  const fadeAnimation = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }"])));
  return {
    width: "100%",
    height: "calc(100% - 50px)",
    position: "absolute",
    top: "50px",
    right: "0",
    bottom: "0",
    left: "0",
    backgroundColor: "".concat(props.theme.backgroundColor.darkGrey),
    zIndex: "999",
    color: "".concat(props.theme.color.white),
    textAlign: "center",
    boxSizing: "border-box",
    animation: "".concat(fadeAnimation, " 250ms ease"),
    fontFamily: "".concat(props.theme.fontFamily),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily)
    },
    "iframe": {
      border: "none"
    }
  };
};
exports.callScreenWrapperStyle = callScreenWrapperStyle;
const callScreenBackgroundStyle = state => {
  return {
    display: "none",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    zIndex: "2147483001"
  };
};
exports.callScreenBackgroundStyle = callScreenBackgroundStyle;
const callScreenContainerStyle = props => {
  return {
    width: props.maxWidth,
    height: props.maxHeight,
    position: "fixed",
    top: "0",
    left: "0",
    overflow: "hidden",
    zIndex: "2147483002",
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily)
    }
  };
};
exports.callScreenContainerStyle = callScreenContainerStyle;
const callScreenInnerBackgroundStyle = () => {
  return {
    display: "none",
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    zIndex: "2147483003"
  };
};
exports.callScreenInnerBackgroundStyle = callScreenInnerBackgroundStyle;
const callScreenHeaderStyle = state => {
  const cursorStyle = state.maximized ? {} : {
    cursor: "grabbing"
  };
  return _objectSpread({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#282c34",
    width: "100%",
    height: "50px",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "2147483004"
  }, cursorStyle);
};
exports.callScreenHeaderStyle = callScreenHeaderStyle;
const headerTitleStyle = () => {
  return {
    width: "calc(100% - 55px)",
    padding: "16px"
  };
};
exports.headerTitleStyle = headerTitleStyle;
const headerButtonStyle = () => {
  return {
    width: "55px",
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "button": {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      outline: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "0px",
      userSelect: "none",
      "img": {
        maxWidth: "100%",
        flexShrink: "0"
      }
    }
  };
};
exports.headerButtonStyle = headerButtonStyle;
const callScreenResizerStyle = state => {
  const backgroundStyle = state.maximized ? {
    display: "none"
  } : {
    cursor: "nwse-resize",
    clipPath: "polygon(100% 0,100% 100%,0 100%)",
    background: "repeating-linear-gradient(135deg,hsla(0,0%,100%,.5),hsla(0,0%,100%,.5) 2px,#000 0,#000 4px)"
  };
  return _objectSpread({
    width: "35px",
    height: "35px",
    position: "absolute",
    right: "0",
    bottom: "0",
    zIndex: "2147483004"
  }, backgroundStyle);
};
exports.callScreenResizerStyle = callScreenResizerStyle;
const iconStyle = img => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    cursor: "pointer",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "white"
  };
};
exports.iconStyle = iconStyle;