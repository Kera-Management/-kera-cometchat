"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatIncomingCall = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
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
var _incomingCall = _interopRequireDefault(require("./resources/incoming-call.svg"));
var _incomingVideoCall = _interopRequireDefault(require("./resources/incoming-video-call.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      let callType = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        w: "24px",
        h: "24px",
        display: "inline-block",
        cursor: "pointer",
        bg: this.context.theme.secondaryTextColor,
        title: _translator.default.translate("INCOMING_AUDIO_CALL", this.props.lang),
        sx: {
          mask: "url(".concat(_incomingCall.default, ") center center no-repeat")
        }
      }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
        p: "0 5px"
      }, _translator.default.translate("INCOMING_AUDIO_CALL", this.props.lang)));
      if (this.state.incomingCall.type === _chat.CometChat.CALL_TYPE.VIDEO) {
        callType = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          w: "24px",
          h: "24px",
          display: "inline-block",
          cursor: "pointer",
          bg: this.context.theme.secondaryTextColor,
          title: _translator.default.translate("INCOMING_VIDEO_CALL", this.props.lang),
          sx: {
            mask: "url(".concat(_incomingVideoCall.default, ") center center no-repeat")
          }
        }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
          p: "0 5px"
        }, _translator.default.translate("INCOMING_VIDEO_CALL", this.props.lang)));
      }

      // Calculate positioning based on widget settings
      const getPositionProps = () => {
        let positionProps = {
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "unset",
          zIndex: "998"
        };
        if (this.props.hasOwnProperty("widgetsettings")) {
          if (this.props.widgetsettings.hasOwnProperty("dockedview") && this.props.widgetsettings.dockedview) {
            if (this.props.widgetsettings.hasOwnProperty("launched") && this.props.widgetsettings.launched) {
              positionProps.zIndex = "2147483000";
              positionProps.position = "fixed";
              positionProps.top = "unset";
              positionProps.bottom = "100px";
              if (this.props.widgetsettings.hasOwnProperty("alignment") && this.props.widgetsettings.alignment === "left") {
                positionProps.right = "unset";
                positionProps.left = "20px";
                if (this.props.widgetsettings.hasOwnProperty("width") && this.props.widgetsettings.width.includes("px")) {
                  const widgetWidth = this.props.widgetsettings.width.replace("px", "");
                  positionProps.right = parseInt(widgetWidth) - 250 - 15 + "px";
                }
                if (this.props.widgetsettings.hasOwnProperty("height") && this.props.widgetsettings.height.includes("px")) {
                  const widgetHeight = this.props.widgetsettings.height.replace("px", "");
                  positionProps.bottom = parseInt(widgetHeight) - 140 + 100 + "px";
                }
              } else {
                positionProps.left = "unset";
                positionProps.right = "20px";
                if (this.props.widgetsettings.hasOwnProperty("width") && this.props.widgetsettings.width.includes("px")) {
                  const widgetWidth = this.props.widgetsettings.width.replace("px", "");
                  positionProps.right = parseInt(widgetWidth) - 250 - 15 + "px";
                }
                if (this.props.widgetsettings.hasOwnProperty("height") && this.props.widgetsettings.height.includes("px")) {
                  const widgetHeight = this.props.widgetsettings.height.replace("px", "");
                  positionProps.bottom = parseInt(widgetHeight) - 140 + 100 + "px";
                }
              }
            } else {
              positionProps.left = "unset";
              positionProps.position = "fixed";
            }
          } else {
            positionProps.zIndex = "2147483000";
          }
        }
        return positionProps;
      };
      incomingCallAlert = /*#__PURE__*/_react.default.createElement(_react2.Box, _extends({}, getPositionProps(), {
        borderRadius: "10px",
        m: "16px",
        bg: this.props.theme.backgroundColor.callScreenGrey,
        color: this.props.theme.color.white,
        textAlign: "center",
        boxSizing: "border-box",
        fontFamily: this.props.theme.fontFamily,
        w: "248px",
        className: "callalert__wrapper",
        sx: {
          animation: "slideDown 250ms ease",
          "@keyframes slideDown": {
            "0%": {
              transform: "translateY(-50px)"
            },
            "100%": {
              transform: "translateY(0px)"
            }
          },
          "*": {
            boxSizing: "border-box",
            fontFamily: this.props.theme.fontFamily
          }
        }
      }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        flexDirection: "column",
        w: "100%",
        p: "16px",
        className: "callalert__container"
      }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        w: "100%",
        className: "callalert__header"
      }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        w: "calc(100% - 36px)",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        className: "header__detail"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "15px",
        fontWeight: "600",
        display: "block",
        w: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "20px",
        className: "name"
      }, this.state.incomingCall.sender.name), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        fontSize: "13px",
        w: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textTransform: "capitalize",
        lineHeight: "20px",
        color: "#8A8A8A",
        justifyContent: "start",
        alignItems: "center",
        p: "2px 0 0 0px",
        className: "calltype"
      }, callType)), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        w: "36px",
        h: "36px",
        justifyContent: "center",
        className: "header__thumbnail"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.state.incomingCall.sender
      }))), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        w: "100%",
        justifyContent: "space-between",
        m: "10px 0 0 0",
        className: "callalert__buttons",
        ref: this.callButtonRef
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        cursor: "pointer",
        p: "8px 16px",
        bg: "".concat(this.props.theme.backgroundColor.red, "!important"),
        borderRadius: "5px",
        color: this.props.theme.color.white,
        fontSize: "100%",
        outline: "0",
        border: "0",
        w: "49%",
        overflow: "hidden",
        className: "button button__decline",
        onClick: () => this.rejectCall(this.state.incomingCall, _chat.CometChat.CALL_STATUS.REJECTED)
      }, _translator.default.translate("DECLINE", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Button, {
        cursor: "pointer",
        p: "8px 16px",
        bg: "".concat(this.props.theme.backgroundColor.blue, "!important"),
        borderRadius: "5px",
        color: this.props.theme.color.white,
        fontSize: "100%",
        outline: "0",
        border: "0",
        w: "49%",
        overflow: "hidden",
        className: "button button__accept",
        onClick: this.acceptCall
      }, _translator.default.translate("ACCEPT", this.props.lang)))));
    }
    if (this.state.callInProgress) {
      callScreen = /*#__PURE__*/_react.default.createElement(_CometChatCallScreen.CometChatCallScreen, {
        loggedInUser: this.loggedInUser,
        call: this.state.callInProgress,
        lang: this.props.lang,
        actionGenerated: this.actionHandler
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, incomingCallAlert, callScreen);
  }
}

// Specifies the default values for props:
exports.CometChatIncomingCall = CometChatIncomingCall;
_defineProperty(CometChatIncomingCall, "contextType", _CometChatContext.CometChatContext);
CometChatIncomingCall.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatIncomingCall.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};