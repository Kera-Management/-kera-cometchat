"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConfirmDialog = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _ = require("..");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CometChatConfirmDialog extends _react.default.Component {
  render() {
    var _this$props, _this$props2, _this$props3;
    const confirmButtonText = (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.confirmButtonText ? this.props.confirmButtonText : _translator.default.translate("YES", this.props.lang || _translator.default.getDefaultLanguage());
    const cancelButtonText = (_this$props2 = this.props) !== null && _this$props2 !== void 0 && _this$props2.cancelButtonText ? this.props.cancelButtonText : _translator.default.translate("NO", this.props.lang || _translator.default.getDefaultLanguage());
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_.CometChatBackdrop, {
      show: true,
      style: {
        position: "absolute"
      },
      clicked: this.props.close
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "confirm__dialog",
      width: "calc(100% - 32px)",
      height: "auto",
      backgroundColor: this.props.theme.backgroundColor.white,
      position: "absolute",
      margin: "0 auto",
      padding: "16px",
      fontSize: "13px",
      borderRadius: "8px",
      border: "1px solid #eee",
      zIndex: "4",
      top: "50%",
      left: "0",
      right: "0",
      transform: "translateY(-50%)"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      className: "confirm__message",
      textAlign: "center"
    }, (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.message), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "confirm__buttons",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: "24px 0 0 0"
    }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
      type: "button",
      value: "no",
      onClick: this.props.onClick,
      padding: "5px 24px",
      margin: "0 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
      border: "1px solid ".concat(this.props.theme.primaryColor),
      backgroundColor: this.props.theme.backgroundColor.secondary,
      _hover: {
        backgroundColor: this.props.theme.backgroundColor.secondary
      }
    }, cancelButtonText), /*#__PURE__*/_react.default.createElement(_react2.Button, {
      type: "button",
      value: "yes",
      onClick: this.props.onClick,
      padding: "5px 24px",
      margin: "0 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
      border: "1px solid ".concat(this.props.theme.primaryColor),
      backgroundColor: this.props.theme.primaryColor,
      color: this.props.theme.color.white,
      _hover: {
        backgroundColor: this.props.theme.primaryColor
      }
    }, confirmButtonText))));
  }
}
exports.CometChatConfirmDialog = CometChatConfirmDialog;