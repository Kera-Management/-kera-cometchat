"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverAudioMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Extensions = require("../Extensions");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var _theme = require("../../../resources/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatReceiverAudioMessageBubble extends _react.default.Component {
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
        className: "message__thumbnail",
        width: "36px",
        height: "36px",
        margin: "10px 5px",
        float: "left",
        flexShrink: "0"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.props.message.sender
      }));
      name = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "message__name__wrapper",
        alignSelf: "flex-start",
        padding: avatar ? "3px 5px" : "0"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        as: "span",
        className: "message__name",
        fontSize: "11px",
        color: this.context.theme.color.search
      }, this.props.message.sender.name));
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          className: "message__reaction__wrapper",
          display: "flex",
          alignSelf: "flex-start",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          minHeight: "36px"
        }, /*#__PURE__*/_react.default.createElement(_Extensions.CometChatMessageReactions, {
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
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "receiver__message__container message__audio",
      alignSelf: "flex-start",
      marginBottom: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      maxWidth: "65%",
      clear: "both",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__wrapper",
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex"
    }, avatar, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__details",
      flex: "1 1",
      display: "flex",
      flexDirection: "column"
    }, name, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__audio__container",
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "message__audio__wrapper",
      display: "inline-block",
      borderRadius: "12px",
      alignSelf: "flex-start",
      sx: {
        "> audio": {
          maxWidth: "250px",
          display: "inherit",
          outline: "none"
        }
      }
    }, /*#__PURE__*/_react.default.createElement("audio", {
      controls: true
    }, /*#__PURE__*/_react.default.createElement("source", {
      src: this.props.message.data.attachments[0].url
    })))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__info__wrapper",
      alignSelf: "flex-start",
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "25px"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
      message: this.props.message
    }), /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    })))));
  }
}

// Specifies the default values for props:
exports.CometChatReceiverAudioMessageBubble = CometChatReceiverAudioMessageBubble;
_defineProperty(CometChatReceiverAudioMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverAudioMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverAudioMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};