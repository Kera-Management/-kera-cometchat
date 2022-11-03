"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderPollMessageBubble = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("../..");
var _2 = require("..");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatSenderPollMessageBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "pollId", void 0);
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    this.state = {
      isHovering: false
    };
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
    const pollOptions = [];
    this.pollId = pollExtensionData.id;
    const total = pollExtensionData.results.total;
    let totalText = _translator.default.translate("NO_VOTE", this.context.language);
    if (total === 1) {
      totalText = "".concat(total, " ").concat(_translator.default.translate("VOTE", this.context.language));
    } else if (total > 1) {
      totalText = "".concat(total, " ").concat(_translator.default.translate("VOTES", this.context.language));
    }
    for (const option in pollExtensionData.results.options) {
      const optionData = pollExtensionData.results.options[option];
      const vote = optionData["count"];
      let width = "0%";
      if (total) {
        const fraction = vote / total;
        width = fraction.toLocaleString("en", {
          style: "percent"
        });
      }
      const template = (0, _react2.jsx)("li", {
        key: option
      }, (0, _react2.jsx)("div", {
        css: (0, _style.pollPercentStyle)(this.context, width)
      }, " "), (0, _react2.jsx)("div", {
        css: (0, _style.answerWrapperStyle)(this.context, width)
      }, (0, _react2.jsx)("span", null, width), (0, _react2.jsx)("p", null, optionData.text)));
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
      className: "sender__message__container message__poll",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, (0, _react2.jsx)("div", {
      css: (0, _style.messageWrapperStyle)(),
      className: "message__wrapper"
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
    }, (0, _react2.jsx)(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    }), (0, _react2.jsx)(_.CometChatReadReceipt, {
      message: this.props.message
    })));
  }
}

// Specifies the default values for props:
exports.CometChatSenderPollMessageBubble = CometChatSenderPollMessageBubble;
_defineProperty(CometChatSenderPollMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatSenderPollMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatSenderPollMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};