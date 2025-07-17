"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageActions = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _react2 = require("@chakra-ui/react");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _phosphorReact = require("phosphor-react");
var _edit = _interopRequireDefault(require("./resources/edit.svg"));
var _reactions = _interopRequireDefault(require("./resources/reactions.svg"));
var _messageTranslate = _interopRequireDefault(require("./resources/message-translate.svg"));
var _sendMessageInPrivate = _interopRequireDefault(require("./resources/send-message-in-private.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatMessageActions extends _react.default.PureComponent {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "toggleTooltip", (event, flag) => {
      const elem = event.target;
      if (flag) {
        elem.setAttribute("title", elem.dataset.title);
      } else {
        elem.removeAttribute("title");
      }
    });
    _defineProperty(this, "enableMessageReaction", () => {
      /**
       * If reacting to messages feature is disabled
       */
      this.context.FeatureRestriction.isReactionsEnabled().then(response => {
        if (response === true) {
          this.setState({
            enableMessageReaction: true
          });
        } else {
          this.setState({
            enableMessageReaction: false
          });
        }
      }).catch(error => {
        this.setState({
          enableMessageReaction: false
        });
      });
    });
    _defineProperty(this, "enableThreadedChats", () => {
      /**
       * If threaded chats are open, return false
       */
      if (this.props.message.hasOwnProperty("parentMessageId") === true) {
        return false;
      }

      /**
       * If threaded replies feature is disabled
       */
      this.context.FeatureRestriction.isThreadedMessagesEnabled().then(response => {
        if (response === true) {
          this.setState({
            enableThreadedChats: true
          });
        } else {
          this.setState({
            enableThreadedChats: false
          });
        }
      }).catch(error => {
        this.setState({
          enableThreadedChats: false
        });
      });
    });
    _defineProperty(this, "enableDeleteMessage", () => {
      this.context.FeatureRestriction.isDeleteMessageEnabled().then(response => {
        if (response === true) {
          this.setState({
            enableDeleteMessage: true
          });
        } else {
          this.setState({
            enableDeleteMessage: false
          });
        }
      }).catch(error => {
        this.setState({
          enableDeleteMessage: false
        });
      });
    });
    _defineProperty(this, "enableDeleteMessageForModerator", () => {
      this.context.FeatureRestriction.isDeleteMemberMessageEnabled().then(response => {
        if (response === true) {
          this.setState({
            enableDeleteMessageForModerator: true
          });
        } else {
          this.setState({
            enableDeleteMessageForModerator: false
          });
        }
      }).catch(error => {
        this.setState({
          enableDeleteMessageForModerator: false
        });
      });
    });
    _defineProperty(this, "enableEditMessage", () => {
      var _this$props$message$s, _this$state$loggedInU;
      /**
       * If the message is not sent by the logged in user or the message type is not text
       */
      if (((_this$props$message$s = this.props.message.sender) === null || _this$props$message$s === void 0 ? void 0 : _this$props$message$s.uid) !== ((_this$state$loggedInU = this.state.loggedInUser) === null || _this$state$loggedInU === void 0 ? void 0 : _this$state$loggedInU.uid) || this.props.message.type !== _chat.CometChat.MESSAGE_TYPE.TEXT) {
        return false;
      }
      this.context.FeatureRestriction.isEditMessageEnabled().then(response => {
        if (response === true) {
          this.setState({
            enableEditMessage: true
          });
        } else {
          this.setState({
            enableEditMessage: false
          });
        }
      }).catch(error => {
        this.setState({
          enableEditMessage: false
        });
      });
    });
    _defineProperty(this, "enableTranslateMessage", () => {
      /**
       * message type is not text
       */
      if (this.props.message.type !== _chat.CometChat.MESSAGE_TYPE.TEXT) {
        return false;
      }
      this.context.FeatureRestriction.isMessageTranslationEnabled().then(response => {
        if (response === true) {
          this.setState({
            enableTranslateMessage: true
          });
        } else {
          this.setState({
            enableTranslateMessage: false
          });
        }
      }).catch(error => {
        this.setState({
          enableTranslateMessage: false
        });
      });
    });
    /**
     * If message in private feature is enabled
     */
    _defineProperty(this, "enableMessageInPrivate", () => {
      this.context.FeatureRestriction.isMessageInPrivateEnabled().then(response => {
        if (response === true) {
          this.setState({
            enableMessageInPrivate: true
          });
        } else {
          this.setState({
            enableMessageInPrivate: false
          });
        }
      }).catch(error => {
        this.setState({
          enableMessageInPrivate: false
        });
      });
    });
    _defineProperty(this, "sendMessageInPrivate", () => {
      var _this$props$message;
      const item = (_this$props$message = this.props.message) === null || _this$props$message === void 0 ? void 0 : _this$props$message.sender;
      const type = _chat.CometChat.ACTION_TYPE.TYPE_USER;
      this.context.setTypeAndItem(type, item);
    });
    _defineProperty(this, "reactToMessage", () => {
      this.props.actionGenerated(enums.ACTIONS["REACT_TO_MESSAGE"], this.props.message);
    });
    _defineProperty(this, "viewThread", () => {
      this.props.actionGenerated(enums.ACTIONS["VIEW_THREADED_MESSAGE"], this.props.message);
    });
    _defineProperty(this, "deleteMessage", () => {
      this.props.actionGenerated(enums.ACTIONS["DELETE_MESSAGE"], this.props.message);
    });
    _defineProperty(this, "editMessage", () => {
      this.props.actionGenerated(enums.ACTIONS["EDIT_MESSAGE"], this.props.message);
    });
    _defineProperty(this, "translateMessage", () => {
      this.props.actionGenerated(enums.ACTIONS["TRANSLATE_MESSAGE"], this.props.message);
    });
    this.state = {
      loggedInUser: null,
      enableMessageReaction: false,
      enableThreadedChats: false,
      enableDeleteMessage: false,
      enableEditMessage: false,
      enableTranslateMessage: false,
      enableMessageInPrivate: false,
      enableDeleteMessageForModerator: false
    };
  }
  componentDidMount() {
    this.context.getLoggedinUser().then(user => {
      this.setState({
        loggedInUser: _objectSpread({}, user)
      });
    }).then(() => {
      this.enableMessageReaction();
      this.enableThreadedChats();
      this.enableDeleteMessage();
      this.enableDeleteMessageForModerator();
      this.enableEditMessage();
      this.enableTranslateMessage();
      this.enableMessageInPrivate();
    });
  }
  render() {
    var _this$props$message2, _this$state$loggedInU2;
    //don't show the tooltip while the message is being sent
    if (this.props.message.hasOwnProperty("sentAt") === false) {
      return false;
    }
    let reactToMessage = null;
    if (this.state.enableMessageReaction) {
      reactToMessage = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        className: "action__group"
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        variant: "ghost",
        size: "sm",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        className: "group__button button__reacttomessage",
        "data-title": _translator.default.translate("ADD_REACTION", this.context.language),
        onClick: this.reactToMessage,
        w: "24px",
        h: "24px",
        minW: "24px",
        p: "0",
        sx: {
          mask: "url(".concat(_reactions.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.primaryColor
        }
      }));
    }
    let threadedChats = null;
    if (this.state.enableThreadedChats) {
      threadedChats = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        className: "action__group"
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        variant: "ghost",
        size: "sm",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        className: "group__button button__threadedchats",
        "data-title": this.props.message.replyCount ? _translator.default.translate("REPLY_TO_THREAD", this.context.language) : _translator.default.translate("REPLY_IN_THREAD", this.context.language),
        onClick: this.viewThread,
        w: "24px",
        h: "24px",
        minW: "24px",
        p: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }, /*#__PURE__*/_react.default.createElement(_phosphorReact.ChatTeardropText, {
        size: 16,
        weight: "duotone"
      })));
    }

    /**
     * in one-on-one chat, allow deleting self messages if delete feature is enabled
     * in group chat, allow deleting other's messages for moderators and admins if moderator delete feature && delete feature is enabled
     */

    let editMessage = null;
    if (this.state.enableEditMessage) {
      editMessage = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        className: "action__group"
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        variant: "ghost",
        size: "sm",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        className: "group__button button__edit",
        "data-title": _translator.default.translate("EDIT_MESSAGE", this.context.language),
        onClick: this.editMessage,
        w: "24px",
        h: "24px",
        minW: "24px",
        p: "0",
        sx: {
          mask: "url(".concat(_edit.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.primaryColor
        }
      }));
    }
    let translateMessage = null;
    if (this.state.enableTranslateMessage) {
      translateMessage = /*#__PURE__*/_react.default.createElement(_react2.ListItem, {
        className: "action__group"
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        variant: "ghost",
        size: "sm",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        className: "group__button button__translate",
        "data-title": _translator.default.translate("TRANSLATE_MESSAGE", this.context.language),
        onClick: this.translateMessage,
        w: "24px",
        h: "24px",
        minW: "24px",
        p: "0",
        sx: {
          mask: "url(".concat(_messageTranslate.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.primaryColor
        }
      }));
    }

    /**
     * if send message in private feature is enabled, if group chat window is open, and messages are not sent by the loggedin user...
     */
    let messageInPrivate = null;
    if (this.state.enableMessageInPrivate === true && this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && ((_this$props$message2 = this.props.message) === null || _this$props$message2 === void 0 || (_this$props$message2 = _this$props$message2.sender) === null || _this$props$message2 === void 0 ? void 0 : _this$props$message2.uid) !== ((_this$state$loggedInU2 = this.state.loggedInUser) === null || _this$state$loggedInU2 === void 0 ? void 0 : _this$state$loggedInU2.uid)) {
      messageInPrivate = /*#__PURE__*/_react.default.createElement(_react2.ListItem, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        variant: "ghost",
        size: "sm",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        className: "group__button button__translate",
        "data-title": _translator.default.translate("SEND_MESSAGE_IN_PRIVATE", this.context.language),
        onClick: this.sendMessageInPrivate,
        w: "24px",
        h: "24px",
        minW: "24px",
        p: "0",
        sx: {
          mask: "url(".concat(_sendMessageInPrivate.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.primaryColor
        }
      }));
    }
    let tooltip = /*#__PURE__*/_react.default.createElement(_react2.List, {
      className: "message__actions",
      display: "flex",
      flexDirection: "row",
      bg: this.context.theme.backgroundColor.white,
      border: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderRadius: "8px",
      p: "4px",
      boxShadow: "md",
      zIndex: "10"
    }, reactToMessage, threadedChats, editMessage, messageInPrivate, translateMessage);
    if (threadedChats === null && editMessage === null && reactToMessage === null && translateMessage === null && messageInPrivate === null) {
      tooltip = null;
    }
    return tooltip;
  }
}

// Specifies the default values for props:
exports.CometChatMessageActions = CometChatMessageActions;
_defineProperty(CometChatMessageActions, "contextType", _CometChatContext.CometChatContext);
CometChatMessageActions.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatMessageActions.propTypes = {
  theme: _propTypes.default.object.isRequired,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};