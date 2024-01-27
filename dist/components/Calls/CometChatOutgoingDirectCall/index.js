"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatOutgoingDirectCall = void 0;
require("core-js/modules/es.symbol.description.js");
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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