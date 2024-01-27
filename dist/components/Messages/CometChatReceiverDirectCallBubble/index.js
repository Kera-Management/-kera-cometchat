"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatReceiverDirectCallBubble = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("../");
var _Extensions = require("../Extensions");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _videoCall = _interopRequireDefault(require("./resources/video-call.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatReceiverDirectCallBubble extends _react.default.Component {
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
    const messageTitle = "".concat(this.props.message.sender.name, " ").concat(_translator.default.translate("INITIATED_GROUP_CALL", this.context.language));
    let callMessage = null;
    const joinCallMessage = _translator.default.translate("YOU_ALREADY_ONGOING_CALL", this.context.language);
    if (this.context.checkIfDirectCallIsOngoing() === enums.CONSTANTS.CALLS["ONGOING_CALL_SAME_GROUP"]) {
      //ongoing call in same group
      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        title: joinCallMessage
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else if (this.context.checkIfDirectCallIsOngoing() === enums.CONSTANTS.CALLS["ONGOING_CALL_DIFF_GROUP"]) {
      //ongoing call in different group

      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        title: joinCallMessage
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else if (this.context.checkIfCallIsOngoing()) {
      //ongoing call

      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        title: joinCallMessage
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else {
      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        onClick: () => this.props.actionGenerated(enums.ACTIONS["JOIN_DIRECT_CALL"], this.props.message)
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "receiver__message__container message__directcall",
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
      className: "message__directcall__container"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtWrapperStyle)(this.context),
      className: "message__directcall__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtTitleStyle)(this.context),
      className: "message__directcall__title"
    }, (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(_videoCall.default, this.context),
      title: _translator.default.translate("VIDEO_CALL", this.context.language)
    }), (0, _react2.jsx)("p", {
      css: (0, _style.messageTxtStyle)(),
      className: "directcall__title"
    }, messageTitle)), (0, _react2.jsx)("ul", {
      css: (0, _style.messageBtnStyle)(this.context),
      className: "directcall__button"
    }, callMessage))), messageReactions, (0, _react2.jsx)("div", {
      css: (0, _style.messageInfoWrapperStyle)(),
      className: "message__info__wrapper"
    }, (0, _react2.jsx)(_.CometChatReadReceipt, {
      message: this.props.message
    }), (0, _react2.jsx)(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message
    })))));
  }
}

// Specifies the default values for props:
exports.CometChatReceiverDirectCallBubble = CometChatReceiverDirectCallBubble;
_defineProperty(CometChatReceiverDirectCallBubble, "contextType", _CometChatContext.CometChatContext);
CometChatReceiverDirectCallBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatReceiverDirectCallBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};