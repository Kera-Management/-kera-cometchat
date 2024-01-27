"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatIncomingCall = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _CometChatCallScreen = require("../CometChatCallScreen");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _SoundManager = require("../../../util/SoundManager");
var _Storage = require("../../../util/Storage");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _incomingCall = _interopRequireDefault(require("./resources/incoming-call.svg"));
var _incomingVideoCall = _interopRequireDefault(require("./resources/incoming-video-call.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatIncomingCall extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "adjustFontSize", () => {
      if (this.callButtonRef && this.callButtonRef.current) {
        let reduceFontSize = false;
        const buttonNodeList = this.callButtonRef.current.querySelectorAll("button");
        buttonNodeList.forEach(buttonNode => {
          const parentContainerWidth = buttonNode.clientWidth;
          const currentTextWidth = buttonNode.scrollWidth;
          if (parentContainerWidth < currentTextWidth) {
            reduceFontSize = true;
          }
        });
        if (reduceFontSize) {
          buttonNodeList.forEach(buttonNode => {
            buttonNode.style.fontSize = "85%";
          });
        }
      }
    });
    _defineProperty(this, "callScreenUpdated", (key, call) => {
      switch (key) {
        case enums.INCOMING_CALL_RECEIVED:
          //occurs at the callee end
          this.incomingCallReceived(call);
          break;
        case enums.INCOMING_CALL_CANCELLED:
          //occurs(call dismissed) at the callee end, caller cancels the call
          this.incomingCallCancelled(call);
          break;
        case enums.OUTGOING_CALL_ACCEPTED:
          //occurs(call dismissed) at the callee end, caller cancels the call
          this.outgoingCallAccepted(call);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "incomingCallReceived", incomingCall => {
      if (this._isMounted) {
        if (this.state.incomingCall === null) {
          var _this$loggedInUser;
          if ((incomingCall === null || incomingCall === void 0 ? void 0 : incomingCall.callInitiator.uid) !== ((_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid)) {
            _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
            this.setState({
              incomingCall: incomingCall
            });
          }
        }
      }
    });
    _defineProperty(this, "incomingCallCancelled", call => {
      if (this._isMounted) {
        //we are not marking this as read as it will done in messagelist component
        _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
        this.setState({
          incomingCall: null
        });
      }
    });
    _defineProperty(this, "outgoingCallAccepted", call => {
      var _call$sender, _this$loggedInUser2;
      if (((_call$sender = call.sender) === null || _call$sender === void 0 ? void 0 : _call$sender.uid) === ((_this$loggedInUser2 = this.loggedInUser) === null || _this$loggedInUser2 === void 0 ? void 0 : _this$loggedInUser2.uid)) {
        if (this._isMounted) {
          //we are not marking this as read as it will done in messagelist component
          _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
          this.setState({
            incomingCall: null
          });
        }
      }
    });
    _defineProperty(this, "rejectCall", () => {
      _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
      let callStatus = this.isCallActive() ? _chat.CometChat.CALL_STATUS.BUSY : _chat.CometChat.CALL_STATUS.REJECTED;
      _chat.CometChat.rejectCall(this.state.incomingCall.sessionId, callStatus).then(rejectedCall => {
        if (this.isCallActive() === false) {
          if (this.context) {
            this.context.setCallInProgress(null, "");
          }
          _Storage.Storage.setItem(enums.CONSTANTS["ACTIVECALL"], rejectedCall);
          this.props.actionGenerated(enums.ACTIONS["INCOMING_CALL_REJECTED"], rejectedCall);
          this.setState({
            callInProgress: null
          });
        }
        this.setState({
          incomingCall: null
        });
      }).catch(error => {
        this.setState({
          incomingCall: null,
          callInProgress: null
        });
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
    });
    _defineProperty(this, "acceptCall", () => {
      this.checkForActiveCallAndEndCall().then(response => {
        _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
        _chat.CometChat.acceptCall(this.state.incomingCall.sessionId).then(call => {
          if (this.context) {
            this.context.setCallInProgress(call, enums.CONSTANTS["INCOMING_DEFAULT_CALLING"]);
          }
          _Storage.Storage.setItem(enums.CONSTANTS["ACTIVECALL"], call);
          this.props.actionGenerated(enums.ACTIONS["INCOMING_CALL_ACCEPTED"], call);
          this.setState({
            incomingCall: null,
            callInProgress: call
          });
        }).catch(error => {
          if (this.context) {
            this.context.setCallInProgress(null, "");
          }
          this.setState({
            incomingCall: null,
            callInProgress: null
          });
          const errorCode = error && error.hasOwnProperty("code") ? error.code : "ERROR";
          this.context.setToastMessage("error", errorCode);
        });
      }).catch(error => {
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
    });
    _defineProperty(this, "isCallActive", () => {
      if (Object.keys(this.context.callInProgress).length === 0) {
        return false;
      }
      let sessionID = this.getActiveCallSessionID();
      if (!sessionID) {
        return false;
      }
      return true;
    });
    _defineProperty(this, "getActiveCallSessionID", () => {
      return this.context.getActiveCallSessionID();
    });
    _defineProperty(this, "checkForActiveCallAndEndCall", () => {
      const promise = new Promise((resolve, reject) => {
        if (this.isCallActive() === false) {
          return resolve({
            success: true
          });
        }
        let sessionID = this.getActiveCallSessionID();
        _chat.CometChat.endCall(sessionID).then(response => {
          return resolve(response);
        }).catch(error => {
          return reject(error);
        });
      });
      return promise;
    });
    _defineProperty(this, "actionHandler", (action, call) => {
      switch (action) {
        case enums.ACTIONS["OUTGOING_CALL_ENDED"]:
          this.setState({
            callInProgress: null
          });
          break;
        case enums.ACTIONS["USER_JOINED_CALL"]:
        case enums.ACTIONS["USER_LEFT_CALL"]:
          this.props.actionGenerated(action, call);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "logStorageChange", event => {
      if ((event === null || event === void 0 ? void 0 : event.key) !== enums.CONSTANTS["ACTIVECALL"]) {
        return false;
      }
      if (event.newValue || event.oldValue) {
        var _this$state$incomingC, _call;
        let call;
        if (event.newValue) {
          call = JSON.parse(event.newValue);
        } else if (event.oldValue) {
          call = JSON.parse(event.oldValue);
        }
        if (((_this$state$incomingC = this.state.incomingCall) === null || _this$state$incomingC === void 0 ? void 0 : _this$state$incomingC.getSessionId()) === ((_call = call) === null || _call === void 0 ? void 0 : _call.sessionId)) {
          _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
          this.setState({
            incomingCall: null
          });
        }
      }
    });
    this._isMounted = false;
    this.state = {
      incomingCall: null,
      callInProgress: null
    };
    this.callButtonRef = /*#__PURE__*/_react.default.createRef();
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => {
      console.error(error);
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this.CallAlertManager = new _controller.CallAlertManager();
    this.CallAlertManager.attachListeners(this.callScreenUpdated);
    _Storage.Storage.attachChangeDetection(this.logStorageChange);
  }
  componentDidUpdate() {
    if (this.state.incomingCall) {
      this.adjustFontSize();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    _Storage.Storage.detachChangeDetection(this.logStorageChange);
  }
  render() {
    let callScreen = null,
      incomingCallAlert = null;
    if (this.state.incomingCall) {
      let callType = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("i", {
        css: (0, _style.callIconStyle)(_incomingCall.default, this.context),
        title: _translator.default.translate("INCOMING_AUDIO_CALL", this.props.lang)
      }), (0, _react2.jsx)("span", null, _translator.default.translate("INCOMING_AUDIO_CALL", this.props.lang)));
      if (this.state.incomingCall.type === _chat.CometChat.CALL_TYPE.VIDEO) {
        callType = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("i", {
          css: (0, _style.callIconStyle)(_incomingVideoCall.default, this.context),
          title: _translator.default.translate("INCOMING_VIDEO_CALL", this.props.lang)
        }), (0, _react2.jsx)("span", null, _translator.default.translate("INCOMING_VIDEO_CALL", this.props.lang)));
      }
      incomingCallAlert = (0, _react2.jsx)("div", {
        css: (0, _style.incomingCallWrapperStyle)(this.props, _react2.keyframes),
        className: "callalert__wrapper"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.callContainerStyle)(),
        className: "callalert__container"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.headerWrapperStyle)(),
        className: "callalert__header"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.callDetailStyle)(),
        className: "header__detail"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.nameStyle)(),
        className: "name"
      }, this.state.incomingCall.sender.name), (0, _react2.jsx)("div", {
        css: (0, _style.callTypeStyle)(this.props),
        className: "calltype"
      }, callType)), (0, _react2.jsx)("div", {
        css: (0, _style.thumbnailStyle)(),
        className: "header__thumbnail"
      }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
        user: this.state.incomingCall.sender
      }))), (0, _react2.jsx)("div", {
        css: (0, _style.headerButtonStyle)(),
        className: "callalert__buttons",
        ref: this.callButtonRef
      }, (0, _react2.jsx)("button", {
        type: "button",
        css: (0, _style.ButtonStyle)(this.props, 0),
        className: "button button__decline",
        onClick: () => this.rejectCall(this.state.incomingCall, _chat.CometChat.CALL_STATUS.REJECTED)
      }, _translator.default.translate("DECLINE", this.props.lang)), (0, _react2.jsx)("button", {
        type: "button",
        css: (0, _style.ButtonStyle)(this.props, 1),
        className: "button button__accept",
        onClick: this.acceptCall
      }, _translator.default.translate("ACCEPT", this.props.lang)))));
    }
    if (this.state.callInProgress) {
      callScreen = (0, _react2.jsx)(_CometChatCallScreen.CometChatCallScreen, {
        loggedInUser: this.loggedInUser,
        call: this.state.callInProgress,
        lang: this.props.lang,
        actionGenerated: this.actionHandler,
        widgetsettings: this.props.widgetsettings
      });
    }
    return (0, _react2.jsx)(_react.default.Fragment, null, incomingCallAlert, callScreen);
  }
}

// Specifies the default values for props:
exports.CometChatIncomingCall = CometChatIncomingCall;
_defineProperty(CometChatIncomingCall, "contextType", _CometChatContext.CometChatContext);
CometChatIncomingCall.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  widgetsettings: {}
};
CometChatIncomingCall.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  widgetsettings: _propTypes.default.object
};