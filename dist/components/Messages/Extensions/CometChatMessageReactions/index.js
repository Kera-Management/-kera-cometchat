"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageReactions = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.string.replace-all.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style = require("./style");
var _reactions = _interopRequireDefault(require("./resources/reactions.svg"));
var _EmojiMapping = require("./EmojiMapping");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatMessageReactions extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "enableMessageReaction", () => {
      /**
       * If reacting to messages feature is disabled
       */
      this.context.FeatureRestriction.isReactionsEnabled().then(response => {
        if (response !== this.state.enableMessageReaction && this._isMounted) {
          this.setState({
            enableMessageReaction: response
          });
        }
      }).catch(error => {
        if (this.state.enableMessageReaction !== false) {
          this.setState({
            enableMessageReaction: false
          });
        }
      });
    });
    _defineProperty(this, "reactToMessages", emoji => {
      let messageObject = _objectSpread({}, this.props.message);
      delete messageObject["metadata"]["@injected"]["extensions"]["reactions"][emoji][this.loggedInUser.uid];
      this.props.actionGenerated(enums.ACTIONS["MESSAGE_EDITED"], messageObject);
      _chat.CometChat.callExtension("reactions", "POST", "v1/react", {
        msgId: this.props.message.id,
        emoji: emoji
      }).then(response => {
        // Reaction failed
        if (!response || !response.success || response.success !== true) {
          this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG");
        }
      }).catch(error => {
        this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG");
      });
    });
    _defineProperty(this, "getMessageReactions", reaction => {
      if (reaction === null) {
        return null;
      }
      const messageReactions = Object.keys(reaction).map((data, key) => {
        const reactionData = reaction[data];
        let reactionName = data.replaceAll(":", "");
        const reactionCount = Object.keys(reactionData).length;

        /**Showing "?" instead of unknown :emoji_name: */
        if (data.includes(":")) {
          var _Emojis$reactionName;
          reactionName = (_Emojis$reactionName = _EmojiMapping.Emojis[reactionName]) !== null && _Emojis$reactionName !== void 0 ? _Emojis$reactionName : "?";
        }
        if (!reactionCount) {
          return null;
        }
        const userList = [];
        let reactionTitle = "";
        for (const user in reactionData) {
          userList.push(reactionData[user]["name"]);
        }
        if (userList.length) {
          reactionTitle = userList.join(", ");
          const str = " ".concat(_translator.default.translate("REACTED", this.context.language));
          reactionTitle = reactionTitle.concat(str);
        }
        const reactionClassName = "reaction reaction__".concat(reactionName);
        return (0, _react2.jsx)("div", {
          key: key,
          css: (0, _style.messageReactionsStyle)(this.props, reactionData, this.context, this.loggedInUser),
          onClick: this.reactToMessages.bind(this, reactionName),
          className: reactionClassName,
          title: reactionTitle
        }, (0, _react2.jsx)("div", {
          className: "emoji"
        }, reactionName), (0, _react2.jsx)("span", {
          css: (0, _style.reactionCountStyle)(this.context),
          className: "reaction__count"
        }, reactionCount));
      });
      return messageReactions;
    });
    _defineProperty(this, "addMessageReaction", () => {
      //If reacting to messages feature is disabled
      if (this.state.enableMessageReaction === false) {
        return null;
      }
      const addReactionEmoji = (0, _react2.jsx)("div", {
        key: "-1",
        css: (0, _style.messageReactionsStyle)(this.props, {}, this.context),
        className: "reaction reaction__add",
        title: _translator.default.translate("ADD_REACTION", this.context.language)
      }, (0, _react2.jsx)("button", {
        type: "button",
        css: (0, _style.emojiButtonStyle)(_reactions.default, this.context),
        className: "button__reacttomessage",
        onClick: () => this.props.actionGenerated(enums.ACTIONS["REACT_TO_MESSAGE"], this.props.message)
      }, (0, _react2.jsx)("i", null)));
      return addReactionEmoji;
    });
    this._isMounted = false;
    this.state = {
      enableMessageReaction: false
    };
    this.context.getLoggedinUser().then(user => {
      this.loggedInUser = _objectSpread({}, user);
    });
  }
  componentDidMount() {
    this._isMounted = true;
    this.enableMessageReaction();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const reaction = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    const messageReactions = this.getMessageReactions(reaction);
    const addReactionEmoji = this.addMessageReaction();
    if (messageReactions !== null && messageReactions.length && addReactionEmoji !== null) {
      var _this$props$message, _this$loggedInUser;
      if (((_this$props$message = this.props.message) === null || _this$props$message === void 0 || (_this$props$message = _this$props$message.sender) === null || _this$props$message === void 0 ? void 0 : _this$props$message.uid) !== ((_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid)) {
        messageReactions.push(addReactionEmoji);
      } else {
        messageReactions.unshift(addReactionEmoji);
      }
    }
    return messageReactions;
  }
}

// Specifies the default values for props:
exports.CometChatMessageReactions = CometChatMessageReactions;
_defineProperty(CometChatMessageReactions, "contextType", _CometChatContext.CometChatContext);
CometChatMessageReactions.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatMessageReactions.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};