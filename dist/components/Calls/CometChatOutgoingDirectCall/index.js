"use strict";

require("core-js/modules/es6.symbol.js");
require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatOutgoingDirectCall = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatCallScreen = require("../CometChatCallScreen");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatOutgoingDirectCall extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "sessionID", void 0);
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
    _defineProperty(this, "startCall", sessionID => {
      this.sessionID = sessionID;
      if (!this.sessionID) {
        const errorCode = "ERR_EMPTY_CALL_SESSION_ID";
        this.context.setToastMessage("error", errorCode);
        return false;
      }
      const customMessage = this.prepareCustomMessageData();
      this.setState({
        callInProgress: customMessage
      });
      if (this.context) {
        this.context.setCallInProgress(customMessage, enums.CONSTANTS["OUTGOING_DIRECT_CALLING"]);
      }
      setTimeout(() => {
        this.sendCustomMessage();
      }, 5);
    });
    _defineProperty(this, "joinCall", sessionID => {
      this.sessionID = sessionID;
      if (this.sessionID === null) {
        const errorCode = "ERR_EMPTY_CALL_SESSION_ID";
        this.context.setToastMessage("error", errorCode);
        return false;
      }
      const customMessage = this.prepareCustomMessageData();
      this.setState({
        callInProgress: customMessage
      });
      if (this.context) {
        this.context.setCallInProgress(customMessage, enums.CONSTANTS["OUTGOING_DIRECT_CALLING"]);
      }
    });
    _defineProperty(this, "prepareCustomMessageData", () => {
      const receiverType = _chat.CometChat.RECEIVER_TYPE.GROUP;
      const customData = {
        sessionID: this.sessionID,
        sessionId: this.sessionID,
        callType: _chat.CometChat.CALL_TYPE.VIDEO
      };
      const customType = enums.CUSTOM_TYPE_MEETING;
      const conversationId = "group_".concat(this.sessionID);
      const customMessage = new _chat.CometChat.CustomMessage(this.sessionID, receiverType, customType, customData);
      customMessage.setSender(this.loggedInUser);
      customMessage.setReceiver(receiverType);
      customMessage.setConversationId(conversationId);
      customMessage._composedAt = (0, _common.getUnixTimestamp)();
      customMessage._id = (0, _common.ID)();
      return customMessage;
    });
    _defineProperty(this, "sendCustomMessage", () => {
      const customMessage = this.prepareCustomMessageData();
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_COMPOSED"], [customMessage]);
      _chat.CometChat.sendCustomMessage(customMessage).then(message => {
        const newMessageObj = _objectSpread(_objectSpread({}, message), {}, {
          _id: customMessage._id
        });
        this.props.actionGenerated(enums.ACTIONS["MESSAGE_SENT"], [newMessageObj]);
      }).catch(error => {
        const newMessageObj = _objectSpread(_objectSpread({}, customMessage), {}, {
          error: error
        });
        this.props.actionGenerated(enums.ACTIONS["ERROR_IN_SENDING_MESSAGE"], [newMessageObj]);
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "ERROR";
        this.context.setToastMessage("error", errorCode);
      });
    });
    this.state = {
      callInProgress: null
    };
    this.callScreenRef = /*#__PURE__*/_react.default.createRef();
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => {
      console.error(error);
    });
  }
  render() {
    let callScreen = null;
    if (this.state.callInProgress) {
      callScreen = (0, _react2.jsx)(_CometChatCallScreen.CometChatCallScreen, {
        ref: el => this.callScreenRef = el,
        loggedInUser: this.loggedInUser,
        call: this.state.callInProgress,
        lang: this.props.lang,
        actionGenerated: this.actionHandler
      });
    }
    return callScreen;
  }
}

// Specifies the default values for props:
exports.CometChatOutgoingDirectCall = CometChatOutgoingDirectCall;
_defineProperty(CometChatOutgoingDirectCall, "contextType", _CometChatContext.CometChatContext);
CometChatOutgoingDirectCall.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatOutgoingDirectCall.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};