"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverImageMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
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
var _px = _interopRequireDefault(require("./resources/1px.png"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      avatar = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "message__thumbnail",
        width: "36px",
        height: "36px",
        margin: "10px 5px",
        float: "left",
        flexShrink: "0"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.props.message.sender
      }));
      name = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "message__name__wrapper",
        alignSelf: "flex-start",
        padding: avatar ? "3px 5px" : "0"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        as: "span",
        className: "message__name",
        fontSize: "11px",
        color: this.context.theme.color.search
      }, this.props.message.sender.name));
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          className: "message__reaction__wrapper",
          display: "flex",
          alignSelf: "flex-start",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-start",
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
        actionGenerated: this.props.actionGenerated
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "receiver__message__container message__image",
      alignSelf: "flex-start",
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
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__wrapper",
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex"
    }, avatar, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__details",
      flex: "1 1",
      display: "flex",
      flexDirection: "column"
    }, name, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__image__container",
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-start",
      display: "flex"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "message__image__wrapper",
      onClick: this.open,
      cursor: "pointer",
      display: "inline-block",
      alignSelf: "flex-start",
      maxWidth: "300px",
      height: "200px",
      sx: {
        ["@media ".concat(this.context.theme.breakPoints[1], ", ").concat(this.context.theme.breakPoints[2])]: {
          minWidth: "50px",
          maxWidth: "150px",
          height: "100px",
          padding: "2px 2px"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Image, {
      src: this.state.imageUrl,
      alt: this.state.imageName,
      borderRadius: "8px",
      height: "100%",
      ref: el => {
        this.imgRef = el;
      }
    }))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__info__wrapper",
      alignSelf: "flex-start",
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "25px"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
      message: this.props.message
    }), /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
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