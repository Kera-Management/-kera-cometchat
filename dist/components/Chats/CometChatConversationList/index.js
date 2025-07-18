"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConversationList = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _Shared = require("../../Shared");
var _ = require("..");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _UIKitSettings = require("../../../util/UIKitSettings");
var _SoundManager = require("../../../util/SoundManager");
var _CometChatEvent = require("../../../util/CometChatEvent");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _back = _interopRequireDefault(require("./resources/back.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatConversationList extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    _defineProperty(this, "loggedInUser", null);
    _defineProperty(this, "incrementUnreadCount", false);
    // componentWillUnmount() {
    //   this._isMounted = false;
    //   this.ConversationListManager.removeListeners();
    //   this.ConversationListManager = null;
    // }
    _defineProperty(this, "filterConversation", () => {
      const conversationlist = [...this.state.conversationlist];
      return conversationlist.find(c => {
        if (c.conversationType === this.getContext().type && this.getContext().type === _chat.CometChat.RECEIVER_TYPE.USER && c.conversationWith.uid === this.getContext().item.uid || c.conversationType === this.getContext().type && this.getContext().type === _chat.CometChat.RECEIVER_TYPE.GROUP && c.conversationWith.guid === this.getContext().item.guid) {
          return c;
        }
        return false;
      });
    });
    _defineProperty(this, "updateLastMessage", lastMessage => {
      const conversationList = [...this.state.conversationlist];
      const conversationKey = conversationList.findIndex(c => c.conversationId === lastMessage.conversationId);
      if (conversationKey > -1) {
        const conversationObj = conversationList[conversationKey];
        let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
          lastMessage: _objectSpread({}, lastMessage)
        });
        if (conversationKey === 0) {
          conversationList.splice(conversationKey, 1, newConversationObj);
        } else {
          conversationList.splice(conversationKey, 1);
          conversationList.unshift(newConversationObj);
        }
        if (this._isMounted) {
          this.setState({
            conversationlist: conversationList
          });
        }
      } else {
        const chatListMode = this.getContext().UIKitSettings.chatListMode;
        const chatListFilterOptions = _UIKitSettings.UIKitSettings.chatListFilterOptions;
        if (chatListMode !== chatListFilterOptions["USERS_AND_GROUPS"]) {
          if (chatListMode === chatListFilterOptions["USERS"] && lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP || chatListMode === chatListFilterOptions["GROUPS"] && lastMessage.receiverType === _chat.CometChat.RECEIVER_TYPE.USER) {
            return false;
          }
        }
        let newConversation = new _chat.CometChat.Conversation();
        newConversation.setConversationId(lastMessage.conversationId);
        newConversation.setConversationType(this.getContext().type);
        newConversation.setConversationWith(this.getContext().item);
        newConversation.setLastMessage(lastMessage);
        newConversation.setUnreadMessageCount(0);
        conversationList.unshift(newConversation);
        if (this._isMounted) {
          this.setState({
            conversationlist: conversationList
          });
        }
      }
    });
    _defineProperty(this, "updateUnreadCount", params => {
      this.incrementUnreadCount = true;
      return false;
    });
    _defineProperty(this, "clearUnreadCount", params => {
      this.incrementUnreadCount = false;
      let conversationList = [...this.state.conversationlist];
      const conversationObj = this.filterConversation();
      if (conversationObj && conversationObj.unreadMessageCount > 0) {
        let conversationKey = conversationList.indexOf(conversationObj);
        let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
          unreadMessageCount: 0
        });
        conversationList.splice(conversationKey, 1, newConversationObj);
        this.setState({
          conversationlist: conversationList
        });
      }
      return false;
    });
    _defineProperty(this, "conversationCallback", (key, item, message, options) => {
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE:
          this.updateUser(item);
          break;
        case enums.TEXT_MESSAGE_RECEIVED:
        case enums.MEDIA_MESSAGE_RECEIVED:
        case enums.CUSTOM_MESSAGE_RECEIVED:
          this.markMessageAsDelivered(message);
          this.conversationUpdated(key, message, options);
          break;
        case enums.INCOMING_CALL_RECEIVED:
        case enums.INCOMING_CALL_CANCELLED:
        case enums.MESSAGE_EDITED:
        case enums.MESSAGE_DELETED:
        case enums.MESSAGE_READ:
        case enums.GROUP_MEMBER_ADDED:
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
        case enums.GROUP_MEMBER_JOINED:
        case enums.GROUP_MEMBER_UNBANNED:
          this.conversationUpdated(key, message, options);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "markMessageAsDelivered", message => {
      //if chat window is not open, mark message as delivered
      if ((this.getContext().type === "" || Object.keys(this.getContext().item).length === 0) && message.hasOwnProperty("deliveredAt") === false) {
        _chat.CometChat.markAsDelivered(message).catch(error => {});
      }
    });
    _defineProperty(this, "conversationUpdated", (key, message, options) => {
      const chatListMode = this.getContext().UIKitSettings.chatListMode;
      const chatListFilterOptions = _UIKitSettings.UIKitSettings.chatListFilterOptions;
      if (chatListMode !== chatListFilterOptions["USERS_AND_GROUPS"]) {
        if (chatListMode === chatListFilterOptions["USERS"] && message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP || chatListMode === chatListFilterOptions["GROUPS"] && message.receiverType === _chat.CometChat.RECEIVER_TYPE.USER) {
          return false;
        }
      }
      switch (key) {
        case enums.TEXT_MESSAGE_RECEIVED:
        case enums.MEDIA_MESSAGE_RECEIVED:
        case enums.CUSTOM_MESSAGE_RECEIVED:
        case enums.INCOMING_CALL_RECEIVED:
        case enums.INCOMING_CALL_CANCELLED:
          this.updateConversation(key, message);
          break;
        case enums.MESSAGE_EDITED:
        case enums.MESSAGE_DELETED:
          this.conversationEditedDeleted(message);
          break;
        case enums.GROUP_MEMBER_ADDED:
          this.updateGroupMemberAdded(message, options);
          break;
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          this.updateGroupMemberRemoved(message, options);
          break;
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          this.updateGroupMemberScopeChanged(message, options);
          break;
        case enums.GROUP_MEMBER_JOINED:
        case enums.GROUP_MEMBER_UNBANNED:
          this.updateGroupMemberChanged(message, options);
          break;
        case enums.MESSAGE_READ:
          this.onMessagesRead(message);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "updateUser", user => {
      const conversationlist = [...this.state.conversationlist];
      const conversationKey = conversationlist.findIndex(conversationObj => conversationObj.conversationType === "user" && conversationObj.conversationWith.uid === user.uid);
      if (conversationKey > -1) {
        let conversationObj = _objectSpread({}, conversationlist[conversationKey]);
        let conversationWithObj = _objectSpread(_objectSpread({}, conversationObj.conversationWith), {}, {
          status: user.getStatus()
        });
        let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
          conversationWith: conversationWithObj
        });
        conversationlist.splice(conversationKey, 1, newConversationObj);
        this.setState({
          conversationlist: conversationlist
        });
      }
    });
    _defineProperty(this, "hideGroupActionMessages", () => {
      this.getContext().FeatureRestriction.isGroupActionMessagesEnabled().then(response => {
        if (response !== this.state.hideGroupActionMessages) {
          this.setState({
            hideGroupActionMessages: response
          });
        }
      }).catch(error => {
        if (this.state.hideGroupActionMessages !== false) {
          this.setState({
            hideGroupActionMessages: false
          });
        }
      });
    });
    _defineProperty(this, "playAudio", message => {
      if (message.category === _chat.CometChat.CATEGORY_ACTION && message.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER && this.state.hideGroupActionMessages === true) {
        return false;
      }

      /**
       * Sound alert for incoming messages
       */
      const receiverType = message.getReceiverType();
      const receiverId = receiverType === _chat.CometChat.RECEIVER_TYPE.USER ? message.getSender().uid : message.getReceiverId();
      if (receiverType === this.getContext().type) {
        if (receiverType === _chat.CometChat.RECEIVER_TYPE.USER && receiverId === this.getContext().item.uid || receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP && receiverId === this.getContext().item.guid) {
          _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_MESSAGE"], this.getContext());
        } else {
          _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_OTHER_MESSAGE"], this.getContext());
        }
      } else {
        _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_OTHER_MESSAGE"], this.getContext());
      }
    });
    _defineProperty(this, "onMessagesRead", messageReceipt => {
      const conversationList = [...this.state.conversationlist];
      conversationList.forEach((conversation, conversationKey) => {
        if ((conversation === null || conversation === void 0 ? void 0 : conversation.conversationType) === messageReceipt.receiverType) {
          var _conversation$convers, _conversation$convers2;
          if ((conversation === null || conversation === void 0 ? void 0 : conversation.conversationType) === _chat.CometChat.RECEIVER_TYPE.USER && messageReceipt.receiver === (conversation === null || conversation === void 0 || (_conversation$convers = conversation.conversationWith) === null || _conversation$convers === void 0 ? void 0 : _conversation$convers.uid) || (conversation === null || conversation === void 0 ? void 0 : conversation.conversationType) === _chat.CometChat.RECEIVER_TYPE.GROUP && messageReceipt.receiver === (conversation === null || conversation === void 0 || (_conversation$convers2 = conversation.conversationWith) === null || _conversation$convers2 === void 0 ? void 0 : _conversation$convers2.guid)) {
            var _conversation$lastMes;
            let unreadMessageCount = conversation.unreadMessageCount;
            /**
             * If the message id of the read reciept if greater than or equal to the lastmessage id, set unreadmessagecount to 0
             */
            if ((messageReceipt === null || messageReceipt === void 0 ? void 0 : messageReceipt.messageId) >= (conversation === null || conversation === void 0 || (_conversation$lastMes = conversation.lastMessage) === null || _conversation$lastMes === void 0 ? void 0 : _conversation$lastMes.id)) {
              unreadMessageCount = 0;
            }
            let newConversationObj = _objectSpread(_objectSpread({}, conversation), {}, {
              unreadMessageCount: unreadMessageCount
            });
            conversationList.splice(conversationKey, 1, newConversationObj);
            this.setState({
              conversationlist: conversationList
            });
          }
        }
      });
    });
    _defineProperty(this, "makeConversation", message => {
      const promise = new Promise(resolve => {
        _chat.CometChat.CometChatHelper.getConversationFromMessage(message).then(conversation => {
          let conversationList = [...this.state.conversationlist];
          let conversationKey = conversationList.findIndex(c => c.conversationId === conversation.conversationId);
          let conversationObj = _objectSpread({}, conversation);
          if (conversationKey > -1) {
            conversationObj = _objectSpread({}, conversationList[conversationKey]);
          }
          resolve({
            conversationKey: conversationKey,
            conversationObj: conversationObj,
            conversationList: conversationList
          });
        });
      });
      return promise;
    });
    _defineProperty(this, "makeUnreadMessageCount", function (message) {
      let conversation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      /**
       * If the received message is sent by the logged in user, don't increment the unread count
       */
      if (Object.keys(conversation).length === 0) {
        var _this$loggedInUser;
        if (message.sender.uid === ((_this$loggedInUser = _this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid)) {
          return 0;
        } else {
          return 1;
        }
      }
      let unreadMessageCount = parseInt(conversation.unreadMessageCount);
      if (_this.getContext().item.hasOwnProperty("guid") && conversation.conversationWith.hasOwnProperty("guid") && _this.getContext().item.guid === conversation.conversationWith.guid || _this.getContext().item.hasOwnProperty("uid") && conversation.conversationWith.hasOwnProperty("uid") && _this.getContext().item.uid === conversation.conversationWith.uid) {
        if (_this.incrementUnreadCount === true) {
          unreadMessageCount = ++unreadMessageCount;
        } else {
          unreadMessageCount = 0;
        }
      } else {
        unreadMessageCount = _this.shouldIncrementCount(message) ? ++unreadMessageCount : unreadMessageCount;
      }
      return unreadMessageCount;
    });
    _defineProperty(this, "shouldIncrementCount", incomingMessage => {
      var _this$loggedInUser2, _this$loggedInUser3;
      let output = false;
      if (incomingMessage.category === _chat.CometChat.CATEGORY_MESSAGE && incomingMessage.sender.uid !== ((_this$loggedInUser2 = this.loggedInUser) === null || _this$loggedInUser2 === void 0 ? void 0 : _this$loggedInUser2.uid) || this.getContext().hasKeyValue(incomingMessage, enums.KEYS["METADATA"]) && this.getContext().hasKeyValue(incomingMessage[enums.KEYS["METADATA"]], enums.KEYS["INCREMENT_UNREAD_COUNT"]) && incomingMessage[enums.KEYS["METADATA"]][enums.KEYS["INCREMENT_UNREAD_COUNT"]] === true && incomingMessage.sender.uid !== ((_this$loggedInUser3 = this.loggedInUser) === null || _this$loggedInUser3 === void 0 ? void 0 : _this$loggedInUser3.uid)) {
        output = true;
      }
      return output;
    });
    _defineProperty(this, "makeLastMessage", function (message) {
      let conversation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const newMessage = Object.assign({}, message);
      return newMessage;
    });
    _defineProperty(this, "updateConversation", (key, message) => {
      this.makeConversation(message).then(response => {
        const {
          conversationKey,
          conversationObj,
          conversationList
        } = response;
        if (conversationKey > -1) {
          let unreadMessageCount = this.makeUnreadMessageCount(message, conversationObj);
          let lastMessageObj = this.makeLastMessage(message, conversationObj);
          let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount
          });
          conversationList.splice(conversationKey, 1);
          conversationList.unshift(newConversationObj);
          this.setState({
            conversationlist: conversationList
          });
          if (key !== enums.INCOMING_CALL_RECEIVED && key !== enums.INCOMING_CALL_CANCELLED) {
            this.playAudio(message);
          }
        } else {
          let unreadMessageCount = this.makeUnreadMessageCount(message, {});
          let lastMessageObj = this.makeLastMessage(message);
          let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount
          });
          conversationList.unshift(newConversationObj);
          this.setState({
            conversationlist: conversationList
          });
          if (key !== enums.INCOMING_CALL_RECEIVED && key !== enums.INCOMING_CALL_CANCELLED) {
            this.playAudio(message);
          }
        }
      });
    });
    _defineProperty(this, "conversationEditedDeleted", message => {
      this.makeConversation(message).then(response => {
        const {
          conversationKey,
          conversationObj,
          conversationList
        } = response;
        if (conversationKey > -1) {
          let lastMessageObj = conversationObj.lastMessage;
          if (lastMessageObj.id === message.id) {
            const newLastMessageObj = Object.assign({}, lastMessageObj, message);
            let newConversationObj = Object.assign({}, conversationObj, {
              lastMessage: newLastMessageObj
            });
            conversationList.splice(conversationKey, 1, newConversationObj);
            this.setState({
              conversationlist: conversationList
            });
          }
        }
      });
    });
    _defineProperty(this, "updateGroupMemberAdded", (message, options) => {
      this.makeConversation(message).then(response => {
        const {
          conversationKey,
          conversationObj,
          conversationList
        } = response;
        if (conversationKey > -1) {
          let lastMessageObj = this.makeLastMessage(message, conversationObj);
          let conversationWithObj = _objectSpread({}, conversationObj.conversationWith);
          let membersCount = parseInt(conversationWithObj.membersCount);
          if (message.hasOwnProperty("actionFor") && message.actionFor.hasOwnProperty("membersCount")) {
            membersCount = message.actionFor.membersCount;
          }
          let newConversationWithObj = _objectSpread(_objectSpread({}, conversationWithObj), {}, {
            membersCount: membersCount
          });
          let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
            conversationWith: newConversationWithObj,
            lastMessage: lastMessageObj
          });
          conversationList.splice(conversationKey, 1);
          conversationList.unshift(newConversationObj);
          this.setState({
            conversationlist: conversationList
          });
          this.playAudio(message);
        } else {
          if (options && this.loggedInUser.uid === options.user.uid) {
            let lastMessageObj = this.makeLastMessage(message);
            let conversationWithObj = _objectSpread({}, conversationObj.conversationWith);
            let membersCount = parseInt(conversationWithObj.membersCount);
            if (message.hasOwnProperty("actionFor") && message.actionFor.hasOwnProperty("membersCount")) {
              membersCount = message.actionFor.membersCount;
            }
            let scope = _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
            let hasJoined = options.hasJoined;
            let newConversationWithObj = _objectSpread(_objectSpread({}, conversationWithObj), {}, {
              membersCount: membersCount,
              scope: scope,
              hasJoined: hasJoined
            });
            let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
              conversationWith: newConversationWithObj,
              lastMessage: lastMessageObj
            });
            conversationList.unshift(newConversationObj);
            this.setState({
              conversationlist: conversationList
            });
            this.playAudio(message);
          }
        }
      });
    });
    _defineProperty(this, "updateGroupMemberRemoved", (message, options) => {
      this.makeConversation(message).then(response => {
        const {
          conversationKey,
          conversationObj,
          conversationList
        } = response;
        if (conversationKey > -1) {
          if (options && this.loggedInUser.uid === options.user.uid) {
            conversationList.splice(conversationKey, 1);
            this.setState({
              conversationlist: conversationList
            });
          } else {
            let lastMessageObj = this.makeLastMessage(message, conversationObj);
            let conversationWithObj = _objectSpread({}, conversationObj.conversationWith);
            let membersCount = parseInt(conversationWithObj.membersCount);
            if (message.hasOwnProperty("actionFor") && message.actionFor.hasOwnProperty("membersCount")) {
              membersCount = message.actionFor.membersCount;
            }
            let newConversationWithObj = _objectSpread(_objectSpread({}, conversationWithObj), {}, {
              membersCount: membersCount
            });
            let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
              conversationWith: newConversationWithObj,
              lastMessage: lastMessageObj
            });
            conversationList.splice(conversationKey, 1);
            conversationList.unshift(newConversationObj);
            this.setState({
              conversationlist: conversationList
            });
            this.playAudio(message);
          }
        }
      });
    });
    _defineProperty(this, "updateGroupMemberScopeChanged", (message, options) => {
      this.makeConversation(message).then(response => {
        const {
          conversationKey,
          conversationObj,
          conversationList
        } = response;
        if (conversationKey > -1) {
          let lastMessageObj = this.makeLastMessage(message, conversationObj);
          let conversationWithObj = _objectSpread({}, conversationObj.conversationWith);
          let membersCount = parseInt(conversationWithObj.membersCount);
          let scope = conversationWithObj.scope;
          if (options && this.loggedInUser.uid === options.user.uid) {
            scope = options.scope;
          }
          let newConversationWithObj = _objectSpread(_objectSpread({}, conversationWithObj), {}, {
            membersCount: membersCount,
            scope: scope
          });
          let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
            conversationWith: newConversationWithObj,
            lastMessage: lastMessageObj
          });
          conversationList.splice(conversationKey, 1);
          conversationList.unshift(newConversationObj);
          this.setState({
            conversationlist: conversationList
          });
          this.playAudio(message);
        }
      });
    });
    _defineProperty(this, "updateGroupMemberChanged", (message, options) => {
      this.makeConversation(message).then(response => {
        const {
          conversationKey,
          conversationObj,
          conversationList
        } = response;
        if (conversationKey > -1) {
          if (options && this.loggedInUser.uid !== options.user.uid) {
            let lastMessageObj = this.makeLastMessage(message, conversationObj);
            let conversationWithObj = _objectSpread({}, conversationObj.conversationWith);
            let membersCount = parseInt(conversationWithObj.membersCount);
            if (message.hasOwnProperty("actionFor") && message.actionFor.hasOwnProperty("membersCount")) {
              membersCount = message.actionFor.membersCount;
            }
            let newConversationWithObj = _objectSpread(_objectSpread({}, conversationWithObj), {}, {
              membersCount: membersCount
            });
            let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
              conversationWith: newConversationWithObj,
              lastMessage: lastMessageObj
            });
            conversationList.splice(conversationKey, 1);
            conversationList.unshift(newConversationObj);
            this.setState({
              conversationlist: conversationList
            });
            this.playAudio(message);
          }
        }
      });
    });
    _defineProperty(this, "handleScroll", e => {
      const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === Math.round(e.currentTarget.clientHeight);
      if (bottom) this.getConversations();
    });
    //click handler
    _defineProperty(this, "handleClick", conversation => {
      if (!this.props.onItemClick) return;
      this.props.onItemClick(conversation.conversationWith, conversation.conversationType);
    });
    _defineProperty(this, "handleMenuClose", () => {
      if (!this.props.actionGenerated) {
        return false;
      }
      this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
    });
    _defineProperty(this, "getConversations", () => {
      this.ConversationListManager.fetchNextConversation().then(conversationList => {
        if (conversationList.length === 0) {
          if (this.state.conversationlist.length === 0) {
            this.setState({
              decoratorMessage: _translator.default.translate("NO_CHATS_FOUND", this.props.lang)
            });
          }
        } else {
          this.setState({
            decoratorMessage: ""
          });
        }
        let conversations = [...this.state.conversationlist];
        //if conversation exists already in the state, remove it from this list
        conversationList.forEach(eachConversation => {
          let conversationKey = conversations.findIndex(c => c.conversationId === eachConversation.conversationId);
          if (conversationKey > -1) {
            const newUnreadMessageCount = conversations[conversationKey]["unreadMessageCount"] + eachConversation["unreadMessageCount"];
            const updatedConversation = _objectSpread(_objectSpread({}, conversations[conversationKey]), {}, {
              unreadMessageCount: newUnreadMessageCount
            });
            conversations.splice(conversationKey, 1, updatedConversation);
            conversationList.splice(conversationKey, 1);
          }
        });
        this.setState({
          conversationlist: [...conversations, ...conversationList]
        });
      }).catch(error => this.setState({
        decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.props.lang)
      }));
    });
    _defineProperty(this, "getContext", () => {
      if (this.props._parent.length) {
        return this.context;
      } else {
        return this.contextProviderRef.state;
      }
    });
    _defineProperty(this, "actionHandler", (action, conversation) => {
      switch (action) {
        case enums.ACTIONS["CONVERSATION_DELETED"]:
          this.conversationDeleted(conversation);
          break;
        case enums.ACTIONS["DELETE_CONVERSATION"]:
          this.deleteConversation(conversation);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "deleteConversation", conversation => {
      if (!this.state.showConfirmDialog) {
        this.setState({
          showConfirmDialog: true,
          conversationToBeDeleted: conversation
        });
      }
    });
    _defineProperty(this, "onDeleteConfirm", e => {
      const optionSelected = e.target.value;
      this.setState({
        showConfirmDialog: false
      });
      if (optionSelected === "yes") {
        var _conversation$convers3, _conversation$convers4;
        const conversation = this.state.conversationToBeDeleted;
        const conversationWith = conversation.conversationType === _chat.CometChat.RECEIVER_TYPE.GROUP ? conversation === null || conversation === void 0 || (_conversation$convers3 = conversation.conversationWith) === null || _conversation$convers3 === void 0 ? void 0 : _conversation$convers3.guid : conversation === null || conversation === void 0 || (_conversation$convers4 = conversation.conversationWith) === null || _conversation$convers4 === void 0 ? void 0 : _conversation$convers4.uid;
        _chat.CometChat.deleteConversation(conversationWith, conversation.conversationType).then(deletedConversation => {
          this.conversationDeleted(conversation);
        }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
      } else {
        this.setState({
          showConfirmDialog: false,
          conversationToBeDeleted: null
        });
      }
    });
    _defineProperty(this, "conversationDeleted", conversation => {
      const conversationList = [...this.state.conversationlist];
      const conversationKey = conversationList.findIndex(c => c.conversationId === conversation.conversationId);
      if (conversationKey > -1) {
        if (conversation.conversationType === this.getContext().type && this.getContext().type === _chat.CometChat.RECEIVER_TYPE.USER && conversation.conversationWith.uid === this.getContext().item.uid || conversation.conversationType === this.getContext().type && this.getContext().type === _chat.CometChat.RECEIVER_TYPE.GROUP && conversation.conversationWith.guid === this.getContext().item.guid) {
          this.getContext().setTypeAndItem("", {});
        }
        conversationList.splice(conversationKey, 1);
        this.setState({
          conversationlist: conversationList,
          conversationToBeDeleted: null
        });
      }
    });
    this._isMounted = false;
    this.state = {
      conversationlist: [],
      onItemClick: null,
      hideGroupActionMessages: false,
      showConfirmDialog: false,
      decoratorMessage: _translator.default.translate("LOADING", props.lang),
      conversationToBeDeleted: null
    };
    this.contextProviderRef = /*#__PURE__*/_react.default.createRef();
    this.chatListRef = /*#__PURE__*/_react.default.createRef();
    this.toastRef = /*#__PURE__*/_react.default.createRef();
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => this.setState({
      decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.props.lang)
    }));
  }
  componentDidMount() {
    this._isMounted = true;
    this.item = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER || _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.getContext().item : null;
    this.hideGroupActionMessages();
    this.setState({
      conversationlist: []
    }, () => {
      this.ConversationListManager = new _controller.ConversationListManager(this.getContext());
      this.getConversations();
      this.ConversationListManager.attachListeners(this.conversationCallback);
    });

    //updating last message whenever a message is composed and sent
    _CometChatEvent.CometChatEvent.on("updateLastMessage", args => this.updateLastMessage(args));

    //updating unreadcount whenever a new message is received and not read.
    _CometChatEvent.CometChatEvent.on(enums.EVENTS["NEW_MESSAGES"], args => this.updateUnreadCount(args));

    //clearing unreadcount whenever scrolled to the bottom.
    _CometChatEvent.CometChatEvent.on(enums.EVENTS["CLEAR_UNREAD_MESSAGES"], args => this.clearUnreadCount(args));
  }
  componentDidUpdate() {
    //when a particular chat is selected from the chats list
    if (Object.keys(this.getContext().item).length && this.getContext().type.length || this.getContext().item !== this.item) {
      const conversationlist = [...this.state.conversationlist];
      const conversationObj = this.filterConversation();
      if (conversationObj && conversationObj.unreadMessageCount > 0 && this.incrementUnreadCount === false) {
        let conversationKey = conversationlist.indexOf(conversationObj);
        let newConversationObj = _objectSpread(_objectSpread({}, conversationObj), {}, {
          unreadMessageCount: 0
        });
        conversationlist.splice(conversationKey, 1, newConversationObj);
        this.setState({
          conversationlist: conversationlist
        });
      }
    }

    //if user is blocked/unblocked, update conversationlist in state
    if (this.item && Object.keys(this.item).length && this.item.hasOwnProperty("uid") && this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.item.uid === this.getContext().item.uid && this.item.blockedByMe !== this.getContext().item.blockedByMe) {
      let conversationlist = [...this.state.conversationlist];

      //search for user
      let convKey = conversationlist.findIndex(c => c.conversationType === _chat.CometChat.ACTION_TYPE.TYPE_USER && c.conversationWith.uid === this.getContext().item.uid);
      if (convKey > -1) {
        const convObj = conversationlist[convKey];
        let convWithObj = _objectSpread({}, convObj.conversationWith);
        let newConvWithObj = Object.assign({}, convWithObj, {
          blockedByMe: this.getContext().item.blockedByMe
        });
        let newConvObj = Object.assign({}, convObj, {
          conversationWith: newConvWithObj
        });
        conversationlist.splice(convKey, 1, newConvObj);
        this.setState({
          conversationlist: conversationlist
        });
      }
    }

    //if group detail(membersCount) is updated, update grouplist
    if (this.item && Object.keys(this.item).length && this.item.hasOwnProperty("guid") && this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.item.guid === this.getContext().item.guid && this.item.membersCount !== this.getContext().item.membersCount) {
      const conversationlist = [...this.state.conversationlist];
      let convKey = conversationlist.findIndex(c => c.conversationType === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && c.conversationWith.guid === this.getContext().item.guid);
      if (convKey > -1) {
        const convObj = conversationlist[convKey];
        let convWithObj = _objectSpread({}, convObj.conversationWith);
        let newConvWithObj = Object.assign({}, convWithObj, {
          membersCount: this.getContext().item.membersCount
        });
        let newConvObj = Object.assign({}, convObj, {
          conversationWith: newConvWithObj
        });
        conversationlist.splice(convKey, 1, newConvObj);
        this.setState({
          conversationlist: conversationlist
        });
      }
    }

    //upon user deleting a group, remove group from conversation list
    if (this.getContext().deletedGroupId.trim().length) {
      const guid = this.getContext().deletedGroupId.trim();
      const conversationlist = [...this.state.conversationlist];
      let conversationKey = conversationlist.findIndex(c => c.conversationType === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && c.conversationWith.guid === guid);
      if (conversationKey > -1) {
        conversationlist.splice(conversationKey, 1);
        this.setState({
          conversationlist: conversationlist
        });
      }
    }

    //upon user leaving a group, remove group from conversation list
    if (this.getContext().leftGroupId.trim().length) {
      const guid = this.getContext().leftGroupId.trim();
      const conversationlist = [...this.state.conversationlist];
      let conversationKey = conversationlist.findIndex(c => c.conversationType === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && c.conversationWith.guid === guid);
      if (conversationKey > -1) {
        conversationlist.splice(conversationKey, 1);
        this.setState({
          conversationlist: conversationlist
        });
      }
    }
    this.item = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER || _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.getContext().item : null;
    this.hideGroupActionMessages();
  }
  render() {
    const conversationList = this.state.conversationlist.map((conversation, key) => {
      return /*#__PURE__*/_react.default.createElement(_.CometChatConversationListItem, {
        key: conversation.conversationId,
        conversation: conversation,
        loggedInUser: this.loggedInUser,
        handleClick: this.handleClick,
        actionGenerated: this.actionHandler
      });
    });
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "chats__decorator-message",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "decorator-message",
        m: 0,
        minHeight: "36px",
        color: _theme.theme.color.secondary,
        fontSize: "20px",
        fontWeight: "600",
        lineHeight: "30px",
        wordWrap: "break-word",
        px: 4
      }, this.state.decoratorMessage));
    }
    let closeBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "header__close",
      cursor: "pointer",
      display: "none",
      sx: {
        mask: "url(".concat(_back.default, ") no-repeat left center"),
        backgroundColor: _theme.theme.primaryColor,
        [_theme.theme.breakPoints[0]]: {
          display: "block !important"
        }
      },
      height: "24px",
      width: "33%",
      onClick: this.handleMenuClose
    });
    if (this.getContext() && Object.keys(this.getContext().item).length === 0) {
      closeBtn = null;
    }
    let showConfirmDialog = null;
    if (this.state.showConfirmDialog) {
      showConfirmDialog = /*#__PURE__*/_react.default.createElement(_Shared.CometChatConfirmDialog, _extends({}, this.props, {
        onClick: this.onDeleteConfirm,
        message: _translator.default.translate("DELETE_CONFIRM", this.getContext().language),
        confirmButtonText: _translator.default.translate("DELETE", this.getContext().language),
        cancelButtonText: _translator.default.translate("CANCEL", this.getContext().language)
      }));
    }
    const chatList = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "chats",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxSizing: "border-box",
      sx: _objectSpread(_objectSpread({}, this.props._parent === "" ? {
        border: "1px solid ".concat(_theme.theme.borderColor.primary)
      } : {}), {}, {
        "*": {
          boxSizing: "border-box",
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
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "chats__header",
      p: 4,
      alignItems: "center",
      borderBottom: "1px solid ".concat(_theme.theme.borderColor.primary),
      height: "69px"
    }, closeBtn, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      className: "header__title",
      as: "h4",
      m: 0,
      display: "inline-block",
      width: "100%",
      textAlign: "left",
      fontSize: "22px",
      fontWeight: "700",
      lineHeight: "26px",
      dir: _translator.default.getDirection(this.props.lang),
      sx: _objectSpread(_objectSpread({}, this.props.hasOwnProperty("enableCloseMenu") && this.props.enableCloseMenu.length > 0 ? {
        width: "33%",
        textAlign: "center"
      } : {}), {}, {
        "&[dir=rtl]": {
          textAlign: "right"
        }
      })
    }, _translator.default.translate("CHATS", this.props.lang))), messageContainer, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "chats__list",
      height: "calc(100% - 75px)",
      width: "100%",
      overflowY: "auto",
      m: 0,
      p: 0,
      onScroll: this.handleScroll,
      ref: el => this.chatListRef = el
    }, conversationList), showConfirmDialog, /*#__PURE__*/_react.default.createElement(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.lang
    }));
    let chatListWrapper = chatList;
    //if used as a standalone component, add errorboundary and context provider
    if (this.props._parent === "") {
      chatListWrapper = /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
        ref: el => this.contextProviderRef = el
      }, chatList);
    }
    return chatListWrapper;
  }
}

// Specifies the default values for props:
exports.CometChatConversationList = CometChatConversationList;
_defineProperty(CometChatConversationList, "contextType", _CometChatContext.CometChatContext);
CometChatConversationList.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  onItemClick: () => {},
  _parent: ""
};
CometChatConversationList.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  onItemClick: _propTypes.default.func,
  _parent: _propTypes.default.string
};