"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundManager = void 0;
require("core-js/modules/es.promise.js");
var enums = _interopRequireWildcard(require("./enums"));
var _SoundManager;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class SoundManager {}
exports.SoundManager = SoundManager;
_SoundManager = SoundManager;
_defineProperty(SoundManager, "widgetSettings", void 0);
_defineProperty(SoundManager, "incomingCallAudio", null);
_defineProperty(SoundManager, "outgoingCallAudio", null);
_defineProperty(SoundManager, "incomingMessageAudio", null);
_defineProperty(SoundManager, "outgoingMessageAudio", null);
_defineProperty(SoundManager, "incomingOtherMessageAudio", null);
_defineProperty(SoundManager, "play", (action, context) => {
  switch (action) {
    case enums.CONSTANTS.AUDIO["INCOMING_CALL"]:
      _SoundManager.onIncomingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["OUTGOING_CALL"]:
      _SoundManager.onOutgoingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["INCOMING_MESSAGE"]:
      _SoundManager.onIncomingMessage(context);
      break;
    case enums.CONSTANTS.AUDIO["INCOMING_OTHER_MESSAGE"]:
      _SoundManager.onIncomingOtherMessage(context);
      break;
    case enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"]:
      _SoundManager.onOutgoingMessage(context);
      break;
    default:
      break;
  }
});
_defineProperty(SoundManager, "pause", (action, context) => {
  switch (action) {
    case enums.CONSTANTS.AUDIO["INCOMING_CALL"]:
      _SoundManager.pauseIncomingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["OUTGOING_CALL"]:
      _SoundManager.pauseOutgoingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["INCOMING_MESSAGE"]:
    case enums.CONSTANTS.AUDIO["INCOMING_OTHER_MESSAGE"]:
    case enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"]:
    default:
      break;
  }
});
_defineProperty(SoundManager, "onIncomingMessage", context => {
  _SoundManager.enableSoundForMessages(context).then(response => {
    if (response === true) {
      if (_SoundManager.incomingMessageAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/incomingmessage.wav"))).then(response => {
          _SoundManager.incomingMessageAudio = new Audio(response.default);
          _SoundManager.playMessageAlert(_SoundManager.incomingMessageAudio);
        });
      } else {
        _SoundManager.playMessageAlert(_SoundManager.incomingMessageAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "onIncomingOtherMessage", context => {
  _SoundManager.enableSoundForMessages(context).then(response => {
    if (response === true) {
      if (_SoundManager.incomingOtherMessageAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/incomingothermessage.wav"))).then(response => {
          _SoundManager.incomingOtherMessageAudio = new Audio(response.default);
          _SoundManager.playMessageAlert(_SoundManager.incomingOtherMessageAudio);
        });
      } else {
        _SoundManager.playMessageAlert(_SoundManager.incomingOtherMessageAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "onOutgoingMessage", context => {
  _SoundManager.enableSoundForMessages(context).then(response => {
    if (response === true) {
      if (_SoundManager.outgoingMessageAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/outgoingmessage.wav"))).then(response => {
          _SoundManager.outgoingMessageAudio = new Audio(response.default);
          _SoundManager.playMessageAlert(_SoundManager.outgoingMessageAudio);
        });
      } else {
        _SoundManager.playMessageAlert(_SoundManager.outgoingMessageAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "playMessageAlert", messageAudio => {
  messageAudio.currentTime = 0;
  messageAudio.play();
});
_defineProperty(SoundManager, "onIncomingCall", context => {
  _SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (_SoundManager.incomingCallAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/incomingcall.wav"))).then(response => {
          _SoundManager.incomingCallAudio = new Audio(response.default);
          _SoundManager.playCallAlert(_SoundManager.incomingCallAudio);
        });
      } else {
        _SoundManager.playCallAlert(_SoundManager.incomingCallAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "onOutgoingCall", context => {
  _SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (_SoundManager.outgoingCallAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/outgoingcall.wav"))).then(response => {
          _SoundManager.outgoingCallAudio = new Audio(response.default);
          _SoundManager.playCallAlert(_SoundManager.outgoingCallAudio);
        });
      } else {
        _SoundManager.playCallAlert(_SoundManager.outgoingCallAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "playCallAlert", callAudio => {
  try {
    callAudio.currentTime = 0;
    if (typeof callAudio.loop == "boolean") {
      callAudio.loop = true;
    } else {
      callAudio.addEventListener("ended", function () {
        this.currentTime = 0;
        this.play();
      }, false);
    }
    callAudio.play();
  } catch (error) {}
});
_defineProperty(SoundManager, "pauseIncomingCall", context => {
  _SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (_SoundManager.incomingCallAudio) {
        _SoundManager.incomingCallAudio.pause();
      }
    }
  });
});
_defineProperty(SoundManager, "pauseOutgoingCall", context => {
  _SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (_SoundManager.outgoingCallAudio) {
        _SoundManager.outgoingCallAudio.pause();
      }
    }
  });
});
_defineProperty(SoundManager, "enableSoundForCalls", context => {
  return new Promise(resolve => {
    context.FeatureRestriction.isCallsSoundEnabled().then(response => resolve(response)).catch(error => resolve(false));
  });
});
_defineProperty(SoundManager, "enableSoundForMessages", context => {
  return new Promise(resolve => {
    context.FeatureRestriction.isMessagesSoundEnabled().then(response => resolve(response)).catch(error => resolve(false));
  });
});