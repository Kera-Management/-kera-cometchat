"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverTextMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _twemoji = _interopRequireDefault(require("twemoji"));
var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Extensions = require("../Extensions");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatReceiverTextMessageBubble extends _react.default.Component {
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
      // Checks Emoji Count

      let count = (0, _common.countEmojiOccurences)(emojiParsedMessage, 'class="emoji"');
      const parsedMessage = (0, _htmlReactParser.default)(emojiParsedMessage);
      let showVariation = true;
      //if larger size emojis feature is disabled
      if (this.state.enableLargerSizeEmojis === false) {
        showVariation = false;
      }
      messageText = (0, _react2.jsx)("div", {
        css: (0, _style.messageTxtWrapperStyle)(this.context),
        className: "message__txt__wrapper"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.messageTxtStyle)(showVariation, count, this.context),
        className: "message__txt"
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