"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatLinkPreview = void 0;
require("core-js/modules/es6.regexp.match.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _common = require("../../../util/common");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatLinkPreview extends _react.default.PureComponent {
  render() {
    const linkPreviewData = (0, _common.checkMessageForExtensionsData)(this.props.message, "link-preview");
    const linkObject = linkPreviewData["links"][0];
    const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
    const linkText = linkObject["url"].match(pattern) ? _translator.default.translate("VIEW_ON_YOUTUBE", this.context.language) : _translator.default.translate("VISIT", this.context.language);
    return (0, _react2.jsx)("div", {
      css: (0, _style.messagePreviewContainerStyle)(this.context),
      className: "message__preview"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messagePreviewWrapperStyle)(),
      className: "preview__card"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.previewImageStyle)(linkObject["image"]),
      className: "card__image"
    }), (0, _react2.jsx)("div", {
      css: (0, _style.previewDataStyle)(this.context),
      className: "card__info"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.previewTitleStyle)(this.context),
      className: "card__title"
    }, (0, _react2.jsx)("span", null, linkObject["title"])), (0, _react2.jsx)("div", {
      css: (0, _style.previewDescStyle)(this.context),
      className: "card__desc"
    }, (0, _react2.jsx)("span", null, linkObject["description"])), (0, _react2.jsx)("div", {
      css: (0, _style.previewTextStyle)(this.context),
      className: "card__text"
    }, this.props.messageText)), (0, _react2.jsx)("div", {
      css: (0, _style.previewLinkStyle)(this.context),
      className: "card__link"
    }, (0, _react2.jsx)("a", {
      href: linkObject["url"],
      target: "_blank",
      rel: "noopener noreferrer"
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