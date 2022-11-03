"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSharedMediaView = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../util/CometChatContext");
var _controller = require("./controller");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _fileUpload = _interopRequireDefault(require("./resources/file-upload.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatSharedMediaView extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
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

  //callback for listener functions

  render() {
    const template = (message, key) => {
      if (this.state.messagetype === "image" && message.data.url) {
        return (0, _react2.jsx)("div", {
          id: message.id,
          key: key,
          css: (0, _style.itemStyle)(this.state, this.props, _fileUpload.default, this.context),
          className: "item item__image"
        }, (0, _react2.jsx)("img", {
          src: message.data.url,
          alt: _translator.default.translate("SHARED_MEDIA", this.props.lang)
        }));
      } else if (this.state.messagetype === "video" && message.data.url) {
        return (0, _react2.jsx)("div", {
          id: message.id,
          key: key,
          css: (0, _style.itemStyle)(this.state, this.props, _fileUpload.default, this.context),
          className: "item item__video"
        }, (0, _react2.jsx)("video", {
          src: message.data.url
        }));
      } else if (this.state.messagetype === "file" && message.data.attachments) {
        return (0, _react2.jsx)("div", {
          id: message.id,
          key: key,
          css: (0, _style.itemStyle)(this.state, this.props, _fileUpload.default, this.context),
          className: "item item__file"
        }, (0, _react2.jsx)("a", {
          href: message.data.attachments[0].url,
          target: "_blank",
          rel: "noopener noreferrer"
        }, (0, _react2.jsx)("i", null), (0, _react2.jsx)("span", null, message.data.attachments[0].name)));
      }
    };
    const messages = [...this.state.messageList];
    const messageList = messages.map((message, key) => {
      return template(message, key);
    });
    return (0, _react2.jsx)("div", {
      css: (0, _style.sectionStyle)(this.props),
      className: "section section__sharedmedia"
    }, (0, _react2.jsx)("h6", {
      css: (0, _style.sectionHeaderStyle)(this.props),
      className: "section__header"
    }, _translator.default.translate("SHARED_MEDIA", this.props.lang)), (0, _react2.jsx)("div", {
      css: (0, _style.sectionContentStyle)(this.props),
      "data-id": "sharedmedia",
      className: "section__content"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.mediaBtnStyle)(),
      className: "media__button"
    }, (0, _react2.jsx)("span", {
      css: (0, _style.buttonStyle)(this.state, "image"),
      onClick: () => this.mediaClickHandler("image")
    }, _translator.default.translate("PHOTOS", this.props.lang)), (0, _react2.jsx)("span", {
      css: (0, _style.buttonStyle)(this.state, "video"),
      onClick: () => this.mediaClickHandler("video")
    }, _translator.default.translate("VIDEOS", this.props.lang)), (0, _react2.jsx)("span", {
      css: (0, _style.buttonStyle)(this.state, "file"),
      onClick: () => this.mediaClickHandler("file")
    }, _translator.default.translate("DOCS", this.props.lang))), (0, _react2.jsx)("div", {
      css: (0, _style.mediaItemStyle)(),
      className: "media_items",
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