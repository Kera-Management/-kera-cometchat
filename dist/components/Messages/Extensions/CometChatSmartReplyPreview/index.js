"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSmartReplyPreview = void 0;
var _react = require("react");
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CometChatContext = require("../../../../util/CometChatContext");
var _theme = require("../../../../resources/theme");
var _style = require("./style");
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatSmartReplyPreview = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  const options = props.options.map((option, key) => {
    return (0, _react2.jsx)("div", {
      key: key,
      css: (0, _style.previewOptionStyle)(context),
      className: "option",
      onClick: () => props.clicked(option)
    }, option);
  });
  return (0, _react2.jsx)("div", {
    css: (0, _style.previewWrapperStyle)(context, _react2.keyframes),
    className: "reply__preview__wrapper"
  }, (0, _react2.jsx)("div", {
    css: (0, _style.previewHeadingStyle)(),
    className: "preview__heading"
  }, (0, _react2.jsx)("div", {
    css: (0, _style.previewCloseStyle)(_close.default, context),
    onClick: props.close,
    className: "preview__close"
  })), (0, _react2.jsx)("div", {
    css: (0, _style.previewOptionsWrapperStyle)(),
    className: "preview__options"
  }, options));
};

// Specifies the default values for props:
exports.CometChatSmartReplyPreview = CometChatSmartReplyPreview;
CometChatSmartReplyPreview.defaultProps = {
  theme: _theme.theme
};
CometChatSmartReplyPreview.propTypes = {
  theme: _propTypes.default.object
};