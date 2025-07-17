"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBackdrop = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatBackdrop = props => props.show ? /*#__PURE__*/_react.default.createElement(_react2.Box, {
  zIndex: "3",
  backgroundColor: "#000",
  opacity: ".3",
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  cursor: "pointer",
  transition: "background .3s ease-out 0",
  className: "modal__backdrop",
  onClick: props.clicked,
  sx: props.style
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