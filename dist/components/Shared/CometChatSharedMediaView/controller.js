"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SharedMediaManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class SharedMediaManager {
  constructor(item, type, messagetype) {
    _defineProperty(this, "mediaMessageListenerId", new Date().getTime());
    _defineProperty(this, "mediaMessageRequest", null);
    if (type === "user") {
      this.mediaMessageRequest = new _chat.CometChat.MessagesRequestBuilder().setUID(item.uid).setLimit(10).setCategory("message").setType(messagetype).build();
    } else {
      this.mediaMessageRequest = new _chat.CometChat.MessagesRequestBuilder().setGUID(item.guid).setLimit(10).setCategory("message").setType(messagetype).build();
    }
  }
  fetchPreviousMessages() {
    return this.mediaMessageRequest.fetchPrevious();
  }
  attachListeners(callback) {
    _chat.CometChat.addMessageListener(this.msgListenerId, new _chat.CometChat.MessageListener({
      onMediaMessageReceived: mediaMessage => {
        callback(enums.MEDIA_MESSAGE_RECEIVED, mediaMessage);
      },
      onMessageDeleted: deletedMessage => {
        callback(enums.MESSAGE_DELETED, deletedMessage);
      }
    }));
  }
  removeListeners() {
    _chat.CometChat.removeMessageListener(this.mediaMessageListenerId);
  }
}
exports.SharedMediaManager = SharedMediaManager;