"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationListManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _UIKitSettings = require("../../../util/UIKitSettings");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class ConversationListManager {
  constructor(context) {
    _defineProperty(this, "conversationRequest", null);
    _defineProperty(this, "conversationListenerId", "chatlist_" + new Date().getTime());
    _defineProperty(this, "userListenerId", "chatlist_user_" + new Date().getTime());
    _defineProperty(this, "groupListenerId", "chatlist_group_" + new Date().getTime());
    _defineProperty(this, "callListenerId", "chatlist_call_" + new Date().getTime());
    const chatListMode = context.UIKitSettings.chatListMode;
    const chatListFilterOptions = _UIKitSettings.UIKitSettings.chatListFilterOptions;
    switch (chatListMode) {
      case chatListFilterOptions["USERS"]:
        this.conversationRequest = new _chat.CometChat.ConversationsRequestBuilder().setConversationType(_chat.CometChat.ACTION_TYPE.TYPE_USER).setLimit(30).build();
        break;
      case chatListFilterOptions["GROUPS"]:
        this.conversationRequest = new _chat.CometChat.ConversationsRequestBuilder().setConversationType(_chat.CometChat.ACTION_TYPE.TYPE_GROUP).setLimit(30).build();
        break;
      default:
        this.conversationRequest = new _chat.CometChat.ConversationsRequestBuilder().setLimit(30).build();
        break;
    }
  }
  fetchNextConversation() {
    return this.conversationRequest.fetchNext();
  }
  attachListeners(callback) {
    _chat.CometChat.addUserListener(this.userListenerId, new _chat.CometChat.UserListener({
      onUserOnline: onlineUser => {
        /* when someuser/friend comes online, user will be received here */
        callback(enums.USER_ONLINE, onlineUser);
      },
      onUserOffline: offlineUser => {
        /* when someuser/friend went offline, user will be received here */
        callback(enums.USER_OFFLINE, offlineUser);
      }
    }));
    _chat.CometChat.addGroupListener(this.groupListenerId, new _chat.CometChat.GroupListener({
      onGroupMemberScopeChanged: (message, changedUser, newScope, oldScope, changedGroup) => {
        callback(enums.GROUP_MEMBER_SCOPE_CHANGED, changedGroup, message, {
          "user": changedUser,
          "scope": newScope
        });
      },
      onGroupMemberKicked: (message, kickedUser, kickedBy, kickedFrom) => {
        callback(enums.GROUP_MEMBER_KICKED, kickedFrom, message, {
          "user": kickedUser,
          "hasJoined": false
        });
      },
      onGroupMemberBanned: (message, bannedUser, bannedBy, bannedFrom) => {
        callback(enums.GROUP_MEMBER_BANNED, bannedFrom, message, {
          "user": bannedUser
        });
      },
      onGroupMemberUnbanned: (message, unbannedUser, unbannedBy, unbannedFrom) => {
        callback(enums.GROUP_MEMBER_UNBANNED, unbannedFrom, message, {
          "user": unbannedUser
        });
      },
      onMemberAddedToGroup: (message, userAdded, userAddedBy, userAddedIn) => {
        callback(enums.GROUP_MEMBER_ADDED, userAddedIn, message, {
          "user": userAdded,
          "hasJoined": true
        });
      },
      onGroupMemberLeft: (message, leavingUser, group) => {
        callback(enums.GROUP_MEMBER_LEFT, group, message, {
          "user": leavingUser
        });
      },
      onGroupMemberJoined: (message, joinedUser, joinedGroup) => {
        callback(enums.GROUP_MEMBER_JOINED, joinedGroup, message, {
          "user": joinedUser
        });
      }
    }));
    _chat.CometChat.addMessageListener(this.conversationListenerId, new _chat.CometChat.MessageListener({
      onTextMessageReceived: textMessage => {
        callback(enums.TEXT_MESSAGE_RECEIVED, null, textMessage);
      },
      onMediaMessageReceived: mediaMessage => {
        callback(enums.MEDIA_MESSAGE_RECEIVED, null, mediaMessage);
      },
      onCustomMessageReceived: customMessage => {
        callback(enums.CUSTOM_MESSAGE_RECEIVED, null, customMessage);
      },
      onMessageDeleted: deletedMessage => {
        callback(enums.MESSAGE_DELETED, null, deletedMessage);
      },
      onMessageEdited: editedMessage => {
        callback(enums.MESSAGE_EDITED, null, editedMessage);
      },
      onMessagesRead: messageReceipt => {
        callback(enums.MESSAGE_READ, null, messageReceipt);
      }
    }));
    _chat.CometChat.addCallListener(this.callListenerId, new _chat.CometChat.CallListener({
      onIncomingCallReceived: call => {
        callback(enums.INCOMING_CALL_RECEIVED, null, call);
      },
      onIncomingCallCancelled: call => {
        callback(enums.INCOMING_CALL_CANCELLED, null, call);
      }
    }));
  }
  removeListeners() {
    _chat.CometChat.removeMessageListener(this.conversationListenerId);
    _chat.CometChat.removeUserListener(this.userListenerId);
    _chat.CometChat.removeGroupListener(this.groupListenerId);
    _chat.CometChat.removeCallListener(this.callListenerId);
  }
}
exports.ConversationListManager = ConversationListManager;