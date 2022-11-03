"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallAlertManager = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CallAlertManager {
  constructor() {
    _defineProperty(this, "callListenerId", "incoming_call_" + new Date().getTime());
  }
  attachListeners(callback) {
    _chat.CometChat.addCallListener(this.callListenerId, new _chat.CometChat.CallListener({
      onIncomingCallReceived: call => {
        callback(enums.INCOMING_CALL_RECEIVED, call);
      },
      onIncomingCallCancelled: call => {
        callback(enums.INCOMING_CALL_CANCELLED, call);
      },
      onOutgoingCallAccepted: call => {
        callback(enums.OUTGOING_CALL_ACCEPTED, call);
      }
    }));
  }
  removeListeners() {
    _chat.CometChat.removeCallListener(this.callListenerId);
  }
}
exports.CallAlertManager = CallAlertManager;