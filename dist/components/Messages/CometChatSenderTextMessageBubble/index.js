"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderTextMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _twemoji = _interopRequireDefault(require("twemoji"));
var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Extensions = require("../Extensions");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatSenderTextMessageBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "getMessageText", () => {
      let messageText = this.props.message.text;

      //xss extensions data
      const xssData = (0, _common.checkMessageForExtensionsData)(this.props.message, "xss-filter");
      if (xssData && xssData.hasOwnProperty("sanitized_text") && xssData.hasOwnProperty("hasXSS") && xssData.hasXSS === "yes") {
        messageText = xssData.sanitized_text;
      }

      //datamasking extensions data
      const maskedData = (0, _common.checkMessageForExtensionsData)(this.props.message, "data-masking");
      if (maskedData && maskedData.hasOwnProperty("data") && maskedData.data.hasOwnProperty("sensitive_data") && maskedData.data.hasOwnProperty("message_masked") && maskedData.data.sensitive_data === "yes") {
        messageText = maskedData.data.message_masked;
      }

      //profanity extensions data
      const profaneData = (0, _common.checkMessageForExtensionsData)(this.props.message, "profanity-filter");
      if (profaneData && profaneData.hasOwnProperty("profanity") && profaneData.hasOwnProperty("message_clean") && profaneData.profanity === "yes") {
        messageText = profaneData.message_clean;
      }
      const formattedText = (0, _common.linkify)(messageText);
      const emojiParsedMessage = _twemoji.default.parse(formattedText, {
        folder: "svg",
        ext: ".svg"
      });
      let count = (0, _common.countEmojiOccurences)(emojiParsedMessage, 'class="emoji"');
      const parsedMessage = (0, _htmlReactParser.default)(emojiParsedMessage);
      let showVariation = true;
      //if larger size emojis feature is disabled
      if (this.state.enableLargerSizeEmojis === false) {
        showVariation = false;
      }
      messageText = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "message__txt__wrapper",
        display: "inline-block",
        borderRadius: "12px",
        backgroundColor: this.context.theme.primaryColor,
        color: this.context.theme.color.white,
        padding: "8px 16px",
        width: "auto"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "message__txt",
        as: "p",
        margin: "0",
        fontSize: "14px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        textAlign: "left",
        width: "auto",
        sx: {
          height: count === 1 ? "48px" : count === 2 ? "36px" : "auto",
          "a": {
            color: "#0432FF",
            "&:hover": {
              color: "#04009D"
            }
          },
          "a[href^='mailto:']": {
            color: "#F38C00",
            "&:hover": {
              color: "#F36800"
            }
          },
          "a[href^='tel:']": {
            color: "#3802DA",
            "&:hover": {
              color: "#2D038F"
            }
          },
          "> img": {
            width: showVariation === false ? "24px" : count === 1 ? "48px" : count === 2 ? "36px" : "24px",
            height: showVariation === false ? "24px" : count === 1 ? "48px" : count === 2 ? "36px" : "24px",
            display: "inline-block",
            verticalAlign: "top",
            zoom: "1",
            margin: "0 2px"
          }
        }
      }, parsedMessage, this.state.translatedMessage));
      return messageText;
    });
    _defineProperty(this, "translateMessage", message => {
      const messageId = message.id;
      const messageText = message.text;
      const browserLanguageCode = _translator.default.getBrowserLanguage().toLowerCase();
      let translateToLanguage = browserLanguageCode;
      if (browserLanguageCode.indexOf("-") !== -1) {
        const browserLanguageArray = browserLanguageCode.split("-");
        translateToLanguage = browserLanguageArray[0];
      }
      let translatedMessage = "";
      _chat.CometChat.callExtension("message-translation", "POST", "v2/translate", {
        msgId: messageId,
        text: messageText,
        languages: [translateToLanguage]
      }).then(result => {
        if (result.hasOwnProperty("language_original") && result["language_original"] !== translateToLanguage) {
          if (result.hasOwnProperty("translations") && result.translations.length) {
            const messageTranslation = result.translations[0];
            if (messageTranslation.hasOwnProperty("message_translated")) {
              translatedMessage = "\n(".concat(messageTranslation["message_translated"], ")");
            }
          } else {
            this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG");
          }
        } else {
          this.props.actionGenerated(enums.ACTIONS["INFO"], [], "SAME_LANGUAGE_MESSAGE");
        }
        this.setState({
          translatedMessage: translatedMessage
        });
      }).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    });
    _defineProperty(this, "enableLargerSizeEmojis", () => {
      this.context.FeatureRestriction.isLargerSizeEmojisEnabled().then(response => {
        if (response !== this.state.enableLargerSizeEmojis) {
          this.setState({
            enableLargerSizeEmojis: response
          });
        }
      }).catch(error => {
        if (this.state.enableLargerSizeEmojis !== false) {
          this.setState({
            enableLargerSizeEmojis: false
          });
        }
      });
    });
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    _defineProperty(this, "actionHandler", (action, message) => {
      switch (action) {
        case enums.ACTIONS["REACT_TO_MESSAGE"]:
          this.props.actionGenerated(action, message);
          break;
        case enums.ACTIONS["VIEW_THREADED_MESSAGE"]:
          this.props.actionGenerated(action, message);
          break;
        case enums.ACTIONS["DELETE_MESSAGE"]:
          this.props.actionGenerated(action, message);
          break;
        case enums.ACTIONS["EDIT_MESSAGE"]:
          this.props.actionGenerated(action, message);
          break;
        case enums.ACTIONS["TRANSLATE_MESSAGE"]:
          this.translateMessage(message);
          break;
        default:
          break;
      }
    });
    this.messageTextRef = /*#__PURE__*/_react.default.createRef();
    this.state = {
      translatedMessage: "",
      isHovering: false,
      enableLargerSizeEmojis: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);
    if (currentMessageStr !== nextMessageStr || this.state.isHovering !== nextState.isHovering || this.state.translatedMessage !== nextState.translatedMessage || this.state.enableLargerSizeEmojis !== nextState.enableLargerSizeEmojis) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    this.enableLargerSizeEmojis();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        translatedMessage: ""
      });
    }
    this.enableLargerSizeEmojis();
  }
  render() {
    let messageText = this.getMessageText();

    //linkpreview extensions data
    const linkPreviewData = (0, _common.checkMessageForExtensionsData)(this.props.message, "link-preview");
    if (linkPreviewData && linkPreviewData.hasOwnProperty("links") && linkPreviewData["links"].length) {
      messageText = /*#__PURE__*/_react.default.createElement(_.CometChatLinkPreview, {
        message: this.props.message,
        messageText: messageText
      });
    }

    //messagereactions extensions data
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          className: "message__reaction__wrapper",
          display: "flex",
          alignSelf: "flex-end",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          minHeight: "36px"
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
        actionGenerated: this.actionHandler
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "sender__message__container message__text",
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
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__wrapper",
      width: "auto",
      alignSelf: "flex-end",
      display: "flex",
      flex: "1 1",
      ref: this.messageTextRef
    }, messageText), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__info__wrapper",
      alignSelf: "flex-end",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      height: "25px",
      padding: "4px 8px"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    }), /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
      message: this.props.message
    })));
  }
}

// Specifies the default values for props:
exports.CometChatSenderTextMessageBubble = CometChatSenderTextMessageBubble;
_defineProperty(CometChatSenderTextMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatSenderTextMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatSenderTextMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};