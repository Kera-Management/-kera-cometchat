"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CometChatManager = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.promise.js");
var _chat = require("@cometchat-pro/chat");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatManager {
  constructor() {
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "isUserLoggedIn", void 0);
  }
  getLoggedInUser() {
    let timerCounter = 10000;
    let timer = 0;
    return new Promise((resolve, reject) => {
      console.log(!_chat.CometChat.isInitialized());
      if (timerCounter === timer) reject("timer reached ".concat(timerCounter));
      if (this.loggedInUser) resolve(this.loggedInUser);
      if (!_chat.CometChat.isInitialized()) reject("CometChat not initialized");
      this.isUserLoggedIn = setInterval(() => {
        _chat.CometChat.getLoggedinUser().then(user => {
          this.loggedInUser = user;
          clearInterval(this.isUserLoggedIn);
          resolve(user);
        }, error => {
          console.log(error);
          reject(error);
        });
        timer += 100;
      }, 100);
    });
  }
}
exports.CometChatManager = CometChatManager;
_defineProperty(CometChatManager, "blockUsers", userList => {
  let promise = new Promise((resolve, reject) => {
    _chat.CometChat.blockUsers(userList).then(list => resolve(list), error => reject(error));
  });
  return promise;
});
_defineProperty(CometChatManager, "unblockUsers", userList => {
  let promise = new Promise((resolve, reject) => {
    _chat.CometChat.unblockUsers(userList).then(list => resolve(list), error => reject(error));
  });
  return promise;
});
_defineProperty(CometChatManager, "call", (receiverID, receiverType, callType) => {
  let promise = new Promise((resolve, reject) => {
    const call = new _chat.CometChat.Call(receiverID, callType, receiverType);
    _chat.CometChat.initiateCall(call).then(call => resolve(call), error => reject(error));
  });
  return promise;
});
_defineProperty(CometChatManager, "audioCall", (receiverID, receiverType, callType) => {
  let promise = new Promise((resolve, reject) => {
    const call = new _chat.CometChat.Call(receiverID, callType, receiverType);
    _chat.CometChat.initiateCall(call).then(call => resolve(call), error => reject(error));
  });
  return promise;
});
_defineProperty(CometChatManager, "videoCall", (receiverID, receiverType, callType) => {
  let promise = new Promise((resolve, reject) => {
    const call = new _chat.CometChat.Call(receiverID, callType, receiverType);
    _chat.CometChat.initiateCall(call).then(call => resolve(call), error => reject(error));
  });
  return promise;
});
_defineProperty(CometChatManager, "acceptCall", sessionId => {
  let promise = new Promise((resolve, reject) => {
    _chat.CometChat.acceptCall(sessionId).then(call => resolve(call), error => reject(error));
  });
  return promise;
});
_defineProperty(CometChatManager, "rejectCall", (sessionId, rejectStatus) => {
  let promise = new Promise((resolve, reject) => {
    _chat.CometChat.rejectCall(sessionId, rejectStatus).then(call => resolve(call), error => reject(error));
  });
  return promise;
});
var _default = exports.default = CometChatManager;