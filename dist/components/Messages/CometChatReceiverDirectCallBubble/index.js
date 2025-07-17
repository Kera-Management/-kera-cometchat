"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverDirectCallBubble = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _react2 = require("@chakra-ui/react");
var _ = require("..");
var _Extensions = require("../Extensions");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _videoCall = _interopRequireDefault(require("./resources/video-call.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatReceiverDirectCallBubble extends _react.default.Component {
  constructor(props) {
    super(props);
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
        }, /*#__PURE__*/_react.default.createElement(_Extensions.CometChatMessageReactions, {
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
    const messageTitle = "".concat(this.props.message.sender.name, " ").concat(_translator.default.translate("INITIATED_GROUP_CALL", this.context.language));
    let callMessage = null;
    const joinCallMessage = _translator.default.translate("YOU_ALREADY_ONGOING_CALL", this.context.language);
    if (this.context.checkIfDirectCallIsOngoing() === enums.CONSTANTS.CALLS["ONGOING_CALL_SAME_GROUP"]) {
      //ongoing call in same group
      callMessage = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        backgroundColor: this.context.theme.backgroundColor.white,
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        w: "100%",
        cursor: "pointer",
        position: "relative",
        m: "0",
        p: "8px",
        className: "directcall__row",
        title: joinCallMessage
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        background: "0 0",
        textAlign: "center",
        color: this.context.theme.primaryColor,
        w: "100%",
        display: "inline-block",
        fontSize: "14px",
        fontWeight: "600",
        m: "0",
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else if (this.context.checkIfDirectCallIsOngoing() === enums.CONSTANTS.CALLS["ONGOING_CALL_DIFF_GROUP"]) {
      //ongoing call in different group

      callMessage = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        backgroundColor: this.context.theme.backgroundColor.white,
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        w: "100%",
        cursor: "pointer",
        position: "relative",
        m: "0",
        p: "8px",
        className: "directcall__row",
        title: joinCallMessage
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        background: "0 0",
        textAlign: "center",
        color: this.context.theme.primaryColor,
        w: "100%",
        display: "inline-block",
        fontSize: "14px",
        fontWeight: "600",
        m: "0",
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else if (this.context.checkIfCallIsOngoing()) {
      //ongoing call

      callMessage = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        backgroundColor: this.context.theme.backgroundColor.white,
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        w: "100%",
        cursor: "pointer",
        position: "relative",
        m: "0",
        p: "8px",
        className: "directcall__row",
        title: joinCallMessage
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        background: "0 0",
        textAlign: "center",
        color: this.context.theme.primaryColor,
        w: "100%",
        display: "inline-block",
        fontSize: "14px",
        fontWeight: "600",
        m: "0",
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else {
      callMessage = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        backgroundColor: this.context.theme.backgroundColor.white,
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        w: "100%",
        cursor: "pointer",
        position: "relative",
        m: "0",
        p: "8px",
        className: "directcall__row",
        onClick: () => this.props.actionGenerated(enums.ACTIONS["JOIN_DIRECT_CALL"], this.props.message)
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        background: "0 0",
        textAlign: "center",
        color: this.context.theme.primaryColor,
        w: "100%",
        display: "inline-block",
        fontSize: "14px",
        fontWeight: "600",
        m: "0",
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-start",
      mb: "16px",
      pl: "16px",
      pr: "16px",
      maxW: "305px",
      clear: "both",
      position: "relative",
      flexDirection: "column",
      flexShrink: "0",
      className: "receiver__message__container message__directcall",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      w: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      className: "message__wrapper"
    }, avatar, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flex: "1 1",
      flexDirection: "column",
      className: "message__details"
    }, name, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      w: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      className: "message__directcall__container",
      sx: {
        img: {
          width: "35px"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "flex",
      flexDirection: "column",
      borderRadius: "12px",
      backgroundColor: this.context.theme.backgroundColor.secondary,
      p: "16px",
      alignSelf: "flex-start",
      w: "100%",
      minH: "106px",
      className: "message__directcall__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      justifyContent: "center",
      alignItems: "center",
      color: this.context.theme.color.primary,
      className: "message__directcall__title"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      w: "30px",
      h: "24px",
      display: "inline-block",
      sx: {
        mask: "url(".concat(_videoCall.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      },
      title: _translator.default.translate("VIDEO_CALL", this.context.language)
    }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      m: "0",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      textAlign: "left",
      w: "calc(100% - 30px)",
      fontSize: "14px",
      ml: "8px",
      className: "directcall__title"
    }, messageTitle)), /*#__PURE__*/_react.default.createElement(_react2.UnorderedList, {
      listStyleType: "none",
      p: "0",
      m: "16px 0 0 0",
      className: "directcall__button"
    }, callMessage))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-start",
      p: "4px 8px",
      alignItems: "center",
      justifyContent: "flex-start",
      h: "25px",
      className: "message__info__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
      message: this.props.message
    }), /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message
    })))));
  }
}

// Specifies the default values for props:
exports.CometChatReceiverDirectCallBubble = CometChatReceiverDirectCallBubble;
_defineProperty(CometChatReceiverDirectCallBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverDirectCallBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverDirectCallBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};