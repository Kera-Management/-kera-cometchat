"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBackdrop = void 0;
var _react = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatBackdrop = props => props.show ? (0, _react.jsx)("div", {
  css: (0, _style.backdropStyle)(props),
  className: "modal__backdrop",
  onClick: props.clicked
}) : null;

// Specifies the default values for props:
exports.CometChatBackdrop = CometChatBackdrop;
CometChatBackdrop.defaultProps = {
  show: false,
  style: {},
  clicked: () => {}
};
CometChatBackdrop.propTypes = {
  show: _propTypes.default.bool,
  style: _propTypes.default.object,
  clicked: _propTypes.default.func
};