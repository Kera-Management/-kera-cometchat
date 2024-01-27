"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageActions = void 0;
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _threadedMessage = _interopRequireDefault(require("./resources/threaded-message.svg"));
var _delete = _interopRequireDefault(require("./resources/delete.svg"));
var _edit = _interopRequireDefault(require("./resources/edit.svg"));
var _reactions = _interopRequireDefault(require("./resources/reactions.svg"));
var _messageTranslate = _interopRequireDefault(require("./resources/message-translate.svg"));
var _sendMessageInPrivate = _interopRequireDefault(require("./resources/send-message-in-private.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
    var _this$props$message$s2, _this$state$loggedInU2, _this$props$message$s3, _this$state$loggedInU3, _this$props$message2, _this$state$loggedInU4;
    //don't show the tooltip while the message is being sent
    if (this.props.message.hasOwnProperty("sentAt") === false) {
      return false;
    }
    let reactToMessage = null;
    if (this.state.enableMessageReaction) {
      reactToMessage = (0, _react2.jsx)("li", {
        css: (0, _style.actionGroupStyle)(),
        className: "action__group"
      }, (0, _react2.jsx)("button", {
        type: "button",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        css: (0, _style.groupButtonStyle)(_reactions.default, this.context),
        className: "group__button button__reacttomessage",
        "data-title": _translator.default.translate("ADD_REACTION", this.context.language),
        onClick: this.reactToMessage
      }));
    }
    let threadedChats = null;
    if (this.state.enableThreadedChats) {
      threadedChats = (0, _react2.jsx)("li", {
        css: (0, _style.actionGroupStyle)(),
        className: "action__group"
      }, (0, _react2.jsx)("button", {
        type: "button",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        css: (0, _style.groupButtonStyle)(_threadedMessage.default, this.context),
        className: "group__button button__threadedchats",
        "data-title": this.props.message.replyCount ? _translator.default.translate("REPLY_TO_THREAD", this.context.language) : _translator.default.translate("REPLY_IN_THREAD", this.context.language),
        onClick: this.viewThread
      }));
    }

    /**
     * in one-on-one chat, allow deleting self messages if delete feature is enabled
     * in group chat, allow deleting other's messages for moderators and admins if moderator delete feature && delete feature is enabled
     */
    let deleteMessage = null;
    if (((_this$props$message$s2 = this.props.message.sender) === null || _this$props$message$s2 === void 0 ? void 0 : _this$props$message$s2.uid) === ((_this$state$loggedInU2 = this.state.loggedInUser) === null || _this$state$loggedInU2 === void 0 ? void 0 : _this$state$loggedInU2.uid) && this.state.enableDeleteMessage || this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && ((_this$props$message$s3 = this.props.message.sender) === null || _this$props$message$s3 === void 0 ? void 0 : _this$props$message$s3.uid) !== ((_this$state$loggedInU3 = this.state.loggedInUser) === null || _this$state$loggedInU3 === void 0 ? void 0 : _this$state$loggedInU3.uid) && this.context.item.hasOwnProperty("scope") && this.context.item.scope !== _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT && this.state.enableDeleteMessageForModerator && this.state.enableDeleteMessage) {
      deleteMessage = (0, _react2.jsx)("li", {
        css: (0, _style.actionGroupStyle)(),
        className: "action__group"
      }, (0, _react2.jsx)("button", {
        type: "button",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        css: (0, _style.groupButtonStyle)(_delete.default, this.context, 1),
        className: "group__button button__delete",
        "data-title": _translator.default.translate("DELETE_MESSAGE", this.context.language),
        onClick: this.deleteMessage
      }));
    }
    let editMessage = null;
    if (this.state.enableEditMessage) {
      editMessage = (0, _react2.jsx)("li", {
        css: (0, _style.actionGroupStyle)(),
        className: "action__group"
      }, (0, _react2.jsx)("button", {
        type: "button",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        css: (0, _style.groupButtonStyle)(_edit.default, this.context),
        className: "group__button button__edit",
        "data-title": _translator.default.translate("EDIT_MESSAGE", this.context.language),
        onClick: this.editMessage
      }));
    }
    let translateMessage = null;
    if (this.state.enableTranslateMessage) {
      translateMessage = (0, _react2.jsx)("li", {
        css: (0, _style.actionGroupStyle)(),
        className: "action__group"
      }, (0, _react2.jsx)("button", {
        type: "button",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        css: (0, _style.groupButtonStyle)(_messageTranslate.default, this.context),
        className: "group__button button__translate",
        "data-title": _translator.default.translate("TRANSLATE_MESSAGE", this.context.language),
        onClick: this.translateMessage
      }));
    }

    /**
     * if send message in private feature is enabled, if group chat window is open, and messages are not sent by the loggedin user...
     */
    let messageInPrivate = null;
    if (this.state.enableMessageInPrivate === true && this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && ((_this$props$message2 = this.props.message) === null || _this$props$message2 === void 0 || (_this$props$message2 = _this$props$message2.sender) === null || _this$props$message2 === void 0 ? void 0 : _this$props$message2.uid) !== ((_this$state$loggedInU4 = this.state.loggedInUser) === null || _this$state$loggedInU4 === void 0 ? void 0 : _this$state$loggedInU4.uid)) {
      messageInPrivate = (0, _react2.jsx)("li", null, (0, _react2.jsx)("button", {
        type: "button",
        onMouseEnter: event => this.toggleTooltip(event, true),
        onMouseLeave: event => this.toggleTooltip(event, false),
        css: (0, _style.groupButtonStyle)(_sendMessageInPrivate.default, this.context),
        className: "group__button button__translate",
        "data-title": _translator.default.translate("SEND_MESSAGE_IN_PRIVATE", this.context.language),
        onClick: this.sendMessageInPrivate
      }));
    }
    let tooltip = (0, _react2.jsx)("ul", {
      css: (0, _style.messageActionStyle)(this.props, this.context, this.state.loggedInUser),
      className: "message__actions"
    }, reactToMessage, threadedChats, editMessage, deleteMessage, messageInPrivate, translateMessage);
    if (threadedChats === null && deleteMessage === null && editMessage === null && reactToMessage === null && translateMessage === null && messageInPrivate === null) {
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