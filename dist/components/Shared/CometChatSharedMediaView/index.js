"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSharedMediaView = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../util/CometChatContext");
var _controller = require("./controller");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _fileUpload = _interopRequireDefault(require("./resources/file-upload.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatSharedMediaView extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    //callback for listener functions
    _defineProperty(this, "messageUpdated", (key, message) => {
      switch (key) {
        case enums.MESSAGE_DELETED:
          this.messageDeleted(message);
          break;
        case enums.MEDIA_MESSAGE_RECEIVED:
          this.messageReceived(message);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "messageDeleted", deletedMessage => {
      const messageType = deletedMessage.data.type;
      if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && deletedMessage.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && deletedMessage.getReceiver().guid === this.context.item.guid && messageType === this.state.messagetype) {
        const messageList = [...this.state.messageList];
        const filteredMessages = messageList.filter(message => message.id !== deletedMessage.id);
        this.setState({
          messageList: filteredMessages,
          scrollToBottom: false
        });
      }
    });
    //message is received or composed & sent
    _defineProperty(this, "messageReceived", message => {
      const messageType = message.data.type;
      if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && message.getReceiverType() === _chat.CometChat.RECEIVER_TYPE.GROUP && message.getReceiver().guid === this.context.item.guid && messageType === this.state.messagetype) {
        let messages = [...this.state.messageList];
        messages = messages.concat(message);
        this.setState({
          messageList: messages,
          scrollToBottom: true
        });
      }
    });
    _defineProperty(this, "getMessages", function () {
      let scrollToBottom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      _this.SharedMediaManager.fetchPreviousMessages().then(messages => {
        const messageList = [...messages, ..._this.state.messageList];
        if (_this._isMounted) {
          _this.setState({
            messageList: messageList
          });
          if (scrollToBottom) {
            _this.scrollToBottom();
          }
        }
      }).catch(error => {
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "ERROR";
        _this.context.setToastMessage("error", errorCode);
      });
    });
    _defineProperty(this, "scrollToBottom", () => {
      if (this.messageContainer) {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
      }
    });
    _defineProperty(this, "handleScroll", e => {
      const top = Math.round(e.currentTarget.scrollTop) === 0;
      if (top && this.state.messageList.length) {
        this.getMessages();
      }
    });
    _defineProperty(this, "mediaClickHandler", type => {
      this.setState({
        messagetype: type,
        messageList: []
      });
    });
    this._isMounted = false;
    this.state = {
      messagetype: "image",
      messageList: []
    };
    this.messageContainer = /*#__PURE__*/_react.default.createRef();
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => {
      console.error(error);
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this.SharedMediaManager = new _controller.SharedMediaManager(this.context.item, this.context.type, this.state.messagetype);
    this.getMessages(true);
    this.SharedMediaManager.attachListeners(this.messageUpdated);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.messagetype !== this.state.messagetype) {
      this.SharedMediaManager = null;
      this.SharedMediaManager = new _controller.SharedMediaManager(this.context.item, this.context.type, this.state.messagetype);
      this.getMessages(true);
      this.SharedMediaManager.attachListeners(this.messageUpdated);
    }
  }
  componentWillUnmount() {
    this.SharedMediaManager.removeListeners();
    this.SharedMediaManager = null;
    this._isMounted = false;
  }
  render() {
    const template = (message, key) => {
      if (this.state.messagetype === "image" && message.data.url) {
        return /*#__PURE__*/_react.default.createElement(_react2.Box, {
          id: message.id,
          key: key,
          className: "item item__image",
          margin: "0.5rem",
          textAlign: "center",
          flex: "1 0 auto",
          height: "120px",
          width: "120px",
          backgroundColor: this.props.theme.backgroundColor.lightGrey,
          sx: {
            "@for $i from 1 through 36": {
              "&:nth-of-type(#{$i})": {
                maxWidth: "100%"
              }
            }
          }
        }, /*#__PURE__*/_react.default.createElement(_react2.Image, {
          src: message.data.url,
          alt: _translator.default.translate("SHARED_MEDIA", this.props.lang),
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain"
        }));
      } else if (this.state.messagetype === "video" && message.data.url) {
        return /*#__PURE__*/_react.default.createElement(_react2.Box, {
          id: message.id,
          key: key,
          className: "item item__video",
          margin: "0.5rem",
          textAlign: "center",
          flex: "1 0 auto",
          sx: {
            "@for $i from 1 through 36": {
              "&:nth-of-type(#{$i})": {
                maxWidth: "100%"
              }
            }
          }
        }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          as: "video",
          src: message.data.url,
          height: "120px",
          width: "120px",
          margin: "auto"
        }));
      } else if (this.state.messagetype === "file" && message.data.attachments) {
        return /*#__PURE__*/_react.default.createElement(_react2.Box, {
          id: message.id,
          key: key,
          className: "item item__file",
          margin: "0.5rem",
          textAlign: "center",
          flex: "1 0 auto",
          backgroundColor: this.props.theme.backgroundColor.lightGrey,
          sx: {
            "@for $i from 1 through 36": {
              "&:nth-of-type(#{$i})": {
                maxWidth: "100%"
              }
            }
          }
        }, /*#__PURE__*/_react.default.createElement(_react2.Link, {
          href: message.data.attachments[0].url,
          target: "_blank",
          rel: "noopener noreferrer",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "auto",
          display: "flex",
          padding: "8px",
          _hover: {
            color: this.props.theme.secondaryTextColor
          },
          _visited: {
            color: this.props.theme.secondaryTextColor
          }
        }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          width: "30px",
          height: "24px",
          display: "inline-block",
          sx: {
            mask: "url(".concat(_fileUpload.default, ") left center no-repeat"),
            backgroundColor: this.context.theme.secondaryTextColor
          }
        }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
          fontSize: "13px",
          color: this.props.theme.secondaryTextColor,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          textAlign: "left",
          width: "calc(100% - 30px)"
        }, message.data.attachments[0].name)));
      }
    };
    const messages = [...this.state.messageList];
    const messageList = messages.map((message, key) => {
      return template(message, key);
    });
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "section section__sharedmedia",
      width: "100%",
      height: this.props.containerHeight ? "calc(100% - ".concat(this.props.containerHeight, ")") : "calc(100% - 20px)"
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      as: "h6",
      className: "section__header",
      margin: "0",
      width: "100%",
      fontSize: "12px",
      fontWeight: "500!important",
      lineHeight: "20px",
      color: this.props.theme.color.secondary,
      textTransform: "uppercase"
    }, _translator.default.translate("SHARED_MEDIA", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      "data-id": "sharedmedia",
      className: "section__content",
      width: "100%",
      margin: "6px 0",
      display: "flex",
      flexDirection: "column",
      height: "calc(100% - 20px)",
      spacing: 0
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "media__button",
      borderRadius: "8px",
      backgroundColor: "rgba(20, 20, 20, 0.08)",
      width: "100%",
      padding: "2px",
      margin: "6px 0",
      clear: "both"
    }, /*#__PURE__*/_react.default.createElement(_react2.HStack, {
      spacing: 0
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      onClick: () => this.mediaClickHandler("image"),
      display: "inline-block",
      width: "33.33%",
      fontSize: "13px",
      fontWeight: "500",
      lineHeight: "18px",
      padding: "5px",
      position: "relative",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: this.state.messagetype === "image" ? "#fff" : "transparent",
      boxShadow: this.state.messagetype === "image" ? "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px" : "none",
      borderRadius: this.state.messagetype === "image" ? "7px" : "0",
      sx: {
        "&:before": {
          content: this.state.messagetype === "image" ? "none" : '""',
          position: "absolute",
          display: this.state.messagetype === "image" ? "none" : "block",
          width: "2px",
          height: "16px",
          backgroundColor: "rgba(20, 20, 20, 0.12)",
          right: "-2px",
          top: "6px"
        }
      }
    }, _translator.default.translate("PHOTOS", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      onClick: () => this.mediaClickHandler("video"),
      display: "inline-block",
      width: "33.33%",
      fontSize: "13px",
      fontWeight: "500",
      lineHeight: "18px",
      padding: "5px",
      position: "relative",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: this.state.messagetype === "video" ? "#fff" : "transparent",
      boxShadow: this.state.messagetype === "video" ? "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px" : "none",
      borderRadius: this.state.messagetype === "video" ? "7px" : "0",
      sx: {
        "&:before": {
          content: this.state.messagetype === "video" ? "none" : '""',
          position: "absolute",
          display: this.state.messagetype === "video" ? "none" : "block",
          width: "2px",
          height: "16px",
          backgroundColor: "rgba(20, 20, 20, 0.12)",
          right: "-2px",
          top: "6px"
        }
      }
    }, _translator.default.translate("VIDEOS", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      onClick: () => this.mediaClickHandler("file"),
      display: "inline-block",
      width: "33.33%",
      fontSize: "13px",
      fontWeight: "500",
      lineHeight: "18px",
      padding: "5px",
      position: "relative",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: this.state.messagetype === "file" ? "#fff" : "transparent",
      boxShadow: this.state.messagetype === "file" ? "rgba(20, 20, 20, 0.04) 0 3px 1px, rgba(20, 20, 20, 0.12) 0 3px 8px" : "none",
      borderRadius: this.state.messagetype === "file" ? "7px" : "0",
      sx: {
        "&:last-of-type::before": {
          display: "none"
        }
      }
    }, _translator.default.translate("DOCS", this.props.lang)))), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "media_items",
      height: "calc(100% - 45px)",
      overflowY: "auto",
      overflowX: "hidden",
      display: "flex",
      flexWrap: "wrap",
      fontSize: "14px",
      ref: el => this.messageContainer = el,
      onScroll: this.handleScroll
    }, messageList.length ? messageList : _translator.default.translate("NO_RECORDS_FOUND", this.props.lang))));
  }
}

// Specifies the default values for props:
exports.CometChatSharedMediaView = CometChatSharedMediaView;
_defineProperty(CometChatSharedMediaView, "contextType", _CometChatContext.CometChatContext);
CometChatSharedMediaView.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatSharedMediaView.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};