"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectionColumnStyle = exports.selectionBoxStyle = exports.nameStyle = exports.modalRowStyle = exports.modalColumnStyle = exports.avatarStyle = void 0;
const modalRowStyle = theme => {
  return {
    border: "1px solid ".concat(theme.borderColor.primary),
    display: "flex",
    width: "100%",
    fontSize: "14px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    "&:not(:last-child)": {
      borderBottom: "none"
    }
  };
};
exports.modalRowStyle = modalRowStyle;
const modalColumnStyle = () => {
  return {
    padding: "8px",
    width: "calc(100% - 50px)"
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
const selectionColumnStyle = () => {
  return {
    padding: "8px",
    width: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
};
exports.selectionColumnStyle = selectionColumnStyle;
const selectionBoxStyle = (inactiveStateImg, activeStateImg, theme) => {
  return {
    display: "none",
    " + label": {
      display: "block",
      cursor: "pointer",
      userSelect: "none",
      padding: "8px",
      width: "100%",
      mask: "url(".concat(inactiveStateImg, ") center center no-repeat"),
      backgroundColor: "".concat(theme.secondaryTextColor)
    },
    "&:checked + label": {
      width: "100%",
      mask: "url(".concat(activeStateImg, ") center center no-repeat"),
      backgroundColor: "".concat(theme.secondaryTextColor)
    }
  };
};
exports.selectionBoxStyle = selectionBoxStyle;