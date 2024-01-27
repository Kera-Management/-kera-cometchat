"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatOutgoingCall = void 0;
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
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _endCall = _interopRequireDefault(require("./resources/end-call.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
      let avatar = (0, _react2.jsx)(_Shared.CometChatAvatar, {
        user: this.state.callInProgress.receiver
      });
      if (this.state.errorScreen) {
        errorScreen = (0, _react2.jsx)("div", {
          css: (0, _style.errorContainerStyle)(),
          className: "callscreen__error__wrapper"
        }, (0, _react2.jsx)("div", null, this.state.errorMessage));
      }
      if (this.state.outgoingCallScreen) {
        callScreen = (0, _react2.jsx)("div", {
          css: (0, _style.callScreenWrapperStyle)(this.props, _react2.keyframes),
          className: "callscreen__wrapper",
          ref: el => {
            this.callScreenFrame = el;
          }
        }, (0, _react2.jsx)("div", {
          css: (0, _style.callScreenContainerStyle)(),
          className: "callscreen__container"
        }, (0, _react2.jsx)("div", {
          css: (0, _style.headerStyle)(),
          className: "callscreen__header"
        }, (0, _react2.jsx)("span", {
          css: (0, _style.headerDurationStyle)(),
          className: "header__calling"
        }, _translator.default.translate("CALLING", this.props.lang)), (0, _react2.jsx)("h6", {
          css: (0, _style.headerNameStyle)(),
          className: "header__name"
        }, this.state.callInProgress.receiver.name)), (0, _react2.jsx)("div", {
          css: (0, _style.thumbnailWrapperStyle)(),
          className: "callscreen__thumbnail__wrapper"
        }, (0, _react2.jsx)("div", {
          css: (0, _style.thumbnailStyle)(),
          className: "callscreen__thumbnail"
        }, avatar)), errorScreen, (0, _react2.jsx)("div", {
          css: (0, _style.headerIconStyle)(),
          className: "callscreen__icons"
        }, (0, _react2.jsx)("div", {
          css: (0, _style.iconWrapperStyle)(),
          className: "icon__block",
          onClick: this.cancelCall
        }, (0, _react2.jsx)("div", {
          css: (0, _style.iconStyle)(_endCall.default),
          className: "icon icon__end"
        }, (0, _react2.jsx)("i", null))))));
      } else {
        callScreen = (0, _react2.jsx)(_CometChatCallScreen.CometChatCallScreen, {
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