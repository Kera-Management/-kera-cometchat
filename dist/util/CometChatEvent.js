"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatEvent = void 0;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatEvent {
  static on(event, callback) {
    if (!CometChatEvent._triggers[event]) CometChatEvent._triggers[event] = [];
    CometChatEvent._triggers[event].push(callback);
  }
  static triggerHandler(event, params) {
    if (CometChatEvent._triggers[event]) {
      for (const i in CometChatEvent._triggers[event]) CometChatEvent._triggers[event][i](params);
    }
  }
}
exports.CometChatEvent = CometChatEvent;
_defineProperty(CometChatEvent, "_triggers", {});