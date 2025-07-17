"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessages = void 0;
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Calls = require("../../Calls");
var _Users = require("../../Users");
var _Groups = require("../../Groups");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _common = require("../../../util/common");
var _SoundManager = require("../../../util/SoundManager");
var _CometChatEvent = require("../../../util/CometChatEvent");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatMessages extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "enableGroupActionMessages", () => {
      this.getContext().FeatureRestriction.isGroupActionMessagesEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableGroupActionMessages) {
          this.setState({
            enableGroupActionMessages: response
          });
        }
      }).catch(error => {
        if (this.state.enableGroupActionMessages !== false) {
          this.setState({
            enableGroupActionMessages: false
          });
        }
      });
    });
    _defineProperty(this, "enableCallActionMessages", () => {
      this.getContext().FeatureRestriction.isCallActionMessagesEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableCallActionMessages) {
          this.setState({
            enableCallActionMessages: response
          });
        }
      }).catch(error => {
        if (this.state.enableCallActionMessages !== false) {
          this.setState({
            enableCallActionMessages: false
          });
        }
      });
    });
    _defineProperty(this, "enableSendingOneOnOneMessage", () => {
      this.getContext().FeatureRestriction.isOneOnOneChatEnabled().then(response => {
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
      this.getContext().FeatureRestriction.isGroupChatEnabled().then(response => {
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
      this.getContext().FeatureRestriction.isHideDeletedMessagesEnabled().then(response => {
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
    _defineProperty(this, "getContext", () => {
      if (this.props._parent.length) {
        return this.context;
      } else {
        return this.contextProviderRef.state;
      }
    });
    _defineProperty(this, "actionHandler", (action, messages, key, group, options) => {
      switch (action) {
        case enums.ACTIONS["CUSTOM_MESSAGE_RECEIVED"]:
        case enums.ACTIONS["MESSAGE_RECEIVED"]:
          {
            const message = messages[0];
            if (message.parentMessageId) {
              this.updateReplyCount(messages);
            } else {
              this.smartReplyPreview(messages);
              this.appendMessage(messages);
            }
            _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_MESSAGE"], this.getContext());
          }
          break;
        case enums.ACTIONS["MESSAGE_READ"]:
          {
            var _this$props;
            if ((_this$props = this.props) !== null && _this$props !== void 0 && _this$props.actionGenerated) {
              var _this$props2;
              (_this$props2 = this.props) === null || _this$props2 === void 0 || _this$props2.actionGenerated(action, messages);
            }
            break;
          }
        case enums.ACTIONS["MESSAGE_COMPOSED"]:
          {
            this.appendMessage(messages);
            break;
          }
        case enums.ACTIONS["MESSAGE_SENT"]:
          this.messageSent(messages);
          _CometChatEvent.CometChatEvent.triggerHandler("updateLastMessage", _objectSpread({}, messages[0]));
          //this.getContext().setLastMessage(messages[0]);
          break;
        case enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"]:
          this.messageSent(messages);
          break;
        case enums.ACTIONS["ON_MESSAGE_READ_DELIVERED"]:
          this.updateMessages(messages);
          break;
        case enums.ACTIONS["ON_MESSAGE_EDITED"]:
          {
            this.updateMessages(messages);
            //update the parent message of thread message
            this.updateParentThreadedMessage(key, "edit");
            break;
          }
        case enums.ACTIONS["ON_MESSAGE_DELETED"]:
          {
            this.removeMessages(messages);
            //remove the thread message
            this.updateParentThreadedMessage(messages[0], "delete");
            break;
          }
        case enums.ACTIONS["MESSAGES_FETCHED"]:
          this.prependMessages(messages);
          break;
        case enums.ACTIONS["MESSAGES_INITIAL_FETCH"]:
          this.prependMessagesAndScrollToBottom(messages);
          break;
        case enums.ACTIONS["REFRESHING_MESSAGES"]:
          this.refreshingMessages();
          break;
        case enums.ACTIONS["MESSAGES_REFRESHED"]:
          this.messageRefreshed(messages);
          break;
        case enums.ACTIONS["NEW_MESSAGES"]:
          this.newMessagesArrived(messages);
          break;
        case enums.ACTIONS["CLEAR_UNREAD_MESSAGES"]:
          this.jumpToMessages(true);
          break;
        case enums.ACTIONS["DELETE_MESSAGE"]:
          this.deleteMessage(messages);
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
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_UNBANNED:
        case enums.GROUP_MEMBER_ADDED:
        case enums.GROUP_MEMBER_LEFT:
        case enums.GROUP_MEMBER_JOINED:
          this.groupUpdated(action, messages, group, options);
          break;
        case enums.INCOMING_CALL_RECEIVED:
        case enums.INCOMING_CALL_CANCELLED:
        case enums.OUTGOING_CALL_ACCEPTED:
        case enums.OUTGOING_CALL_REJECTED:
          this.appendCallMessage(messages);
          break;
        case enums.ACTIONS["VIEW_ORIGINAL_IMAGE"]:
          this.toggleOriginalImageView(messages);
          break;
        case enums.ACTIONS["INITIATE_AUDIO_CALL"]:
          this.audioCall();
          break;
        case enums.ACTIONS["INITIATE_VIDEO_CALL"]:
          this.videoCall();
          break;
        case enums.ACTIONS["VIEW_DETAIL"]:
        case enums.ACTIONS["CLOSE_GROUP_DETAIL"]:
        case enums.ACTIONS["CLOSE_USER_DETAIL"]:
          this.toggleDetailView();
          break;
        case enums.ACTIONS["TOGGLE_SIDEBAR"]:
          this.toggleDetailView();
          this.props.actionGenerated(action);
          break;
        case enums.ACTIONS["SEND_LIVE_REACTION"]:
          this.toggleReaction(true);
          break;
        case enums.ACTIONS["STOP_LIVE_REACTION"]:
          this.toggleReaction(false);
          break;
        case enums.TRANSIENT_MESSAGE_RECEIVED:
          this.liveReactionReceived(messages);
          break;
        case enums.ACTIONS["REACT_TO_MESSAGE"]:
          this.reactToMessage(messages);
          break;
        case enums.ACTIONS["OUTGOING_CALL_ACCEPTED"]:
        case enums.ACTIONS["USER_JOINED_CALL"]:
        case enums.ACTIONS["USER_LEFT_CALL"]:
        case enums.ACTIONS["OUTGOING_CALL_ENDED"]:
        case enums.ACTIONS["OUTGOING_CALL_REJECTED"]:
        case enums.ACTIONS["OUTGOING_CALL_CANCELLED"]:
        case enums.ACTIONS["INCOMING_CALL_ACCEPTED"]:
        case enums.ACTIONS["INCOMING_CALL_ENDED"]:
        case enums.ACTIONS["INCOMING_CALL_REJECTED"]:
        case enums.ACTIONS["DIRECT_CALL_ENDED"]:
        case enums.ACTIONS["DIRECT_CALL_ERROR"]:
          break;
        case enums.ACTIONS["JOIN_DIRECT_CALL"]:
          {
            //if used in a chat widget, trigger the event to the app component as directcall component is included outside of iframe
            if (Object.keys(this.props.widgetsettings).length) {
              this.props.actionGenerated(action, messages);
            } else {
              const sessionID = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.getContext().item.guid : null;
              this.outgoingDirectCallRef.joinCall(sessionID);
            }
            break;
          }
        case enums.ACTIONS["VIEW_THREADED_MESSAGE"]:
          this.viewThreadedMessage(messages);
          break;
        case enums.ACTIONS["THREAD_MESSAGE_COMPOSED"]:
          this.threadMessageComposed(messages);
          break;
        case enums.ACTIONS["CLOSE_THREADED_MESSAGE"]:
          this.closeThreadedMessage();
          break;
        case enums.ACTIONS["ADD_GROUP_MEMBER_SUCCESS"]:
          this.appendMemberAddedMessage(messages);
          break;
        case enums.ACTIONS["UNBAN_GROUP_MEMBER_SUCCESS"]:
          this.appendMemberUnbannedMessage(messages);
          break;
        case enums.ACTIONS["SCOPECHANGE_GROUPMEMBER_SUCCESS"]:
          this.appendMemberScopeChangedMessage(messages);
          break;
        case enums.ACTIONS["KICK_GROUPMEMBER_SUCCESS"]:
          this.appendMemberKickedMessage(messages);
          break;
        case enums.ACTIONS["BAN_GROUPMEMBER_SUCCESS"]:
          this.appendMemberBannedMessage(messages);
          break;
        case enums.ACTIONS["ERROR"]:
          this.errorHandler(key);
          break;
        case enums.ACTIONS["INFO"]:
          this.infoMessageHandler(key);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "errorHandler", errorCode => {
      if (typeof this.toastRef.setError === "function") {
        var _this$toastRef;
        (_this$toastRef = this.toastRef) === null || _this$toastRef === void 0 || _this$toastRef.setError(errorCode);
      }
    });
    _defineProperty(this, "infoMessageHandler", infoCode => {
      if (typeof this.toastRef.setInfo === "function") {
        var _this$toastRef2;
        (_this$toastRef2 = this.toastRef) === null || _this$toastRef2 === void 0 || _this$toastRef2.setInfo(infoCode);
      }
    });
    _defineProperty(this, "appendMemberAddedMessage", messages => {
      //if group action messages are disabled
      if (this.state.enableGroupActionMessages === false) {
        return false;
      }
      const messageList = [];
      messages.forEach(eachMember => {
        const sentAt = new Date() / 1000 | 0;
        const messageObj = {
          receiver: _objectSpread({}, this.context.item),
          receiverId: this.context.item.guid,
          receiverType: _chat.CometChat.RECEIVER_TYPE.GROUP,
          sender: _objectSpread({}, this.loggedInUser),
          category: _chat.CometChat.CATEGORY_ACTION,
          type: _chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
          sentAt: sentAt,
          action: _chat.CometChat.ACTION_TYPE.MEMBER_ADDED,
          actionBy: _objectSpread({}, this.loggedInUser),
          actionOn: _objectSpread({}, eachMember),
          actionFor: _objectSpread({}, this.context.item)
        };
        messageList.push(messageObj);
      });
      this.appendMessage(messageList);
    });
    _defineProperty(this, "appendMemberUnbannedMessage", messages => {
      //if group action messages are disabled
      if (this.state.enableGroupActionMessages === false) {
        return false;
      }
      const messageList = [];
      messages.forEach(eachMember => {
        const sentAt = new Date() / 1000 | 0;
        const messageObj = {
          receiver: _objectSpread({}, this.context.item),
          receiverId: this.context.item.guid,
          receiverType: _chat.CometChat.RECEIVER_TYPE.GROUP,
          sender: _objectSpread({}, this.loggedInUser),
          category: _chat.CometChat.CATEGORY_ACTION,
          type: _chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
          sentAt: sentAt,
          action: _chat.CometChat.ACTION_TYPE.MEMBER_UNBANNED,
          actionBy: _objectSpread({}, this.loggedInUser),
          actionOn: _objectSpread({}, eachMember)
        };
        messageList.push(messageObj);
      });
      this.appendMessage(messageList);
    });
    _defineProperty(this, "appendMemberScopeChangedMessage", messages => {
      //if group action messages are disabled
      if (this.state.enableGroupActionMessages === false) {
        return false;
      }
      const messageList = [];
      messages.forEach(eachMember => {
        const newScope = _translator.default.translate(eachMember.scope, this.props.lang);
        const sentAt = new Date() / 1000 | 0;
        const messageObj = {
          receiver: _objectSpread({}, this.context.item),
          receiverId: this.context.item.guid,
          receiverType: _chat.CometChat.RECEIVER_TYPE.GROUP,
          sender: _objectSpread({}, this.loggedInUser),
          category: _chat.CometChat.CATEGORY_ACTION,
          type: _chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
          sentAt: sentAt,
          action: _chat.CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED,
          actionBy: _objectSpread({}, this.loggedInUser),
          actionOn: _objectSpread({}, eachMember),
          newScope: newScope
        };
        messageList.push(messageObj);
      });
      this.appendMessage(messageList);
    });
    _defineProperty(this, "appendMemberKickedMessage", messages => {
      //if group action messages are disabled
      if (this.state.enableGroupActionMessages === false) {
        return false;
      }
      const messageList = [];
      messages.forEach(eachMember => {
        const sentAt = new Date() / 1000 | 0;
        const messageObj = {
          receiver: _objectSpread({}, this.context.item),
          receiverId: this.context.item.guid,
          receiverType: _chat.CometChat.RECEIVER_TYPE.GROUP,
          sender: _objectSpread({}, this.loggedInUser),
          category: _chat.CometChat.CATEGORY_ACTION,
          type: _chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
          sentAt: sentAt,
          action: _chat.CometChat.ACTION_TYPE.MEMBER_KICKED,
          actionBy: _objectSpread({}, this.loggedInUser),
          actionOn: _objectSpread({}, eachMember),
          actionFor: _objectSpread({}, this.context.item)
        };
        messageList.push(messageObj);
      });
      this.appendMessage(messageList);
    });
    _defineProperty(this, "appendMemberBannedMessage", messages => {
      //if group action messages are disabled
      if (this.state.enableGroupActionMessages === false) {
        return false;
      }
      const messageList = [];
      messages.forEach(eachMember => {
        const sentAt = new Date() / 1000 | 0;
        const messageObj = {
          receiver: _objectSpread({}, this.context.item),
          receiverId: this.context.item.guid,
          receiverType: _chat.CometChat.RECEIVER_TYPE.GROUP,
          sender: _objectSpread({}, this.loggedInUser),
          category: _chat.CometChat.CATEGORY_ACTION,
          type: _chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
          sentAt: sentAt,
          action: _chat.CometChat.ACTION_TYPE.MEMBER_BANNED,
          actionBy: _objectSpread({}, this.loggedInUser),
          actionOn: _objectSpread({}, eachMember),
          actionFor: _objectSpread({}, this.context.item)
        };
        messageList.push(messageObj);
      });
      this.appendMessage(messageList);
    });
    _defineProperty(this, "toggleOriginalImageView", message => {
      this.setState({
        viewOriginalImage: message
      });
    });
    _defineProperty(this, "toggleDetailView", () => {
      let viewdetail = !this.state.viewdetailscreen;
      this.setState({
        viewdetailscreen: viewdetail,
        threadmessageview: false
      });
    });
    _defineProperty(this, "viewThreadedMessage", parentMessage => {
      const message = _objectSpread({}, parentMessage);
      const threaditem = _objectSpread({}, this.getContext().item);
      this.setState({
        threadmessageview: true,
        threadmessageparent: message,
        threadmessageitem: threaditem,
        threadmessagetype: this.getContext().type,
        viewdetailscreen: false
      });
    });
    _defineProperty(this, "threadMessageComposed", messages => {
      if (this.getContext().type !== this.state.threadmessagetype) {
        return false;
      }
      if (this.state.threadmessagetype === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.getContext().item.guid !== this.state.threadmessageitem.guid || this.state.threadmessagetype === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.getContext().item.uid !== this.state.threadmessageitem.uid) {
        return false;
      }
      this.updateReplyCount(messages);
    });
    _defineProperty(this, "closeThreadedMessage", () => {
      this.setState({
        threadmessageview: false,
        viewdetailscreen: false
      });
    });
    /*
    Updating parent message of threaded conversation, when the message is edited or deleted
    */
    _defineProperty(this, "updateParentThreadedMessage", (message, action) => {
      if (this.state.threadmessageview === false || message.id !== this.state.threadmessageparent.id) {
        return false;
      }
      if (action === "delete") {
        this.setState({
          threadmessageparent: _objectSpread({}, message),
          threadmessageview: false
        });
      } else {
        this.setState({
          threadmessageparent: _objectSpread({}, message)
        });
      }
    });
    _defineProperty(this, "getReceiverDetails", () => {
      let receiverId;
      let receiverType;
      if (this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
        receiverId = this.getContext().item.uid;
        receiverType = _chat.CometChat.RECEIVER_TYPE.USER;
      } else if (this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
        receiverId = this.getContext().item.guid;
        receiverType = _chat.CometChat.RECEIVER_TYPE.GROUP;
      }
      return {
        receiverId: receiverId,
        receiverType: receiverType
      };
    });
    _defineProperty(this, "audioCall", () => {
      const {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      const call = new _chat.CometChat.Call(receiverId, _chat.CometChat.CALL_TYPE.AUDIO, receiverType);
      _chat.CometChat.initiateCall(call).then(outgoingCall => {
        //when this component is part of chat widget trigger an event.. (outgoingcall component is used separately in chat widget)
        if (Object.keys(this.props.widgetsettings).length) {
          this.props.actionGenerated(enums.ACTIONS["START_AUDIO_CALL"], outgoingCall);
        } else {
          this.outgoingCallRef.startCall(outgoingCall);
          this.appendCallMessage(outgoingCall);
        }
      }).catch(error => this.errorHandler("SOMETHING_WRONG"));
    });
    _defineProperty(this, "videoCall", () => {
      /*
      Direct calling for groups
      */
      if (this.getContext().type === _chat.CometChat.RECEIVER_TYPE.GROUP) {
        const sessionID = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.getContext().item.guid : null;
        if (Object.keys(this.props.widgetsettings).length) {
          this.props.actionGenerated(enums.ACTIONS["START_DIRECT_CALL"], sessionID);
        } else {
          this.outgoingDirectCallRef.startCall(sessionID);
        }
        return;
      }

      /*
      Default calling for one-on-one
      */
      const {
        receiverId,
        receiverType
      } = this.getReceiverDetails();
      const call = new _chat.CometChat.Call(receiverId, _chat.CometChat.CALL_TYPE.VIDEO, receiverType);
      _chat.CometChat.initiateCall(call).then(outgoingCall => {
        //when this component is part of chat widget trigger an event.. (outgoingcall component is used separately in chat widget)
        if (Object.keys(this.props.widgetsettings).length) {
          this.props.actionGenerated(enums.ACTIONS["START_VIDEO_CALL"], outgoingCall);
        } else {
          this.outgoingCallRef.startCall(outgoingCall);
        }
      }).catch(error => this.errorHandler("SOMETHING_WRONG"));
    });
    _defineProperty(this, "toggleReaction", flag => {
      this.setState({
        liveReaction: flag
      });
    });
    _defineProperty(this, "liveReactionReceived", reaction => {
      const stopReaction = () => {
        this.toggleReaction(false);
      };
      if (reaction.data.type === enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"]) {
        this.reactionName = reaction.data.reaction;
        this.toggleReaction(true);
        const liveReactionInterval = enums.CONSTANTS["LIVE_REACTION_INTERVAL"];
        setTimeout(stopReaction, liveReactionInterval);
      }
    });
    _defineProperty(this, "deleteMessage", message => {
      const messageId = message.id;
      _chat.CometChat.deleteMessage(messageId).then(deletedMessage => {
        //remove edit preview when message is deleted
        if (deletedMessage.id === this.state.messageToBeEdited.id) {
          this.setState({
            messageToBeEdited: ""
          });
        }
        const messageList = [...this.state.messageList];
        let messageKey = messageList.findIndex(m => m.id === message.id);
        if (messageList.length - messageKey === 1 && !message.replyCount) {
          _CometChatEvent.CometChatEvent.triggerHandler("updateLastMessage", _objectSpread({}, deletedMessage));
          //this.getContext().setLastMessage(deletedMessage);
        }
        this.removeMessages([deletedMessage]);
        this.updateParentThreadedMessage(deletedMessage, "delete");
      }).catch(error => this.errorHandler("SOMETHING_WRONG"));
    });
    _defineProperty(this, "editMessage", message => {
      this.setState({
        messageToBeEdited: message,
        replyPreview: null
      });
    });
    _defineProperty(this, "messageEdited", message => {
      const messageList = [...this.state.messageList];
      let messageKey = messageList.findIndex(m => m.id === message.id);
      if (messageKey > -1) {
        const messageObj = messageList[messageKey];
        const newMessageObj = Object.assign({}, messageObj, message);
        messageList.splice(messageKey, 1, newMessageObj);
        this.updateMessages(messageList);
        this.updateParentThreadedMessage(newMessageObj, "edit");
        if (messageList.length - messageKey === 1 && !message.replyCount) {
          _CometChatEvent.CometChatEvent.triggerHandler("updateLastMessage", _objectSpread({}, newMessageObj));
          //this.getContext().setLastMessage(newMessageObj);
        }
      }
    });
    _defineProperty(this, "messageSent", messages => {
      const message = messages[0];
      const messageList = [...this.state.messageList];
      let messageKey = messageList.findIndex(m => m._id === message._id);
      if (messageKey > -1) {
        const newMessageObj = _objectSpread({}, message);
        messageList.splice(messageKey, 1, newMessageObj);
        messageList.sort((a, b) => a.id - b.id);
        this.setState({
          messageList: messageList,
          scrollToBottom: true
        });
      }
    });
    _defineProperty(this, "refreshingMessages", () => {
      this.setState({
        messageList: [],
        messageToBeEdited: "",
        replyPreview: null,
        liveReaction: false,
        messageToReact: null
      });
      _CometChatEvent.CometChatEvent.triggerHandler(enums.EVENTS["CLEAR_UNREAD_MESSAGES"], {});
    });
    _defineProperty(this, "messageRefreshed", messages => {
      const messageList = [...messages];
      this.setState({
        messageList: messageList,
        scrollToBottom: true
      });
    });
    _defineProperty(this, "newMessagesArrived", newMessage => {
      let unreadMessages = [...this.state.unreadMessages];
      unreadMessages.push(newMessage[0]);
      this.setState({
        unreadMessages: unreadMessages
      });
      _CometChatEvent.CometChatEvent.triggerHandler(enums.EVENTS["NEW_MESSAGES"], {
        unreadMessages: unreadMessages
      });
    });
    _defineProperty(this, "markMessagesAsRead", scrollToBottom => {
      if (this.state.unreadMessages.length === 0) {
        return false;
      }
      let unreadMessages = [...this.state.unreadMessages];
      let messageList = [...this.state.messageList];
      unreadMessages.forEach(unreadMessage => {
        if (unreadMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.USER) {
          if (this.messageListRef) {
            messageList.push(unreadMessage);
            this.messageListRef.markMessageAsRead(unreadMessage, _chat.CometChat.ACTION_TYPE.TYPE_USER);
          }
        } else if (unreadMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
          if (this.messageListRef) {
            messageList.push(unreadMessage);
            this.messageListRef.markMessageAsRead(unreadMessage, _chat.CometChat.ACTION_TYPE.TYPE_GROUP);
          }
        }
      });
      this.setState({
        messageList: messageList,
        scrollToBottom: scrollToBottom,
        unreadMessages: []
      });
    });
    _defineProperty(this, "jumpToMessages", () => {
      if (this.state.unreadMessages.length === 0) {
        return false;
      }
      let unreadMessages = [...this.state.unreadMessages];
      let messageList = [...this.state.messageList];
      messageList = messageList.concat(unreadMessages);
      _CometChatEvent.CometChatEvent.triggerHandler(enums.EVENTS["CLEAR_UNREAD_MESSAGES"], {});
      if (messageList.length > enums.CONSTANTS["MAX_MESSAGE_COUNT"]) {
        if (this.messageListRef) {
          this.messageListRef.reInitializeMessageBuilder();
        }
      } else {
        this.markMessagesAsRead(true);
      }
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
    //messages are fetched, scroll to bottom
    _defineProperty(this, "prependMessagesAndScrollToBottom", messages => {
      const messageList = [...messages, ...this.state.messageList];
      this.setState({
        messageList: messageList,
        scrollToBottom: true
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
    //message is received or composed & sent
    _defineProperty(this, "appendMessage", message => {
      let messages = [...this.state.messageList, ...message];
      this.setState({
        messageList: messages,
        scrollToBottom: true
      });
    });
    //message status is updated
    _defineProperty(this, "updateMessages", messages => {
      this.setState({
        messageList: messages,
        scrollToBottom: false
      });
    });
    _defineProperty(this, "groupUpdated", (action, message, group, options) => {
      //if group action messages are disabled
      if (this.state.enableGroupActionMessages === true) {
        this.appendMessage([message]);
      }
      this.props.actionGenerated(action, message, group, options);
    });
    _defineProperty(this, "appendCallMessage", message => {
      //if call action messages are disabled
      if (this.state.enableCallActionMessages === false) {
        return false;
      }
      this.appendMessage([message]);
    });
    _defineProperty(this, "updateReplyCount", messages => {
      const receivedMessage = messages[0];
      let messageList = [...this.state.messageList];
      let messageKey = messageList.findIndex(m => m.id === receivedMessage.parentMessageId);
      if (messageKey > -1) {
        const messageObj = messageList[messageKey];
        let replyCount = messageObj.hasOwnProperty("replyCount") ? messageObj.replyCount : 0;
        replyCount = replyCount + 1;
        const newMessageObj = Object.assign({}, messageObj, {
          replyCount: replyCount
        });
        messageList.splice(messageKey, 1, newMessageObj);
        this.setState({
          messageList: messageList,
          scrollToBottom: false
        });
      }
    });
    _defineProperty(this, "smartReplyPreview", messages => {
      const message = messages[0];
      if (message.sender.uid === this.loggedInUser.uid || message.category === _chat.CometChat.CATEGORY_CUSTOM) {
        return false;
      }

      /**
       * If smart-replies feature is enabled
       */
      this.getContext().FeatureRestriction.isSmartRepliesEnabled().then(response => {
        if (response === true) {
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
        }
      });
    });
    _defineProperty(this, "clearEditPreview", () => {
      this.setState({
        messageToBeEdited: ""
      });
    });
    _defineProperty(this, "reactToMessage", message => {
      this.setState({
        messageToReact: message
      });
      if (this.composerRef) {
        this.composerRef.toggleEmojiPicker();
      }
    });
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => this.errorHandler("SOMETHING_WRONG"));
    this.state = {
      messageList: [],
      scrollToBottom: true,
      messageToBeEdited: "",
      replyPreview: null,
      liveReaction: false,
      messageToReact: null,
      unreadMessages: [],
      viewdetailscreen: false,
      threadmessageview: false,
      threadmessagetype: null,
      threadmessageitem: {},
      threadmessageparent: {},
      viewOriginalImage: false,
      enableGroupActionMessages: false,
      enableCallActionMessages: false,
      enableSendingOneOnOneMessage: false,
      enableSendingGroupMessage: false,
      enableHideDeletedMessages: false
    };
    this.contextProviderRef = /*#__PURE__*/_react.default.createRef();
    this.composerRef = /*#__PURE__*/_react.default.createRef();
    this.messageListRef = /*#__PURE__*/_react.default.createRef();
    this.outgoingCallRef = /*#__PURE__*/_react.default.createRef();
    this.outgoingDirectCallRef = /*#__PURE__*/_react.default.createRef();
    this.toastRef = /*#__PURE__*/_react.default.createRef();
    this.reactionName = "heart";
  }
  componentDidMount() {
    this.type = this.getContext().type;
    this.item = this.getContext().item;
    this.enableGroupActionMessages();
    this.enableCallActionMessages();
    this.enableSendingOneOnOneMessage();
    this.enableSendingGroupMessage();
    this.enableHideDeletedMessages();
  }
  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.item).length) {
      const ifChatWindowChanged = () => {
        let output = false;
        if (this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER && (this.getContext().item.uid !== this.item.uid || this.getContext().item.blockedByMe !== this.item.blockedByMe)) {
          output = true;
        } else if (this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.getContext().item.guid !== this.item.guid) {
          output = true;
        } else if (this.type !== this.getContext().type) {
          output = true;
        }
        return output;
      };
      if (ifChatWindowChanged() === true) {
        this.setState({
          messageList: [],
          scrollToBottom: true,
          messageToBeEdited: "",
          threadmessageview: false,
          viewdetailscreen: false,
          unreadMessages: []
        });
      }
    }
    this.type = this.getContext().type;
    this.item = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER || _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.getContext().item : {};
    this.enableGroupActionMessages();
    this.enableCallActionMessages();
    this.enableSendingOneOnOneMessage();
    this.enableSendingGroupMessage();
    this.enableHideDeletedMessages();

    /**
     * Custom message to be appended or updated for direct calling
     */
    if (Object.keys(this.props.widgetsettings).length) {
      if (Object.keys(this.getContext().directCallCustomMessage).length && this.getContext().directCallCustomMessageAction.trim().length && (this.getContext().directCallCustomMessage !== this.directCallCustomMessage || this.getContext().directCallCustomMessageAction !== this.directCallCustomMessageAction)) {
        const customMessage = this.getContext().directCallCustomMessage;
        const messageAction = this.getContext().directCallCustomMessageAction.trim();
        switch (messageAction) {
          case enums.ACTIONS["MESSAGE_COMPOSED"]:
            this.appendMessage(customMessage);
            break;
          case enums.ACTIONS["MESSAGE_SENT"]:
          case enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"]:
            {
              this.messageSent(customMessage);
              //this.getContext().setLastMessage(customMessage[0]);
              _CometChatEvent.CometChatEvent.triggerHandler("updateLastMessage", _objectSpread({}, customMessage[0]));
              setTimeout(() => {
                this.getContext().setDirectCallCustomMessage({}, "");
              }, 1000);
              break;
            }
          default:
            break;
        }
      }
      this.directCallCustomMessage = this.getContext().directCallCustomMessage;
      this.directCallCustomMessageAction = this.getContext().directCallCustomMessageAction.trim();
    }
  }
  render() {
    var _this$getContext, _this$getContext2, _this$getContext3;
    /**
     * If used as standalone component
     */
    if (this.props._parent.trim().length === 0 && this.props.chatWithUser.trim().length === 0 && this.props.chatWithGroup.trim().length === 0) {
      return /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
        ref: el => this.contextProviderRef = el,
        _component: enums.CONSTANTS["MESSAGES_COMPONENT"],
        user: this.props.chatWithUser,
        group: this.props.chatWithGroup
      }, /*#__PURE__*/_react.default.createElement("div", null));
    } else if (this.props._parent.trim().length && Object.keys(this.getContext().item).length === 0) {
      return null;
    }
    let blockedUser = null;
    let messageList = /*#__PURE__*/_react.default.createElement(_.CometChatMessageList, {
      ref: el => {
        this.messageListRef = el;
      },
      lang: this.props.lang,
      messages: this.state.messageList,
      scrollToBottom: this.state.scrollToBottom,
      actionGenerated: this.actionHandler
    });
    let messageComposer = /*#__PURE__*/_react.default.createElement(_.CometChatMessageComposer, {
      ref: el => {
        this.composerRef = el;
      },
      messageToBeEdited: this.state.messageToBeEdited,
      replyPreview: this.state.replyPreview,
      reaction: this.reactionName,
      messageToReact: this.state.messageToReact,
      actionGenerated: this.actionHandler
    });
    let newMessageIndicator = null;
    if (this.state.unreadMessages.length) {
      const unreadMessageCount = this.state.unreadMessages.length;
      const messageText = unreadMessageCount > 1 ? "".concat(unreadMessageCount, " ").concat(_translator.default.translate("NEW_MESSAGES", this.props.lang)) : "".concat(unreadMessageCount, " ").concat(_translator.default.translate("NEW_MESSAGE", this.props.lang));
      newMessageIndicator = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "message_pane__top",
        top: "75px",
        position: "absolute",
        width: "auto",
        right: "auto",
        left: "50%",
        fontWeight: "700",
        zIndex: 200,
        transform: "translateX(-50%)"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "message_pane__banner",
        marginBottom: 0,
        display: "block",
        fontSize: "13px",
        flex: "1",
        background: this.props.theme.color.blue,
        borderRadius: "6px",
        zIndex: 200
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "message_pane__unread_banner__banner",
        height: "28px",
        borderRadius: "14px",
        display: "flex",
        flex: "1",
        alignItems: "center",
        title: _translator.default.translate("JUMP", this.props.lang)
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        type: "button",
        className: "message_pane__unread_banner__msg",
        p: "0 16px",
        flex: "1",
        textAlign: "center",
        textShadow: "0 1px rgba(0, 0, 0, .15)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: this.props.theme.color.white,
        onClick: this.jumpToMessages,
        bg: "transparent",
        border: "none",
        cursor: "pointer",
        _hover: {
          bg: "transparent"
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "icon--arrow-down",
        position: "relative",
        display: "inline-flex",
        height: "20px",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: "8px"
      }, "\u2193", " "), messageText))));
    }

    //if sending messages are disabled for chat wigdet in dashboard
    if (((_this$getContext = this.getContext()) === null || _this$getContext === void 0 ? void 0 : _this$getContext.type) === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.state.enableSendingOneOnOneMessage === false || ((_this$getContext2 = this.getContext()) === null || _this$getContext2 === void 0 ? void 0 : _this$getContext2.type) === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.state.enableSendingGroupMessage === false) {
      messageComposer = null;
    }
    if (((_this$getContext3 = this.getContext()) === null || _this$getContext3 === void 0 ? void 0 : _this$getContext3.type) === _chat.CometChat.RECEIVER_TYPE.USER && Object.keys(this.getContext().item).length && this.getContext().item.blockedByMe) {
      messageComposer = null;
      messageList = null;
      blockedUser = /*#__PURE__*/_react.default.createElement(_.CometChatBlockedUser, {
        user: this.item
      });
    }
    let liveReactionView = null;
    if (this.state.liveReaction) {
      liveReactionView = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        zIndex: 2,
        display: "flex",
        justifyContent: "left",
        alignItems: "center"
      }, /*#__PURE__*/_react.default.createElement(_.CometChatLiveReactions, {
        reaction: this.reactionName,
        theme: this.props.theme,
        lang: this.props.lang
      }));
    }

    /*
    If used as a standalone component
    */
    let incomingCallView = null;
    let incomingDirectCallView = null;
    if (this.props._parent.trim().length === 0) {
      incomingCallView = /*#__PURE__*/_react.default.createElement(_Calls.CometChatIncomingCall, {
        actionGenerated: this.actionHandler
      });
      incomingDirectCallView = /*#__PURE__*/_react.default.createElement(_Calls.CometChatIncomingDirectCall, {
        actionGenerated: this.actionHandler
      });
    }

    //don't include it when opened in chat widget
    let outgoingDirectCallView = null;
    let outgoingCallView = null;
    if (Object.keys(this.props.widgetsettings).length === 0) {
      outgoingCallView = /*#__PURE__*/_react.default.createElement(_Calls.CometChatOutgoingCall, {
        ref: el => this.outgoingCallRef = el,
        lang: this.props.lang,
        actionGenerated: this.actionHandler
      });
      outgoingDirectCallView = /*#__PURE__*/_react.default.createElement(_Calls.CometChatOutgoingDirectCall, {
        ref: el => this.outgoingDirectCallRef = el,
        lang: this.props.lang,
        actionGenerated: this.actionHandler
      });
    }
    let detailScreen = null;
    if (this.state.viewdetailscreen) {
      if (this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
        detailScreen = /*#__PURE__*/_react.default.createElement(_react2.Box, {
          className: "chat__secondary-view",
          float: "right",
          borderLeft: "1px solid ".concat(this.props.theme.borderColor.primary),
          height: "100%",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          order: 3,
          sx: _objectSpread(_objectSpread({}, this.props._parent.trim().length === 0 ? {
            borderRight: "1px solid ".concat(this.props.theme.borderColor.primary),
            borderBottom: "1px solid ".concat(this.props.theme.borderColor.primary)
          } : {}), {}, {
            [this.props.theme.breakPoints[1]]: {
              position: "absolute !important",
              right: "0 !important",
              top: "0",
              bottom: "0",
              width: "100% !important",
              zIndex: "2",
              backgroundColor: this.props.theme.backgroundColor.white
            }
          })
        }, /*#__PURE__*/_react.default.createElement(_Users.CometChatUserDetails, {
          lang: this.props.lang,
          actionGenerated: this.actionHandler
        }));
      } else if (this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
        detailScreen = /*#__PURE__*/_react.default.createElement(_react2.Box, {
          className: "chat__secondary-view",
          float: "right",
          borderLeft: "1px solid ".concat(this.props.theme.borderColor.primary),
          height: "100%",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          order: 3,
          sx: _objectSpread(_objectSpread({}, this.props._parent.trim().length === 0 ? {
            borderRight: "1px solid ".concat(this.props.theme.borderColor.primary),
            borderBottom: "1px solid ".concat(this.props.theme.borderColor.primary)
          } : {}), {}, {
            [this.props.theme.breakPoints[1]]: {
              position: "absolute !important",
              right: "0 !important",
              top: "0",
              bottom: "0",
              width: "100% !important",
              zIndex: "2",
              backgroundColor: this.props.theme.backgroundColor.white
            }
          })
        }, /*#__PURE__*/_react.default.createElement(_Groups.CometChatGroupDetails, {
          lang: this.props.lang,
          actionGenerated: this.actionHandler
        }));
      }
    }
    let threadMessageView = null;
    if (this.state.threadmessageview) {
      threadMessageView = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "chat__secondary-view",
        float: "right",
        borderLeft: "1px solid ".concat(this.props.theme.borderColor.primary),
        height: "100%",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        order: 3,
        sx: _objectSpread(_objectSpread({}, this.props._parent.trim().length === 0 ? {
          borderRight: "1px solid ".concat(this.props.theme.borderColor.primary),
          borderBottom: "1px solid ".concat(this.props.theme.borderColor.primary)
        } : {}), {}, {
          [this.props.theme.breakPoints[1]]: {
            position: "absolute !important",
            right: "0 !important",
            top: "0",
            bottom: "0",
            width: "100% !important",
            zIndex: "2",
            backgroundColor: this.props.theme.backgroundColor.white
          }
        })
      }, /*#__PURE__*/_react.default.createElement(_.CometChatMessageThread, {
        activeTab: this.state.activeTab,
        threadItem: this.state.threadmessageitem,
        threadType: this.state.threadmessagetype,
        parentMessage: this.state.threadmessageparent,
        loggedInUser: this.loggedInUser,
        actionGenerated: this.actionHandler
      }));
    }
    let originalImageView = null;
    if (this.state.viewOriginalImage) {
      originalImageView = /*#__PURE__*/_react.default.createElement(_.CometChatImageViewer, {
        close: () => this.toggleOriginalImageView(false),
        message: this.state.viewOriginalImage
      });
    }
    let messageComponent = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "main__chat",
      dir: _translator.default.getDirection(this.props.lang),
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxSizing: "border-box",
      position: "relative",
      fontFamily: this.props.theme.fontFamily,
      sx: _objectSpread(_objectSpread({}, this.props._parent.trim().length === 0 ? this.state.viewdetailscreen || this.state.threadmessageview ? {
        borderLeft: "1px solid ".concat(this.props.theme.borderColor.primary),
        borderBottom: "1px solid ".concat(this.props.theme.borderColor.primary)
      } : {
        borderLeft: "1px solid ".concat(this.props.theme.borderColor.primary),
        borderRight: "1px solid ".concat(this.props.theme.borderColor.primary),
        borderBottom: "1px solid ".concat(this.props.theme.borderColor.primary)
      } : {}), {}, {
        width: this.state.threadmessageview || this.state.viewdetailscreen ? "calc(100% - 400px)" : "100%",
        [this.props.theme.breakPoints[1]]: {
          width: this.state.threadmessageview || this.state.viewdetailscreen ? "100%" : "100%"
        },
        [this.props.theme.breakPoints[3]]: {
          width: this.state.threadmessageview || this.state.viewdetailscreen ? "0" : "100%",
          display: this.state.threadmessageview || this.state.viewdetailscreen ? "none" : "flex"
        },
        "*": {
          boxSizing: "border-box",
          fontFamily: this.props.theme.fontFamily,
          "::-webkit-scrollbar": {
            width: "8px",
            height: "4px"
          },
          "::-webkit-scrollbar-track": {
            background: "#ffffff00"
          },
          "::-webkit-scrollbar-thumb": {
            background: "#ccc",
            "&:hover": {
              background: "#aaa"
            }
          }
        }
      })
    }, /*#__PURE__*/_react.default.createElement(_.CometChatMessageHeader, {
      lang: this.props.lang,
      sidebar: this.props.sidebar,
      viewdetail: this.props.viewdetail === false ? false : true,
      actionGenerated: this.actionHandler
    }), messageList, liveReactionView, messageComposer, blockedUser, newMessageIndicator), /*#__PURE__*/_react.default.createElement(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.lang
    }), originalImageView, detailScreen, threadMessageView, incomingCallView, outgoingCallView, incomingDirectCallView, outgoingDirectCallView);
    let messageWrapper = messageComponent;
    /*
    If used as a standalone component
    **/
    if (this.props._parent.trim().length === 0) {
      messageWrapper = /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
        ref: el => this.contextProviderRef = el,
        user: this.props.chatWithUser,
        group: this.props.chatWithGroup,
        language: this.props.lang
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        display: "flex",
        width: "100%",
        height: "100%"
      }, messageComponent));
    }
    return messageWrapper;
  }
}

// Specifies the default values for props:
exports.CometChatMessages = CometChatMessages;
_defineProperty(CometChatMessages, "contextType", _CometChatContext.CometChatContext);
CometChatMessages.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  _parent: "",
  widgetsettings: {},
  chatWithUser: "",
  chatWithGroup: ""
};
CometChatMessages.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  _parent: _propTypes.default.string,
  widgetsettings: _propTypes.default.object,
  chatWithUser: _propTypes.default.string,
  chatWithGroup: _propTypes.default.string
};