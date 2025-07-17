"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddMembersManager = void 0;
require("core-js/modules/es.promise.js");
var _chat = require("@cometchat-pro/chat");
var _UIKitSettings = require("../../../util/UIKitSettings");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class AddMembersManager {
  constructor(context, searchKey) {
    _defineProperty(this, "membersRequest", null);
    _defineProperty(this, "userListenerId", new Date().getTime());
    _defineProperty(this, "initializeMembersRequest", () => {
      const userListModeOptions = _UIKitSettings.UIKitSettings.userListFilterOptions;
      const userListMode = userListModeOptions.FRIENDS;
      return new Promise((resolve, reject) => {
        if (userListMode === userListModeOptions["ALL"]) {
          if (this.searchKey) {
            this.membersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).setSearchKeyword(this.searchKey).build();
          } else {
            this.membersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).build();
          }
          return resolve(this.membersRequest);
        } else if (userListMode === userListModeOptions["FRIENDS"]) {
          if (this.searchKey) {
            this.membersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).friendsOnly(true).setSearchKeyword(this.searchKey).build();
          } else {
            this.membersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).friendsOnly(true).build();
          }
          return resolve(this.membersRequest);
        } else {
          return reject({
            message: "Invalid filter for userlist"
          });
        }
      });
    });
    this.context = context;
    this.searchKey = searchKey;
  }
  fetchNextUsers() {
    return this.membersRequest.fetchNext();
  }
  attachListeners(callback) {
    _chat.CometChat.addUserListener(this.userListenerId, new _chat.CometChat.UserListener({
      onUserOnline: onlineUser => {
        /* when someuser/friend comes online, user will be received here */
        callback(onlineUser);
      },
      onUserOffline: offlineUser => {
        /* when someuser/friend went offline, user will be received here */
        callback(offlineUser);
      }
    }));
  }
  removeListeners() {
    _chat.CometChat.removeUserListener(this.userListenerId);
  }
}
exports.AddMembersManager = AddMembersManager;