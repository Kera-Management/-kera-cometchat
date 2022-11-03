"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserListManager = void 0;
var _chat = require("@cometchat-pro/chat");
var _UIKitSettings = require("../../../util/UIKitSettings");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class UserListManager {
  constructor(context, searchKey) {
    _defineProperty(this, "userRequest", null);
    _defineProperty(this, "userListenerId", "userlist_" + new Date().getTime());
    _defineProperty(this, "initializeUsersRequest", () => {
      const userListModeOptions = _UIKitSettings.UIKitSettings.userListFilterOptions;
      const userListMode = userListModeOptions.FRIENDS;
      return new Promise((resolve, reject) => {
        if (userListMode === userListModeOptions["ALL"]) {
          if (this.searchKey) {
            this.usersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).setSearchKeyword(this.searchKey).build();
          } else {
            this.usersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).build();
          }
          return resolve(this.usersRequest);
        } else if (userListMode === userListModeOptions["FRIENDS"]) {
          if (this.searchKey) {
            this.usersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).friendsOnly(true).setSearchKeyword(this.searchKey).build();
          } else {
            this.usersRequest = new _chat.CometChat.UsersRequestBuilder().setLimit(30).friendsOnly(true).build();
          }
          return resolve(this.usersRequest);
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
    return this.usersRequest.fetchNext();
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
exports.UserListManager = UserListManager;