"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatActionMessageBubble = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatActionMessageBubble extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "getCallActionMessage", message => {
      const call = message;
      let actionMessage = null;
      switch (call.status) {
        case _chat.CometChat.CALL_STATUS.INITIATED:
          {
            actionMessage = _translator.default.translate("CALL_INITIATED", this.context.language);
            if (call.type === _chat.CometChat.CALL_TYPE.AUDIO) {
              if (call.receiverType === _chat.CometChat.RECEIVER_TYPE.USER) {
                var _this$loggedInUser;
                actionMessage = call.callInitiator.uid === ((_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid) ? _translator.default.translate("OUTGOING_AUDIO_CALL", this.context.language) : _translator.default.translate("INCOMING_AUDIO_CALL", this.context.language);
              } else if (call.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
                if (call.action === _chat.CometChat.CALL_STATUS.INITIATED) {
                  var _this$loggedInUser2;
                  actionMessage = call.callInitiator.uid === ((_this$loggedInUser2 = this.loggedInUser) === null || _this$loggedInUser2 === void 0 ? void 0 : _this$loggedInUser2.uid) ? _translator.default.translate("OUTGOING_AUDIO_CALL", this.context.language) : _translator.default.translate("INCOMING_AUDIO_CALL", this.context.language);
                } else if (call.action === _chat.CometChat.CALL_STATUS.REJECTED) {
                  var _this$loggedInUser3;
                  actionMessage = call.sender.uid === ((_this$loggedInUser3 = this.loggedInUser) === null || _this$loggedInUser3 === void 0 ? void 0 : _this$loggedInUser3.uid) ? _translator.default.translate("CALL_REJECTED", this.context.language) : "".concat(call.sender.name, " ").concat(_translator.default.translate("REJECTED_CALL", this.context.language));
                }
              }
            } else if (call.type === _chat.CometChat.CALL_TYPE.VIDEO) {
              if (call.receiverType === _chat.CometChat.RECEIVER_TYPE.USER) {
                var _this$loggedInUser4;
                actionMessage = call.callInitiator.uid === ((_this$loggedInUser4 = this.loggedInUser) === null || _this$loggedInUser4 === void 0 ? void 0 : _this$loggedInUser4.uid) ? _translator.default.translate("OUTGOING_VIDEO_CALL", this.context.language) : _translator.default.translate("INCOMING_VIDEO_CALL", this.context.language);
              } else if (call.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
                if (call.action === _chat.CometChat.CALL_STATUS.INITIATED) {
                  var _this$loggedInUser5;
                  actionMessage = call.callInitiator.uid === ((_this$loggedInUser5 = this.loggedInUser) === null || _this$loggedInUser5 === void 0 ? void 0 : _this$loggedInUser5.uid) ? _translator.default.translate("OUTGOING_VIDEO_CALL", this.context.language) : _translator.default.translate("INCOMING_VIDEO_CALL", this.context.language);
                } else if (call.action === _chat.CometChat.CALL_STATUS.REJECTED) {
                  var _this$loggedInUser6;
                  actionMessage = call.sender.uid === ((_this$loggedInUser6 = this.loggedInUser) === null || _this$loggedInUser6 === void 0 ? void 0 : _this$loggedInUser6.uid) ? _translator.default.translate("CALL_REJECTED", this.context.language) : "".concat(call.sender.name, " ").concat(_translator.default.translate("REJECTED_CALL", this.context.language));
                }
              }
            }
            break;
          }
        case _chat.CometChat.CALL_STATUS.ONGOING:
          {
            if (call.receiverType === _chat.CometChat.RECEIVER_TYPE.USER) {
              actionMessage = _translator.default.translate("CALL_ACCEPTED", this.context.language);
            } else if (call.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
              if (call.action === _chat.CometChat.CALL_STATUS.ONGOING) {
                var _this$loggedInUser7;
                actionMessage = call.sender.uid === ((_this$loggedInUser7 = this.loggedInUser) === null || _this$loggedInUser7 === void 0 ? void 0 : _this$loggedInUser7.uid) ? _translator.default.translate("CALL_ACCEPTED", this.context.language) : "".concat(call.sender.name, " ").concat(_translator.default.translate("JOINED", this.context.language));
              } else if (call.action === _chat.CometChat.CALL_STATUS.REJECTED) {
                var _this$loggedInUser8;
                actionMessage = call.sender.uid === ((_this$loggedInUser8 = this.loggedInUser) === null || _this$loggedInUser8 === void 0 ? void 0 : _this$loggedInUser8.uid) ? _translator.default.translate("CALL_REJECTED", this.context.language) : "".concat(call.sender.name, " ").concat(_translator.default.translate("REJECTED_CALL", this.context.language));
              } else if (call.action === "left") {
                var _this$loggedInUser9;
                if (call.sender.uid === ((_this$loggedInUser9 = this.loggedInUser) === null || _this$loggedInUser9 === void 0 ? void 0 : _this$loggedInUser9.uid)) {
                  actionMessage = "".concat(_translator.default.translate("YOU", this.context.language), " ").concat(_translator.default.translate("LEFT_THE_CALL", this.context.language));
                } else {
                  actionMessage = "".concat(call.sender.name, " ").concat(_translator.default.translate("LEFT_THE_CALL", this.context.language));
                }
              }
            }
            break;
          }
        case _chat.CometChat.CALL_STATUS.UNANSWERED:
          {
            actionMessage = _translator.default.translate("CALL_UNANSWERED", this.context.language);
            if (call.type === _chat.CometChat.CALL_TYPE.AUDIO && (call.receiverType === _chat.CometChat.RECEIVER_TYPE.USER || call.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP)) {
              var _this$loggedInUser0;
              actionMessage = call.callInitiator.uid === ((_this$loggedInUser0 = this.loggedInUser) === null || _this$loggedInUser0 === void 0 ? void 0 : _this$loggedInUser0.uid) ? _translator.default.translate("UNANSWERED_AUDIO_CALL", this.context.language) : _translator.default.translate("MISSED_AUDIO_CALL", this.context.language);
            } else if (call.type === _chat.CometChat.CALL_TYPE.VIDEO && (call.receiverType === _chat.CometChat.RECEIVER_TYPE.USER || call.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP)) {
              var _this$loggedInUser1;
              actionMessage = call.callInitiator.uid === ((_this$loggedInUser1 = this.loggedInUser) === null || _this$loggedInUser1 === void 0 ? void 0 : _this$loggedInUser1.uid) ? _translator.default.translate("UNANSWERED_VIDEO_CALL", this.context.language) : _translator.default.translate("MISSED_VIDEO_CALL", this.context.language);
            }
            break;
          }
        case _chat.CometChat.CALL_STATUS.REJECTED:
          actionMessage = _translator.default.translate("CALL_REJECTED", this.context.language);
          break;
        case _chat.CometChat.CALL_STATUS.ENDED:
          actionMessage = _translator.default.translate("CALL_ENDED", this.context.language);
          break;
        case _chat.CometChat.CALL_STATUS.CANCELLED:
          actionMessage = _translator.default.translate("CALL_CANCELLED", this.context.language);
          break;
        case _chat.CometChat.CALL_STATUS.BUSY:
          actionMessage = _translator.default.translate("CALL_BUSY", this.context.language);
          break;
        default:
          break;
      }
      return actionMessage;
    });
    _defineProperty(this, "getActionMessage", message => {
      var _message$actionBy, _message$actionOn;
      let actionMessage = null;
      const byUser = message === null || message === void 0 || (_message$actionBy = message.actionBy) === null || _message$actionBy === void 0 ? void 0 : _message$actionBy.name;
      const onUser = message === null || message === void 0 || (_message$actionOn = message.actionOn) === null || _message$actionOn === void 0 ? void 0 : _message$actionOn.name;
      switch (message.action) {
        case _chat.CometChat.ACTION_TYPE.MEMBER_JOINED:
          actionMessage = "".concat(byUser, " ").concat(_translator.default.translate("JOINED", this.context.language));
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_LEFT:
          actionMessage = "".concat(byUser, " ").concat(_translator.default.translate("LEFT", this.context.language));
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_ADDED:
          actionMessage = "".concat(byUser, " ").concat(_translator.default.translate("ADDED", this.context.language), " ").concat(onUser);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_KICKED:
          actionMessage = "".concat(byUser, " ").concat(_translator.default.translate("KICKED", this.context.language), " ").concat(onUser);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_BANNED:
          actionMessage = "".concat(byUser, " ").concat(_translator.default.translate("BANNED", this.context.language), " ").concat(onUser);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_UNBANNED:
          actionMessage = "".concat(byUser, " ").concat(_translator.default.translate("UNBANNED", this.context.language), " ").concat(onUser);
          break;
        case _chat.CometChat.ACTION_TYPE.MEMBER_SCOPE_CHANGED:
          {
            const newScope = message === null || message === void 0 ? void 0 : message.newScope;
            actionMessage = "".concat(byUser, " ").concat(_translator.default.translate("MADE", this.context.language), " ").concat(onUser, " ").concat(_translator.default.translate(newScope, this.context.language));
            break;
          }
        default:
          break;
      }
      return actionMessage;
    });
    _defineProperty(this, "getMessage", message => {
      let actionMessage = null;
      if (message.category === _chat.CometChat.CATEGORY_CALL) {
        actionMessage = this.getCallActionMessage(message);
      } else if (message.category === _chat.CometChat.CATEGORY_ACTION) {
        actionMessage = this.getActionMessage(message);
      }
      return actionMessage;
    });
    this.context.getLoggedinUser().then(user => {
      this.loggedInUser = _objectSpread({}, user);
    });
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      padding: "8px 16px",
      marginBottom: "16px",
      textAlign: "center",
      height: "36px",
      className: "action__message"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "13.5px",
      margin: "0",
      lineHeight: "20px"
    }, this.getMessage(this.props.message)));
  }
}

// Specifies the default values for props:
exports.CometChatActionMessageBubble = CometChatActionMessageBubble;
_defineProperty(CometChatActionMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatActionMessageBubble.defaultProps = {
  theme: _theme.theme
};
CometChatActionMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  message: _propTypes.default.object.isRequired
};