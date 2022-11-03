"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupDetailManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class GroupDetailManager {
  constructor(guid) {
    _defineProperty(this, "guid", null);
    _defineProperty(this, "groupMemberRequest", null);
    _defineProperty(this, "bannedGroupMemberRequest", null);
    _defineProperty(this, "userListenerId", "group_detail_user_" + new Date().getTime());
    _defineProperty(this, "groupListenerId", "group_detail_group_" + new Date().getTime());
    this.guid = guid;
    this.groupMemberRequest = new _chat.CometChat.GroupMembersRequestBuilder(guid).setLimit(10).build();
    this.bannedGroupMemberRequest = new _chat.CometChat.BannedMembersRequestBuilder(guid).setLimit(10).build();
  }
  fetchNextGroupMembers() {
    return this.groupMemberRequest.fetchNext();
  }
  fetchNextBannedGroupMembers() {
    return this.bannedGroupMemberRequest.fetchNext();
  }
  attachListeners(callback) {
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
          "user": unbannedUser,
          "hasJoined": false
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
    _chat.CometChat.addUserListener(this.userListenerId, new _chat.CometChat.UserListener({
      onUserOnline: onlineUser => {
        /* when someuser/friend comes online, user will be received here */
        callback(enums.USER_ONLINE, null, {
          guid: this.guid
        }, {
          "user": onlineUser
        });
      },
      onUserOffline: offlineUser => {
        /* when someuser/friend went offline, user will be received here */
        callback(enums.USER_OFFLINE, null, {
          guid: this.guid
        }, {
          "user": offlineUser
        });
      }
    }));
  }
  removeListeners() {
    _chat.CometChat.removeUserListener(this.userListenerId);
    _chat.CometChat.removeGroupListener(this.groupListenerId);
  }
}
exports.GroupDetailManager = GroupDetailManager;