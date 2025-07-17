"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCallScreen = void 0;
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _react = _interopRequireDefault(require("react"));
var _chat = require("@cometchat-pro/chat");
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _Storage = require("../../../util/Storage");
var _increaseSize = _interopRequireDefault(require("./resources/increase-size.svg"));
var _reduceSize = _interopRequireDefault(require("./resources/reduce-size.svg"));
var _strings = require("./strings");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Removed emotion styles - now using Chakra UI

class CometChatCallScreen extends _react.default.PureComponent {
  constructor(_props) {
    super(_props);
    _defineProperty(this, "enableDragging", e => {
      e.preventDefault();
      if (this.checkIfCallScreenIsMaximized() === true) {
        return false;
      }
      this.setState({
        dragging: true,
        rel: {
          x: e.pageX - this.state.x,
          y: e.pageY - this.state.y
        }
      });
      this.toggleCallScreenBackground(true);
      this.toggleCallScreenInnerBackground(true);
      this.document.onmousemove = e => this.startDragging(e);
      this.document.onmouseup = e => this.disableDragging(e);
    });
    _defineProperty(this, "checkIfCallScreenIsMaximized", () => {
      const elem = this.callScreenEl.current;
      const dialogWidth = elem.clientWidth;
      const dialogHeight = elem.clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      if (dialogWidth === windowWidth && dialogHeight === windowHeight) {
        return true;
      }
      return false;
    });
    _defineProperty(this, "checkIfCallScreenIsMinimized", () => {
      const elem = this.callScreenEl.current;
      const dialogWidth = elem.clientWidth;
      const dialogHeight = elem.clientHeight;
      const minimumWidth = this.props.minWidth;
      const minimumHeight = this.props.minHeight;
      if (dialogWidth === minimumWidth && dialogHeight === minimumHeight) {
        return true;
      }
      return false;
    });
    _defineProperty(this, "startDragging", e => {
      if (!this.state.dragging) return;
      e = e || window.event;
      const elem = this.callScreenEl.current;
      const dialogWidth = elem.clientWidth;
      const dialogHeight = elem.clientHeight;
      const x = Math.min(Math.max(0, e.pageX - this.state.rel.x), window.innerWidth - dialogWidth - 20);
      const y = Math.min(Math.max(0, e.pageY - this.state.rel.y), window.innerHeight - dialogHeight - 20);
      this.setState({
        x: x,
        y: y
      });
      e.stopPropagation();
      e.preventDefault();
    });
    _defineProperty(this, "disableDragging", e => {
      this.document.onmousemove = null;
      this.document.onmouseup = null;
      this.setState({
        dragging: false
      });
      this.toggleCallScreenBackground(false);
      this.toggleCallScreenInnerBackground(false);
    });
    _defineProperty(this, "initResize", e => {
      e.preventDefault();
      if (this.checkIfCallScreenIsMaximized() === true) {
        return false;
      }
      const element = this.callScreenEl.current;
      this.startX = e.pageX;
      this.startY = e.pageY;
      this.startWidth = parseFloat(getComputedStyle(element, null).getPropertyValue("width").replace("px", ""));
      this.startHeight = parseInt(getComputedStyle(element, null).getPropertyValue("height").replace("px", ""));
      this.document.onmousemove = e => this.startResize(e);
      this.document.onmouseup = e => this.stopResize(e);
    });
    _defineProperty(this, "startResize", e => {
      let width = this.startWidth + (e.pageX - this.startX);
      let height = this.startHeight + (e.pageY - this.startY);
      if (width < this.props.minWidth) {
        width = this.props.minHWidth;
      }
      if (width > window.innerWidth) {
        width = this.props.maxWidth;
      }
      if (height < this.props.minHeight) {
        height = this.props.minHeight;
      }
      if (height > window.innerHeight) {
        height = this.props.maxHeight;
      }
      this.callScreenEl.current.style.width = width + "px";
      this.callScreenEl.current.style.height = height + "px";
      this.setDimensionOfCallScreenInnerBackground({
        width: width + "px",
        height: height + "px"
      });
      this.toggleCallScreenBackground(true);
      this.toggleCallScreenInnerBackground(true);
    });
    _defineProperty(this, "stopResize", () => {
      this.document.onmousemove = null;
      this.document.onmouseup = null;
      this.toggleCallScreenBackground(false);
      this.toggleCallScreenInnerBackground(false);
      if (this.checkIfCallScreenIsMaximized() === true) {
        this.setState({
          maximized: true
        });
      }
      if (this.checkIfCallScreenIsMinimized() === true) {
        this.setState({
          maximized: false
        });
      }
    });
    _defineProperty(this, "toggleCallScreenBackground", flag => {
      if (this.callScreenBackgroundEl && this.callScreenBackgroundEl.current) {
        this.callScreenBackgroundEl.current.style.display = flag ? "block" : "none";
      }
    });
    _defineProperty(this, "toggleCallScreenInnerBackground", flag => {
      if (this.callScreenInnerBackgroundEl && this.callScreenInnerBackgroundEl.current) {
        this.callScreenInnerBackgroundEl.current.style.display = flag ? "block" : "none";
      }
    });
    _defineProperty(this, "setDimensionOfCallScreenInnerBackground", props => {
      this.callScreenInnerBackgroundEl.current.style.width = props.width;
      this.callScreenInnerBackgroundEl.current.style.height = props.height;
    });
    _defineProperty(this, "setPositionOfCallScreenInnerBackground", props => {
      this.callScreenInnerBackgroundEl.current.style.top = props.y;
      this.callScreenInnerBackgroundEl.current.style.left = props.x;
    });
    _defineProperty(this, "minimize", () => {
      if (!this.callScreenEl || !this.callScreenEl.current) {
        return false;
      }
      const width = this.props.minWidth + "px";
      const height = this.props.minHeight + "px";
      this.setState({
        maximized: false
      });
      this.setSizingAndPostionOfCallScreen({
        width: width,
        height: height
      });
      this.setDimensionOfCallScreenInnerBackground({
        width: width,
        height: height
      });
      this.setPositionOfCallScreenInnerBackground({
        x: "0px",
        y: "0px"
      });
    });
    _defineProperty(this, "maximize", () => {
      if (!this.callScreenEl || !this.callScreenEl.current) {
        return false;
      }
      const width = this.props.maxWidth;
      const height = this.props.maxHeight;
      this.setState({
        maximized: true
      });
      this.setSizingAndPostionOfCallScreen({
        width: width,
        height: height
      });
      this.setDimensionOfCallScreenInnerBackground({
        width: width,
        height: height
      });
      this.setPositionOfCallScreenInnerBackground({
        x: "0px",
        y: "0px"
      });
    });
    _defineProperty(this, "setSizingAndPostionOfCallScreen", props => {
      this.callScreenEl.current.style.width = props.width;
      this.callScreenEl.current.style.height = props.height;
      this.callScreenEl.current.style.top = "0px";
      this.callScreenEl.current.style.left = "0px";
    });
    _defineProperty(this, "toggle", e => {
      this.setState({
        x: 0,
        y: 0
      });
      if (this.state.maximized) {
        this.minimize();
      } else {
        this.maximize();
      }
      e.stopPropagation();
      e.preventDefault();
    });
    _defineProperty(this, "startDirectCall", call => {
      const sessionId = call.data.customData.sessionID;
      const customCSS = this.context.UIKitSettings.customCSS;
      const showRecordingButton = this.context.UIKitSettings.showCallRecordingOption;
      const callSettings = new _chat.CometChat.CallSettingsBuilder().enableDefaultLayout(true).setSessionID(sessionId).setIsAudioOnlyCall(false).showRecordingButton(showRecordingButton).setCustomCSS(customCSS).setLocalizedStringObject((0, _strings.LocalizedString)(this.props.lang)).build();
      const el = this.callScreenFrame;
      _chat.CometChat.startCall(callSettings, el, new _chat.CometChat.OngoingCallListener({
        onCallEnded: call => {
          if (this.context) {
            this.context.setCallInProgress({}, "");
          }
          _Storage.Storage.removeItem(enums.CONSTANTS["ACTIVECALL"]);
          this.props.actionGenerated(enums.ACTIONS["DIRECT_CALL_ENDED"]);
        },
        onError: error => {
          if (this.context) {
            this.context.setCallInProgress(null, "");
          }
          this.props.actionGenerated(enums.ACTIONS["DIRECT_CALL_ERROR"]);
          const errorCode = error && error.hasOwnProperty("code") ? error.code : "ERROR";
          this.context.setToastMessage("error", errorCode);
        }
      }));
    });
    _defineProperty(this, "startDefaultCall", call => {
      const sessionId = call.getSessionId();
      const callType = call.type === _chat.CometChat.CALL_TYPE.AUDIO ? true : false;
      const customCSS = this.context.UIKitSettings.customCSS;
      const showRecordingButton = this.context.UIKitSettings.showCallRecordingOption;
      const callSettings = new _chat.CometChat.CallSettingsBuilder().setSessionID(sessionId).enableDefaultLayout(true).setMode(_chat.CometChat.CALL_MODE.DEFAULT).setIsAudioOnlyCall(callType).showRecordingButton(showRecordingButton).setCustomCSS(customCSS).setLocalizedStringObject((0, _strings.LocalizedString)(this.props.lang)).build();
      const el = this.callScreenFrame;
      _chat.CometChat.startCall(callSettings, el, new _chat.CometChat.OngoingCallListener({
        onUserJoined: user => {
          /* Notification received here if another user joins the call. */
          /* this method can be use to display message or perform any actions if someone joining the call */
          //call initiator gets the same info in outgoingcallaccpeted event
          if (call.callInitiator.uid !== this.loggedInUser.uid && call.callInitiator.uid !== user.uid) {
            const callMessage = {
              category: call.category,
              type: call.type,
              action: call.action,
              status: call.status,
              callInitiator: call.callInitiator,
              callReceiver: call.callReceiver,
              receiverId: call.receiverId,
              receiverType: call.receiverType,
              sentAt: call.sentAt,
              sender: _objectSpread({}, user)
            };
            this.props.actionGenerated(enums.ACTIONS["USER_JOINED_CALL"], callMessage);
          }
        },
        onUserLeft: user => {
          /* Notification received here if another user left the call. */
          /* this method can be use to display message or perform any actions if someone leaving the call */
          //call initiator gets the same info in outgoingcallaccpeted event
          if (call.callInitiator.uid !== this.loggedInUser.uid && call.callInitiator.uid !== user.uid) {
            const callMessage = {
              category: call.category,
              type: call.type,
              action: "left",
              status: call.status,
              callInitiator: call.callInitiator,
              callReceiver: call.callReceiver,
              receiverId: call.receiverId,
              receiverType: call.receiverType,
              sentAt: call.sentAt,
              sender: _objectSpread({}, user)
            };
            this.props.actionGenerated(enums.ACTIONS["USER_LEFT_CALL"], callMessage);
          }
        },
        onCallEnded: endedCall => {
          /* Notification received here if current ongoing call is ended. */
          if (this.context) {
            this.context.setCallInProgress(null, "");
          }
          _Storage.Storage.removeItem(enums.CONSTANTS["ACTIVECALL"]);
          this.props.actionGenerated(enums.ACTIONS["OUTGOING_CALL_ENDED"], endedCall);
          /* hiding/closing the call screen can be done here. */
        }
      }));
    });
    this.state = {
      x: 0,
      y: 0,
      rel: null,
      // position relative to the cursor
      dragging: false,
      maximized: true
    };
    this.loggedInUser = _props.loggedInUser;
    this.callScreenBackgroundEl = /*#__PURE__*/_react.default.createRef();
    this.callScreenInnerBackgroundEl = /*#__PURE__*/_react.default.createRef();
    this.callScreenEl = /*#__PURE__*/_react.default.createRef();
    this.callScreenFrame = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    this.document = window.document;
    if (this.props.call.type === enums.CUSTOM_TYPE_MEETING) {
      this.startDirectCall(this.props.call);
    } else {
      this.startDefaultCall(this.props.call);
    }
  }
  render() {
    const resizeText = _translator.default.translate("RESIZE", this.props.lang);
    let iconView = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "24px",
      height: "24px",
      display: "inline-block",
      cursor: "pointer",
      title: resizeText,
      sx: {
        mask: "url(".concat(_reduceSize.default, ") center center no-repeat"),
        backgroundColor: "white"
      }
    });
    if (this.state.maximized === false) {
      iconView = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        width: "24px",
        height: "24px",
        display: "inline-block",
        cursor: "pointer",
        title: resizeText,
        sx: {
          mask: "url(".concat(_increaseSize.default, ") center center no-repeat"),
          backgroundColor: "white"
        }
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      ref: this.callScreenBackgroundEl,
      display: "none",
      width: "100vw",
      height: "100vh",
      position: "fixed",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      zIndex: "2147483001"
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      ref: this.callScreenEl,
      className: "callscreen__container",
      width: this.props.maxWidth,
      height: this.props.maxHeight,
      position: "fixed",
      top: this.state.y + "px",
      left: this.state.x + "px",
      overflow: "hidden",
      zIndex: "2147483002",
      sx: {
        "*": {
          boxSizing: "border-box",
          fontFamily: this.props.theme.fontFamily
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      ref: this.callScreenInnerBackgroundEl,
      display: "none",
      position: "absolute",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      zIndex: "2147483003"
    }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "callscreen__header",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: "#282c34",
      width: "100%",
      height: "50px",
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "2147483004",
      cursor: this.state.maximized ? "default" : "grabbing",
      onMouseDown: this.enableDragging
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "calc(100% - 55px)",
      padding: "16px"
    }, "\xA0"), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "callscreen__resize",
      width: "55px",
      padding: "16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      onClick: this.toggle,
      onMouseDown: e => e.stopPropagation()
    }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
      type: "button",
      title: resizeText,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      outline: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "0px",
      sx: {
        userSelect: "none",
        "img": {
          maxWidth: "100%",
          flexShrink: "0"
        }
      }
    }, iconView))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "callscreen__wrapper",
      ref: el => {
        this.callScreenFrame = el;
      },
      width: "100%",
      height: "calc(100% - 50px)",
      position: "absolute",
      top: "50px",
      right: "0",
      bottom: "0",
      left: "0",
      backgroundColor: this.props.theme.backgroundColor.darkGrey,
      zIndex: "999",
      color: this.props.theme.color.white,
      textAlign: "center",
      boxSizing: "border-box",
      fontFamily: this.props.theme.fontFamily,
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
        },
        iframe: {
          border: "none"
        }
      }
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "callscreen__resizer-both",
      onMouseDown: this.initResize,
      width: "35px",
      height: "35px",
      position: "absolute",
      right: "0",
      bottom: "0",
      zIndex: "2147483004",
      display: this.state.maximized ? "none" : "block",
      cursor: this.state.maximized ? "default" : "nwse-resize",
      sx: {
        clipPath: this.state.maximized ? "none" : "polygon(100% 0,100% 100%,0 100%)",
        background: this.state.maximized ? "none" : "repeating-linear-gradient(135deg,hsla(0,0%,100%,.5),hsla(0,0%,100%,.5) 2px,#000 0,#000 4px)"
      }
    })));
  }
}

// Specifies the default values for props:
exports.CometChatCallScreen = CometChatCallScreen;
_defineProperty(CometChatCallScreen, "contextType", _CometChatContext.CometChatContext);
CometChatCallScreen.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  minWidth: 400,
  minHeight: 300,
  maxWidth: "100%",
  maxHeight: "100%",
  style: {}
};
CometChatCallScreen.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  minWidth: _propTypes.default.number,
  minHeight: _propTypes.default.number,
  maxWidth: _propTypes.default.string,
  maxHeight: _propTypes.default.string,
  style: _propTypes.default.object
};