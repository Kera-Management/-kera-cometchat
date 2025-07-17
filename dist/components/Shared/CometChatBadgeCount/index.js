"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBadgeCount = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _theme = require("../../../resources/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatBadgeCount = props => {
  let badgeCount = null;
  if (props.count) {
    badgeCount = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "span",
      display: "block",
      fontSize: "12px",
      width: "auto",
      height: "18px",
      borderRadius: "16px",
      backgroundColor: props.theme.primaryColor,
      color: props.theme.color.white,
      textAlign: "center",
      fontWeight: "700",
      lineHeight: "18px",
      marginLeft: "4px",
      padding: "0 9px",
      marginRight: "2px",
      opacity: "1",
      transition: "opacity .1s",
      className: "unread-count"
    }, props.count);
  }
  return badgeCount;
};

// Specifies the default values for props:
exports.CometChatBadgeCount = CometChatBadgeCount;
CometChatBadgeCount.defaultProps = {
  count: 0,
  theme: _theme.theme
};
CometChatBadgeCount.propTypes = {
  count: _propTypes.default.number,
  theme: _propTypes.default.object
};