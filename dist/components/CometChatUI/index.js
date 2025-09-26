"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUI = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _chat = require("@cometchat-pro/chat");
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _translator = _interopRequireDefault(require("../../resources/localization/translator"));
var _theme = require("../../resources/theme");
var _CometChatContext = require("../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../util/enums.js"));
var _Calls = require("../Calls");
var _Messages = require("../Messages");
var _CometChatNavBar = require("./CometChatNavBar");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatUI extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    _defineProperty(this, "loggedInUser", null);
    _defineProperty(this, "navBarAction", (action, type, item) => {
      switch (action) {
        case enums.ACTIONS["ITEM_CLICKED"]:
          this.itemClicked(item, type);
          break;
        case enums.ACTIONS["TOGGLE_SIDEBAR"]:
          this.toggleSideBar();
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "itemClicked", (item, type) => {
      this.contextProviderRef.setTypeAndItem(type, item);
      this.toggleSideBar();
    });
    _defineProperty(this, "actionHandler", function (action, item, count) {
      switch (action) {
        case enums.ACTIONS["TOGGLE_SIDEBAR"]:
          _this.toggleSideBar();
          break;
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
          for (var _len = arguments.length, otherProps = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            otherProps[_key - 3] = arguments[_key];
          }
          _this.groupUpdated(action, item, count, ...otherProps);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "toggleSideBar", () => {
      const sidebarview = this.state.sidebarview;
      this.setState({
        sidebarview: !sidebarview
      });
    });
    /**
    If the logged in user is banned, kicked or scope changed, update the chat window accordingly
    */
    _defineProperty(this, "groupUpdated", (key, message, group, options) => {
      switch (key) {
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_KICKED:
          {
            if (this.contextProviderRef.state.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.contextProviderRef.state.item.guid === group.guid && options.user.uid === this.loggedInUser.uid) {
              this.contextProviderRef.setItem({});
              this.contextProviderRef.setType("");
            }
            break;
          }
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          {
            if (this.contextProviderRef.state.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.contextProviderRef.state.item.guid === group.guid && options.user.uid === this.loggedInUser.uid) {
              const newObject = Object.assign({}, this.contextProviderRef.state.item, {
                scope: options["scope"]
              });
              this.contextProviderRef.setItem(newObject);
              this.contextProviderRef.setType(_chat.CometChat.ACTION_TYPE.TYPE_GROUP);
            }
            break;
          }
        default:
          break;
      }
    });
    this.state = {
      sidebarview: false
    };
    this.navBarRef = /*#__PURE__*/_react.default.createRef();
    this.contextProviderRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    if (this.props.chatWithUser.length === 0 && this.props.chatWithGroup.length === 0) {
      this.toggleSideBar();
    }
  }
  render() {
    let messageScreen = /*#__PURE__*/_react.default.createElement(_Messages.CometChatMessages, {
      theme: this.props.theme,
      lang: this.props.lang,
      _parent: "unified",
      actionGenerated: this.actionHandler,
      onMessageSend: this.props.onMessageSend
    });
    return /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
      ref: el => this.contextProviderRef = el,
      user: this.props.chatWithUser,
      group: this.props.chatWithGroup,
      language: this.props.lang
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "cometchat cometchat--unified",
      dir: _translator.default.getDirection(this.props.lang),
      rounded: "lg",
      overflow: "hidden",
      display: "flex",
      height: "100%",
      width: "100%",
      boxSizing: "border-box",
      fontFamily: this.props.theme.fontFamily,
      border: "1px solid ",
      borderColor: "border",
      position: "relative",
      sx: {
        "*": {
          boxSizing: "border-box",
          fontFamily: this.props.theme.fontFamily,
          "::-webkit-scrollbar": {
            width: "8px",
            height: "4px"
          },
          "::-webkit-scrollbar-track": {
            background: "#ffffff00"
          },
          "::-webkit-scrollbar-thumb": {
            background: "#ccc",
            "&:hover": {
              background: "#aaa"
            }
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "unified__sidebar",
      backgroundColor: "white",
      width: "280px",
      borderRight: "1px solid #E2E8F0",
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      sx: {
        "> .contacts, .chats, .groups, .userinfo": {
          height: "calc(100% - 64px)"
        },
        ["@media ".concat(this.props.theme.breakPoints[0])]: {
          position: "absolute!important",
          left: this.state.sidebarview ? "0" : "-100%",
          top: "0",
          bottom: "0",
          width: "100%!important",
          zIndex: "2",
          backgroundColor: this.props.theme.backgroundColor.white,
          transition: "all .3s ease-out"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_CometChatNavBar.CometChatNavBar, {
      ref: el => this.navBarRef = el,
      theme: this.props.theme,
      actionGenerated: this.navBarAction
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "unified__main",
      width: "calc(100% - 280px)",
      height: "100%",
      order: "2",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      sx: {
        ["@media ".concat(this.props.theme.breakPoints[1], ", ").concat(this.props.theme.breakPoints[2])]: {
          width: "100%"
        }
      }
    }, messageScreen), /*#__PURE__*/_react.default.createElement(_Calls.CometChatIncomingCall, {
      theme: this.props.theme,
      lang: this.props.lang,
      actionGenerated: this.actionHandler
    }), /*#__PURE__*/_react.default.createElement(_Calls.CometChatIncomingDirectCall, {
      theme: this.props.theme,
      lang: this.props.lang,
      actionGenerated: this.actionHandler
    })));
  }
}

// Specifies the default values for props:
exports.CometChatUI = CometChatUI;
CometChatUI.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  chatWithUser: "",
  chatWithGroup: "",
  onMessageSend: undefined
};
CometChatUI.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  chatWithUser: _propTypes.default.string,
  chatWithGroup: _propTypes.default.string,
  onMessageSend: _propTypes.default.func
};