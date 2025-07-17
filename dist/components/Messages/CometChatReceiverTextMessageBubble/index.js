"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverTextMessageBubble = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Shared = require("../../Shared");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatReceiverTextMessageBubble = props => {
  const {
    message,
    messageText
  } = props;
  const sender = (message === null || message === void 0 ? void 0 : message.sender) || {};
  const senderName = sender.name || "Unknown";
  return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
    align: "flex-start",
    justify: "flex-start",
    mb: 3,
    maxW: "80%"
  }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
    user: sender,
    size: "sm"
  }), /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    align: "flex-start",
    spacing: 1,
    ml: 3
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "xs",
    color: "gray.600",
    fontWeight: "medium"
  }, senderName), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    bg: "gray.100",
    borderRadius: "lg",
    borderBottomLeftRadius: "sm",
    px: 3,
    py: 2,
    maxW: "300px",
    wordBreak: "break-word"
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "sm",
    color: "gray.800"
  }, messageText || (message === null || message === void 0 ? void 0 : message.text) || "")), (message === null || message === void 0 ? void 0 : message.sentAt) && /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "xs",
    color: "gray.500"
  }, new Date(message.sentAt * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }))));
};
exports.CometChatReceiverTextMessageBubble = CometChatReceiverTextMessageBubble;
CometChatReceiverTextMessageBubble.defaultProps = {
  message: {},
  messageText: ""
};
CometChatReceiverTextMessageBubble.propTypes = {
  message: _propTypes.default.object,
  messageText: _propTypes.default.string
};