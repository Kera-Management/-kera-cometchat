"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSmartReplyPreview = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _react = require("react");
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CometChatContext = require("../../../../util/CometChatContext");
var _theme = require("../../../../resources/theme");
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatSmartReplyPreview = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  const slideAnimation = "\n    @keyframes slide {\n      from {\n        bottom: -55px;\n      }\n      to {\n        bottom: 0px;\n      }\n    }\n  ";
  const options = props.options.map((option, key) => {
    return /*#__PURE__*/React.createElement(_react2.Box, {
      key: key,
      className: "option",
      onClick: () => props.clicked(option),
      padding: "8px",
      margin: "0 8px",
      backgroundColor: context.theme.backgroundColor.grey,
      border: "1px solid ".concat(context.theme.borderColor.primary),
      borderRadius: "10px",
      cursor: "pointer",
      height: "100%",
      textAlign: "center"
    }, option);
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, slideAnimation), /*#__PURE__*/React.createElement(_react2.Box, {
    className: "reply__preview__wrapper",
    padding: "8px 8px 16px 8px",
    marginBottom: "-8px",
    backgroundColor: context.theme.backgroundColor.white,
    border: "1px solid ".concat(context.theme.borderColor.primary),
    fontSize: "13px",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    animation: "slide 0.5s ease-out",
    position: "relative"
  }, /*#__PURE__*/React.createElement(_react2.Box, {
    className: "preview__heading",
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
  }, /*#__PURE__*/React.createElement(_react2.Box, {
    className: "preview__close",
    onClick: props.close,
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundImage: "url(".concat(_close.default, ")"),
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundColor: context.theme.primaryColor,
    cursor: "pointer",
    sx: {
      mask: "url(".concat(_close.default, ") center center no-repeat"),
      WebkitMask: "url(".concat(_close.default, ") center center no-repeat")
    }
  })), /*#__PURE__*/React.createElement(_react2.Flex, {
    className: "preview__options",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%"
  }, options)));
};

// Specifies the default values for props:
exports.CometChatSmartReplyPreview = CometChatSmartReplyPreview;
CometChatSmartReplyPreview.defaultProps = {
  theme: _theme.theme
};
CometChatSmartReplyPreview.propTypes = {
  theme: _propTypes.default.object
};