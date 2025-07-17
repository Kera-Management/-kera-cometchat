"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderPollMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _ = require("../..");
var _2 = require("..");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      const template = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        key: option,
        backgroundColor: this.context.theme.backgroundColor.white,
        m: "10px 0",
        borderRadius: "8px",
        display: "flex",
        w: "100%",
        position: "relative"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        maxW: "100%",
        w: width,
        borderRadius: width === "100%" ? "8px" : "8px 0 0 8px",
        backgroundColor: this.context.theme.backgroundColor.primary,
        minH: "35px",
        h: "100%",
        position: "absolute",
        zIndex: "1"
      }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        w: "100%",
        color: this.context.theme.color.white,
        alignItems: "center",
        minH: "35px",
        p: "0 16px",
        h: "100%",
        zIndex: "2"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        w: "40px",
        pr: "16px",
        fontWeight: "bold",
        display: "inline-block",
        fontSize: "13px"
      }, width), /*#__PURE__*/_react.default.createElement(_react2.Text, {
        m: "0",
        w: "calc(100% - 40px)",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        fontSize: "14px"
      }, optionData.text)));
      pollOptions.push(template);
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          alignSelf: "flex-end",
          w: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          minH: "36px",
          className: "message__reaction__wrapper"
        }, /*#__PURE__*/_react.default.createElement(_2.CometChatMessageReactions, {
          message: this.props.message,
          actionGenerated: this.props.actionGenerated
        }));
      }
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = /*#__PURE__*/_react.default.createElement(_.CometChatMessageActions, {
        message: this.props.message,
        actionGenerated: this.props.actionGenerated
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-end",
      mb: "16px",
      pl: "16px",
      pr: "16px",
      maxW: "65%",
      clear: "both",
      position: "relative",
      flexDirection: "column",
      flexShrink: "0",
      className: "sender__message__container message__poll",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      w: "auto",
      flex: "1 1",
      alignSelf: "flex-end",
      className: "message__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      borderRadius: "12px",
      backgroundColor: this.context.theme.primaryColor,
      color: this.context.theme.color.white,
      p: "8px 16px",
      alignSelf: "flex-end",
      w: "auto",
      className: "message__poll__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      m: "0",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      textAlign: "left",
      w: "100%",
      fontSize: "14px",
      className: "poll__question"
    }, pollExtensionData.question), /*#__PURE__*/_react.default.createElement(_react2.UnorderedList, {
      listStyleType: "none",
      p: "0",
      m: "0",
      className: "poll__options"
    }, pollOptions), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "13px",
      m: "0",
      alignSelf: "flex-end",
      className: "poll__votes"
    }, totalText))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-end",
      justifyContent: "flex-end",
      alignItems: "center",
      h: "25px",
      className: "message__info__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    }), /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
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