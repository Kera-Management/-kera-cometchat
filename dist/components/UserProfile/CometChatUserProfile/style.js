"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userStatusStyle = exports.userNameStyle = exports.userInfoScreenStyle = exports.userDetailStyle = exports.thumbnailStyle = exports.optionsStyle = exports.optionTitleStyle = exports.optionStyle = exports.optionNameStyle = exports.optionListStyle = exports.headerTitleStyle = exports.headerStyle = exports.detailStyle = void 0;
const userInfoScreenStyle = props => {
  return {
    display: "flex",
    flexDirection: "column!important",
    height: "calc(100% - 50px)",
    fontFamily: "".concat(props.theme.fontFamily),
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily)
    }
  };
};
exports.userInfoScreenStyle = userInfoScreenStyle;
const headerStyle = props => {
  return {
    padding: "16px",
    position: "relative",
    borderBottom: "1px solid ".concat(props.theme.borderColor.primary),
    height: "70px",
    display: "flex",
    alignItems: "center"
  };
};
exports.headerStyle = headerStyle;
const headerTitleStyle = () => {
  return {
    margin: "0",
    fontSize: "22px",
    fontWeight: "700",
    lineHeight: "26px"
  };
};
exports.headerTitleStyle = headerTitleStyle;
const detailStyle = () => {
  return {
    padding: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center"
  };
};
exports.detailStyle = detailStyle;
const thumbnailStyle = () => {
  return {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: "0"
  };
};
exports.thumbnailStyle = thumbnailStyle;
const userDetailStyle = () => {
  return {
    width: "calc(100% - 45px)",
    flexGrow: "1",
    paddingLeft: "16px",
    "&[dir=rtl]": {
      paddingRight: "16px",
      paddingLeft: "0"
    }
  };
};
exports.userDetailStyle = userDetailStyle;
const userNameStyle = () => {
  return {
    margin: "0",
    fontSize: "15px",
    fontWeight: "600",
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };
};
exports.userNameStyle = userNameStyle;
const userStatusStyle = props => {
  return {
    fontSize: "13px",
    margin: "0",
    color: "".concat(props.theme.color.blue)
  };
};
exports.userStatusStyle = userStatusStyle;
const optionsStyle = () => {
  return {
    height: "calc(100% - 145px)",
    overflowY: "auto",
    padding: "0 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "flex-start"
  };
};
exports.optionsStyle = optionsStyle;
const optionTitleStyle = props => {
  return {
    margin: "5px 0",
    width: "100%",
    fontSize: "12px",
    color: "".concat(props.theme.color.helpText),
    textTransform: "uppercase"
  };
};
exports.optionTitleStyle = optionTitleStyle;
const optionListStyle = () => {
  return {
    padding: "10px 0",
    width: "100%",
    fontSize: "15px"
  };
};
exports.optionListStyle = optionListStyle;
const optionStyle = img => {
  return {
    width: "100%",
    padding: "16px 16px 16px 36px",
    fontWeight: 600,
    background: "url(".concat(img, ") left center no-repeat")
  };
};
exports.optionStyle = optionStyle;
const optionNameStyle = () => {
  return {
    width: "100%"
  };
};
exports.optionNameStyle = optionNameStyle;