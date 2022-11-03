"use strict";

require("core-js/modules/es6.symbol.js");
require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverPollMessageBubble = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("../..");
var _2 = require("..");
var _Shared = require("../../../Shared");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style = require("./style");
var _checkmark = _interopRequireDefault(require("./resources/checkmark.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatReceiverPollMessageBubble extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "pollId", void 0);
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "answerPollQuestion", (event, selectedOption) => {
      _chat.CometChat.callExtension("polls", "POST", "v2/vote", {
        vote: selectedOption,
        id: this.pollId
      }).then(response => {
        if (response.hasOwnProperty("success") === false || response.hasOwnProperty("success") && response["success"] === false) {
          this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG");
        }
      }).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    });
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    this.state = {
      isHovering: false,
      loggedInUser: null
    };
  }
  componentDidMount() {
    this.context.getLoggedinUser().then(user => {
      this.setState({
        loggedInUser: _objectSpread({}, user)
      });
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);
    if (currentMessageStr !== nextMessageStr || this.state.isHovering !== nextState.isHovering) {
      return true;
    }
    return false;
  }
  render() {
    const pollExtensionData = (0, _common.checkMessageForExtensionsData)(this.props.message, "polls");
    if (!pollExtensionData) {
      return null;
    }

    // if (!this.props.message.hasOwnProperty("metadata")) {
    //     return null;
    // }

    // if (!this.props.message.metadata.hasOwnProperty("@injected")) {
    //     return null;
    // }

    // if (!this.props.message.metadata["@injected"].hasOwnProperty("extensions")) {
    //     return null;
    // }

    // if (!this.props.message.metadata["@injected"]["extensions"].hasOwnProperty("polls")) {
    //     return null;
    // }

    let avatar = null,
      name = null;
    if (this.props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
      avatar = (0, _react2.jsx)("div", {
        css: _style.messageThumbnailStyle,
        className: "message__thumbnail"
      }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
        user: this.props.message.sender
      }));
      name = (0, _react2.jsx)("div", {
        css: (0, _style.nameWrapperStyle)(avatar),
        className: "message__name__wrapper"
      }, (0, _react2.jsx)("span", {
        css: (0, _style.nameStyle)(this.context),
        className: "message__name"
      }, this.props.message.sender.name));
    }
    const pollOptions = [];
    //const pollExtensionData = this.props.message.metadata["@injected"]["extensions"]["polls"];

    this.pollId = pollExtensionData.id;
    const total = pollExtensionData.results.total;
    let totalText = _translator.default.translate("NO_VOTE", this.context.language);
    if (total === 1) {
      totalText = "".concat(total, " ").concat(_translator.default.translate("VOTE", this.context.language));
    } else if (total > 1) {
      totalText = "".concat(total, " ").concat(_translator.default.translate("VOTES", this.context.language));
    }
    for (const option in pollExtensionData.options) {
      var _this$state$loggedInU;
      const optionData = pollExtensionData.results.options[option];
      const vote = optionData["count"];
      let width = "0%";
      if (total) {
        const fraction = vote / total;
        width = fraction.toLocaleString("en", {
          style: "percent"
        });
      }
      let checkIcon = null;
      if (optionData.hasOwnProperty("voters") && optionData.voters.hasOwnProperty((_this$state$loggedInU = this.state.loggedInUser) === null || _this$state$loggedInU === void 0 ? void 0 : _this$state$loggedInU.uid)) {
        checkIcon = (0, _react2.jsx)("i", {
          css: (0, _style.checkIconStyle)(_checkmark.default, this.context)
        });
      }
      const template = (0, _react2.jsx)("li", {
        key: option,
        onClick: event => this.answerPollQuestion(event, option)
      }, (0, _react2.jsx)("div", {
        css: (0, _style.pollPercentStyle)(this.context, width)
      }, " "), (0, _react2.jsx)("div", {
        css: (0, _style.answerWrapperStyle)(this.state, optionData, this.context)
      }, checkIcon, (0, _react2.jsx)("span", null, width), (0, _react2.jsx)("p", null, optionData.text)));
      pollOptions.push(template);
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (0, _react2.jsx)("div", {
          css: (0, _style.messageReactionsWrapperStyle)(),
          className: "message__reaction__wrapper"
        }, (0, _react2.jsx)(_2.CometChatMessageReactions, {
          message: this.props.message,
          actionGenerated: this.props.actionGenerated
        }));
      }
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (0, _react2.jsx)(_.CometChatMessageActions, {
        message: this.props.message,
        actionGenerated: this.props.actionGenerated
      });
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "receiver__message__container message__poll",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageWrapperStyle)(),
      className: "message__wrapper"
    }, avatar, (0, _react2.jsx)("div", {
      css: (0, _style.messageDetailStyle)(),
      className: "message__details"
    }, name, toolTipView, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtContainerStyle)(),
      className: "message__poll__container"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtWrapperStyle)(this.context),
      className: "message__poll__wrapper"
    }, (0, _react2.jsx)("p", {
      css: (0, _style.pollQuestionStyle)(),
      className: "poll__question"
    }, pollExtensionData.question), (0, _react2.jsx)("ul", {
      css: (0, _style.pollAnswerStyle)(this.context),
      className: "poll__options"
    }, pollOptions), (0, _react2.jsx)("p", {
      css: (0, _style.pollTotalStyle)(),
      className: "poll__votes"
    }, totalText))), messageReactions, (0, _react2.jsx)("div", {
      css: (0, _style.messageInfoWrapperStyle)(),
      className: "message__info__wrapper"
    }, (0, _react2.jsx)(_.CometChatReadReceipt, {
      message: this.props.message
    }), (0, _react2.jsx)(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    })))));
  }
}

// Specifies the default values for props:
exports.CometChatReceiverPollMessageBubble = CometChatReceiverPollMessageBubble;
_defineProperty(CometChatReceiverPollMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverPollMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverPollMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};