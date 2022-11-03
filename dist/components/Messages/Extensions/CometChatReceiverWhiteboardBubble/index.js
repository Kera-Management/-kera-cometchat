"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverWhiteboardBubble = void 0;
require("core-js/modules/es6.regexp.split.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("../..");
var _2 = require("..");
var _Shared = require("../../../Shared");
var _CometChatContext = require("../../../../util/CometChatContext");
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style = require("./style");
var _collaborativeWhiteboard = _interopRequireDefault(require("./resources/collaborative-whiteboard.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatReceiverWhiteboardBubble extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "launchCollaborativeWhiteboard", () => {
      let whiteboardUrl = null;
      let whiteboardData = (0, _common.checkMessageForExtensionsData)(this.props.message, "whiteboard");
      if (whiteboardData && whiteboardData.hasOwnProperty("board_url") && whiteboardData.board_url.length) {
        var _this$loggedInUser;
        let username = (_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.name.split(" ").join("_");
        // Appending the username to the board_url
        whiteboardUrl = whiteboardData.board_url + "&username=" + username;
        window.open(whiteboardUrl, "", "fullscreen=yes, scrollbars=auto");
      }
    });
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
    this.context.getLoggedinUser().then(user => {
      this.loggedInUser = _objectSpread({}, user);
    });
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
      avatar = (0, _react2.jsx)("div", {
        css: _style.messageThumbnailStyle,
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
        }, (0, _react2.jsx)(_2.CometChatMessageReactions, {
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
    const documentTitle = "".concat(this.props.message.sender.name, " ").concat(_translator.default.translate("SHARED_COLLABORATIVE_WHITEBOARD", this.context.language));
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "receiver__message__container message__whiteboard",
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
      className: "message__whiteboard__container"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtWrapperStyle)(this.context),
      className: "message__whiteboard__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtTitleStyle)(this.context),
      className: "message__whiteboard__title"
    }, (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(_collaborativeWhiteboard.default, this.context),
      title: _translator.default.translate("COLLABORATIVE_WHITEBOARD", this.context.language)
    }), (0, _react2.jsx)("p", {
      css: (0, _style.messageTxtStyle)(),
      className: "whiteboard__title"
    }, documentTitle)), (0, _react2.jsx)("ul", {
      css: (0, _style.messageBtnStyle)(this.context),
      className: "whiteboard__button"
    }, (0, _react2.jsx)("li", {
      onClick: this.launchCollaborativeWhiteboard
    }, (0, _react2.jsx)("p", null, _translator.default.translate("JOIN", this.context.language)))))), messageReactions, (0, _react2.jsx)("div", {
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
exports.CometChatReceiverWhiteboardBubble = CometChatReceiverWhiteboardBubble;
_defineProperty(CometChatReceiverWhiteboardBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverWhiteboardBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverWhiteboardBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};