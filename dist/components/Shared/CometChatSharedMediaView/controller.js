"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SharedMediaManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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