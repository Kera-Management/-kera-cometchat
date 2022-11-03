"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCallScreen = void 0;
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.parse-int.js");
var _react = _interopRequireDefault(require("react"));
var _chat = require("@cometchat-pro/chat");
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _Storage = require("../../../util/Storage");
var _increaseSize = _interopRequireDefault(require("./resources/increase-size.svg"));
var _reduceSize = _interopRequireDefault(require("./resources/reduce-size.svg"));
var _strings = require("./strings");
var _style = require("./style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    let iconView = (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(_reduceSize.default),
      title: resizeText
    });
    if (this.state.maximized === false) {
      iconView = (0, _react2.jsx)("i", {
        css: (0, _style.iconStyle)(_increaseSize.default),
        title: resizeText
      });
    }
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
      css: (0, _style.callScreenBackgroundStyle)(this.state),
      ref: this.callScreenBackgroundEl
    }), (0, _react2.jsx)("div", {
      ref: this.callScreenEl,
      className: "callscreen__container",
      css: (0, _style.callScreenContainerStyle)(this.props),
      style: {
        top: this.state.y + "px",
        left: this.state.x + "px"
      }
    }, (0, _react2.jsx)("div", {
      css: (0, _style.callScreenInnerBackgroundStyle)(),
      ref: this.callScreenInnerBackgroundEl
    }), (0, _react2.jsx)("div", {
      css: (0, _style.callScreenHeaderStyle)(this.state),
      className: "callscreen__header",
      onMouseDown: this.enableDragging
    }, (0, _react2.jsx)("div", {
      css: (0, _style.headerTitleStyle)()
    }, "\xA0"), (0, _react2.jsx)("div", {
      className: "callscreen__resize",
      css: (0, _style.headerButtonStyle)(),
      onClick: this.toggle,
      onMouseDown: e => e.stopPropagation()
    }, (0, _react2.jsx)("button", {
      type: "button",
      title: resizeText
    }, iconView))), (0, _react2.jsx)("div", {
      css: (0, _style.callScreenWrapperStyle)(this.props, _react2.keyframes),
      className: "callscreen__wrapper",
      ref: el => {
        this.callScreenFrame = el;
      }
    }), (0, _react2.jsx)("div", {
      css: (0, _style.callScreenResizerStyle)(this.state),
      className: "callscreen__resizer-both",
      onMouseDown: this.initResize
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