"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageThread = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
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
var _style = require("./style");
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    _defineProperty(this, "appendMessage", message => {
      let messages = [...this.state.messageList];
      messages = messages.concat(message);
      this.setState({
        messageList: messages,
        scrollToBottom: true
      });
    });
    _defineProperty(this, "updateMessages", messages => {
      this.setState({
        messageList: messages
      });
    });
    _defineProperty(this, "prependMessages", messages => {
      const messageList = [...messages, ...this.state.messageList];
      this.setState({
        messageList: messageList,
        scrollToBottom: false
      });
    });
    _defineProperty(this, "prependMessagesAndScrollToBottom", messages => {
      const messageList = [...messages, ...this.state.messageList];
      this.setState({
        messageList: messageList,
        scrollToBottom: true
      });
    });
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
          component = (0, _react2.jsx)(_.CometChatSenderTextMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.IMAGE:
          component = (0, _react2.jsx)(_.CometChatSenderImageMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.FILE:
          component = (0, _react2.jsx)(_.CometChatSenderFileMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.VIDEO:
          component = (0, _react2.jsx)(_.CometChatSenderVideoMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.AUDIO:
          component = (0, _react2.jsx)(_.CometChatSenderAudioMessageBubble, {
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
          component = (0, _react2.jsx)(_.CometChatReceiverTextMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.IMAGE:
          component = (0, _react2.jsx)(_.CometChatReceiverImageMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.FILE:
          component = (0, _react2.jsx)(_.CometChatReceiverFileMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.AUDIO:
          component = (0, _react2.jsx)(_.CometChatReceiverAudioMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.actionHandler
          });
          break;
        case _chat.CometChat.MESSAGE_TYPE.VIDEO:
          component = (0, _react2.jsx)(_.CometChatReceiverVideoMessageBubble, {
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
          component = (0, _react2.jsx)(_Extensions.CometChatSenderPollMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_STICKER:
          component = (0, _react2.jsx)(_Extensions.CometChatSenderStickerBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_DOCUMENT:
          component = (0, _react2.jsx)(_Extensions.CometChatSenderDocumentBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_WHITEBOARD:
          component = (0, _react2.jsx)(_Extensions.CometChatSenderWhiteboardBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_MEETING:
          component = (0, _react2.jsx)(_.CometChatSenderDirectCallBubble, {
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
          component = (0, _react2.jsx)(_Extensions.CometChatReceiverPollMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_STICKER:
          component = (0, _react2.jsx)(_Extensions.CometChatReceiverStickerMessageBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_DOCUMENT:
          component = (0, _react2.jsx)(_Extensions.CometChatReceiverDocumentBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_WHITEBOARD:
          component = (0, _react2.jsx)(_Extensions.CometChatReceiverWhiteboardBubble, {
            key: message.id,
            message: message,
            actionGenerated: this.props.actionGenerated
          });
          break;
        case enums.CUSTOM_TYPE_MEETING:
          component = (0, _react2.jsx)(_.CometChatReceiverDirectCallBubble, {
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
    let seperator = (0, _react2.jsx)("div", {
      css: (0, _style.messageSeparatorStyle)(this.props)
    }, (0, _react2.jsx)("hr", null));
    if (this.state.parentMessage.hasOwnProperty("replyCount")) {
      const replyCount = this.state.parentMessage.replyCount;
      const replyText = replyCount === 1 ? "".concat(replyCount, " ").concat(_translator.default.translate("REPLY", this.context.language)) : "".concat(replyCount, " ").concat(_translator.default.translate("REPLIES", this.context.language));
      seperator = (0, _react2.jsx)("div", {
        css: (0, _style.messageSeparatorStyle)(this.context),
        className: "message__separator"
      }, (0, _react2.jsx)("span", {
        css: (0, _style.messageReplyStyle)(),
        className: "message__replies"
      }, replyText), (0, _react2.jsx)("hr", null));
    }
    let originalImageView = null;
    if (this.state.viewOriginalImage) {
      originalImageView = (0, _react2.jsx)(_.CometChatImageViewer, {
        open: true,
        close: () => this.toggleOriginalImageView(false),
        message: this.state.viewOriginalImage,
        lang: this.context.language
      });
    }
    let messageComposer = (0, _react2.jsx)(_.CometChatMessageComposer, {
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
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
      css: (0, _style.wrapperStyle)(this.context),
      className: "thread__chat"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.headerStyle)(this.context),
      className: "chat__header"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.headerWrapperStyle)(),
      className: "header__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.headerDetailStyle)(),
      className: "header__details"
    }, (0, _react2.jsx)("h6", {
      css: (0, _style.headerTitleStyle)(),
      className: "header__title"
    }, _translator.default.translate("THREAD", this.context.language)), (0, _react2.jsx)("span", {
      css: (0, _style.headerNameStyle)(),
      className: "header__username"
    }, this.props.threadItem.name)), (0, _react2.jsx)("div", {
      css: (0, _style.headerCloseStyle)(_close.default, this.context),
      className: "header__close",
      onClick: () => this.props.actionGenerated(enums.ACTIONS["CLOSE_THREADED_MESSAGE"])
    }))), (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "chat__message__container"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.parentMessageStyle)(this.props.parentMessage),
      className: "parent__message"
    }, parentMessage), seperator, (0, _react2.jsx)(_.CometChatMessageList, {
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