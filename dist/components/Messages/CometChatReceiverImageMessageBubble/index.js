"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverImageMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Extensions = require("../Extensions");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _common = require("../../../util/common");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _px = _interopRequireDefault(require("./resources/1px.png"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatReceiverImageMessageBubble extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
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
    _defineProperty(this, "setImage", () => {
      const thumbnailGenerationData = (0, _common.checkMessageForExtensionsData)(this.props.message, "thumbnail-generation");
      if (thumbnailGenerationData) {
        let imageName = "";
        if (this.props.message.data.attachments && typeof this.props.message.data.attachments === "object" && this.props.message.data.attachments.length) {
          var _this$props$message$d;
          imageName = (_this$props$message$d = this.props.message.data.attachments[0]) === null || _this$props$message$d === void 0 ? void 0 : _this$props$message$d.name;
        }
        const mq = window.matchMedia(this.props.theme.breakPoints[0]);
        mq.addListener(() => {
          const imageToDownload = this.chooseImage(thumbnailGenerationData);
          let img = new Image();
          img.src = imageToDownload;
          img.onload = () => {
            if (this._isMounted && this.state.imageUrl !== img.src) {
              this.setState({
                imageUrl: img.src,
                imageName: imageName
              });
            }
          };
        });
        const imageToDownload = this.chooseImage(thumbnailGenerationData);
        this.downloadImage(imageToDownload).then(response => {
          let img = new Image();
          img.src = imageToDownload;
          img.onload = () => {
            if (this._isMounted && this.state.imageUrl !== img.src) {
              this.setState({
                imageUrl: img.src,
                imageName: imageName
              });
            }
          };
        }).catch(error => console.error(error));
      } else {
        this.setMessageImageUrl();
      }
    });
    _defineProperty(this, "setMessageImageUrl", () => {
      if (this.props.message.data.attachments && typeof this.props.message.data.attachments === "object" && this.props.message.data.attachments.length) {
        var _this$props$message$d2;
        let img = new Image();
        img.src = this.props.message.data.attachments[0].url;
        const imageName = (_this$props$message$d2 = this.props.message.data.attachments[0]) === null || _this$props$message$d2 === void 0 ? void 0 : _this$props$message$d2.name;
        img.onload = () => {
          if (this._isMounted && this.state.imageUrl !== img.src) {
            this.setState({
              imageUrl: img.src,
              imageName: imageName
            });
          }
        };
      }
    });
    _defineProperty(this, "open", () => {
      this.props.actionGenerated(enums.ACTIONS["VIEW_ORIGINAL_IMAGE"], this.props.message);
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
    this.imgRef = /*#__PURE__*/_react.default.createRef();
    this.state = {
      imageUrl: _px.default,
      imageName: _translator.default.translate("LOADING", this.context.language),
      isHovering: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);
    if (currentMessageStr !== nextMessageStr || this.state.imageUrl !== nextState.imageUrl || this.state.isHovering !== nextState.isHovering) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    this._isMounted = true;
    this.setImage();
  }
  componentDidUpdate(prevProps, prevState) {
    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);
    if (previousMessageStr !== currentMessageStr) {
      this.setImage();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
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
            resolve(xhr.response);
          } else if (xhr.status === 403) {
            this.timer = setTimeout(() => {
              this.downloadImage(imgUrl).then(response => resolve(response)).catch(error => reject(error));
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
      className: "receiver__message__container message__image",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageWrapperStyle)(),
      className: "message__wrapper"
    }, avatar, (0, _react2.jsx)("div", {
      css: (0, _style.messageDetailStyle)(name),
      className: "message__details"
    }, name, toolTipView, (0, _react2.jsx)("div", {
      css: (0, _style.messageImgContainerStyle)(),
      className: "message__image__container"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageImgWrapperStyle)(this.context),
      onClick: this.open,
      className: "message__image__wrapper"
    }, (0, _react2.jsx)("img", {
      src: this.state.imageUrl,
      alt: this.state.imageName,
      ref: el => {
        this.imgRef = el;
      }
    }))), messageReactions, (0, _react2.jsx)("div", {
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
exports.CometChatReceiverImageMessageBubble = CometChatReceiverImageMessageBubble;
_defineProperty(CometChatReceiverImageMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverImageMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverImageMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};