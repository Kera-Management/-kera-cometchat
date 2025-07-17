"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatLinkPreview = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _common = require("../../../util/common");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatLinkPreview extends _react.default.PureComponent {
  render() {
    const linkPreviewData = (0, _common.checkMessageForExtensionsData)(this.props.message, "link-preview");
    const linkObject = linkPreviewData["links"][0];
    const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
    const linkText = linkObject["url"].match(pattern) ? _translator.default.translate("VIEW_ON_YOUTUBE", this.context.language) : _translator.default.translate("VISIT", this.context.language);
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "message__preview",
      display: "inline-block",
      borderRadius: "12px",
      backgroundColor: this.context.theme.backgroundColor.white,
      boxShadow: "0px 1px 2px 1px rgba(0,0,0,0.18)",
      alignSelf: "flex-start",
      width: "auto"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "preview__card",
      direction: "column"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "card__image",
      sx: {
        background: "url(".concat(linkObject["image"], ") no-repeat center center"),
        backgroundSize: "contain"
      },
      height: "150px",
      margin: "12px 0"
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "card__info",
      borderTop: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
      padding: 4
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "card__title",
      mb: 2
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      textAlign: "left",
      width: "auto",
      color: this.context.theme.color.helpText,
      fontWeight: "700"
    }, linkObject["title"])), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "card__desc"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      textAlign: "left",
      width: "auto",
      color: this.context.theme.color.helpText,
      fontStyle: "italic",
      fontSize: "13px"
    }, linkObject["description"])), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "card__text",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      textAlign: "left",
      width: "auto",
      sx: {
        ".message__txt__wrapper": {
          backgroundColor: "transparent",
          color: this.context.theme.color.helpText,
          fontStyle: "normal",
          padding: "8px 0"
        }
      }
    }, this.props.messageText)), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "card__link",
      alignItems: "center",
      justifyContent: "center",
      padding: 3
    }, /*#__PURE__*/_react.default.createElement(_react2.Link, {
      href: linkObject["url"],
      target: "_blank",
      rel: "noopener noreferrer",
      display: "inline-block",
      color: this.context.theme.color.blue,
      fontWeight: "700"
    }, linkText))));
  }
}

// Specifies the default values for props:
exports.CometChatLinkPreview = CometChatLinkPreview;
_defineProperty(CometChatLinkPreview, "contextType", _CometChatContext.CometChatContext);
CometChatLinkPreview.defaultProps = {
  theme: _theme.theme
};
CometChatLinkPreview.propTypes = {
  theme: _propTypes.default.object,
  message: _propTypes.default.object.isRequired
};