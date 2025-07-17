"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConversationListItem = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatConversationListActions = require("../CometChatConversationListActions");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _common = require("../../../util/common");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatConversationListItem extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "getLastMessage", () => {
      if (this.props.hasOwnProperty("conversation") === false) {
        return false;
      }
      if (this.props.conversation.hasOwnProperty("lastMessage") === false) {
        return false;
      }
      let message = null;
      const lastMessage = this.props.conversation.lastMessage;
      if (lastMessage.hasOwnProperty("deletedAt")) {
        if (this.state.enableHideDeletedMessages) {
          message = "";
        } else {
          message = this.props.loggedInUser.uid === lastMessage.sender.uid ? "".concat(_translator.default.translate("YOU_DELETED_THIS_MESSAGE", this.context.language)) : "".concat(_translator.default.translate("THIS_MESSAGE_DELETED", this.context.language));
        }
      } else {
        switch (lastMessage.category) {
          case _chat.CometChat.CATEGORY_MESSAGE:
            message = this.getMessage(lastMessage);
            break;
          case _chat.CometChat.CATEGORY_CALL:
            message = this.getCallMessage(lastMessage);
            break;
          case _chat.CometChat.CATEGORY_ACTION:
            message = this.getActionMessage(lastMessage);
            break;
          case _chat.CometChat.CATEGORY_CUSTOM:
            message = this.getCustomMessage(lastMessage);
            break;
          default:
            break;
        }
      }
      return message;
    });
    _defineProperty(this, "getLastMessageTimestamp", () => {
      if (this.props.hasOwnProperty("conversation") === false) {
        return false;
      }
      if (this.props.conversation.hasOwnProperty("lastMessage") === false) {
        return false;
      }
      if (this.props.conversation.lastMessage.hasOwnProperty("sentAt") === false && this.props.conversation.lastMessage.hasOwnProperty("_composedAt") === false) {
        return false;
      }
      let timestamp = this.props.conversation.lastMessage._composedAt || this.props.conversation.lastMessage.sentAt;
      timestamp = (0, _common.getTimeStampForLastMessage)(timestamp, this.context.language);
      return timestamp;
    });
    _defineProperty(this, "getCustomMessage", lastMessage => {
      let message = null;
      const sender = this.props.loggedInUser.uid !== lastMessage.sender.uid ? "".concat(lastMessage.sender.name, ": ") : "";
      switch (lastMessage.type) {
        case enums.CUSTOM_TYPE_POLL:
          {
            const pollMessage = _translator.default.translate("CUSTOM_MESSAGE_POLL", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(pollMessage) : "".concat(pollMessage);
          }
          break;
        case enums.CUSTOM_TYPE_STICKER:
          {
            const stickerMessage = _translator.default.translate("CUSTOM_MESSAGE_STICKER", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(stickerMessage) : "".concat(stickerMessage);
          }
          break;
        case enums.CUSTOM_TYPE_DOCUMENT:
          {
            const docMessage = _translator.default.translate("CUSTOM_MESSAGE_DOCUMENT", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(docMessage) : "".concat(docMessage);
          }
          break;
        case enums.CUSTOM_TYPE_WHITEBOARD:
          {
            const whiteboardMessage = _translator.default.translate("CUSTOM_MESSAGE_WHITEBOARD", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(whiteboardMessage) : "".concat(whiteboardMessage);
          }
          break;
        case enums.CUSTOM_TYPE_MEETING:
          {
            const meetingMessage = _translator.default.translate("VIDEO_CALL", this.context.language);
            message = "".concat(sender, " ").concat(meetingMessage);
          }
          break;
        default:
          break;
      }
      return message;
    });
    _defineProperty(this, "getTextMessage", message => {
      let messageText = message.text;

      //xss extensions data
      const xssData = (0, _common.checkMessageForExtensionsData)(message, "xss-filter");
      if (xssData && xssData.hasOwnProperty("sanitized_text")) {
        messageText = xssData.sanitized_text;
      }

      //datamasking extensions data
      const maskedData = (0, _common.checkMessageForExtensionsData)(message, "data-masking");
      if (maskedData && maskedData.hasOwnProperty("data") && maskedData.data.hasOwnProperty("sensitive_data") && maskedData.data.hasOwnProperty("message_masked") && maskedData.data.sensitive_data === "yes") {
        messageText = maskedData.data.message_masked;
      }

      //profanity extensions data
      const profaneData = (0, _common.checkMessageForExtensionsData)(message, "profanity-filter");
      if (profaneData && profaneData.hasOwnProperty("profanity") && profaneData.hasOwnProperty("message_clean") && profaneData.profanity === "yes") {
        messageText = profaneData.message_clean;
      }
      return messageText;
    });
    _defineProperty(this, "getMessage", lastMessage => {
      var _this$props, _lastMessage$sender, _lastMessage$sender2;
      let message = null;
      const sender = ((_this$props = this.props) === null || _this$props === void 0 || (_this$props = _this$props.loggedInUser) === null || _this$props === void 0 ? void 0 : _this$props.uid) !== (lastMessage === null || lastMessage === void 0 || (_lastMessage$sender = lastMessage.sender) === null || _lastMessage$sender === void 0 ? void 0 : _lastMessage$sender.uid) ? "".concat(lastMessage === null || lastMessage === void 0 || (_lastMessage$sender2 = lastMessage.sender) === null || _lastMessage$sender2 === void 0 ? void 0 : _lastMessage$sender2.name, ": ") : "";
      switch (lastMessage.type) {
        case _chat.CometChat.MESSAGE_TYPE.TEXT:
          {
            const textMessage = this.getTextMessage(lastMessage);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(textMessage) : "".concat(textMessage);
          }
          break;
        case _chat.CometChat.MESSAGE_TYPE.MEDIA:
          {
            const mediaMessage = _translator.default.translate("MEDIA_MESSAGE", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(mediaMessage) : "".concat(mediaMessage);
          }
          break;
        case _chat.CometChat.MESSAGE_TYPE.IMAGE:
          {
            const imageMessage = _translator.default.translate("MESSAGE_IMAGE", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(imageMessage) : "".concat(imageMessage);
          }
          break;
        case _chat.CometChat.MESSAGE_TYPE.FILE:
          {
            const fileMessage = _translator.default.translate("MESSAGE_FILE", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(fileMessage) : "".concat(fileMessage);
          }
          break;
        case _chat.CometChat.MESSAGE_TYPE.VIDEO:
          {
            const videoMessage = _translator.default.translate("MESSAGE_VIDEO", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(videoMessage) : "".concat(videoMessage);
          }
          break;
        case _chat.CometChat.MESSAGE_TYPE.AUDIO:
          {
            const audioMessage = _translator.default.translate("MESSAGE_AUDIO", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(audioMessage) : "".concat(audioMessage);
          }
          break;
        case _chat.CometChat.MESSAGE_TYPE.CUSTOM:
          {
            const customMessage = _translator.default.translate("CUSTOM_MESSAGE", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(customMessage) : "".concat(customMessage);
          }
          break;
        default:
          break;
      }
      return message;
    });
    _defineProperty(this, "getCallMessage", lastMessage => {
      let message = null;
      const sender = this.props.loggedInUser.uid !== lastMessage.sender.uid ? "".concat(lastMessage.sender.name, ": ") : "";
      switch (lastMessage.type) {
        case _chat.CometChat.MESSAGE_TYPE.VIDEO:
          {
            const videoMessage = _translator.default.translate("VIDEO_CALL", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(videoMessage) : "".concat(videoMessage);
          }
          break;
        case _chat.CometChat.MESSAGE_TYPE.AUDIO:
          {
            const audioMessage = _translator.default.translate("AUDIO_CALL", this.context.language);
            message = lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP ? "".concat(sender, " ").concat(audioMessage) : "".concat(audioMessage);
          }
          break;
        default:
          break;
      }
      return message;
    });
    _defineProperty(this, "getActionMessage", message => {
      let actionMessage = null;
      if (message.hasOwnProperty("actionBy") === false || message.hasOwnProperty("actionOn") === false) {
        return actionMessage;
      }
      if (message.action !== _chat.CometChat.ACTION_TYPE.MEMBER_JOINED && message.action !== _chat.CometChat.ACTION_TYPE.MEMBER_LEFT && (message.actionBy.hasOwnProperty("name") === false || message.actionOn.hasOwnProperty("name") === false)) {
        return actionMessage;
      }
      if (message.action === _chat.CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED) {
        if (message.hasOwnProperty("data") && message.data.hasOwnProperty("extras")) {
          if (message.data.extras.hasOwnProperty("scope")) {
            if (message.data.extras.scope.hasOwnProperty("new") === false) {
              return actionMessage;
            }
          } else {
            return actionMessage;
          }
        } else {
          return actionMessage;
        }
      }
      if (message.action === _chat.CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED && message.data.extras.hasOwnProperty("scope") === false) {
        return actionMessage;
      }
      if (message.action === _chat.CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED && message.data.extras.scope.hasOwnProperty("new") === false) {
        return actionMessage;
      }
      const byEntity = message.actionBy;
      const onEntity = message.actionOn;
      const byString = byEntity.name;
      const forString = message.action !== _chat.CometChat.ACTION_TYPE.MEMBER_JOINED && message.action !== _chat.CometChat.ACTION_TYPE.MEMBER_LEFT ? onEntity.name : "";
      switch (message.action) {
        case _chat.CometChat.ACTION_TYPE.MEMBER_ADDED:
          actionMessage = "".concat(byString, " ").concat(_translator.default.translate("ADDED", this.context.language), " ").concat(forString);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_JOINED:
          actionMessage = "".concat(byString, " ").concat(_translator.default.translate("JOINED", this.context.language));
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_LEFT:
          actionMessage = "".concat(byString, " ").concat(_translator.default.translate("LEFT", this.context.language));
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_KICKED:
          actionMessage = "".concat(byString, " ").concat(_translator.default.translate("KICKED", this.context.language), " ").concat(forString);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_BANNED:
          actionMessage = "".concat(byString, " ").concat(_translator.default.translate("BANNED", this.context.language), " ").concat(forString);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_UNBANNED:
          actionMessage = "".concat(byString, " ").concat(_translator.default.translate("UNBANNED", this.context.language), " ").concat(forString);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED:
          {
            const newScope = message["data"]["extras"]["scope"]["new"];
            actionMessage = "".concat(byString, " ").concat(_translator.default.translate("MADE", this.context.language), " ").concat(forString, " ").concat(_translator.default.translate(newScope, this.context.language));
            break;
          }
        default:
          break;
      }
      return actionMessage;
    });
    _defineProperty(this, "toggleTooltip", (event, flag) => {
      const elem = event.target;
      const scrollWidth = elem.scrollWidth;
      const clientWidth = elem.clientWidth;
      if (scrollWidth <= clientWidth) {
        return false;
      }
      if (flag) {
        elem.setAttribute("title", elem.textContent);
      } else {
        elem.removeAttribute("title");
      }
    });
    _defineProperty(this, "enableUnreadCount", () => {
      this.context.FeatureRestriction.isUnreadCountEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableUnreadCount) {
          this.setState({
            enableUnreadCount: response
          });
        }
      }).catch(error => {
        if (this.state.enableUnreadCount !== false) {
          this.setState({
            enableUnreadCount: false
          });
        }
      });
    });
    _defineProperty(this, "enableHideDeletedMessages", () => {
      this.context.FeatureRestriction.isHideDeletedMessagesEnabled().then(response => {
        if (response !== this.state.enableHideDeletedMessages) {
          this.setState({
            enableHideDeletedMessages: response
          });
        }
      }).catch(error => {
        if (this.state.enableHideDeletedMessages !== false) {
          this.setState({
            enableHideDeletedMessages: false
          });
        }
      });
    });
    _defineProperty(this, "handleMouseHover", toggleFlag => {
      if (toggleFlag && !this.state.isHovering) {
        this.setState({
          isHovering: true
        });
      } else if (!toggleFlag && this.state.isHovering) {
        this.setState({
          isHovering: false
        });
      }
    });
    this.state = {
      lastMessage: "",
      lastMessageTimestamp: "",
      enableUnreadCount: false,
      isHovering: false,
      enableHideDeletedMessages: false
    };
  }
  componentDidMount() {
    const message = this.getLastMessage();
    const timestamp = this.getLastMessageTimestamp();
    this.enableUnreadCount();
    this.enableHideDeletedMessages();
    this.setState({
      lastMessage: message,
      lastMessageTimestamp: timestamp
    });
  }
  componentDidUpdate(prevProps) {
    const previousItem = JSON.stringify(prevProps.conversation);
    const currentItem = JSON.stringify(this.props.conversation);
    if (previousItem !== currentItem) {
      const message = this.getLastMessage();
      const timestamp = this.getLastMessageTimestamp();
      this.setState({
        lastMessage: message,
        lastMessageTimestamp: timestamp
      });
    }
    this.enableUnreadCount();
    this.enableHideDeletedMessages();
  }
  render() {
    let lastMessageTimeStamp = null;
    if (this.state.lastMessage) {
      lastMessageTimeStamp = /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "11px",
        width: "70px",
        textAlign: "right",
        color: this.props.theme.color.helpText,
        className: "item__details__timestamp"
      }, this.state.lastMessageTimestamp);
    }
    let presence;
    if (this.props.conversation.conversationType === _chat.CometChat.RECEIVER_TYPE.USER) {
      const status = this.props.conversation.conversationWith.status;
      presence = /*#__PURE__*/_react.default.createElement(_Shared.CometChatUserPresence, {
        status: status,
        borderColor: this.props.theme.borderColor.primary
      });
    }
    let avatar = null;
    if (this.props.conversation.conversationType === _chat.CometChat.RECEIVER_TYPE.USER) {
      avatar = /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.props.conversation.conversationWith
      });
    } else if (this.props.conversation.conversationType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
      avatar = /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        group: this.props.conversation.conversationWith
      });
    }
    let unreadCount = null;
    if (this.state.enableUnreadCount) {
      unreadCount = /*#__PURE__*/_react.default.createElement(_Shared.CometChatBadgeCount, {
        count: this.props.conversation.unreadMessageCount
      });
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = /*#__PURE__*/_react.default.createElement(_CometChatConversationListActions.CometChatConversationListActions, _extends({}, this.props, {
        conversation: this.props.conversation
      }));
    }
    const isSelected = this.props.selectedConversation && this.props.selectedConversation.conversationId === this.props.conversation.conversationId;
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      direction: "row",
      justify: "left",
      align: "center",
      cursor: "pointer",
      width: "100%",
      padding: "8px 16px",
      position: "relative",
      bg: isSelected ? this.props.theme.backgroundColor.primary : "transparent",
      _hover: {
        bg: this.props.theme.backgroundColor.primary
      },
      className: "list__item",
      onMouseEnter: () => this.handleMouseHover(true),
      onMouseLeave: () => this.handleMouseHover(false),
      onClick: () => this.props.handleClick(this.props.conversation)
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      width: "36px",
      height: "36px",
      flexShrink: 0,
      className: "list__item__thumbnail"
    }, avatar, presence), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "calc(100% - 45px)",
      flexGrow: 1,
      paddingLeft: "16px",
      sx: {
        "&[dir=rtl]": {
          paddingRight: "16px",
          paddingLeft: "0"
        }
      },
      className: "list__item__details",
      dir: _translator.default.getDirection(this.context.language)
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      justify: "space-between",
      align: "baseline",
      className: "item__details_block_one"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "15px",
      fontWeight: "600",
      display: "block",
      width: "calc(100% - 70px)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: "22px",
      color: this.props.theme.color.primary,
      className: "item__details__name",
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, this.props.conversation.conversationWith.name), lastMessageTimeStamp), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      justify: "space-between",
      align: "baseline",
      className: "item__details_block_two"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      margin: "0",
      fontSize: "13px",
      fontWeight: "400",
      width: "calc(100% - 50px)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: "20px",
      color: this.props.theme.color.helpText,
      className: "item__details__last-message",
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, this.state.lastMessage), unreadCount)), toolTipView);
  }
}

// Specifies the default values for props:
exports.CometChatConversationListItem = CometChatConversationListItem;
_defineProperty(CometChatConversationListItem, "contextType", _CometChatContext.CometChatContext);
CometChatConversationListItem.defaultProps = {
  theme: _theme.theme,
  loggedInUser: null,
  conversation: {
    conversationWith: {}
  }
};
CometChatConversationListItem.propTypes = {
  theme: _propTypes.default.object,
  loggedInUser: _propTypes.default.shape(_chat.CometChat.User),
  conversation: _propTypes.default.shape(_chat.CometChat.Conversation)
};