"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatToastNotification = void 0;
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _closeCircleFilled = _interopRequireDefault(require("./resources/close-circle-filled.svg"));
var _checkmarkFilled = _interopRequireDefault(require("./resources/checkmark-filled.svg"));
var _warningFilled = _interopRequireDefault(require("./resources/warning-filled.svg"));
var _infoFilled = _interopRequireDefault(require("./resources/info-filled.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    const getBackgroundColor = () => {
      switch (this.state.type) {
        case "ERROR":
          return "#d9534f";
        case "SUCCESS":
          return "#5cb85c";
        case "INFO":
          return "#5bc0de";
        case "WARNING":
          return "#f0ad4e";
        default:
          return "#000";
      }
    };
    let toastIcon = this.state.icon.trim().length ? /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: iconClassName,
      marginRight: "16px",
      width: "25px",
      height: "25px",
      flexShrink: "0",
      sx: {
        img: {
          maxWidth: "100%"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "i",
      title: _translator.default.translate("CLOSE", this.props.lang),
      width: "24px",
      height: "24px",
      display: "inline-block",
      sx: {
        mask: "url(".concat(this.state.icon, ") center center no-repeat"),
        backgroundColor: this.props.theme.color.white
      }
    })) : null;
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "toast__notification",
      fontSize: "14px",
      boxSizing: "border-box",
      position: "absolute",
      zIndex: "5",
      width: "80%",
      maxWidth: "320px",
      top: "70px",
      left: "50%",
      transform: "translate(-50%, 0)"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "toast__container",
      transition: ".3s ease",
      position: "relative",
      pointerEvents: "auto",
      overflow: "hidden",
      padding: "8px",
      marginBottom: "16px",
      fontSize: "13px",
      width: "100%",
      minHeight: "50px",
      boxShadow: "0 0 10px #999",
      color: "#fff",
      backgroundColor: getBackgroundColor(),
      backgroundPosition: "15px",
      backgroundRepeat: "no-repeat",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      boxSizing: "border-box"
    }, toastIcon, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: messageClassName,
      width: "calc(100% - 60px)"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      margin: "0",
      textAlign: "left",
      marginLeft: "-1px"
    }, _translator.default.translate(this.state.message, this.props.lang))), /*#__PURE__*/_react.default.createElement(_react2.Button, {
      className: "toast__close",
      type: "button",
      onClick: this.deleteToast,
      width: "25px",
      height: "25px",
      padding: "0",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      sx: {
        img: {
          flexShrink: "0",
          maxWidth: "100%"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "i",
      title: _translator.default.translate("CLOSE", this.props.lang),
      width: "24px",
      height: "24px",
      display: "inline-block",
      sx: {
        mask: "url(".concat(_closeCircleFilled.default, ") center center no-repeat"),
        backgroundColor: this.props.theme.color.white
      }
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