"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stickyButtonStyle = exports.stickyAttachmentStyle = exports.stickyAttachButtonStyle = exports.stickerBtnStyle = exports.sendButtonStyle = exports.reactionBtnStyle = exports.previewTextStyle = exports.previewHeadingStyle = exports.previewCloseStyle = exports.messageInputStyle = exports.inputStickyStyle = exports.inputInnerStyle = exports.filePickerStyle = exports.fileListStyle = exports.fileItemStyle = exports.emojiButtonStyle = exports.editPreviewContainerStyle = exports.composerInputStyle = exports.chatComposerStyle = exports.attachmentIconStyle = void 0;
var _templateObject;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
const chatComposerStyle = context => {
  return {
    padding: "16px",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    zIndex: "1",
    order: "3",
    position: "relative",
    flex: "none",
    minHeight: "105px"
  };
};
exports.chatComposerStyle = chatComposerStyle;
const editPreviewContainerStyle = (context, keyframes) => {
  const slideAnimation = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    from {\n        bottom: -60px\n    }\n    to {\n        bottom: 0px\n    }"])));
  return {
    padding: "7px",
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    borderColor: "".concat(context.theme.borderColor.primary),
    borderWidth: "1px 1px 1px 5px",
    borderStyle: "solid",
    color: "".concat(context.theme.color.helpText),
    fontSize: "13px",
    animation: "".concat(slideAnimation, " 0.5s ease-out"),
    position: "relative"
  };
};
exports.editPreviewContainerStyle = editPreviewContainerStyle;
const previewHeadingStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };
};
exports.previewHeadingStyle = previewHeadingStyle;
const previewTextStyle = () => {
  return {
    padding: "5px 0"
  };
};
exports.previewTextStyle = previewTextStyle;
const previewCloseStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    cursor: "pointer",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor)
  };
};
exports.previewCloseStyle = previewCloseStyle;
const composerInputStyle = () => {
  return {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    zIndex: "2",
    padding: "0",
    minHeight: "85px"
  };
};
exports.composerInputStyle = composerInputStyle;
const inputInnerStyle = (props, state, context) => {
  const borderRadiusVal = state.emojiViewer || state.stickerViewer ? {
    borderRadius: "0 0 8px 8px"
  } : {
    borderRadius: "8px"
  };
  return _objectSpread({
    flex: "1 1 auto",
    position: "relative",
    outline: "none",
    border: "1px solid ".concat(context.theme.borderColor.primary),
    backgroundColor: "".concat(context.theme.backgroundColor.white),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "85px"
  }, borderRadiusVal);
};
exports.inputInnerStyle = inputInnerStyle;
const messageInputStyle = disabled => {
  const disabledState = disabled ? {
    pointerEvents: "none",
    opacity: "0.4"
  } : {};
  return _objectSpread(_objectSpread({
    width: "100%",
    fontSize: "15px",
    lineHeight: "20px",
    fontWeight: "400",
    padding: "16px",
    outline: "none",
    overflowX: "hidden",
    overflowY: "auto",
    position: "relative",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    zIndex: "1",
    minHeight: "50px",
    maxHeight: "100px",
    userSelect: "text"
  }, disabledState), {}, {
    '&:empty:before': {
      content: "attr(placeholder)",
      color: "rgb(153, 153, 153)",
      pointerEvents: "none",
      display: "block" /* For Firefox */
    }
  });
};
exports.messageInputStyle = messageInputStyle;
const inputStickyStyle = (disabled, attachments, context) => {
  const disabledState = disabled ? {
    pointerEvents: "none"
  } : {};
  const flexDirectionProp = attachments === null ? {
    flexDirection: "row-reverse"
  } : {};
  return _objectSpread(_objectSpread(_objectSpread({
    padding: "8px 16px",
    // height: "40px",
    borderTop: "1px solid ".concat(context.theme.borderColor.primary),
    backgroundColor: "".concat(context.theme.backgroundColor.grey),
    display: "flex",
    justifyContent: "space-between"
  }, flexDirectionProp), disabledState), {}, {
    '&:empty:before': {
      pointerEvents: "none"
    }
  });
};
exports.inputStickyStyle = inputStickyStyle;
const stickyAttachmentStyle = () => {
  return {
    display: "flex",
    width: "auto"
  };
};
exports.stickyAttachmentStyle = stickyAttachmentStyle;
const attachmentIconStyle = () => {
  return {
    margin: "auto 0",
    width: "24px",
    height: "20px",
    cursor: "pointer"
  };
};
exports.attachmentIconStyle = attachmentIconStyle;
const filePickerStyle = state => {
  const active = state.showFilePicker ? {
    width: "calc(100% - 20px)",
    opacity: "1"
  } : {};
  return _objectSpread({
    width: "0",
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: "1",
    opacity: "0",
    transition: "width 0.5s linear"
  }, active);
};
exports.filePickerStyle = filePickerStyle;
const fileListStyle = () => {
  return {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 0 0 16px"
  };
};
exports.fileListStyle = fileListStyle;
const fileItemStyle = (img, context) => {
  return {
    height: "24px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 16px 0 0",
    " > i": {
      width: "24px",
      height: "24px",
      display: "inline-block",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor)
    },
    ' > input': {
      display: "none"
    }
  };
};
exports.fileItemStyle = fileItemStyle;
const stickyAttachButtonStyle = (img, context) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "24px",
    "i": {
      width: "24px",
      height: "24px",
      display: "inline-block",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor)
    }
  };
};
exports.stickyAttachButtonStyle = stickyAttachButtonStyle;
const stickyButtonStyle = state => {
  const active = state.showFilePicker ? {
    display: "none"
  } : {
    display: "flex"
  };
  return _objectSpread({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "auto"
  }, active);
};
exports.stickyButtonStyle = stickyButtonStyle;
const emojiButtonStyle = (img, context) => {
  return {
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 0 0 16px",
    "i": {
      width: "24px",
      height: "24px",
      display: "inline-block",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor)
    }
  };
};
exports.emojiButtonStyle = emojiButtonStyle;
const sendButtonStyle = (img, context) => {
  return {
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 0 0 16px",
    "i": {
      width: "24px",
      height: "24px",
      display: "inline-block",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.primaryColor)
    }
  };
};
exports.sendButtonStyle = sendButtonStyle;
const reactionBtnStyle = () => {
  return {
    cursor: "pointer",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 0 0 16px"
  };
};
exports.reactionBtnStyle = reactionBtnStyle;
const stickerBtnStyle = (img, context) => {
  return {
    cursor: "pointer",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 0 0 16px",
    "i": {
      width: "24px",
      height: "24px",
      display: "inline-block",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor)
    }
  };
};
exports.stickerBtnStyle = stickerBtnStyle;