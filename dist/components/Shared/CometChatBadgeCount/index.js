"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBadgeCount = void 0;
var _react = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatBadgeCount = props => {
  let badgeCount = null;
  if (props.count) {
    badgeCount = (0, _react.jsx)("span", {
      css: (0, _style.badgeStyle)(props),
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