"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatErrorBoundary = void 0;
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
      return (0, _react2.jsx)("div", {
        css: (0, _style.errorContainerStyle)()
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