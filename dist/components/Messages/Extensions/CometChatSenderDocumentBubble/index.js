"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderDocumentBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("../..");
var _2 = require("..");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style = require("./style");
var _collaborativeDocument = _interopRequireDefault(require("./resources/collaborative-document.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatSenderDocumentBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "launchCollaborativeDocument", () => {
      let documentUrl = null;
      let documentData = (0, _common.checkMessageForExtensionsData)(this.props.message, "document");
      if (documentData && documentData.hasOwnProperty("document_url") && documentData.document_url.length) {
        documentUrl = documentData.document_url;
        window.open(documentUrl, "", "fullscreen=yes, scrollbars=auto");
      }
    });
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    this.state = {
      isHovering: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);
    if (currentMessageStr !== nextMessageStr || this.state.isHovering !== nextState.isHovering) {
      return true;
    }
    return false;
  }
  render() {
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (0, _react2.jsx)("div", {
          css: (0, _style.messageReactionsWrapperStyle)(),
          className: "message__reaction__wrapper"
        }, (0, _react2.jsx)(_2.CometChatMessageReactions, {
          message: this.props.message,
          actionGenerated: this.props.actionGenerated
        }));
      }
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (0, _react2.jsx)(_.CometChatMessageActions, {
        message: this.props.message,
        actionGenerated: this.props.actionGenerated
      });
    }
    const documentTitle = _translator.default.translate("CREATED_DOCUMENT", this.context.language);
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "sender__message__container message__document",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, (0, _react2.jsx)("div", {
      css: (0, _style.messageWrapperStyle)(),
      className: "message__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtWrapperStyle)(this.context),
      className: "message__document__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtContainerStyle)(),
      className: "message__document__container"
    }, (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(_collaborativeDocument.default, this.context),
      title: _translator.default.translate("COLLABORATIVE_DOCUMENT", this.context.language)
    }), (0, _react2.jsx)("p", {
      css: (0, _style.messageTxtStyle)(),
      className: "document__title"
    }, documentTitle)), (0, _react2.jsx)("ul", {
      css: (0, _style.messageBtnStyle)(this.context),
      className: "document__button"
    }, (0, _react2.jsx)("li", {
      onClick: this.launchCollaborativeDocument
    }, (0, _react2.jsx)("p", null, _translator.default.translate("LAUNCH", this.context.language)))))), messageReactions, (0, _react2.jsx)("div", {
      css: (0, _style.messageInfoWrapperStyle)(),
      className: "message__info__wrapper"
    }, (0, _react2.jsx)(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    }), (0, _react2.jsx)(_.CometChatReadReceipt, {
      message: this.props.message
    })));
  }
}

// Specifies the default values for props:
exports.CometChatSenderDocumentBubble = CometChatSenderDocumentBubble;
_defineProperty(CometChatSenderDocumentBubble, "contextType", _CometChatContext.CometChatContext);
CometChatSenderDocumentBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatSenderDocumentBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};