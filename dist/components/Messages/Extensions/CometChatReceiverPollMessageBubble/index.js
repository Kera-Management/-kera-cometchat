"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverPollMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _react2 = require("@chakra-ui/react");
var _ = require("../..");
var _2 = require("..");
var _Shared = require("../../../Shared");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _checkmark = _interopRequireDefault(require("./resources/checkmark.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      avatar = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        w: "36px",
        h: "36px",
        m: "10px 5px",
        float: "left",
        flexShrink: "0",
        className: "message__thumbnail"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.props.message.sender
      }));
      name = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        alignSelf: "flex-start",
        padding: avatar ? "3px 5px" : "0",
        className: "message__name__wrapper"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "11px",
        color: this.context.theme.color.search,
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
      var _this$state$loggedInU, _this$state$loggedInU2;
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
        checkIcon = /*#__PURE__*/_react.default.createElement(_react2.Box, {
          w: "40px",
          h: "24px",
          sx: {
            mask: "url(".concat(_checkmark.default, ") center center no-repeat"),
            backgroundColor: this.context.theme.secondaryTextColor
          }
        });
      }
      let countPadding = "0px 16px 0px 0px";
      let widthProp = "calc(100% - 40px)";
      if (optionData.hasOwnProperty("voters") && optionData.voters.hasOwnProperty((_this$state$loggedInU2 = this.state.loggedInUser) === null || _this$state$loggedInU2 === void 0 ? void 0 : _this$state$loggedInU2.uid)) {
        widthProp = "calc(100% - 80px)";
      }
      const template = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        key: option,
        onClick: event => this.answerPollQuestion(event, option),
        backgroundColor: this.context.theme.backgroundColor.white,
        m: "10px 0",
        borderRadius: "8px",
        display: "flex",
        w: "100%",
        cursor: "pointer",
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
        color: this.context.theme.color.primary,
        alignItems: "center",
        minH: "35px",
        p: "0 16px",
        h: "100%",
        zIndex: "2"
      }, checkIcon, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        w: "40px",
        padding: countPadding,
        fontWeight: "bold",
        display: "inline-block",
        fontSize: "13px"
      }, width), /*#__PURE__*/_react.default.createElement(_react2.Text, {
        m: "0",
        w: widthProp,
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
          alignSelf: "flex-start",
          w: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-start",
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
      alignSelf: "flex-start",
      mb: "16px",
      pl: "16px",
      pr: "16px",
      maxW: "65%",
      clear: "both",
      position: "relative",
      flexDirection: "column",
      flexShrink: "0",
      className: "receiver__message__container message__poll",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      w: "100%",
      flex: "1 1",
      alignSelf: "flex-start",
      className: "message__wrapper"
    }, avatar, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flex: "1 1",
      flexDirection: "column",
      w: "calc(100% - 36px)",
      className: "message__details"
    }, name, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      w: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex",
      className: "message__poll__container"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flexDirection: "column",
      borderRadius: "12px",
      backgroundColor: this.context.theme.backgroundColor.secondary,
      p: "8px 16px",
      alignSelf: "flex-start",
      w: "100%",
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
      alignSelf: "flex-start",
      p: "4px 8px",
      alignItems: "center",
      justifyContent: "flex-start",
      h: "25px",
      className: "message__info__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
      message: this.props.message
    }), /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
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