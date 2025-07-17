"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userStyle = exports.roleStyle = exports.nameStyle = exports.modalRowStyle = exports.avatarStyle = exports.actionStyle = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
const modalRowStyle = context => {
  return {
    borderLeft: "1px solid ".concat(context.theme.borderColor.primary),
    borderRight: "1px solid ".concat(context.theme.borderColor.primary),
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    display: "flex",
    width: "100%",
    fontSize: "14px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "8px"
  };
};
exports.modalRowStyle = modalRowStyle;
const userStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "calc(100% - 220px)",
    [mq[0]]: {
      width: "calc(100% - 185px)"
    },
    [mq[1]]: {
      width: "calc(100% - 185px)"
    },
    [mq[2]]: {
      width: "calc(100% - 185px)"
    }
  };
};
exports.userStyle = userStyle;
const avatarStyle = () => {
  return {
    display: "inline-block",
    float: "left",
    width: "36px",
    height: "36px",
    marginRight: "8px"
  };
};
exports.avatarStyle = avatarStyle;
const nameStyle = () => {
  return {
    margin: "10px 0 0 0",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };
};
exports.nameStyle = nameStyle;
const roleStyle = context => {
  const mq = context.theme.breakPoints.map(x => "".concat(x));
  return {
    width: "150px",
    fontSize: "12px",
    ["@media ".concat(mq[1], ", ").concat(mq[2])]: {
      width: "115px"
    }
  };
};
exports.roleStyle = roleStyle;
const actionStyle = (img, context) => {
  return {
    width: "70px",
    "i": {
      width: "24px",
      height: "24px",
      cursor: "pointer",
      mask: "url(".concat(img, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor),
      display: "inline-block"
    }
  };
};
exports.actionStyle = actionStyle;