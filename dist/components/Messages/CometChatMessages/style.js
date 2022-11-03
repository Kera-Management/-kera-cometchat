"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactionsWrapperStyle = exports.messagePaneUnreadBannerStyle = exports.messagePaneUnreadBannerMessageStyle = exports.messagePaneTopStyle = exports.messagePaneBannerStyle = exports.iconArrowDownStyle = exports.chatWrapperStyle = exports.chatSecondaryStyle = exports.chatContainerStyle = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const chatWrapperStyle = (props, state) => {
  let borderStyle = {};
  if (props._parent.trim().length === 0) {
    if (state.viewdetailscreen || state.threadmessageview) {
      borderStyle = {
        borderLeft: "1px solid ".concat(props.theme.borderColor.primary),
        borderBottom: "1px solid ".concat(props.theme.borderColor.primary)
      };
    } else {
      borderStyle = {
        borderLeft: "1px solid ".concat(props.theme.borderColor.primary),
        borderRight: "1px solid ".concat(props.theme.borderColor.primary),
        borderBottom: "1px solid ".concat(props.theme.borderColor.primary)
      };
    }
  }
  const mq = [...props.theme.breakPoints];
  const secondaryViewWidth = state.threadmessageview || state.viewdetailscreen ? {
    width: "calc(100% - 400px)",
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      width: "100%"
    },
    ["@media ".concat(mq[3], ", ").concat(mq[4])]: {
      width: "0",
      display: "none"
    }
  } : {
    width: "100%"
  };
  return _objectSpread(_objectSpread(_objectSpread({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    position: "relative",
    fontFamily: "".concat(props.theme.fontFamily)
  }, borderStyle), secondaryViewWidth), {}, {
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily),
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
exports.chatWrapperStyle = chatWrapperStyle;
const chatSecondaryStyle = props => {
  const borderStyle = props._parent.trim().length === 0 ? {
    borderRight: "1px solid ".concat(props.theme.borderColor.primary),
    borderBottom: "1px solid ".concat(props.theme.borderColor.primary)
  } : {};
  const mq = [...props.theme.breakPoints];
  return _objectSpread(_objectSpread({
    float: "right",
    borderLeft: "1px solid ".concat(props.theme.borderColor.primary),
    height: "100%",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    order: "3"
  }, borderStyle), {}, {
    ["@media ".concat(mq[1], ", ").concat(mq[2], ", ").concat(mq[3], ", ").concat(mq[4])]: {
      position: "absolute!important",
      right: "0!important",
      top: "0",
      bottom: "0",
      width: "100%!important",
      zIndex: "2",
      backgroundColor: "".concat(props.theme.backgroundColor.white)
    }
  });
};
exports.chatSecondaryStyle = chatSecondaryStyle;
const reactionsWrapperStyle = () => {
  return {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    right: "0",
    zIndex: "2",
    display: "flex",
    justifyContent: "left",
    alignItems: "center"
  };
};
exports.reactionsWrapperStyle = reactionsWrapperStyle;
const messagePaneTopStyle = () => {
  return {
    top: "75px",
    position: "absolute",
    width: "auto",
    right: "auto",
    left: "50%",
    fontWeight: "700",
    zIndex: "200",
    transform: "translateX(-50%)"
  };
};
exports.messagePaneTopStyle = messagePaneTopStyle;
const messagePaneBannerStyle = props => {
  return {
    marginBottom: "0",
    display: "block",
    fontSize: "13px",
    flex: "1",
    background: "".concat(props.theme.color.blue),
    borderRadius: "6px",
    zIndex: 200
  };
};
exports.messagePaneBannerStyle = messagePaneBannerStyle;
const messagePaneUnreadBannerStyle = () => {
  return {
    height: "28px",
    borderRadius: "14px",
    display: "flex",
    flex: "1",
    alignItems: "center"
  };
};
exports.messagePaneUnreadBannerStyle = messagePaneUnreadBannerStyle;
const messagePaneUnreadBannerMessageStyle = props => {
  return {
    padding: "0 16px",
    flex: "1",
    textAlign: "center",
    textShadow: "0 1px rgba(0, 0, 0, .15)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "".concat(props.theme.color.white)
  };
};
exports.messagePaneUnreadBannerMessageStyle = messagePaneUnreadBannerMessageStyle;
const iconArrowDownStyle = () => {
  return {
    position: "relative",
    display: "inline-flex",
    height: "20px",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "8px"
  };
};
exports.iconArrowDownStyle = iconArrowDownStyle;
const chatContainerStyle = () => {
  return {
    display: "flex",
    width: "100%",
    height: "100%"
  };
};
exports.chatContainerStyle = chatContainerStyle;