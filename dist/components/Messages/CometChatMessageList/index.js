"use strict";

require("core-js/modules/es6.symbol.js");
require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageList = void 0;
var _react = _interopRequireDefault(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _ = require("..");
var _Extensions = require("../Extensions");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _common = require("../../../util/common");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatMessageList extends _react.default.PureComponent {
  constructor(props, context) {
    var _this;
    super(props, context);
    _this = this;
    _defineProperty(this, "loggedInUser", null);
    _defineProperty(this, "lastScrollTop", 0);
    _defineProperty(this, "times", 0);
    _defineProperty(this, "item", {});
    _defineProperty(this, "scrollToBottom", function () {
      let scrollHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (_this.messagesEnd) {
        _this.messagesEnd.scrollTop = _this.messagesEnd.scrollHeight - scrollHeight;
      }
    });
    _defineProperty(this, "messageHandler", function (item) {
      let actionGenerated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : enums.ACTIONS["MESSAGES_FETCHED"];
      _this.fetchMessages().then(messageList => {
        if (messageList.length === 0) {
          _this.setState({
            decoratorMessage: "NO_MESSAGES_FOUND"
          });
        } else {
          _this.setState({
            decoratorMessage: ""
          });
        }

        //updating messagecount variable
        _this.messageCount = messageList.length;
        messageList.forEach(message => {
          var _this$state$loggedInU;
          //if the sender of the message is not the loggedin user
          if (message.getSender().getUid() !== ((_this$state$loggedInU = _this.state.loggedInUser) === null || _this$state$loggedInU === void 0 ? void 0 : _this$state$loggedInU.uid)) {
            //mark the message as delivered
            _this.markMessageAsDelivered(message);

            //mark the message as read
            if (message.hasOwnProperty("readAt") === false) {
              _chat.CometChat.markAsRead(message).catch(error => {});
              _this.props.actionGenerated(enums.ACTIONS["MESSAGE_READ"], message);
            }
          }
        });
        _this.lastScrollTop = _this.messagesEnd.scrollHeight;

        //abort(don't return messagelist), when the chat window changes
        if (item.hasOwnProperty("uid") && _this.context.item.hasOwnProperty("uid") && item.uid === _this.context.item.uid || item.hasOwnProperty("guid") && _this.context.item.hasOwnProperty("guid") && item.guid === _this.context.item.guid) {
          _this.props.actionGenerated(actionGenerated, messageList);
        }
      }).catch(error => {
        if (_this.props.messages.length === 0) {
          _this.setState({
            decoratorMessage: "SOMETHING_WRONG"
          });
        }
        if (error && error.hasOwnProperty("code") && error.code === "ERR_GUID_NOT_FOUND") {
          //this.context.setDeletedGroupId(this.context.item.guid);
        }
      });
    });
    _defineProperty(this, "fetchMessages", () => {
      const promise = new Promise((resolve, reject) => {
        this.MessageListManager.fetchPreviousMessages().then(messageList => {
          resolve(messageList);
        }).catch(error => reject(error));
      });
      return promise;
    });
    _defineProperty(this, "messageUpdated", (key, message, group, options) => {
      switch (key) {
        case enums.MESSAGE_DELETED:
          this.onMessageDeleted(message);
          break;
        case enums.MESSAGE_EDITED:
          this.onMessageEdited(message);
          break;
        case enums.MESSAGE_DELIVERED:
        case enums.MESSAGE_READ:
          this.onMessageReadAndDelivered(message);
          break;
        case enums.TEXT_MESSAGE_RECEIVED:
        case enums.MEDIA_MESSAGE_RECEIVED:
          this.onMessageReceived(message);
          break;
        case enums.CUSTOM_MESSAGE_RECEIVED:
          this.onCustomMessageReceived(message);
          break;
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
        case enums.GROUP_MEMBER_JOINED:
        case enums.GROUP_MEMBER_LEFT:
        case enums.GROUP_MEMBER_ADDED:
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_UNBANNED:
          this.onGroupUpdated(key, message, group, options);
          break;
        case enums.INCOMING_CALL_RECEIVED:
        case enums.INCOMING_CALL_CANCELLED:
        case enums.OUTGOING_CALL_ACCEPTED:
        case enums.OUTGOING_CALL_REJECTED:
          this.onCallUpdated(key, message);
          break;
        case enums.TRANSIENT_MESSAGE_RECEIVED:
          this.onTransientMessageReceived(key, message);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "onMessageDeleted", message => {
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverId() === this.context.item.guid) {
        this.props.actionGenerated(enums.ACTIONS["ON_MESSAGE_DELETED"], [message]);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && message.getSender().uid === this.context.item.uid) {
        this.props.actionGenerated(enums.ACTIONS["ON_MESSAGE_DELETED"], [message]);
      }
    });
    _defineProperty(this, "onMessageEdited", message => {
      var _this$state$loggedInU2, _this$state$loggedInU3;
      const messageList = [...this.props.messages];
      const updateEditedMessage = message => {
        let messageKey = messageList.findIndex(m => m.id === message.id);
        if (messageKey > -1) {
          const messageObj = messageList[messageKey];
          const newMessageObj = Object.assign({}, messageObj, message);
          messageList.splice(messageKey, 1, newMessageObj);
          this.props.actionGenerated(enums.ACTIONS["ON_MESSAGE_EDITED"], messageList, newMessageObj);
        }
      };
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverId() === this.context.item.guid) {
        updateEditedMessage(message);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && ((_this$state$loggedInU2 = this.state.loggedInUser) === null || _this$state$loggedInU2 === void 0 ? void 0 : _this$state$loggedInU2.uid) === message.getReceiverId() && message.getSender().uid === this.context.item.uid) {
        updateEditedMessage(message);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && ((_this$state$loggedInU3 = this.state.loggedInUser) === null || _this$state$loggedInU3 === void 0 ? void 0 : _this$state$loggedInU3.uid) === message.getSender().uid && message.getReceiverId() === this.context.item.uid) {
        updateEditedMessage(message);
      }
    });
    _defineProperty(this, "onMessageReadAndDelivered", message => {
      var _this$state$loggedInU4;
      //read receipts
      if (message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && message.getSender().getUid() === this.context.item.uid && message.getReceiver() === ((_this$state$loggedInU4 = this.state.loggedInUser) === null || _this$state$loggedInU4 === void 0 ? void 0 : _this$state$loggedInU4.uid)) {
        let messageList = [...this.props.messages];
        if (message.getReceiptType() === "delivery") {
          //search for message

          let messageKey = messageList.findIndex(m => m.id === message.messageId);
          if (messageKey > -1) {
            let messageObj = messageList[messageKey];
            let newMessageObj = Object.assign({}, messageObj, {
              deliveredAt: message.getDeliveredAt()
            });
            messageList.splice(messageKey, 1, newMessageObj);
            this.props.actionGenerated(enums.ACTIONS["ON_MESSAGE_READ_DELIVERED"], messageList);
          }
        } else if (message.getReceiptType() === "read") {
          //search for message
          let messageKey = messageList.findIndex(m => m.id === message.messageId);
          if (messageKey > -1) {
            let messageObj = _objectSpread({}, messageList[messageKey]);
            let newMessageObj = Object.assign({}, messageObj, {
              readAt: message.getReadAt()
            });
            messageList.splice(messageKey, 1, newMessageObj);
            this.props.actionGenerated(enums.ACTIONS["ON_MESSAGE_READ_DELIVERED"], messageList);
          }
        }
      } else if (message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiver() === this.context.item.guid) {
        //not implemented
      }
    });
    _defineProperty(this, "reInitializeMessageBuilder", () => {
      if (this.props.hasOwnProperty("parentMessageId") === false) {
        this.messageCount = 0;
      }
      this.props.actionGenerated(enums.ACTIONS["REFRESHING_MESSAGES"], []);
      this.setState({
        decoratorMessage: "LOADING"
      });
      this.MessageListManager.removeListeners();
      if (this.props.parentMessageId) {
        this.MessageListManager = new _controller.MessageListManager(this.context, this.context.item, this.context.type, this.props.parentMessageId);
      } else {
        this.MessageListManager = new _controller.MessageListManager(this.context, this.context.item, this.context.type);
      }
      this.MessageListManager.initializeMessageRequest().then(() => {
        this.messageHandler(this.context.item, enums.ACTIONS["MESSAGES_REFRESHED"]);
        this.MessageListManager.attachListeners(this.messageUpdated);
      });
    });
    _defineProperty(this, "markMessageAsDelivered", message => {
      var _message$sender, _this$state$loggedInU5;
      if (((_message$sender = message.sender) === null || _message$sender === void 0 ? void 0 : _message$sender.uid) !== ((_this$state$loggedInU5 = this.state.loggedInUser) === null || _this$state$loggedInU5 === void 0 ? void 0 : _this$state$loggedInU5.uid) && message.hasOwnProperty("deliveredAt") === false) {
        _chat.CometChat.markAsDelivered(message).catch(error => {});
      }
    });
    _defineProperty(this, "markMessageAsRead", (message, type) => {
      if (message.hasOwnProperty("readAt") === false) {
        _chat.CometChat.markAsRead(message).catch(error => {});
      }
    });
    _defineProperty(this, "onMessageReceived", message => {
      //mark the message as delivered
      this.markMessageAsDelivered(message);

      /**
       * message receiver is chat window group
       */
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverId() === this.context.item.guid) {
        this.messageReceivedHandler(message, _chat.CometChat.RECEIVER_TYPE.GROUP);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER) {
        var _this$state$loggedInU6, _this$state$loggedInU7;
        /**
         * If the message sender is chat window user and message receiver is logged-in user
         * OR
         * If the message sender is logged-in user and message receiver is chat window user
         */
        if (message.getSender().uid === this.context.item.uid && message.getReceiverId() === ((_this$state$loggedInU6 = this.state.loggedInUser) === null || _this$state$loggedInU6 === void 0 ? void 0 : _this$state$loggedInU6.uid) || message.getSender().uid === ((_this$state$loggedInU7 = this.state.loggedInUser) === null || _this$state$loggedInU7 === void 0 ? void 0 : _this$state$loggedInU7.uid) && message.getReceiverId() === this.context.item.uid) {
          this.messageReceivedHandler(message, _chat.CometChat.RECEIVER_TYPE.USER);
        }
      }
    });
    _defineProperty(this, "messageReceivedHandler", (message, type) => {
      //handling dom lag - increment count only for main message list
      if (message.hasOwnProperty("parentMessageId") === false && this.props.hasOwnProperty("parentMessageId") === false) {
        ++this.messageCount;
        //if the user has not scrolled in chat window(scroll is at the bottom of the chat window)
        if (this.messagesEnd.scrollHeight - this.messagesEnd.scrollTop - this.messagesEnd.clientHeight <= 1) {
          if (this.messageCount > enums.CONSTANTS["MAX_MESSAGE_COUNT"]) {
            this.reInitializeMessageBuilder();
          } else {
            this.markMessageAsRead(message, type);
            this.props.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
          }
        } else {
          //if the user has scrolled up in chat window
          this.props.actionGenerated(enums.ACTIONS["NEW_MESSAGES"], [message]);
        }
      } else if (message.hasOwnProperty("parentMessageId") === true && this.props.hasOwnProperty("parentMessageId") === true) {
        if (message.parentMessageId === this.props.parentMessageId) {
          this.markMessageAsRead(message, type);
        }
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
      } else {
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_RECEIVED"], [message]);
      }
    });
    _defineProperty(this, "onCustomMessageReceived", message => {
      var _this$state$loggedInU8, _this$state$loggedInU9;
      //mark the message as delivered
      this.markMessageAsDelivered(message);

      //new messages
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && ((_this$state$loggedInU8 = this.state.loggedInUser) === null || _this$state$loggedInU8 === void 0 ? void 0 : _this$state$loggedInU8.uid) === message.getSender().uid && message.getReceiverId() === this.context.item.guid && (message.type === enums.CUSTOM_TYPE_POLL || message.type === enums.CUSTOM_TYPE_DOCUMENT || message.type === enums.CUSTOM_TYPE_WHITEBOARD)) {
        //showing polls, collaborative document and whiteboard for sender (custom message received listener for sender)
        this.props.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverId() === this.context.item.guid) {
        this.customMessageReceivedHandler(message, _chat.CometChat.RECEIVER_TYPE.GROUP);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && message.getSender().uid === this.context.item.uid) {
        this.customMessageReceivedHandler(message, _chat.CometChat.RECEIVER_TYPE.USER);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && ((_this$state$loggedInU9 = this.state.loggedInUser) === null || _this$state$loggedInU9 === void 0 ? void 0 : _this$state$loggedInU9.uid) === message.getSender().uid && message.getReceiverId() === this.context.item.uid && (message.type === enums.CUSTOM_TYPE_POLL || message.type === enums.CUSTOM_TYPE_DOCUMENT || message.type === enums.CUSTOM_TYPE_WHITEBOARD)) {
        //showing polls, collaborative document and whiteboard for sender (custom message received listener for sender)
        this.props.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
      }
    });
    _defineProperty(this, "customMessageReceivedHandler", (message, type) => {
      //handling dom lag - increment count only for main message list
      if (message.hasOwnProperty("parentMessageId") === false && this.props.hasOwnProperty("parentMessageId") === false) {
        ++this.messageCount;

        //if the user has not scrolled in chat window(scroll is at the bottom of the chat window)
        if (this.messagesEnd.scrollHeight - this.messagesEnd.scrollTop - this.messagesEnd.clientHeight <= 1) {
          if (this.messageCount > enums.CONSTANTS["MAX_MESSAGE_COUNT"]) {
            this.reInitializeMessageBuilder();
          } else {
            this.markMessageAsRead(message, type);
            this.props.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
          }
        } else {
          //if the user has scrolled in chat window

          this.props.actionGenerated(enums.ACTIONS["NEW_MESSAGES"], [message]);
        }
      } else if (message.hasOwnProperty("parentMessageId") === true && this.props.hasOwnProperty("parentMessageId") === true) {
        if (message.parentMessageId === this.props.parentMessageId) {
          this.markMessageAsRead(message, type);
        }
        this.props.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
      } else {
        this.props.actionGenerated(enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"], [message]);
      }
    });
    _defineProperty(this, "onCallUpdated", (key, message) => {
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverId() === this.context.item.guid) {
        this.props.actionGenerated(key, message);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && message.getSender().uid === this.context.item.uid) {
        this.props.actionGenerated(key, message);
      }
    });
    _defineProperty(this, "onTransientMessageReceived", (key, message) => {
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverId() === this.context.item.guid) {
        this.props.actionGenerated(key, message);
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.USER && message.getSender().uid === this.context.item.uid) {
        this.props.actionGenerated(key, message);
      }
    });
    _defineProperty(this, "onGroupUpdated", (key, message, group, options) => {
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiverId() === this.context.item.guid) {
        this.props.actionGenerated(key, message, null, group, options);
      }
    });
    _defineProperty(this, "handleScroll", e => {
      const scrollTop = e.currentTarget.scrollTop;
      const scrollHeight = e.currentTarget.scrollHeight;
      const clientHeight = e.currentTarget.clientHeight;
      this.lastScrollTop = scrollHeight - scrollTop;
      if (this.lastScrollTop === clientHeight) {
        this.props.actionGenerated(enums.ACTIONS["CLEAR_UNREAD_MESSAGES"]);
      }
      const top = Math.round(scrollTop) === 0;
      if (top && this.props.messages.length) {
        this.messageHandler(this.context.item);
      }
    });
    _defineProperty(this, "getSenderMessageComponent", message => {
      let component;
      const messageKey = message._id ? message._id : message.id;
      if (message.hasOwnProperty("deletedAt")) {
        component = (0, _react2.jsx)(_.CometChatDeleteMessageBubble, {
          key: messageKey,
          message: message
        });
      } else {
        switch (message.type) {
          case _chat.CometChat.MESSAGE_TYPE.TEXT:
            component = (0, _react2.jsx)(_.CometChatSenderTextMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case _chat.CometChat.MESSAGE_TYPE.IMAGE:
            component = (0, _react2.jsx)(_.CometChatSenderImageMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case _chat.CometChat.MESSAGE_TYPE.FILE:
            component = (0, _react2.jsx)(_.CometChatSenderFileMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case _chat.CometChat.MESSAGE_TYPE.VIDEO:
            component = (0, _react2.jsx)(_.CometChatSenderVideoMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case _chat.CometChat.MESSAGE_TYPE.AUDIO:
            component = (0, _react2.jsx)(_.CometChatSenderAudioMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          default:
            break;
        }
      }
      return component;
    });
    _defineProperty(this, "getReceiverMessageComponent", message => {
      let component;
      const messageKey = message._id ? message._id : message.id;
      if (message.hasOwnProperty("deletedAt")) {
        component = (0, _react2.jsx)(_.CometChatDeleteMessageBubble, {
          key: messageKey,
          message: message
        });
      } else {
        switch (message.type) {
          case _chat.CometChat.MESSAGE_TYPE.TEXT:
            component = message.text ? (0, _react2.jsx)(_.CometChatReceiverTextMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            }) : null;
            break;
          case _chat.CometChat.MESSAGE_TYPE.IMAGE:
            component = message.data.url ? (0, _react2.jsx)(_.CometChatReceiverImageMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            }) : null;
            break;
          case _chat.CometChat.MESSAGE_TYPE.FILE:
            component = message.data.attachments ? (0, _react2.jsx)(_.CometChatReceiverFileMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            }) : null;
            break;
          case _chat.CometChat.MESSAGE_TYPE.AUDIO:
            component = message.data.url ? (0, _react2.jsx)(_.CometChatReceiverAudioMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            }) : null;
            break;
          case _chat.CometChat.MESSAGE_TYPE.VIDEO:
            component = message.data.url ? (0, _react2.jsx)(_.CometChatReceiverVideoMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            }) : null;
            break;
          default:
            break;
        }
      }
      return component;
    });
    _defineProperty(this, "getSenderCustomMessageComponent", message => {
      let component;
      const messageKey = message._id ? message._id : message.id;
      if (message.hasOwnProperty("deletedAt")) {
        component = (0, _react2.jsx)(_.CometChatDeleteMessageBubble, {
          key: messageKey,
          message: message
        });
      } else {
        switch (message.type) {
          case enums.CUSTOM_TYPE_POLL:
            component = (0, _react2.jsx)(_Extensions.CometChatSenderPollMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_STICKER:
            component = (0, _react2.jsx)(_Extensions.CometChatSenderStickerBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_DOCUMENT:
            component = (0, _react2.jsx)(_Extensions.CometChatSenderDocumentBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_WHITEBOARD:
            component = (0, _react2.jsx)(_Extensions.CometChatSenderWhiteboardBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_MEETING:
            component = (0, _react2.jsx)(_.CometChatSenderDirectCallBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          default:
            break;
        }
      }
      return component;
    });
    _defineProperty(this, "getReceiverCustomMessageComponent", message => {
      let component;
      const messageKey = message._id ? message._id : message.id;
      if (message.hasOwnProperty("deletedAt")) {
        component = (0, _react2.jsx)(_.CometChatDeleteMessageBubble, {
          key: messageKey,
          message: message
        });
      } else {
        switch (message.type) {
          case enums.CUSTOM_TYPE_POLL:
            component = (0, _react2.jsx)(_Extensions.CometChatReceiverPollMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_STICKER:
            component = (0, _react2.jsx)(_Extensions.CometChatReceiverStickerMessageBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_DOCUMENT:
            component = (0, _react2.jsx)(_Extensions.CometChatReceiverDocumentBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_WHITEBOARD:
            component = (0, _react2.jsx)(_Extensions.CometChatReceiverWhiteboardBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          case enums.CUSTOM_TYPE_MEETING:
            component = (0, _react2.jsx)(_.CometChatReceiverDirectCallBubble, {
              key: messageKey,
              message: message,
              actionGenerated: this.props.actionGenerated
            });
            break;
          default:
            break;
        }
      }
      return component;
    });
    _defineProperty(this, "getActionMessageComponent", message => {
      const messageKey = message._id ? message._id : message.id;
      return (0, _react2.jsx)(_.CometChatActionMessageBubble, {
        key: messageKey,
        message: message
      });
    });
    _defineProperty(this, "getComponent", (message, key) => {
      var _this$state$loggedInU10, _message$sender2, _this$state$loggedInU11, _message$sender3;
      let component;
      switch (message.category) {
        case _chat.CometChat.CATEGORY_ACTION:
        case _chat.CometChat.CATEGORY_CALL:
          component = this.getActionMessageComponent(message);
          break;
        case _chat.CometChat.CATEGORY_MESSAGE:
          if (((_this$state$loggedInU10 = this.state.loggedInUser) === null || _this$state$loggedInU10 === void 0 ? void 0 : _this$state$loggedInU10.uid) === ((_message$sender2 = message.sender) === null || _message$sender2 === void 0 ? void 0 : _message$sender2.uid)) {
            component = this.getSenderMessageComponent(message);
          } else {
            component = this.getReceiverMessageComponent(message);
          }
          break;
        case _chat.CometChat.CATEGORY_CUSTOM:
          if (((_this$state$loggedInU11 = this.state.loggedInUser) === null || _this$state$loggedInU11 === void 0 ? void 0 : _this$state$loggedInU11.uid) === ((_message$sender3 = message.sender) === null || _message$sender3 === void 0 ? void 0 : _message$sender3.uid)) {
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
    this.state = {
      onItemClick: null,
      loggedInUser: null,
      decoratorMessage: "LOADING"
    };
    this.messagesEnd = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    _chat.CometChat.getLoggedinUser().then(user => {
      this.setState({
        loggedInUser: user
      });
    }).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    if (Object.keys(this.context.item).length === 0 && this.context.type.trim().length === 0) {
      return false;
    }
    this.item = this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER || _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.context.item : {};
    if (this.props.parentMessageId) {
      this.MessageListManager = new _controller.MessageListManager(this.context, this.context.item, this.context.type, this.props.parentMessageId);
    } else {
      this.MessageListManager = new _controller.MessageListManager(this.context, this.context.item, this.context.type);
    }
    this.MessageListManager.initializeMessageRequest().then(() => {
      this.messageHandler(this.context.item, enums.ACTIONS["MESSAGES_INITIAL_FETCH"]);
      this.MessageListManager.attachListeners(this.messageUpdated);
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const ifChatWindowChanged = () => {
      let output = false;
      if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER && (this.context.item.uid !== this.item.uid || this.context.item.blockedByMe !== this.item.blockedByMe)) {
        output = true;
      } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.context.item.guid !== this.item.guid) {
        output = true;
      } else if (prevProps.parentMessageId !== this.props.parentMessageId) {
        output = true;
      }
      return output;
    };
    if (ifChatWindowChanged() === true) {
      var _this$MessageListMana;
      this.messageCount = 0;
      this.setState({
        decoratorMessage: "LOADING"
      });
      (_this$MessageListMana = this.MessageListManager) === null || _this$MessageListMana === void 0 ? void 0 : _this$MessageListMana.removeListeners();
      if (this.props.parentMessageId) {
        this.MessageListManager = new _controller.MessageListManager(this.context, this.context.item, this.context.type, this.props.parentMessageId);
      } else {
        this.MessageListManager = new _controller.MessageListManager(this.context, this.context.item, this.context.type);
      }
      this.MessageListManager.initializeMessageRequest().then(() => {
        var _this$MessageListMana2;
        this.messageHandler(this.context.item, enums.ACTIONS["MESSAGES_INITIAL_FETCH"]);
        (_this$MessageListMana2 = this.MessageListManager) === null || _this$MessageListMana2 === void 0 ? void 0 : _this$MessageListMana2.attachListeners(this.messageUpdated);
      });
    }
    const previousMessageStr = JSON.stringify(prevProps.messages);
    const currentMessageStr = JSON.stringify(this.props.messages);
    if (previousMessageStr !== currentMessageStr) {
      if (this.props.scrollToBottom) {
        this.scrollToBottom();
      } else {
        this.scrollToBottom(this.lastScrollTop);
      }
    }
    this.item = this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER || _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.context.item : {};
    if (this.context.leftGroupId.trim().length) {
      this.item = {};
    }
  }
  componentWillUnmount() {
    var _this$MessageListMana3;
    (_this$MessageListMana3 = this.MessageListManager) === null || _this$MessageListMana3 === void 0 ? void 0 : _this$MessageListMana3.removeListeners();
    this.MessageListManager = null;
  }
  render() {
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0 && this.props.messages.length === 0) {
      messageContainer = (0, _react2.jsx)("div", {
        css: (0, _style.decoratorMessageStyle)(),
        className: "messages__decorator-message"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.decoratorMessageTxtStyle)(this.context),
        className: "decorator-message"
      }, _translator.default.translate(this.state.decoratorMessage, this.props.lang)));
    }
    let cDate = null;
    const messages = this.props.messages.map((message, key) => {
      let dateSeparator = null;
      const dateField = message._composedAt || message.sentAt;
      const messageDate = message.sentAt * 1000;
      const messageSentDate = (0, _dateformat.default)(messageDate, "dd/mm/yyyy");
      if (cDate !== messageSentDate) {
        dateSeparator = (0, _react2.jsx)("div", {
          css: (0, _style.messageDateContainerStyle)(),
          className: "message__date"
        }, (0, _react2.jsx)("span", {
          css: (0, _style.messageDateStyle)(this.context)
        }, (0, _common.getMessageDate)(dateField, this.context.language)));
      }
      cDate = messageSentDate;
      return (0, _react2.jsx)(_react.default.Fragment, {
        key: key
      }, dateSeparator, this.getComponent(message, key));
    });
    return (0, _react2.jsx)("div", {
      className: "chat__list",
      css: (0, _style.chatListStyle)(this.context)
    }, messageContainer, (0, _react2.jsx)("div", {
      className: "list__wrapper",
      css: (0, _style.listWrapperStyle)(),
      ref: el => {
        this.messagesEnd = el;
      },
      onScroll: this.handleScroll
    }, messages));
  }
}

// Specifies the default values for props:
exports.CometChatMessageList = CometChatMessageList;
_defineProperty(CometChatMessageList, "contextType", _CometChatContext.CometChatContext);
CometChatMessageList.defaultProps = {
  theme: _theme.theme
};
CometChatMessageList.propTypes = {
  theme: _propTypes.default.object
};