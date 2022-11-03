"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupListManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class GroupListManager {
  constructor(searchKey) {
    _defineProperty(this, "groupRequest", null);
    _defineProperty(this, "groupListenerId", "grouplist_" + new Date().getTime());
    if (searchKey) {
      this.groupRequest = new _chat.CometChat.GroupsRequestBuilder().setLimit(30).setSearchKeyword(searchKey).build();
    } else {
      this.groupRequest = new _chat.CometChat.GroupsRequestBuilder().setLimit(30).build();
    }
  }
  fetchNextGroups() {
    return this.groupRequest.fetchNext();
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
          "user": bannedUser,
          "hasJoined": false
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
  }
  removeListeners() {
    _chat.CometChat.removeGroupListener(this.groupListenerId);
  }
}
exports.GroupListManager = GroupListManager;