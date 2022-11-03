"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageActions = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _phosphorReact = require("phosphor-react");
var _style = require("./style");
var _edit = _interopRequireDefault(require("./resources/edit.svg"));
var _reactions = _interopRequireDefault(require("./resources/reactions.svg"));
var _messageTranslate = _interopRequireDefault(require("./resources/message-translate.svg"));
var _sendMessageInPrivate = _interopRequireDefault(require("./resources/send-message-in-private.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    var _this$props$message2, _this$props$message2$, _this$state$loggedInU2;
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
        onMouseLeave: event => this.toggleTooltip(event, false)
        // css={groupButtonStyle(startThreadIcon, this.context)}
        ,
        className: "group__button button__threadedchats",
        "data-title": this.props.message.replyCount ? _translator.default.translate("REPLY_TO_THREAD", this.context.language) : _translator.default.translate("REPLY_IN_THREAD", this.context.language),
        onClick: this.viewThread
      }, (0, _react2.jsx)(_phosphorReact.ChatTeardropText, {
        size: 24,
        weight: "duotone"
      })));
    }

    /**
     * in one-on-one chat, allow deleting self messages if delete feature is enabled
     * in group chat, allow deleting other's messages for moderators and admins if moderator delete feature && delete feature is enabled
     */

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
    if (this.state.enableMessageInPrivate === true && this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && ((_this$props$message2 = this.props.message) === null || _this$props$message2 === void 0 ? void 0 : (_this$props$message2$ = _this$props$message2.sender) === null || _this$props$message2$ === void 0 ? void 0 : _this$props$message2$.uid) !== ((_this$state$loggedInU2 = this.state.loggedInUser) === null || _this$state$loggedInU2 === void 0 ? void 0 : _this$state$loggedInU2.uid)) {
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