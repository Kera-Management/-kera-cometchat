"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundManager = void 0;
require("core-js/modules/web.dom.iterable.js");
var enums = _interopRequireWildcard(require("./enums"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class SoundManager {}
exports.SoundManager = SoundManager;
_defineProperty(SoundManager, "widgetSettings", void 0);
_defineProperty(SoundManager, "incomingCallAudio", null);
_defineProperty(SoundManager, "outgoingCallAudio", null);
_defineProperty(SoundManager, "incomingMessageAudio", null);
_defineProperty(SoundManager, "outgoingMessageAudio", null);
_defineProperty(SoundManager, "incomingOtherMessageAudio", null);
_defineProperty(SoundManager, "play", (action, context) => {
  switch (action) {
    case enums.CONSTANTS.AUDIO["INCOMING_CALL"]:
      SoundManager.onIncomingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["OUTGOING_CALL"]:
      SoundManager.onOutgoingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["INCOMING_MESSAGE"]:
      SoundManager.onIncomingMessage(context);
      break;
    case enums.CONSTANTS.AUDIO["INCOMING_OTHER_MESSAGE"]:
      SoundManager.onIncomingOtherMessage(context);
      break;
    case enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"]:
      SoundManager.onOutgoingMessage(context);
      break;
    default:
      break;
  }
});
_defineProperty(SoundManager, "pause", (action, context) => {
  switch (action) {
    case enums.CONSTANTS.AUDIO["INCOMING_CALL"]:
      SoundManager.pauseIncomingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["OUTGOING_CALL"]:
      SoundManager.pauseOutgoingCall(context);
      break;
    case enums.CONSTANTS.AUDIO["INCOMING_MESSAGE"]:
    case enums.CONSTANTS.AUDIO["INCOMING_OTHER_MESSAGE"]:
    case enums.CONSTANTS.AUDIO["OUTGOING_MESSAGE"]:
    default:
      break;
  }
});
_defineProperty(SoundManager, "onIncomingMessage", context => {
  SoundManager.enableSoundForMessages(context).then(response => {
    if (response === true) {
      if (SoundManager.incomingMessageAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/incomingmessage.wav"))).then(response => {
          SoundManager.incomingMessageAudio = new Audio(response.default);
          SoundManager.playMessageAlert(SoundManager.incomingMessageAudio);
        });
      } else {
        SoundManager.playMessageAlert(SoundManager.incomingMessageAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "onIncomingOtherMessage", context => {
  SoundManager.enableSoundForMessages(context).then(response => {
    if (response === true) {
      if (SoundManager.incomingOtherMessageAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/incomingothermessage.wav"))).then(response => {
          SoundManager.incomingOtherMessageAudio = new Audio(response.default);
          SoundManager.playMessageAlert(SoundManager.incomingOtherMessageAudio);
        });
      } else {
        SoundManager.playMessageAlert(SoundManager.incomingOtherMessageAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "onOutgoingMessage", context => {
  SoundManager.enableSoundForMessages(context).then(response => {
    if (response === true) {
      if (SoundManager.outgoingMessageAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/outgoingmessage.wav"))).then(response => {
          SoundManager.outgoingMessageAudio = new Audio(response.default);
          SoundManager.playMessageAlert(SoundManager.outgoingMessageAudio);
        });
      } else {
        SoundManager.playMessageAlert(SoundManager.outgoingMessageAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "playMessageAlert", messageAudio => {
  messageAudio.currentTime = 0;
  messageAudio.play();
});
_defineProperty(SoundManager, "onIncomingCall", context => {
  SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (SoundManager.incomingCallAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/incomingcall.wav"))).then(response => {
          SoundManager.incomingCallAudio = new Audio(response.default);
          SoundManager.playCallAlert(SoundManager.incomingCallAudio);
        });
      } else {
        SoundManager.playCallAlert(SoundManager.incomingCallAudio);
      }
    }
  });
});
_defineProperty(SoundManager, "onOutgoingCall", context => {
  SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (SoundManager.outgoingCallAudio === null) {
        Promise.resolve().then(() => _interopRequireWildcard(require("../resources/audio/outgoingcall.wav"))).then(response => {
          SoundManager.outgoingCallAudio = new Audio(response.default);
          SoundManager.playCallAlert(SoundManager.outgoingCallAudio);
        });
      } else {
        SoundManager.playCallAlert(SoundManager.outgoingCallAudio);
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
  SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (SoundManager.incomingCallAudio) {
        SoundManager.incomingCallAudio.pause();
      }
    }
  });
});
_defineProperty(SoundManager, "pauseOutgoingCall", context => {
  SoundManager.enableSoundForCalls(context).then(response => {
    if (response === true) {
      if (SoundManager.outgoingCallAudio) {
        SoundManager.outgoingCallAudio.pause();
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