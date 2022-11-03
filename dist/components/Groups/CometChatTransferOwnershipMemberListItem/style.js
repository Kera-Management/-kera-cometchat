"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectionColumnStyle = exports.selectionBoxStyle = exports.nameStyle = exports.modalRowStyle = exports.modalColumnStyle = exports.avatarStyle = void 0;
const modalRowStyle = (props, context) => {
  return {
    display: "flex",
    width: "100%",
    fontSize: "14px",
    padding: "8px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderLeft: "1px solid ".concat(context.theme.borderColor.primary),
    borderRight: "1px solid ".concat(context.theme.borderColor.primary),
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary)
  };
};
exports.modalRowStyle = modalRowStyle;
const modalColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "calc(100% - 180px)",
    [mq[1]]: {
      width: "calc(100% - 140px)"
    },
    [mq[2]]: {
      width: "calc(100% - 180px)"
    },
    [mq[3]]: {
      width: "calc(100% - 120px)"
    }
  };
};
exports.modalColumnStyle = modalColumnStyle;
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
    margin: "10px",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };
};
exports.nameStyle = nameStyle;
const selectionColumnStyle = context => {
  const mq = context.theme.breakPoints.map(x => "@media ".concat(x));
  return {
    width: "180px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "span": {
      fontSize: "12px",
      display: "block",
      paddingRight: "8px"
    },
    [mq[1]]: {
      width: "140px"
    },
    [mq[2]]: {
      width: "180px"
    },
    [mq[3]]: {
      width: "120px"
    }
  };
};
exports.selectionColumnStyle = selectionColumnStyle;
const selectionBoxStyle = (inactiveStateImg, activeStateImg, context) => {
  return {
    display: "none",
    " + label": {
      display: "block",
      cursor: "pointer",
      mask: "url(".concat(inactiveStateImg, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor),
      userSelect: "none",
      padding: "8px"
    },
    "&:checked + label": {
      mask: "url(".concat(activeStateImg, ") center center no-repeat"),
      backgroundColor: "".concat(context.theme.secondaryTextColor),
      padding: "8px"
    }
  };
};
exports.selectionBoxStyle = selectionBoxStyle;