"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReadReceipt = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _common = require("../../../util/common");
var _CometChatContext = require("../../../util/CometChatContext");
var _phosphorReact = require("phosphor-react");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _messageRead = _interopRequireDefault(require("./resources/message-read.svg"));
var _messageDelivered = _interopRequireDefault(require("./resources/message-delivered.svg"));
var _messageSent = _interopRequireDefault(require("./resources/message-sent.svg"));
var _wait = _interopRequireDefault(require("./resources/wait.svg"));
var _warningSmall = _interopRequireDefault(require("./resources/warning-small.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    const receipt = ticks ? /*#__PURE__*/_react.default.createElement(_phosphorReact.Check, {
      size: 12,
      weight: "duotone"
    }) : null;
    const timestamp = (0, _common.getMessageSentTime)(dateField, this.context.language);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "span",
      className: "message__timestamp",
      display: "flex",
      fontSize: "11px",
      fontWeight: "500",
      lineHeight: "12px",
      textTransform: "uppercase",
      color: this.context.theme.color.search
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