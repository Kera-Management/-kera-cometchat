"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listStyle = exports.getListStyle = exports.emojiTabLsitStyle = exports.emojiListStyle = exports.emojiContainerStyle = exports.emojiCategoryWrapper = exports.emojiCategoryTitle = void 0;
const emojiContainerStyle = props => {
  var _props$style;
  return {
    padding: "0px",
    overflowY: "scroll",
    position: "relative",
    width: props.style.width,
    height: props.style.height,
    background: props === null || props === void 0 ? void 0 : (_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.background,
    boxShadow: "0px 0px 10px #ddd",
    zIndex: "9"
  };
};
exports.emojiContainerStyle = emojiContainerStyle;
const emojiListStyle = () => {
  return {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  };
};
exports.emojiListStyle = emojiListStyle;
const emojiCategoryWrapper = () => {
  return {
    justifyContent: "center",
    alignItems: "center"
  };
};
exports.emojiCategoryWrapper = emojiCategoryWrapper;
const emojiCategoryTitle = props => {
  return {
    textAlign: "left",
    paddingLeft: "16px",
    paddingTop: "8px",
    font: props.style.sectionHeaderFont,
    color: props.style.sectionHeaderColor
  };
};
exports.emojiCategoryTitle = emojiCategoryTitle;
const emojiTabLsitStyle = props => {
  var _props$style2;
  return {
    width: "100%",
    zIndex: "9",
    display: "flex",
    flexWrap: "wrap",
    padding: "15px 8px",
    position: "sticky",
    bottom: "0px",
    alignItems: "center",
    justifyContent: "space-around",
    background: props === null || props === void 0 ? void 0 : (_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.background
  };
};

/**Child props style */
exports.emojiTabLsitStyle = emojiTabLsitStyle;
const getListStyle = () => {
  return {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    iconTint: "#3399ff",
    iconBackground: "rgba(20, 20, 20, 0.58)"
  };
};
exports.getListStyle = getListStyle;
const listStyle = props => {
  var _props$style3;
  return {
    padding: "10px",
    display: "flex",
    cursor: "pointer",
    borderRadius: "3px",
    alignItems: "center",
    justifyContent: "center",
    textFont: "700 22px Inter,sand-serif",
    background: (_props$style3 = props.style) === null || _props$style3 === void 0 ? void 0 : _props$style3.background
  };
};
exports.listStyle = listStyle;