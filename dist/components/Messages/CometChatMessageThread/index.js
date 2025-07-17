"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageThread = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Extensions = require("../Extensions");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatEvent = require("../../../util/CometChatEvent");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatMessageThread extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "loggedInUser", null);
    _defineProperty(this, "enableSendingOneOnOneMessage", () => {
      this.context.FeatureRestriction.isOneOnOneChatEnabled().then(response => {
        if (response !== this.state.enableSendingOneOnOneMessage) {
          this.setState({
            enableSendingOneOnOneMessage: response
          });
        }
      }).catch(error => {
        if (this.state.enableSendingOneOnOneMessage !== false) {
          this.setState({
            enableSendingOneOnOneMessage: false
          });
        }
      });
    });
    _defineProperty(this, "enableSendingGroupMessage", () => {
      this.context.FeatureRestriction.isGroupChatEnabled().then(response => {
        if (response !== this.state.enableSendingGroupMessage) {
          this.setState({
            enableSendingGroupMessage: response
          });
        }
      }).catch(error => {
        if (this.state.enableSendingGroupMessage !== false) {
          this.setState({
            enableSendingGroupMessage: false
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
    _defineProperty(this, "errorHandler", errorCode => {
      this.toastRef.setError(errorCode);
    });
    _defineProperty(this, "parentMessageEdited", message => {
      const parentMessage = _objectSpread({}, this.props.parentMessage);
      if (parentMessage.id === message.id) {
        const newMessageObj = _objectSpread({}, message);
        this.setState({
          parentMessage: newMessageObj
        });
      }
    });
    _defineProperty(this, "actionHandler", (action, messages) => {
      switch (action) {
        case enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"]:
        case enums.ACTIONS["MESSAGE_RECEIVED"]:
          {
            const message = messages[0];
            if (message.hasOwnProperty("parentMessageId") && message.parentMessageId === this.state.parentMessage.id) {
              const replyCount = this.state.parentMessage.hasOwnProperty("replyCount") ? this.state.parentMessage.replyCount : 0;
              const newReplyCount = replyCount + 1;
              let messageObj = _objectSpread({}, this.state.parentMessage);
              let newMessageObj = Object.assign({}, messageObj, {
                replyCount: newReplyCount
              });
              this.setState({
                parentMessage: newMessageObj
              });
              this.smartReplyPreview(messages);
              this.appendMessage(messages);
            }
          }
          break;
        case enums.ACTIONS["MESSAGE_COMPOSED"]:
          {
            const replyCount = this.state.parentMessage.hasOwnProperty("replyCount") ? this.state.parentMessage.replyCount : 0;
            const newReplyCount = replyCount + 1;
            let messageObj = _objectSpread({}, this.state.parentMessage);
            let newMessageObj = Object.assign({}, messageObj, {
              replyCount: newReplyCount
            });
            this.setState({
              parentMessage: newMessageObj
            });
            this.appendMessage(messages);
            this.props.actionGenerated(enums.ACTIONS["THREAD_MESSAGE_COMPOSED"], messages);
          }
          break;
        case enums.ACTIONS["MESSAGE_SENT"]:
        case enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"]:
          this.messageSent(messages);
          this.props.actionGenerated(action, messages);
          break;
        case enums.ACTIONS["ON_MESSAGE_READ_DELIVERED"]:
          this.updateMessages(messages);
          break;
        case enums.ACTIONS["ON_MESSAGE_EDITED"]:
          this.updateMessages(messages);
          break;
        case "messageFetched":
          this.prependMessages(messages);
          break;
        case enums.ACTIONS["MESSAGES_INITIAL_FETCH"]:
          this.prependMessagesAndScrollToBottom(messages);
          break;
        case enums.ACTIONS["ON_MESSAGE_DELETED"]:
          this.removeMessages(messages);
          break;
        case enums.ACTIONS["EDIT_MESSAGE"]:
          this.editMessage(messages);
          break;
        case enums.ACTIONS["MESSAGE_EDITED"]:
          this.messageEdited(messages);
          break;
        case enums.ACTIONS["CLEAR_EDIT_PREVIEW"]:
          this.clearEditPreview();
          break;
        case enums.ACTIONS["DELETE_MESSAGE"]:
          this.deleteMessage(messages);
          break;
        case enums.ACTIONS["REACT_TO_MESSAGE"]:
          this.reactToMessage(messages);
          break;
        case enums.ACTIONS["VIEW_ORIGINAL_IMAGE"]:
          this.toggleOriginalImageView(messages);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "toggleOriginalImageView", message => {
      this.setState({
        viewOriginalImage: message
      });
    });
    _defineProperty(this, "messageSent", messages => {
      const message = messages[0];
      const messageList = [...this.state.messageList];
      let messageKey = messageList.findIndex(m => m._id === message._id);
      if (messageKey > -1) {
        const newMessageObj = _objectSpread({}, message);
        messageList.splice(messageKey, 1, newMessageObj);
        this.updateMessages(messageList);
      }
    });
    _defineProperty(this, "editMessage", message => {
      this.setState({
        messageToBeEdited: message
      });
    });
    _defineProperty(this, "messageEdited", message => {
      const messageList = [...this.state.messageList];
      let messageKey = messageList.findIndex(m => m.id === message.id);
      if (messageKey > -1) {
        const messageObj = messageList[messageKey];
        const newMessageObj = _objectSpread(_objectSpread({}, messageObj), message);
        messageList.splice(messageKey, 1, newMessageObj);
        this.updateMessages(messageList);
        if (messageList.length - messageKey === 1) {
          //this.context.setLastMessage(newMessageObj);
          _CometChatEvent.CometChatEvent.triggerHandler("updateLastMessage", _objectSpread({}, newMessageObj));
        }
      }
    });
    _defineProperty(this, "clearEditPreview", () => {
      this.setState({
        messageToBeEdited: ""
      });
    });
    _defineProperty(this, "deleteMessage", message => {
      const messageId = message.id;
      _chat.CometChat.deleteMessage(messageId).then(deletedMessage => {
        this.removeMessages([deletedMessage]);
        const messageList = [...this.state.messageList];
        let messageKey = messageList.findIndex(m => m.id === message.id);
        if (messageList.length - messageKey === 1 && !message.replyCount) {
          //this.context.setLastMessage(deletedMessage);
          _CometChatEvent.CometChatEvent.triggerHandler("updateLastMessage", _objectSpread({}, deletedMessage));
        }
      }).catch(error => this.errorHandler("SOMETHING_WRONG"));
    });
    _defineProperty(this, "smartReplyPreview", messages => {
      const message = messages[0];
      const smartReplyData = (0, _common.checkMessageForExtensionsData)(message, "smart-reply");
      if (smartReplyData && smartReplyData.hasOwnProperty("error") === false) {
        this.setState({
          replyPreview: message
        });
      } else {
        this.setState({
          replyPreview: null
        });
      }
    });
    //message is received or composed & sent
    _defineProperty(this, "appendMessage", message => {
      let messages = [...this.state.messageList];
      messages = messages.concat(message);
      this.setState({
        messageList: messages,
        scrollToBottom: true
      });
    });
    //message status is updated
    _defineProperty(this, "updateMessages", messages => {
      this.setState({
        messageList: messages
      });
    });
    //messages are fetched from backend
    _defineProperty(this, "prependMessages", messages => {
      const messageList = [...messages, ...this.state.messageList];
      this.setState({
        messageList: messageList,
        scrollToBottom: false
      });
    });
    //messages are fetched, scroll to bottom
    _defineProperty(this, "prependMessagesAndScrollToBottom", messages => {
      const messageList = [...messages, ...this.state.messageList];
      this.setState({
        messageList: messageList,
        scrollToBottom: true
      });
    });
    //messages are deleted
    _defineProperty(this, "removeMessages", messages => {
      const deletedMessage = messages[0];
      const messagelist = [...this.state.messageList];
      let messageKey = messagelist.findIndex(message => message.id === deletedMessage.id);
      if (messageKey > -1) {
        if (this.state.enableHideDeletedMessages) {
          messagelist.splice(messageKey, 1);
        } else {
          let messageObj = _objectSpread({}, messagelist[messageKey]);
          let newMessageObj = Object.assign({}, messageObj, deletedMessage);
          messagelist.splice(messageKey, 1, newMessageObj);
        }
        this.setState({
          messageList: messagelist,
          scrollToBottom: false
        });
      }
    });
    _defineProperty(this, "getSenderMessageComponent", message => {
      let component;
      switch (message.type) {
        case _chat.CometChat.MESSAGE_TYPE.TEXT:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatSenderTextMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.IMAGE:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatSenderImageMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.FILE:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatSenderFileMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.VIDEO:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatSenderVideoMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.AUDIO:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatSenderAudioMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        default:
          break;
      }
      return component;
    });
    _defineProperty(this, "getReceiverMessageComponent", message => {
      let component;
      switch (message.type) {
        case "message":
        case _chat.CometChat.MESSAGE_TYPE.TEXT:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatReceiverTextMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.IMAGE:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatReceiverImageMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.FILE:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatReceiverFileMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.AUDIO:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatReceiverAudioMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.VIDEO:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatReceiverVideoMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        default:
          break;
      }
      return component;
    });
    _defineProperty(this, "getSenderCustomMessageComponent", message => {
      let component;
      switch (message.type) {
        case enums.CUSTOM_TYPE_POLL:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatSenderPollMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_STICKER:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatSenderStickerBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_DOCUMENT:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatSenderDocumentBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_WHITEBOARD:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatSenderWhiteboardBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_MEETING:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatSenderDirectCallBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        default:
          break;
      }
      return component;
    });
    _defineProperty(this, "getReceiverCustomMessageComponent", message => {
      let component;
      switch (message.type) {
        case enums.CUSTOM_TYPE_POLL:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatReceiverPollMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_STICKER:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatReceiverStickerMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_DOCUMENT:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatReceiverDocumentBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_WHITEBOARD:
          component = /*#__PURE__*/_react.default.createElement(_Extensions.CometChatReceiverWhiteboardBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_MEETING:
          component = /*#__PURE__*/_react.default.createElement(_.CometChatReceiverDirectCallBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        default:
          break;
      }
      return component;
    });
    _defineProperty(this, "getParentMessageComponent", message => {
      let component = null;
      switch (message.category) {
        case _chat.CometChat.CATEGORY_MESSAGE:
          if (this.loggedInUser.uid === message.sender.uid) {
            component = this.getSenderMessageComponent(message);
          } else {
            component = this.getReceiverMessageComponent(message);
          }
          break;
        case _chat.CometChat.CATEGORY_CUSTOM:
          if (this.loggedInUser.uid === message.sender.uid) {
            component = this.getSenderCustomMessageComponent(message);
          } else {
            component = this.getReceiverCustomMessageComponent(message);
          }
          break;
        default:
          break;
      }
      return component;
    });
    _defineProperty(this, "reactToMessage", message => {
      this.setState({
        messageToReact: message
      });
      if (this.composerRef) {
        this.composerRef.toggleEmojiPicker();
      }
    });
    this.state = {
      messageList: [],
      scrollToBottom: true,
      replyCount: 0,
      replyPreview: null,
      messageToBeEdited: null,
      parentMessage: props.parentMessage,
      viewOriginalImage: false,
      enableSendingOneOnOneMessage: false,
      enableSendingGroupMessage: false,
      enableHideDeletedMessages: false
    };
    this.composerRef = /*#__PURE__*/_react.default.createRef();
    this.toastRef = /*#__PURE__*/_react.default.createRef();
    this.loggedInUser = this.props.loggedInUser;
  }
  componentDidMount() {
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => this.errorHandler("SOMETHING_WRONG"));
    this.enableSendingOneOnOneMessage();
    this.enableSendingGroupMessage();
    this.enableHideDeletedMessages();
  }
  componentDidUpdate(prevProps) {
    this.enableSendingOneOnOneMessage();
    this.enableSendingGroupMessage();
    this.enableHideDeletedMessages();
    if (prevProps.parentMessage !== this.props.parentMessage) {
      if (prevProps.parentMessage.id !== this.props.parentMessage.id) {
        this.setState({
          messageList: [],
          scrollToBottom: true,
          parentMessage: this.props.parentMessage
        });
      } else if (prevProps.parentMessage.data !== this.props.parentMessage.data) {
        this.setState({
          parentMessage: this.props.parentMessage
        });
      }
    }
  }
  render() {
    let parentMessage = this.getParentMessageComponent(this.state.parentMessage);
    let seperator = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignItems: "center",
      position: "relative",
      m: "7px 16px",
      height: "15px"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "hr",
      flex: "1",
      margin: "1px 0 0 0",
      borderTop: "1px solid ".concat(this.context.theme.borderColor.primary)
    }));
    if (this.state.parentMessage.hasOwnProperty("replyCount")) {
      const replyCount = this.state.parentMessage.replyCount;
      const replyText = replyCount === 1 ? "".concat(replyCount, " ").concat(_translator.default.translate("REPLY", this.context.language)) : "".concat(replyCount, " ").concat(_translator.default.translate("REPLIES", this.context.language));
      seperator = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "message__separator",
        alignItems: "center",
        position: "relative",
        m: "7px 16px",
        height: "15px"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "message__replies",
        mr: 3,
        fontSize: "12px"
      }, replyText), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        as: "hr",
        flex: "1",
        margin: "1px 0 0 0",
        borderTop: "1px solid ".concat(this.context.theme.borderColor.primary)
      }));
    }
    let originalImageView = null;
    if (this.state.viewOriginalImage) {
      originalImageView = /*#__PURE__*/_react.default.createElement(_.CometChatImageViewer, {
        open: true,
        close: () => this.toggleOriginalImageView(false),
        message: this.state.viewOriginalImage,
        lang: this.context.language
      });
    }
    let messageComposer = /*#__PURE__*/_react.default.createElement(_.CometChatMessageComposer, {
      ref: el => {
        this.composerRef = el;
      },
      parentMessageId: this.props.parentMessage.id,
      messageToBeEdited: this.state.messageToBeEdited,
      replyPreview: this.state.replyPreview,
      messageToReact: this.state.messageToReact,
      actionGenerated: this.actionHandler
    });

    //if send messages feature is disabled
    if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.state.enableSendingOneOnOneMessage === false || this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.state.enableSendingGroupMessage === false) {
      messageComposer = null;
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "thread__chat",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxSizing: "border-box",
      fontFamily: this.context.theme.fontFamily,
      sx: {
        "*": {
          boxSizing: "border-box",
          fontFamily: this.context.theme.fontFamily
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "chat__header",
      p: 4,
      width: "100%",
      backgroundColor: this.context.theme.backgroundColor.white,
      zIndex: 1,
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
      height: "69px",
      display: "flex"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "header__wrapper",
      direction: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "header__details",
      direction: "column",
      width: "calc(100% - 40px)"
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      className: "header__title",
      as: "h6",
      m: 0,
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "22px",
      width: "100%"
    }, _translator.default.translate("THREAD", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      className: "header__username",
      fontSize: "13px",
      lineHeight: "20px",
      width: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, this.props.threadItem.name)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "header__close",
      cursor: "pointer",
      width: "24px",
      height: "24px",
      sx: {
        mask: "url(".concat(_close.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      },
      onClick: () => this.props.actionGenerated(enums.ACTIONS["CLOSE_THREADED_MESSAGE"])
    }))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "chat__message__container",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflowX: "hidden",
      overflowY: "auto",
      transition: "background .3s ease-out .1s",
      width: "100%",
      zIndex: 100,
      minHeight: "calc(100% - 68px)",
      order: 2,
      sx: {
        ".chat__list": {
          minHeight: "250px",
          ".list__wrapper": {
            "::-webkit-scrollbar": {
              display: "none"
            },
            scrollbarWidth: "none"
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "parent__message",
      p: "14px 16px",
      alignItems: "center",
      justifyContent: this.props.parentMessage.messageFrom === "sender" ? "flex-end" : "flex-start",
      sx: {
        ".sender__message__container, .receiver__message__container": {
          maxWidth: "100%",
          "&:hover": {
            ".message__actions": {
              display: "none"
            }
          }
        },
        ".replycount": {
          display: "none"
        }
      }
    }, parentMessage), seperator, /*#__PURE__*/_react.default.createElement(_.CometChatMessageList, {
      messages: this.state.messageList,
      item: this.props.threadItem,
      type: this.props.threadType,
      scrollToBottom: this.state.scrollToBottom,
      parentMessageId: this.props.parentMessage.id,
      actionGenerated: this.actionHandler
    }), messageComposer)), originalImageView);
  }
}

// Specifies the default values for props:
exports.CometChatMessageThread = CometChatMessageThread;
_defineProperty(CometChatMessageThread, "contextType", _CometChatContext.CometChatContext);
CometChatMessageThread.defaultProps = {
  theme: _theme.theme
};
CometChatMessageThread.propTypes = {
  theme: _propTypes.default.object
};