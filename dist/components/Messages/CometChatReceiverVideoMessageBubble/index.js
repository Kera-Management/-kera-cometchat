"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverVideoMessageBubble = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("../");
var _Extensions = require("../Extensions");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var _image_placeholder = _interopRequireDefault(require("./resources/image_placeholder.png"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatReceiverVideoMessageBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "setImage", () => {
      const thumbnailGenerationData = (0, _common.checkMessageForExtensionsData)(this.props.message, "thumbnail-generation");
      if (thumbnailGenerationData) {
        const mq = window.matchMedia(this.props.theme.breakPoints[0]);
        mq.addListener(() => {
          const imageToDownload = this.chooseImage(thumbnailGenerationData);
          let img = new Image();
          img.src = imageToDownload;
          img.onload = () => {
            if (this._isMounted && this.state.thumbnailURL !== img.src) {
              this.setState({
                thumbnailURL: img.src
              });
            }
          };
        });
        const imageToDownload = this.chooseImage(thumbnailGenerationData);
        this.downloadImage(imageToDownload).then(response => {
          let img = new Image();
          img.src = imageToDownload;
          img.onload = () => {
            if (this._isMounted && this.state.thumbnailURL !== img.src) {
              this.setState({
                thumbnailURL: img.src
              });
            }
          };
        }).catch(error => console.error(error));
      }
    });
    _defineProperty(this, "chooseImage", thumbnailGenerationObject => {
      const smallUrl = thumbnailGenerationObject["url_small"];
      const mediumUrl = thumbnailGenerationObject["url_medium"];
      const mq = window.matchMedia(this.props.theme.breakPoints[0]);
      let imageToDownload = mediumUrl;
      if (mq.matches) {
        imageToDownload = smallUrl;
      }
      return imageToDownload;
    });
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    this._isMounted = false;
    this.state = {
      isHovering: false,
      thumbnailURL: _image_placeholder.default
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.setImage();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);
    if (currentMessageStr !== nextMessageStr || this.state.isHovering !== nextState.isHovering || this.state.thumbnailURL !== nextState.thumbnailURL) {
      return true;
    }
    return false;
  }
  downloadImage(imgUrl) {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", imgUrl, true);
      xhr.responseType = "blob";
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.timer = null;
            resolve(imgUrl);
          } else if (xhr.status === 403) {
            this.timer = setTimeout(() => {
              this.downloadImage(imgUrl).then(response => resolve(imgUrl)).catch(error => reject(error));
            }, 800);
          }
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = event => reject(new Error("There was a network error.", event));
      xhr.ontimeout = event => reject(new Error("There was a timeout error.", event));
      xhr.send();
    });
    return promise;
  }
  render() {
    var _this$state;
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
        actionGenerated: this.props.actionGenerated
      });
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "receiver__message__container message__video",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageWrapperStyle)(),
      className: "message__wrapper"
    }, avatar, (0, _react2.jsx)("div", {
      css: (0, _style.messageDetailStyle)(name),
      className: "message__details"
    }, name, toolTipView, (0, _react2.jsx)("div", {
      css: (0, _style.messageVideoContainerStyle)(),
      className: "message__video__container"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageVideoWrapperStyle)(),
      className: "message__video__wrapper"
    }, (0, _react2.jsx)("video", {
      controls: true,
      poster: (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.thumbnailURL
    }, (0, _react2.jsx)("source", {
      src: this.props.message.data.attachments[0].url
    })))), messageReactions, (0, _react2.jsx)("div", {
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
exports.CometChatReceiverVideoMessageBubble = CometChatReceiverVideoMessageBubble;
_defineProperty(CometChatReceiverVideoMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverVideoMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverVideoMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};