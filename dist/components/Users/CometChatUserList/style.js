"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contactWrapperStyle = exports.contactSearchStyle = exports.contactSearchInputStyle = exports.contactSearchButtonStyle = exports.contactMsgTxtStyle = exports.contactMsgStyle = exports.contactListStyle = exports.contactHeaderTitleStyle = exports.contactHeaderStyle = exports.contactHeaderCloseStyle = exports.contactAlphabetStyle = void 0;
require("core-js/modules/es6.regexp.search.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const contactWrapperStyle = (props, theme) => {
  const borderStyle = props._parent === "" ? {
    border: "1px solid ".concat(theme.borderColor.primary)
  } : {};
  return _objectSpread(_objectSpread({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box"
  }, borderStyle), {}, {
    "*": {
      boxSizing: "border-box",
      "::-webkit-scrollbar": {
        width: "8px",
        height: "4px"
      },
      "::-webkit-scrollbar-track": {
        background: "#ffffff00"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#ccc",
        "&:hover": {
          background: "#aaa"
        }
      }
    }
  });
};
exports.contactWrapperStyle = contactWrapperStyle;
const contactHeaderStyle = theme => {
  return {
    padding: "16px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid ".concat(theme.borderColor.primary),
    height: "70px"
  };
};
exports.contactHeaderStyle = contactHeaderStyle;
const contactHeaderCloseStyle = (img, theme) => {
  const mq = [...theme.breakPoints];
  return {
    cursor: "pointer",
    display: "none",
    mask: "url(".concat(img, ") left center no-repeat"),
    backgroundColor: "".concat(theme.secondaryTextColor),
    height: "24px",
    width: "33%",
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      display: "block!important"
    }
  };
};
exports.contactHeaderCloseStyle = contactHeaderCloseStyle;
const contactHeaderTitleStyle = props => {
  const alignment = props.hasOwnProperty("enableCloseMenu") && props.enableCloseMenu.length > 0 ? {
    width: "33%",
    textAlign: "center"
  } : {};
  return _objectSpread(_objectSpread({
    margin: "0",
    fontWeight: "700",
    display: "inline-block",
    width: "100%",
    textAlign: "left",
    fontSize: "22px",
    lineHeight: "26px"
  }, alignment), {}, {
    "&[dir=rtl]": {
      textAlign: "right"
    }
  });
};
exports.contactHeaderTitleStyle = contactHeaderTitleStyle;
const contactSearchStyle = () => {
  return {
    margin: "16px",
    position: "relative",
    borderRadius: "8px",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
    backgroundColor: "rgba(20, 20, 20, 0.04)",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
};
exports.contactSearchStyle = contactSearchStyle;
const contactSearchButtonStyle = (img, theme) => {
  return {
    width: "30px",
    height: "100%",
    padding: "8px 0 8px 8px",
    cursor: "default",
    mask: "url(".concat(img, ") 10px center no-repeat"),
    backgroundColor: "".concat(theme.secondaryTextColor, "!important")
  };
};
exports.contactSearchButtonStyle = contactSearchButtonStyle;
const contactSearchInputStyle = props => {
  return {
    width: "calc(100% - 30px)",
    padding: "8px",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "20px",
    outline: "none",
    border: "none",
    height: "100%",
    color: props.theme.color.search,
    backgroundColor: "transparent"
  };
};
exports.contactSearchInputStyle = contactSearchInputStyle;
const contactMsgStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%"
  };
};
exports.contactMsgStyle = contactMsgStyle;
const contactMsgTxtStyle = theme => {
  return {
    margin: "0",
    minHeight: "36px",
    color: "".concat(theme.color.secondary),
    fontSize: "20px!important",
    fontWeight: "600",
    lineHeight: "30px",
    wordWrap: "break-word",
    padding: "0 16px"
  };
};
exports.contactMsgTxtStyle = contactMsgTxtStyle;
const contactListStyle = () => {
  return {
    height: "calc(100% - 125px)",
    overflowY: "auto",
    margin: "0",
    padding: "0"
  };
};
exports.contactListStyle = contactListStyle;
const contactAlphabetStyle = props => {
  return {
    padding: "0 16px",
    margin: "5px 0",
    width: "100%",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "20px",
    color: "".concat(props.theme.color.tertiary)
  };
};
exports.contactAlphabetStyle = contactAlphabetStyle;