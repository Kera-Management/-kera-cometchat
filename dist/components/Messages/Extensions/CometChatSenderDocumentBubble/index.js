"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderDocumentBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("../..");
var _2 = require("..");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _collaborativeDocument = _interopRequireDefault(require("./resources/collaborative-document.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          display: "flex",
          alignSelf: "flex-end",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-end",
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
    const documentTitle = _translator.default.translate("CREATED_DOCUMENT", this.context.language);
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-end",
      marginBottom: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      maxWidth: "305px",
      clear: "both",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      className: "sender__message__container message__document",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-end",
      display: "flex",
      className: "message__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      borderRadius: "12px",
      backgroundColor: this.context.theme.backgroundColor.blue,
      padding: "8px 12px",
      alignSelf: "flex-end",
      width: "100%",
      className: "message__document__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      className: "message__document__container"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "i",
      width: "24px",
      height: "24px",
      margin: "0 12px 0 0",
      sx: {
        mask: "url(".concat(_collaborativeDocument.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.color.white
      },
      title: _translator.default.translate("COLLABORATIVE_DOCUMENT", this.context.language)
    }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "14px",
      fontWeight: "500",
      margin: "0",
      color: this.context.theme.color.white,
      className: "document__title"
    }, documentTitle)), /*#__PURE__*/_react.default.createElement(_react2.UnorderedList, {
      listStyleType: "none",
      margin: "0",
      padding: "0",
      className: "document__button",
      sx: {
        "li": {
          background: this.context.theme.color.white,
          borderRadius: "12px",
          display: "inline-block",
          padding: "8px 12px",
          margin: "5px 0 0 0",
          cursor: "pointer",
          "p": {
            margin: "0",
            fontSize: "14px",
            fontWeight: "500",
            color: this.context.theme.backgroundColor.blue
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
      onClick: this.launchCollaborativeDocument
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, null, _translator.default.translate("LAUNCH", this.context.language)))))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-end",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "4px 8px",
      height: "25px",
      className: "message__info__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    }), /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
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