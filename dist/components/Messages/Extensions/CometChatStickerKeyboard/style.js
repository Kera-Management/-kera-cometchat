"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stickerWrapperStyle = exports.stickerSectionListStyle = exports.stickerMsgTxtStyle = exports.stickerMsgStyle = exports.stickerListStyle = exports.stickerItemStyle = exports.stickerCloseStyle = exports.sectionListItemStyle = void 0;
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const stickerWrapperStyle = (context, keyframes) => {
  const slideAnimation = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    from {\n        bottom: -55px\n    }\n    to {\n        bottom: 0px\n    }"])));
  return {
    backgroundColor: "".concat(context.theme.backgroundColor.grey),
    border: "1px solid ".concat(context.theme.borderColor.primary),
    borderBottom: "none",
    animation: "".concat(slideAnimation, " 0.5s ease-out"),
    borderRadius: "10px 10px 0 0",
    height: "215px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  };
};
exports.stickerWrapperStyle = stickerWrapperStyle;
const stickerSectionListStyle = context => {
  return {
    borderTop: "1px solid ".concat(context.theme.borderColor.primary),
    backgroundColor: "".concat(context.theme.backgroundColor.silver),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "uppercase",
    overflowX: "auto",
    overflowY: "hidden",
    padding: "10px",
    "::-webkit-scrollbar": {
      background: "".concat(context.theme.backgroundColor.primary)
    },
    "::-webkit-scrollbar-thumb": {
      background: "".concat(context.theme.backgroundColor.silver)
    }
  };
};
exports.stickerSectionListStyle = stickerSectionListStyle;
const sectionListItemStyle = () => {
  return {
    height: "35px",
    width: "35px",
    cursor: "pointer",
    flexShrink: "0",
    ":not(:first-of-type)": {
      marginLeft: "16px"
    }
  };
};
exports.sectionListItemStyle = sectionListItemStyle;
const stickerListStyle = () => {
  return {
    height: "calc(100% - 50px)",
    display: "flex",
    overflowX: "hidden",
    overflowY: "auto",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center"
  };
};
exports.stickerListStyle = stickerListStyle;
const stickerItemStyle = context => {
  const mq = [...context.theme.breakPoints];
  return {
    minWidth: "50px",
    minHeight: "50px",
    maxWidth: "70px",
    maxHeight: "70px",
    cursor: "pointer",
    flexShrink: "0",
    marginRight: "20px",
    ["@media ".concat(mq[1], ", ").concat(mq[2], ", ").concat(mq[3])]: {
      maxWidth: "70px",
      maxHeight: "70px"
    }
  };
};
exports.stickerItemStyle = stickerItemStyle;
const stickerMsgStyle = () => {
  return {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "35%"
  };
};
exports.stickerMsgStyle = stickerMsgStyle;
const stickerMsgTxtStyle = context => {
  return {
    margin: "0",
    height: "30px",
    color: "".concat(context.theme.color.secondary),
    fontSize: "24px!important",
    fontWeight: "600"
  };
};
exports.stickerMsgTxtStyle = stickerMsgTxtStyle;
const stickerCloseStyle = (img, context) => {
  return {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    alignSelf: "flex-end",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.primaryColor),
    cursor: "pointer",
    margin: "8px 8px 0 0"
  };
};
exports.stickerCloseStyle = stickerCloseStyle;