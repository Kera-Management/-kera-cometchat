"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverTextMessageBubble = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _api = _interopRequireDefault(require("@twemoji/api"));
var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("../");
var _Extensions = require("../Extensions");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatReceiverTextMessageBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "getMessageText", () => {
      let messageText = this.props.message.text;
      let hasDataMasking = false;
      if ((0, _common.isEmail)(messageText) || (0, _common.isPhoneNumber)(messageText)) {
        hasDataMasking = true;
      } else {
        hasDataMasking = false;
      }

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
      // Check if link preview data exists
      const linkPreviewData = (0, _common.checkMessageForExtensionsData)(this.props.message, "link-preview");
      const hasLinkPreview = linkPreviewData && linkPreviewData.hasOwnProperty("links") && linkPreviewData["links"].length;
      const formattedText = hasLinkPreview || hasDataMasking ? (0, _common.linkify)(messageText) : messageText;
      const emojiParsedMessage = _api.default.parse(formattedText, {
        folder: "svg",
        ext: ".svg"
      });
      const hasTwemoji = emojiParsedMessage !== formattedText;
      let count = (0, _common.countEmojiOccurences)(emojiParsedMessage, 'class="emoji"');
      let showVariation = true;
      //if larger size emojis feature is disabled
      if (this.state.enableLargerSizeEmojis === false) {
        showVariation = false;
      }

      // If the message contains a twemoji or a link preview, parse the HTML,
      // otherwise, use the original message text
      const messageContent = hasTwemoji || hasLinkPreview || hasDataMasking ? (0, _htmlReactParser.default)(emojiParsedMessage) : emojiParsedMessage;
      messageText = (0, _react2.jsx)("div", {
        css: (0, _style.messageTxtWrapperStyle)(this.context),
        className: "message__txt__wrapper"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.messageTxtStyle)(showVariation, count, this.context),
        className: "message__txt"
      }, messageContent, this.state.translatedMessage));
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
        if (result && result.hasOwnProperty("language_original") && result["language_original"] !== translateToLanguage) {
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
  componentDidUpdate(prevProps) {
    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);
    if (previousMessageStr !== currentMessageStr) {
      this.setState({
        translatedMessage: ""
      });
    }
    this.enableLargerSizeEmojis();
  }
  render() {
    let avatar = null,
      name = null;
    if (this.props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
      avatar = (0, _react2.jsx)("div", {
        css: (0, _style.messageThumbnailStyle)(),
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
    let messageText = this.getMessageText();
    //linkpreview extensions data
    const linkPreviewData = (0, _common.checkMessageForExtensionsData)(this.props.message, "link-preview");
    if (linkPreviewData && linkPreviewData.hasOwnProperty("links") && linkPreviewData["links"].length) {
      messageText = (0, _react2.jsx)(_.CometChatLinkPreview, {
        message: this.props.message,
        messageText: messageText
      });
    }

    //messagereactions extensions data
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (0, _react2.jsx)("div", {
          css: (0, _style.messageReactionsWrapperStyle)(),
          className: "message__reaction__wrapper"
        }, (0, _react2.jsx)(_Extensions.CometChatMessageReactions, {
          message: this.props.message,
          actionGenerated: this.props.actionGenerated
        }));
      }
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (0, _react2.jsx)(_.CometChatMessageActions, {
        message: this.props.message,
        actionGenerated: this.actionHandler
      });
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "receiver__message__container message__text",
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
      className: "message__text__container"
    }, messageText), messageReactions, (0, _react2.jsx)("div", {
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
exports.CometChatReceiverTextMessageBubble = CometChatReceiverTextMessageBubble;
_defineProperty(CometChatReceiverTextMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverTextMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverTextMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};