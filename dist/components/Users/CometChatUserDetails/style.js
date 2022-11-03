"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userThumbnailStyle = exports.userStatusStyle = exports.userPresenceStyle = exports.userNameStyle = exports.userInfoSectionStyle = exports.userDetailStyle = exports.sectionStyle = exports.sectionHeaderStyle = exports.sectionContentStyle = exports.privacySectionStyle = exports.mediaSectionStyle = exports.itemLinkStyle = exports.headerTitleStyle = exports.headerStyle = exports.headerCloseStyle = exports.contentItemStyle = exports.actionSectionStyle = void 0;
var _chat = require("@cometchat-pro/chat");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const userDetailStyle = context => {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    boxSizing: "border-box",
    fontFamily: "".concat(context.theme.fontFamily),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(context.theme.fontFamily)
    }
  };
};
exports.userDetailStyle = userDetailStyle;
const headerStyle = context => {
  return {
    padding: "16px",
    position: "relative",
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "69px"
  };
};
exports.headerStyle = headerStyle;
const headerCloseStyle = (img, context) => {
  const mq = [...context.theme.breakPoints];
  return {
    cursor: "pointer",
    display: "none",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor),
    width: "24px",
    height: "24px",
    ["@media ".concat(mq[1], ", ").concat(mq[2], ", ").concat(mq[3], ", ").concat(mq[4])]: {
      display: "block"
    }
  };
};
exports.headerCloseStyle = headerCloseStyle;
const headerTitleStyle = () => {
  return {
    margin: "0",
    fontWeight: "700",
    fontSize: "20px"
  };
};
exports.headerTitleStyle = headerTitleStyle;
const sectionStyle = () => {
  return {
    margin: "0",
    padding: "16px 16px 0 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  };
};
exports.sectionStyle = sectionStyle;
const actionSectionStyle = context => {
  return {
    width: "100%",
    "> div": {
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "12px"
    },
    ".item__link": {
      color: "".concat(context.theme.color.blue)
    }
  };
};
exports.actionSectionStyle = actionSectionStyle;
const privacySectionStyle = context => {
  return {
    width: "100%",
    "> div": {
      color: "".concat(context.theme.color.red),
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "12px"
    }
  };
};
exports.privacySectionStyle = privacySectionStyle;
const mediaSectionStyle = () => {
  return {
    height: "calc(100% - 255px)",
    width: "100%",
    margin: "0",
    padding: "16px 16px 0 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  };
};
exports.mediaSectionStyle = mediaSectionStyle;
const sectionHeaderStyle = context => {
  return {
    margin: "0",
    width: "100%",
    fontSize: "12px",
    fontWeight: "500!important",
    lineHeight: "20px",
    color: "".concat(context.theme.color.secondary),
    textTransform: "uppercase"
  };
};
exports.sectionHeaderStyle = sectionHeaderStyle;
const sectionContentStyle = () => {
  return {
    width: "100%",
    margin: "6px 0"
  };
};
exports.sectionContentStyle = sectionContentStyle;
const contentItemStyle = () => {
  return {
    "width": 100 % "",
    "&:not(:first-of-type):not(:last-of-type)": {
      padding: "6px 0"
    }
  };
};
exports.contentItemStyle = contentItemStyle;
const itemLinkStyle = context => {
  return {
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: "600",
    display: "inline-block",
    color: "".concat(context.theme.color.red)
  };
};
exports.itemLinkStyle = itemLinkStyle;
const userInfoSectionStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  };
};
exports.userInfoSectionStyle = userInfoSectionStyle;
const userThumbnailStyle = () => {
  return {
    width: "35px",
    height: "35px",
    display: "inline-block",
    flexShrink: "0",
    margin: "0 16px 0 0"
  };
};
exports.userThumbnailStyle = userThumbnailStyle;
const userNameStyle = () => {
  return {
    margin: "0",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "22px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };
};
exports.userNameStyle = userNameStyle;
const userStatusStyle = () => {
  return {
    width: "calc(100% - 50px)"
  };
};
exports.userStatusStyle = userStatusStyle;
const userPresenceStyle = (context, state) => {
  let status = state.status ? state.status.toLowerCase() : "";
  let compareTo = _translator.default.translate(_chat.CometChat.USER_STATUS.ONLINE.toUpperCase(), context.language).toLowerCase();
  status = status === compareTo ? {
    color: "".concat(context.theme.color.blue)
  } : {
    color: "".concat(context.theme.color.helpText)
  };
  return _objectSpread({
    width: "calc(100% - 50px)",
    textTransform: "capitalize",
    fontSize: "13px",
    fontWeight: "400",
    lineHeight: "20px"
  }, status);
};
exports.userPresenceStyle = userPresenceStyle;