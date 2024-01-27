"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReadReceipt = void 0;
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _common = require("../../../util/common");
var _CometChatContext = require("../../../util/CometChatContext");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _messageRead = _interopRequireDefault(require("./resources/message-read.svg"));
var _messageDelivered = _interopRequireDefault(require("./resources/message-delivered.svg"));
var _messageSent = _interopRequireDefault(require("./resources/message-sent.svg"));
var _wait = _interopRequireDefault(require("./resources/wait.svg"));
var _warningSmall = _interopRequireDefault(require("./resources/warning-small.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatReadReceipt extends _react.default.PureComponent {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "toggleReadReceipts", () => {
      /**
       * if delivery receipts feature is disabled
       */
      this.context.FeatureRestriction.isDeliveryReceiptsEnabled().then(response => {
        if (response !== this.state.receipts && this._isMounted) {
          this.setState({
            receipts: response
          });
        }
      }).catch(error => {
        if (this.state.receipts !== false) {
          this.setState({
            receipts: false
          });
        }
      });
    });
    this._isMounted = false;
    this.state = {
      receipts: false
    };
    this.context.getLoggedinUser().then(user => {
      this.loggedInUser = _objectSpread({}, user);
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this.toggleReadReceipts();
  }
  componentDidUpdate() {
    this.toggleReadReceipts();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    var _this$props$message, _this$loggedInUser;
    let ticks,
      receiptText = null,
      dateField = null,
      color = null;
    if (((_this$props$message = this.props.message) === null || _this$props$message === void 0 || (_this$props$message = _this$props$message.sender) === null || _this$props$message === void 0 ? void 0 : _this$props$message.uid) === ((_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid)) {
      if (this.props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
        if (this.props.message.hasOwnProperty("error")) {
          ticks = _warningSmall.default;
          receiptText = "ERROR";
          dateField = this.props.message._composedAt;
          color = this.context.theme.color.red;
        } else {
          ticks = _wait.default;
          receiptText = "SENDING";
          dateField = this.props.message._composedAt;
          color = this.context.theme.secondaryTextColor;
          if (this.props.message.hasOwnProperty("sentAt")) {
            ticks = _messageSent.default;
            receiptText = "SENT";
            dateField = this.props.message.sentAt;
          }
        }
      } else {
        if (this.props.message.hasOwnProperty("error")) {
          ticks = _warningSmall.default;
          receiptText = "ERROR";
          dateField = this.props.message._composedAt;
          color = this.context.theme.color.red;
        } else {
          ticks = _wait.default;
          receiptText = "SENDING";
          dateField = this.props.message._composedAt;
          color = this.context.theme.secondaryTextColor;
          if (this.props.message.hasOwnProperty("readAt")) {
            ticks = _messageRead.default;
            receiptText = "SEEN";
            color = this.context.theme.primaryColor;
            dateField = this.props.message.readAt;
          } else if (this.props.message.hasOwnProperty("deliveredAt")) {
            ticks = _messageDelivered.default;
            receiptText = "DELIVERED";
            dateField = this.props.message.deliveredAt;
          } else if (this.props.message.hasOwnProperty("sentAt")) {
            ticks = _messageSent.default;
            receiptText = "SENT";
            dateField = this.props.message.sentAt;
          }
        }
      }
    } else {
      dateField = this.props.message.sentAt;
    }

    //if delivery receipts are disabled
    if (this.state.receipts === false) {
      ticks = null;
    }
    const receipt = ticks ? (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(ticks, color),
      title: _translator.default.translate(receiptText, this.context.language)
    }) : null;
    const timestamp = (0, _common.getMessageSentTime)(dateField, this.context.language);
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("span", {
      css: (0, _style.msgTimestampStyle)(this.context, this.props, this.loggedInUser),
      className: "message__timestamp"
    }, timestamp), receipt);
  }
}

// Specifies the default values for props:
exports.CometChatReadReceipt = CometChatReadReceipt;
_defineProperty(CometChatReadReceipt, "contextType", _CometChatContext.CometChatContext);
CometChatReadReceipt.defaultProps = {
  theme: _theme.theme
};
CometChatReadReceipt.propTypes = {
  theme: _propTypes.default.object,
  message: _propTypes.default.object.isRequired
};