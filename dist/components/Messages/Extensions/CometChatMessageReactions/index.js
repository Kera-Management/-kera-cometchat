"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageReactions = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.string.replace-all.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _react2 = require("@chakra-ui/react");
var _CometChatContext = require("../../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _common = require("../../../../util/common");
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _reactions = _interopRequireDefault(require("./resources/reactions.svg"));
var _EmojiMapping = require("./EmojiMapping");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
        var _this$loggedInUser;
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
        const uid = (_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid;
        const hasUserReacted = reactionData.hasOwnProperty(uid);
        return /*#__PURE__*/_react.default.createElement(_react2.Box, {
          key: key,
          fontSize: "11px",
          p: "2px 6px",
          display: "inline-flex",
          alignItems: "center",
          verticalAlign: "top",
          backgroundColor: this.context.theme.backgroundColor.secondary,
          borderRadius: "12px",
          m: "4px 4px 0 0",
          cursor: "pointer",
          border: hasUserReacted ? "1px solid ".concat(this.context.theme.primaryColor) : "1px solid transparent",
          _hover: {
            border: hasUserReacted ? "1px solid ".concat(this.context.theme.primaryColor) : "1px solid ".concat(this.context.theme.borderColor.primary)
          },
          onClick: this.reactToMessages.bind(this, reactionName),
          className: reactionClassName,
          title: reactionTitle
        }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "16px",
          className: "emoji"
        }, reactionName), /*#__PURE__*/_react.default.createElement(_react2.Text, {
          color: this.context.theme.color.primary,
          p: "0 1px 0 3px",
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
      const addReactionEmoji = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        key: "-1",
        fontSize: "11px",
        p: "2px 6px",
        display: "inline-flex",
        alignItems: "center",
        verticalAlign: "top",
        backgroundColor: this.context.theme.backgroundColor.secondary,
        borderRadius: "12px",
        m: "4px 4px 0 0",
        cursor: "pointer",
        border: "1px solid transparent",
        _hover: {
          border: "1px solid ".concat(this.context.theme.borderColor.primary)
        },
        className: "reaction reaction__add",
        title: _translator.default.translate("ADD_REACTION", this.context.language)
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        type: "button",
        p: "0",
        minW: "auto",
        h: "auto",
        outline: "0",
        border: "0",
        borderRadius: "4px",
        alignItems: "center",
        display: "inline-flex",
        justifyContent: "center",
        position: "relative",
        bg: "transparent",
        _hover: {
          bg: "transparent"
        },
        className: "button__reacttomessage",
        onClick: () => this.props.actionGenerated(enums.ACTIONS["REACT_TO_MESSAGE"], this.props.message)
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        h: "24px",
        w: "24px",
        sx: {
          mask: "url(".concat(_reactions.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.secondaryTextColor
        }
      })));
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
      var _this$props$message, _this$loggedInUser2;
      if (((_this$props$message = this.props.message) === null || _this$props$message === void 0 || (_this$props$message = _this$props$message.sender) === null || _this$props$message === void 0 ? void 0 : _this$props$message.uid) !== ((_this$loggedInUser2 = this.loggedInUser) === null || _this$loggedInUser2 === void 0 ? void 0 : _this$loggedInUser2.uid)) {
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