"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderStickerBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
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
class CometChatSenderStickerBubble extends _react.default.Component {
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
    let stickerData = null;
    let stickerImg = null;
    if (this.props.message.hasOwnProperty("data") && this.props.message.data.hasOwnProperty("customData")) {
      stickerData = this.props.message.data.customData;
      if (stickerData.hasOwnProperty("sticker_url")) {
        const stickerName = stickerData.hasOwnProperty("sticker_name") ? stickerData.sticker_name : _translator.default.translate("STICKER", this.context.language);
        stickerImg = /*#__PURE__*/_react.default.createElement(_react2.Image, {
          src: stickerData.sticker_url,
          alt: stickerName
        });
      }
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          display: "flex",
          alignSelf: "flex-end",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          minHeight: "36px",
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
      marginBottom: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      maxWidth: "65%",
      clear: "both",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      className: "sender__message__container message__sticker",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-end",
      display: "flex",
      className: "message__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      alignSelf: "flex-end",
      maxWidth: {
        base: "128px",
        sm: "128px",
        md: "128px"
      },
      height: "128px",
      cursor: "pointer",
      flexShrink: "0",
      padding: {
        base: "0",
        sm: "2px 2px",
        md: "2px 2px"
      },
      className: "message__img__wrapper"
    }, stickerImg)), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      alignSelf: "flex-end",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "4px 8px",
      height: "25px",
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
exports.CometChatSenderStickerBubble = CometChatSenderStickerBubble;
_defineProperty(CometChatSenderStickerBubble, "contextType", _CometChatContext.CometChatContext);
CometChatSenderStickerBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatSenderStickerBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};