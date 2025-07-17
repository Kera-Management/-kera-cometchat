"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatOutgoingCall = void 0;
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
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _endCall = _interopRequireDefault(require("./resources/end-call.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatOutgoingCall extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "callScreenUpdated", (key, call) => {
      switch (key) {
        case enums.OUTGOING_CALL_ACCEPTED:
          //occurs at the caller end
          this.outgoingCallAccepted(call);
          break;
        case enums.OUTGOING_CALL_REJECTED:
          //occurs at the caller end, callee rejects the call
          this.outgoingCallRejected(call);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "outgoingCallAccepted", call => {
      if (this.state.outgoingCallScreen === true) {
        this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_ACCEPTED"], call);
        _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
        this.setState({
          outgoingCallScreen: false,
          callInProgress: call,
          errorScreen: false,
          errorMessage: null
        });
        if (this.context) {
          this.context.setCallInProgress(call, enums.CONSTANTS["OUTGOING_DEFAULT_CALLING"]);
        }
      }
    });
    _defineProperty(this, "outgoingCallRejected", call => {
      _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
      if (call.hasOwnProperty("status") && call.status === _chat.CometChat.CALL_STATUS.BUSY) {
        //show busy message.
        const errorMessage = "".concat(call.sender.name, " ").concat(_translator.default.translate("ON_ANOTHER_CALL", this.props.lang));
        this.setState({
          errorScreen: true,
          errorMessage: errorMessage
        });
        this.clearCallInProgress();
      } else {
        this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_REJECTED"], call);
        this.setState({
          outgoingCallScreen: false,
          callInProgress: null,
          errorScreen: false,
          errorMessage: null
        });
        this.clearCallInProgress();
      }
    });
    _defineProperty(this, "startCall", call => {
      _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
      this.setState({
        outgoingCallScreen: true,
        callInProgress: call,
        errorScreen: false,
        errorMessage: null
      });
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
    //cancelling an outgoing call
    _defineProperty(this, "cancelCall", () => {
      _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["OUTGOING_CALL"], this.context);
      //if user busy error, just close the callscreen, no need to reject the call
      if (this.state.errorScreen) {
        this.setState({
          errorScreen: false,
          errorMessage: null,
          outgoingCallScreen: false,
          callInProgress: null
        });
        this.clearCallInProgress();
        this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_CANCELLED"]);
      } else {
        _chat.CometChat.rejectCall(this.state.callInProgress.sessionId, _chat.CometChat.CALL_STATUS.CANCELLED).then(call => {
          this.setState({
            outgoingCallScreen: false,
            callInProgress: null
          });
          this.clearCallInProgress();
          this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_CANCELLED"]);
        }).catch(error => {
          this.setState({
            outgoingCallScreen: false,
            callInProgress: null
          });
          this.clearCallInProgress();
        });
      }
    });
    _defineProperty(this, "clearCallInProgress", () => {
      if (this.context) {
        this.context.setCallInProgress(null, "");
      }
    });
    this.callScreenFrame = /*#__PURE__*/_react.default.createRef();
    this.state = {
      errorScreen: false,
      errorMessage: null,
      outgoingCallScreen: false,
      callInProgress: null
    };
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => {
      console.error(error);
    });
  }
  componentDidMount() {
    this.CallScreenManager = new _controller.CallScreenManager();
    this.CallScreenManager.attachListeners(this.callScreenUpdated);
  }
  componentWillUnmount() {
    this.CallScreenManager.removeListeners();
    this.CallScreenManager = null;
  }
  render() {
    let callScreen = null,
      errorScreen = null;
    if (this.state.callInProgress) {
      let avatar = /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.state.callInProgress.receiver
      });
      if (this.state.errorScreen) {
        errorScreen = /*#__PURE__*/_react.default.createElement(_react2.Box, {
          color: "#fff",
          textAlign: "center",
          borderRadius: "2px",
          p: "13px 10px",
          fontSize: "13px",
          w: "100%",
          h: "10%",
          bg: "#333",
          className: "callscreen__error__wrapper"
        }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, this.state.errorMessage));
      }
      if (this.state.outgoingCallScreen) {
        const wrapperStyles = this.props.widgetsettings ? {
          w: "100%",
          h: "100%",
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          zIndex: "2147483000"
        } : {
          w: "100%",
          h: "100%",
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          zIndex: "999"
        };
        callScreen = /*#__PURE__*/_react.default.createElement(_react2.Box, _extends({}, wrapperStyles, {
          bg: this.props.theme.backgroundColor.darkGrey,
          color: this.props.theme.color.white,
          textAlign: "center",
          boxSizing: "border-box",
          fontFamily: this.props.theme.fontFamily,
          className: "callscreen__wrapper",
          ref: el => {
            this.callScreenFrame = el;
          },
          sx: {
            animation: "fadeIn 250ms ease",
            "@keyframes fadeIn": {
              from: {
                opacity: 0
              },
              to: {
                opacity: 1
              }
            },
            "*": {
              boxSizing: "border-box",
              fontFamily: this.props.theme.fontFamily
            }
          }
        }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          flexDirection: "column",
          h: "100%",
          w: "100%",
          className: "callscreen__container"
        }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          p: "20px 10px",
          w: "100%",
          h: "20%",
          className: "callscreen__header"
        }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
          fontSize: "13px",
          display: "inline-block",
          p: "5px",
          className: "header__calling"
        }, _translator.default.translate("CALLING", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Heading, {
          as: "h6",
          m: "0",
          fontWeight: "700",
          textTransform: "capitalize",
          fontSize: "16px",
          className: "header__name"
        }, this.state.callInProgress.receiver.name)), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          w: "100%",
          h: "50%",
          justifyContent: "center",
          alignItems: "center",
          className: "callscreen__thumbnail__wrapper"
        }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          w: "200px",
          flexShrink: "0",
          className: "callscreen__thumbnail"
        }, avatar)), errorScreen, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          w: "100%",
          h: "15%",
          p: "10px",
          justifyContent: "center",
          className: "callscreen__icons"
        }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          className: "icon__block",
          onClick: this.cancelCall
        }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          w: "50px",
          h: "50px",
          borderRadius: "27px",
          bg: "red",
          m: "auto 10px",
          cursor: "pointer",
          justifyContent: "center",
          alignItems: "center",
          className: "icon icon__end"
        }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          display: "inline-block",
          w: "24px",
          h: "24px",
          bg: "white",
          sx: {
            mask: "url(".concat(_endCall.default, ") center center no-repeat")
          }
        }))))));
      } else {
        callScreen = /*#__PURE__*/_react.default.createElement(_CometChatCallScreen.CometChatCallScreen, {
          loggedInUser: this.loggedInUser,
          call: this.state.callInProgress,
          lang: this.props.lang,
          actionGenerated: this.actionHandler
        });
      }
    }
    return callScreen;
  }
}

// Specifies the default values for props:
exports.CometChatOutgoingCall = CometChatOutgoingCall;
_defineProperty(CometChatOutgoingCall, "contextType", _CometChatContext.CometChatContext);
CometChatOutgoingCall.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatOutgoingCall.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};