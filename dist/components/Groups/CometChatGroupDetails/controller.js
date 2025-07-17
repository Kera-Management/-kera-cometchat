"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupDetailManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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