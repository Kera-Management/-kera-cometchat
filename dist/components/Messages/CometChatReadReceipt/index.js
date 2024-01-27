"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReadReceipt = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _common = require("../../../util/common");
var _CometChatContext = require("../../../util/CometChatContext");
var _phosphorReact = require("phosphor-react");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _messageRead = _interopRequireDefault(require("./resources/message-read.svg"));
var _messageDelivered = _interopRequireDefault(require("./resources/message-delivered.svg"));
var _messageSent = _interopRequireDefault(require("./resources/message-sent.svg"));
var _wait = _interopRequireDefault(require("./resources/wait.svg"));
var _warningSmall = _interopRequireDefault(require("./resources/warning-small.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    var _this$props$message, _this$props$message$s, _this$loggedInUser;
    let ticks,
      receiptText = null,
      dateField = null,
      color = null;
    if (((_this$props$message = this.props.message) === null || _this$props$message === void 0 ? void 0 : (_this$props$message$s = _this$props$message.sender) === null || _this$props$message$s === void 0 ? void 0 : _this$props$message$s.uid) === ((_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid)) {
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
    const receipt = ticks ? (0, _react2.jsx)(_phosphorReact.Check, {
      size: 12,
      weight: "duotone"
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