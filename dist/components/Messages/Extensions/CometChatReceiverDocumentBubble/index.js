"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverDocumentBubble = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("../..");
var _2 = require("..");
var _Shared = require("../../../Shared");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _collaborativeDocument = _interopRequireDefault(require("./resources/collaborative-document.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatReceiverDocumentBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    _defineProperty(this, "launchCollaborativeDocument", () => {
      let documentUrl = null;
      let documentData = (0, _common.checkMessageForExtensionsData)(this.props.message, "document");
      if (documentData && documentData.hasOwnProperty("document_url") && documentData.document_url.length) {
        documentUrl = documentData.document_url;
        window.open(documentUrl, "", "fullscreen=yes, scrollbars=auto");
      }
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
    let avatar = null,
      name = null;
    if (this.props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
      avatar = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        width: "36px",
        height: "36px",
        margin: "10px 5px",
        float: "left",
        flexShrink: "0",
        className: "message__thumbnail"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.props.message.sender
      }));
      name = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        alignSelf: "flex-start",
        padding: "3px 5px",
        className: "message__name__wrapper"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        as: "span",
        fontSize: "11px",
        color: this.context.theme.color.search,
        className: "message__name"
      }, this.props.message.sender.name));
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          display: "flex",
          alignSelf: "flex-start",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          minHeight: "36px",
          className: "message__reaction__wrapper"
        }, /*#__PURE__*/_react.default.createElement(_2.CometChatMessageReactions, {
          message: this.props.message,
          actionGenerated: this.props.actionGenerated
        }));
      }
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = /*#__PURE__*/_react.default.createElement(_.CometChatMessageActions, {
        message: this.props.message,
        actionGenerated: this.props.actionGenerated
      });
    }
    const documentTitle = "".concat(this.props.message.sender.name, " ").concat(_translator.default.translate("SHARED_COLLABORATIVE_DOCUMENT", this.context.language));
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-start",
      marginBottom: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      maxWidth: "305px",
      clear: "both",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      className: "receiver__message__container message__document",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex",
      className: "message__wrapper"
    }, avatar, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flex: "1 1",
      display: "flex",
      flexDirection: "column",
      className: "message__details"
    }, name, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex",
      className: "message__document__container"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      borderRadius: "12px",
      backgroundColor: this.context.theme.backgroundColor.secondary,
      padding: "8px 12px",
      alignSelf: "flex-start",
      width: "100%",
      className: "message__document__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      className: "message__document__title"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "i",
      width: "24px",
      height: "24px",
      margin: "0 12px 0 0",
      sx: {
        mask: "url(".concat(_collaborativeDocument.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      },
      title: _translator.default.translate("COLLABORATIVE_DOCUMENT", this.context.language)
    }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "14px",
      fontWeight: "500",
      margin: "0",
      className: "document__title"
    }, documentTitle)), /*#__PURE__*/_react.default.createElement(_react2.UnorderedList, {
      listStyleType: "none",
      margin: "0",
      padding: "0",
      className: "document__button",
      sx: {
        "li": {
          background: this.context.theme.primaryColor,
          borderRadius: "12px",
          display: "inline-block",
          padding: "8px 12px",
          margin: "5px 0 0 0",
          cursor: "pointer",
          "p": {
            margin: "0",
            fontSize: "14px",
            fontWeight: "500",
            color: this.context.theme.color.white
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
      onClick: this.launchCollaborativeDocument
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, null, _translator.default.translate("JOIN", this.context.language)))))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-start",
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "25px",
      className: "message__info__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
      message: this.props.message
    }), /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    })))));
  }
}

// Specifies the default values for props:
exports.CometChatReceiverDocumentBubble = CometChatReceiverDocumentBubble;
_defineProperty(CometChatReceiverDocumentBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverDocumentBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverDocumentBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};