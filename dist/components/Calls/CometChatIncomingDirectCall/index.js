"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatIncomingDirectCall = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _Shared = require("../../Shared");
var _CometChatCallScreen = require("../CometChatCallScreen");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _SoundManager = require("../../../util/SoundManager");
var _Storage = require("../../../util/Storage");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _incomingVideoCall = _interopRequireDefault(require("./resources/incoming-video-call.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Removed emotion styles - now using Chakra UI
class CometChatIncomingDirectCall extends _react.default.PureComponent {
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
    _defineProperty(this, "messageListenerCallback", (key, message) => {
      switch (key) {
        case enums.CUSTOM_MESSAGE_RECEIVED:
          //occurs at the callee end
          this.incomingCallReceived(message);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "incomingCallReceived", message => {
      if (this._isMounted) {
        var _this$loggedInUser;
        if (message.type !== enums.CUSTOM_TYPE_MEETING) {
          return false;
        }
        if (Object.keys(this.context.callInProgress).length) {
          if (this.context.checkIfDirectCallIsOngoing() && this.context.getActiveCallSessionID() === message.data.customData.sessionID) {
            return false;
          }
        }
        if ((message === null || message === void 0 ? void 0 : message.sender.uid) !== ((_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid)) {
          _SoundManager.SoundManager.play(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
          this.setState({
            incomingCall: message
          });
        }
      }
    });
    _defineProperty(this, "joinCall", () => {
      this.checkForActiveCallAndEndCall().then(response => {
        _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
        this.props.actionGenerated(enums.ACTIONS["ACCEPT_DIRECT_CALL"], true);
        if (this.context) {
          this.context.setCallInProgress(this.state.incomingCall, enums.CONSTANTS["INCOMING_DIRECT_CALLING"]);
        }
        _Storage.Storage.setItem(enums.CONSTANTS["ACTIVECALL"], this.state.incomingCall);
        this.setState({
          incomingCall: null,
          callInProgress: this.state.incomingCall
        });
      }).catch(error => {
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
    });
    _defineProperty(this, "ignoreCall", () => {
      _SoundManager.SoundManager.pause(enums.CONSTANTS.AUDIO["INCOMING_CALL"], this.context);
      _Storage.Storage.setItem(enums.CONSTANTS["ACTIVECALL"], this.state.incomingCall);
      this.setState({
        incomingCall: null
      });
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
    _defineProperty(this, "actionHandler", action => {
      switch (action) {
        case enums.ACTIONS["DIRECT_CALL_ENDED"]:
        case enums.ACTIONS["DIRECT_CALL_ERROR"]:
          this.setState({
            callInProgress: null
          });
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
        if (((_this$state$incomingC = this.state.incomingCall) === null || _this$state$incomingC === void 0 ? void 0 : _this$state$incomingC.sessionId) === ((_call = call) === null || _call === void 0 ? void 0 : _call.sessionId)) {
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
      callInProgress: null,
      maximize: true
    };
    this.callButtonRef = /*#__PURE__*/_react.default.createRef();
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => {
      console.error(error);
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this.MessageAlertManager = new _controller.messageAlertManager();
    this.MessageAlertManager.attachListeners(this.messageListenerCallback);
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
      let avatar = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "header__thumbnail",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        cornerRadius: "50%",
        image: this.state.incomingCall.sender.avatar
      }));
      const callType = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        width: "24px",
        height: "24px",
        display: "inline-block",
        cursor: "pointer",
        title: _translator.default.translate("INCOMING_VIDEO_CALL", this.props.lang),
        sx: {
          mask: "url(".concat(_incomingVideoCall.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.secondaryTextColor
        }
      }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
        as: "span",
        padding: "0 5px"
      }, _translator.default.translate("INCOMING_VIDEO_CALL", this.props.lang)));

      // Calculate positioning based on widget settings
      let positionProps = {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "unset",
        zIndex: "998"
      };
      if (this.props.hasOwnProperty("widgetsettings")) {
        const ws = this.props.widgetsettings;
        if (ws.hasOwnProperty("dockedview") && ws.dockedview) {
          if (ws.hasOwnProperty("launched") && ws.launched) {
            positionProps.zIndex = "2147483000";
            positionProps.position = "fixed";
            positionProps.top = "unset";
            positionProps.bottom = "100px";
            if (ws.hasOwnProperty("alignment") && ws.alignment === "left") {
              positionProps.right = "unset";
              positionProps.left = "20px";
            } else {
              positionProps.left = "unset";
              positionProps.right = "20px";
            }
          } else {
            positionProps.left = "unset";
            positionProps.position = "fixed";
          }
        } else {
          positionProps.zIndex = "2147483000";
        }
      }
      incomingCallAlert = /*#__PURE__*/_react.default.createElement(_react2.Box, _extends({
        className: "callalert__wrapper"
      }, positionProps, {
        borderRadius: "10px",
        margin: "16px",
        backgroundColor: this.props.theme.backgroundColor.callScreenGrey,
        color: this.props.theme.color.white,
        textAlign: "center",
        boxSizing: "border-box",
        fontFamily: this.props.theme.fontFamily,
        width: "248px",
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
        className: "callalert__container",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "16px"
      }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "callalert__header",
        width: "100%",
        display: "flex"
      }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "header__detail",
        width: "calc(100% - 36px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "left"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "name",
        fontSize: "15px",
        fontWeight: "600",
        display: "block",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "20px"
      }, this.state.incomingCall.sender.name), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "calltype",
        fontSize: "13px",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textTransform: "capitalize",
        lineHeight: "20px",
        color: "#8A8A8A",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        padding: "2px 0 0 0px"
      }, callType)), avatar), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "callalert__buttons",
        ref: this.callButtonRef,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0 0 0"
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        type: "button",
        className: "button button__ignore",
        onClick: this.ignoreCall,
        cursor: "pointer",
        padding: "8px 16px",
        backgroundColor: "".concat(this.props.theme.backgroundColor.red, "!important"),
        borderRadius: "5px",
        color: this.props.theme.color.white,
        fontSize: "100%",
        outline: "0",
        border: "0",
        width: "49%",
        overflow: "hidden"
      }, _translator.default.translate("IGNORE", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Button, {
        type: "button",
        className: "button button__join",
        onClick: this.joinCall,
        cursor: "pointer",
        padding: "8px 16px",
        backgroundColor: "".concat(this.props.theme.backgroundColor.blue, "!important"),
        borderRadius: "5px",
        color: this.props.theme.color.white,
        fontSize: "100%",
        outline: "0",
        border: "0",
        width: "49%",
        overflow: "hidden"
      }, _translator.default.translate("JOIN", this.props.lang)))));
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
exports.CometChatIncomingDirectCall = CometChatIncomingDirectCall;
_defineProperty(CometChatIncomingDirectCall, "contextType", _CometChatContext.CometChatContext);
CometChatIncomingDirectCall.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatIncomingDirectCall.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};