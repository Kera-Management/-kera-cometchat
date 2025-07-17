"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverWhiteboardBubble = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _ = require("../..");
var _2 = require("..");
var _Shared = require("../../../Shared");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _collaborativeWhiteboard = _interopRequireDefault(require("./resources/collaborative-whiteboard.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Removed emotion styles - now using Chakra UI
class CometChatReceiverWhiteboardBubble extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "launchCollaborativeWhiteboard", () => {
      let whiteboardUrl = null;
      let whiteboardData = (0, _common.checkMessageForExtensionsData)(this.props.message, "whiteboard");
      if (whiteboardData && whiteboardData.hasOwnProperty("board_url") && whiteboardData.board_url.length) {
        var _this$loggedInUser;
        let username = (_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.name.split(" ").join("_");
        // Appending the username to the board_url
        whiteboardUrl = whiteboardData.board_url + "&username=" + username;
        window.open(whiteboardUrl, "", "fullscreen=yes, scrollbars=auto");
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
    this.context.getLoggedinUser().then(user => {
      this.loggedInUser = _objectSpread({}, user);
    });
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
    const documentTitle = "".concat(this.props.message.sender.name, " ").concat(_translator.default.translate("SHARED_COLLABORATIVE_WHITEBOARD", this.context.language));
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "receiver__message__container message__whiteboard",
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
      className: "message__whiteboard__container",
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "message__whiteboard__wrapper",
      display: "flex",
      flexDirection: "column",
      borderRadius: "12px",
      backgroundColor: this.context.theme.backgroundColor.secondary,
      padding: "16px",
      alignSelf: "flex-start",
      width: "100%"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__whiteboard__title",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: this.context.theme.color.primary
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "24px",
      height: "24px",
      display: "inline-block",
      title: _translator.default.translate("COLLABORATIVE_WHITEBOARD", this.context.language),
      sx: {
        mask: "url(".concat(_collaborativeWhiteboard.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      }
    }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      className: "whiteboard__title",
      margin: "0",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      textAlign: "left",
      width: "calc(100% - 24px)",
      fontSize: "14px",
      marginLeft: "8px"
    }, documentTitle)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "ul",
      className: "whiteboard__button",
      listStyleType: "none",
      padding: "0",
      margin: "0",
      sx: {
        li: {
          backgroundColor: this.context.theme.backgroundColor.white,
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          cursor: "pointer",
          position: "relative",
          margin: "16px 0 0 0",
          padding: "8px",
          "> p": {
            background: "0 0",
            textAlign: "center",
            color: this.context.theme.primaryColor,
            width: "100%",
            display: "inline-block",
            fontSize: "14px",
            fontWeight: "600",
            margin: "0"
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "li",
      onClick: this.launchCollaborativeWhiteboard
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "p"
    }, _translator.default.translate("JOIN", this.context.language)))))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
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
exports.CometChatReceiverWhiteboardBubble = CometChatReceiverWhiteboardBubble;
_defineProperty(CometChatReceiverWhiteboardBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverWhiteboardBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverWhiteboardBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};