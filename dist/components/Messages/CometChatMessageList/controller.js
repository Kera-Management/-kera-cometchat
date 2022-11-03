"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageListManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _MessageFilter = _interopRequireDefault(require("./MessageFilter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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