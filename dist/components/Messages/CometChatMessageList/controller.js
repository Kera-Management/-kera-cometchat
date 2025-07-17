"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageListManager = void 0;
require("core-js/modules/es.promise.js");
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _MessageFilter = _interopRequireDefault(require("./MessageFilter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class MessageListManager {
  constructor(context, item, type, parentMessageId) {
    _defineProperty(this, "item", {});
    _defineProperty(this, "type", "");
    _defineProperty(this, "parentMessageId", null);
    _defineProperty(this, "messageRequest", null);
    _defineProperty(this, "limit", 30);
    _defineProperty(this, "msgListenerId", "message_" + new Date().getTime());
    _defineProperty(this, "groupListenerId", "group_" + new Date().getTime());
    _defineProperty(this, "callListenerId", "call_" + new Date().getTime());
    _defineProperty(this, "initializeMessageRequest", () => {
      return new Promise(resolve => {
        let categories = {};
        let types = {};
        let messageFilterManager = new _MessageFilter.default(this.context);
        messageFilterManager.getCategories().then(categoryList => categories = Object.keys(categoryList)).then(() => messageFilterManager.getTypes()).then(typeList => types = Object.keys(typeList)).then(() => this.context.FeatureRestriction.isHideDeletedMessagesEnabled()).then(hideDeletedMessages => {
          if (this.type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
            if (this.parentMessageId) {
              this.messageRequest = new _chat.CometChat.MessagesRequestBuilder().setUID(this.item.uid).setParentMessageId(this.parentMessageId).setCategories(categories).setTypes(types).hideDeletedMessages(hideDeletedMessages).setLimit(this.limit).build();
            } else {
              this.messageRequest = new _chat.CometChat.MessagesRequestBuilder().setUID(this.item.uid).setCategories(categories).setTypes(types).hideReplies(true).hideDeletedMessages(hideDeletedMessages).setLimit(this.limit).build();
            }
            resolve(this.messageRequest);
          } else if (this.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
            if (this.parentMessageId) {
              this.messageRequest = new _chat.CometChat.MessagesRequestBuilder().setGUID(this.item.guid).setParentMessageId(this.parentMessageId).setCategories(categories).setTypes(types).hideDeletedMessages(hideDeletedMessages).setLimit(this.limit).build();
            } else {
              this.messageRequest = new _chat.CometChat.MessagesRequestBuilder().setGUID(this.item.guid).setCategories(categories).setTypes(types).hideReplies(true).hideDeletedMessages(hideDeletedMessages).setLimit(this.limit).build();
            }
            resolve(this.messageRequest);
          }
        });
      });
    });
    this.item = item;
    this.type = type;
    this.parentMessageId = parentMessageId;
    this.context = context;
  }
  fetchPreviousMessages() {
    return this.messageRequest.fetchPrevious();
  }
  attachListeners(callback) {
    _chat.CometChat.addMessageListener(this.msgListenerId, new _chat.CometChat.MessageListener({
      onTextMessageReceived: textMessage => {
        callback(enums.TEXT_MESSAGE_RECEIVED, textMessage);
      },
      onMediaMessageReceived: mediaMessage => {
        callback(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
      },
      onCustomMessageReceived: customMessage => {
        callback(enums.CUSTOM_MESSAGE_RECEIVED, customMessage);
      },
      onMessagesDelivered: messageReceipt => {
        callback(enums.MESSAGE_DELIVERED, messageReceipt);
      },
      onMessagesRead: messageReceipt => {
        callback(enums.MESSAGE_READ, messageReceipt);
      },
      onMessageDeleted: deletedMessage => {
        callback(enums.MESSAGE_DELETED, deletedMessage);
      },
      onMessageEdited: editedMessage => {
        callback(enums.MESSAGE_EDITED, editedMessage);
      },
      onTransientMessageReceived: transientMessage => {
        callback(enums.TRANSIENT_MESSAGE_RECEIVED, transientMessage);
      }
    }));
    _chat.CometChat.addGroupListener(this.groupListenerId, new _chat.CometChat.GroupListener({
      onGroupMemberScopeChanged: (message, changedUser, newScope, oldScope, changedGroup) => {
        callback(enums.GROUP_MEMBER_SCOPE_CHANGED, message, changedGroup, {
          "user": changedUser,
          "scope": newScope
        });
      },
      onGroupMemberKicked: (message, kickedUser, kickedBy, kickedFrom) => {
        callback(enums.GROUP_MEMBER_KICKED, message, kickedFrom, {
          "user": kickedUser,
          "hasJoined": false
        });
      },
      onGroupMemberBanned: (message, bannedUser, bannedBy, bannedFrom) => {
        callback(enums.GROUP_MEMBER_BANNED, message, bannedFrom, {
          "user": bannedUser
        });
      },
      onGroupMemberUnbanned: (message, unbannedUser, unbannedBy, unbannedFrom) => {
        callback(enums.GROUP_MEMBER_UNBANNED, message, unbannedFrom, {
          "user": unbannedUser
        });
      },
      onMemberAddedToGroup: (message, userAdded, userAddedBy, userAddedIn) => {
        callback(enums.GROUP_MEMBER_ADDED, message, userAddedIn, {
          "user": userAdded,
          "hasJoined": true
        });
      },
      onGroupMemberLeft: (message, leavingUser, group) => {
        callback(enums.GROUP_MEMBER_LEFT, message, group, {
          "user": leavingUser
        });
      },
      onGroupMemberJoined: (message, joinedUser, joinedGroup) => {
        callback(enums.GROUP_MEMBER_JOINED, message, joinedGroup, {
          "user": joinedUser
        });
      }
    }));
    _chat.CometChat.addCallListener(this.callListenerId, new _chat.CometChat.CallListener({
      onIncomingCallReceived: call => {
        callback(enums.INCOMING_CALL_RECEIVED, call);
      },
      onIncomingCallCancelled: call => {
        callback(enums.INCOMING_CALL_CANCELLED, call);
      },
      onOutgoingCallAccepted: call => {
        callback(enums.OUTGOING_CALL_ACCEPTED, call);
      },
      onOutgoingCallRejected: call => {
        callback(enums.OUTGOING_CALL_REJECTED, call);
      }
    }));
  }
  removeListeners() {
    _chat.CometChat.removeMessageListener(this.msgListenerId);
    _chat.CometChat.removeGroupListener(this.groupListenerId);
    _chat.CometChat.removeCallListener(this.callListenerId);
  }
}
exports.MessageListManager = MessageListManager;