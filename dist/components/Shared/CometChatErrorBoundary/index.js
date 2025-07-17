"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatErrorBoundary = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatErrorBoundary extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "logErrorToMyService", console.log);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return /*#__PURE__*/_react.default.createElement(_react2.Box, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "auto",
        padding: "16px",
        zIndex: "2",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F35051",
        color: "#fff"
      }, _translator.default.translate("USER_NOT_LOGGED_IN", this.props.lang));
    }
    return this.props.children;
  }
}
exports.CometChatErrorBoundary = CometChatErrorBoundary;
CometChatErrorBoundary.defaultProps = {
  lang: _translator.default.getDefaultLanguage()
};
CometChatErrorBoundary.propTypes = {
  lang: _propTypes.default.string
};