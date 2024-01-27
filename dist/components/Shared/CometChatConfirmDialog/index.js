"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConfirmDialog = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _ = require("../");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

class CometChatConfirmDialog extends _react.default.Component {
  render() {
    var _this$props, _this$props2, _this$props3;
    const confirmButtonText = (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.confirmButtonText ? this.props.confirmButtonText : _translator.default.translate("YES", this.context.language);
    const cancelButtonText = (_this$props2 = this.props) !== null && _this$props2 !== void 0 && _this$props2.cancelButtonText ? this.props.cancelButtonText : _translator.default.translate("NO", this.getContext().language);
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_.CometChatBackdrop, {
      show: true,
      style: {
        position: "absolute"
      },
      clicked: this.props.close
    }), (0, _react2.jsx)("div", {
      className: "confirm__dialog",
      css: (0, _style.alertWrapperStyle)(this.props)
    }, (0, _react2.jsx)("div", {
      className: "confirm__message",
      css: (0, _style.alertMessageStyle)(this.props)
    }, (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.message), (0, _react2.jsx)("div", {
      className: "confirm__buttons",
      css: (0, _style.alertButtonStyle)(this.props)
    }, (0, _react2.jsx)("button", {
      type: "button",
      value: "no",
      onClick: this.props.onClick
    }, cancelButtonText), (0, _react2.jsx)("button", {
      type: "button",
      value: "yes",
      onClick: this.props.onClick
    }, confirmButtonText))));
  }
}
exports.CometChatConfirmDialog = CometChatConfirmDialog;