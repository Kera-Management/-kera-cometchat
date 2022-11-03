"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sectionStyle = exports.sectionHeaderStyle = exports.sectionContentStyle = exports.mediaItemStyle = exports.mediaBtnStyle = exports.itemStyle = exports.buttonStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const sectionStyle = props => {
  const containerHeightProp = props.containerHeight ? {
    height: "calc(100% - ".concat(props.containerHeight, ")")
  } : {
    height: "calc(100% - 20px)"
  };
  return _objectSpread({
    width: "100%"
  }, containerHeightProp);
};
exports.sectionStyle = sectionStyle;
const sectionHeaderStyle = props => {
  return {
    margin: "0",
    width: "100%",
    fontSize: "12px",
    fontWeight: "500!important",
    lineHeight: "20px",
    color: "".concat(props.theme.color.secondary),
    textTransform: "uppercase"
  };
};
exports.sectionHeaderStyle = sectionHeaderStyle;
const sectionContentStyle = () => {
  return {
    width: "100%",
    margin: "6px 0",
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 20px)"
  };
};
exports.sectionContentStyle = sectionContentStyle;
const mediaBtnStyle = () => {
  return {
    borderRadius: "8px",
    backgroundColor: "rgba(20, 20, 20, 0.08)",
    width: "100%",
    padding: "2px",
    margin: "6px 0",
    clear: "both"
  };
};
exports.mediaBtnStyle = mediaBtnStyle;
const buttonStyle = (state, type) => {
  const activeBtn = state.messagetype === type ? {
    backgroundColor: "#fff",
    boxShadow: "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px",
    borderRadius: "7px",
    "&::before": {
      display: "none"
    }
  } : {};
  return _objectSpread(_objectSpread({
    display: "inline-block",
    width: "33.33%",
    float: "left",
    fontSize: "13px",
    fontWeight: "500",
    lineHeight: "18px",
    padding: "5px",
    position: "relative",
    textAlign: "center",
    cursor: "pointer"
  }, activeBtn), {}, {
    "&:before": {
      "`content`": "",
      position: "absolute",
      display: "block",
      width: "2px",
      height: "16px",
      backgroundColor: "rgba(20, 20, 20, 0.12)",
      right: "-2px",
      top: "6px"
    },
    "&:last-of-type::before": {
      display: "none"
    }
  });
};
exports.buttonStyle = buttonStyle;
const mediaItemStyle = () => {
  return {
    height: "calc(100% - 45px)",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "14px"
  };
};
exports.mediaItemStyle = mediaItemStyle;
const itemStyle = (state, props, img, context) => {
  let itemTypeStyle = {};
  let bgColor = "".concat(props.theme.backgroundColor.lightGrey);
  if (state.messagetype === "image") {
    itemTypeStyle = {
      height: "120px",
      width: "120px",
      backgroundColor: bgColor,
      "> img": {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain"
      }
    };
  } else if (state.messagetype === "video") {
    itemTypeStyle = {
      "> video": {
        height: "120px",
        width: "120px",
        margin: "auto"
      }
    };
  } else if (state.messagetype === "file") {
    itemTypeStyle = {
      backgroundColor: bgColor,
      "> a": {
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
        display: "flex",
        padding: "8px",
        "&:hover, &:visited": {
          color: "".concat(props.theme.secondaryTextColor)
        },
        "> i": {
          width: "30px",
          height: "24px",
          display: "inline-block",
          mask: "url(".concat(img, ") left center no-repeat"),
          backgroundColor: "".concat(context.theme.secondaryTextColor)
        },
        "> span": {
          fontSize: "13px",
          color: "".concat(props.theme.secondaryTextColor),
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          textAlign: "left",
          width: "calc(100% - 30px)"
        }
      }
    };
  }
  return _objectSpread(_objectSpread({
    margin: "0.5rem",
    textAlign: "center",
    flex: "1 0 auto"
  }, itemTypeStyle), {}, {
    "@for $i from 1 through 36": {
      "&:nth-of-type(#{$i})": {
        maxWidth: "100%"
      }
    }
  });
};
exports.itemStyle = itemStyle;