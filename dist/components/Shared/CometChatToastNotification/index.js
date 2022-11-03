"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatToastNotification = void 0;
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _closeCircleFilled = _interopRequireDefault(require("./resources/close-circle-filled.svg"));
var _checkmarkFilled = _interopRequireDefault(require("./resources/checkmark-filled.svg"));
var _warningFilled = _interopRequireDefault(require("./resources/warning-filled.svg"));
var _infoFilled = _interopRequireDefault(require("./resources/info-filled.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatToastNotification extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "interval", void 0);
    _defineProperty(this, "componentWillUnmount", () => {
      this._isMounted = false;
      this.clearAutoDismiss();
    });
    _defineProperty(this, "setInfo", message => {
      if (this._isMounted) {
        this.setState({
          type: "INFO",
          message: message,
          icon: _infoFilled.default
        });
        this.setAutoDismiss();
      }
    });
    _defineProperty(this, "setError", message => {
      if (this._isMounted) {
        this.setState({
          type: "ERROR",
          message: message,
          icon: _warningFilled.default
        });
        //this.setAutoDismiss();
      }
    });
    _defineProperty(this, "setSuccess", message => {
      if (this._isMounted) {
        this.setState({
          type: "SUCCESS",
          message: message,
          icon: _checkmarkFilled.default
        });
        this.setAutoDismiss();
      }
    });
    _defineProperty(this, "setWarning", message => {
      if (this._isMounted) {
        this.setState({
          type: "WARNING",
          message: message,
          icon: _warningFilled.default
        });
        this.setAutoDismiss();
      }
    });
    _defineProperty(this, "setAutoDismiss", () => {
      this.clearAutoDismiss();
      if (this.props.autoDelete) {
        this.interval = setTimeout(() => this.deleteToast(), this.props.dismissTime);
      }
    });
    _defineProperty(this, "clearAutoDismiss", () => {
      clearTimeout(this.interval);
    });
    _defineProperty(this, "deleteToast", () => {
      this.setState({
        type: "",
        message: "",
        icon: ""
      });
    });
    this._isMounted = false;
    this.state = {
      type: "",
      message: ""
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }
  render() {
    if (!this.state.type.trim().length || !this.state.message.trim().length) {
      return null;
    }
    const messageClassName = "toast__message message-".concat(CometChatToastNotification.types[this.state.type]);
    const iconClassName = "toast__icon icon-".concat(CometChatToastNotification.types[this.state.type]);
    let toastIcon = this.state.icon.trim().length ? (0, _react2.jsx)("div", {
      css: (0, _style.notificationIconStyle)(),
      className: iconClassName
    }, (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(this.state.icon, this.props.theme),
      title: _translator.default.translate("CLOSE", this.props.lang)
    })) : null;
    return (0, _react2.jsx)("div", {
      css: (0, _style.notificationContainerStyle)(this.props, _react2.keyframes),
      className: "toast__notification"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.notificationStyle)(this.props, this.state),
      className: "toast__container"
    }, toastIcon, (0, _react2.jsx)("div", {
      css: (0, _style.notificationMessageContainerStyle)(),
      className: messageClassName
    }, (0, _react2.jsx)("p", {
      css: (0, _style.notificationMessageStyle)()
    }, _translator.default.translate(this.state.message, this.props.lang))), (0, _react2.jsx)("button", {
      css: (0, _style.notificationCloseButtonStyle)(),
      type: "button",
      onClick: this.deleteToast,
      className: "toast__close"
    }, (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(_closeCircleFilled.default, this.props.theme),
      title: _translator.default.translate("CLOSE", this.props.lang)
    }))));
  }
}
exports.CometChatToastNotification = CometChatToastNotification;
_defineProperty(CometChatToastNotification, "types", {
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error"
});
CometChatToastNotification.defaultProps = {
  type: "",
  message: "",
  icon: "",
  position: "center",
  autoDelete: true,
  dismissTime: 3000,
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatToastNotification.propTypes = {
  type: _propTypes.default.oneOf(Object.values(CometChatToastNotification.types).concat("")),
  message: _propTypes.default.string.isRequired,
  icon: _propTypes.default.string.isRequired,
  position: _propTypes.default.oneOf(["top-right", "bottom-right", "top-left", "bottom-left", "center"]),
  autoDelete: _propTypes.default.bool,
  dismissTime: _propTypes.default.number,
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};