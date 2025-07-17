"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatGroupListWithMessages = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Messages = require("../../Messages");
var _Calls = require("../../Calls");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatGroupListWithMessages extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    _defineProperty(this, "loggedInUser", null);
    _defineProperty(this, "itemClicked", (group, type) => {
      this.contextProviderRef.setTypeAndItem(type, group);
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
            if (this.contextProviderRef.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.contextProviderRef.item.guid === group.guid && options.user.uid === this.loggedInUser.uid) {
              this.contextProviderRef.setItem({});
              this.contextProviderRef.setType("");
            }
            break;
          }
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          {
            if (this.contextProviderRef.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.contextProviderRef.item.guid === group.guid && options.user.uid === this.loggedInUser.uid) {
              const newObject = Object.assign({}, this.contextProviderRef.item, {
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
    this.groupListRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    if (this.props.chatWithGroup.length === 0) {
      this.toggleSideBar();
    }
  }
  render() {
    let messageScreen = /*#__PURE__*/_react.default.createElement(_Messages.CometChatMessages, {
      theme: this.props.theme,
      lang: this.props.lang,
      _parent: "groups",
      actionGenerated: this.actionHandler
    });
    return /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
      ref: el => this.contextProviderRef = el,
      group: this.props.chatWithGroup,
      language: this.props.lang
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "cometchat cometchat--groups",
      height: "100%",
      width: "100%",
      boxSizing: "border-box",
      fontFamily: this.props.theme.fontFamily,
      border: "1px solid ".concat(this.props.theme.borderColor.primary),
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
      className: "groups__sidebar",
      width: {
        base: "100%",
        md: "280px"
      },
      borderRight: "1px solid ".concat(this.props.theme.borderColor.primary),
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      sx: {
        ".groups": {
          height: "calc(100% - 5px)"
        },
        "@media (max-width: 768px)": {
          position: "absolute !important",
          left: this.state.sidebarview ? "0" : "-100%",
          top: "0",
          bottom: "0",
          width: "100% !important",
          zIndex: "2",
          backgroundColor: this.props.theme.backgroundColor.white,
          transition: "all .3s ease-out",
          boxShadow: this.state.sidebarview ? "rgba(0, 0, 0, .4) -30px 0 30px 30px" : "none"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_.CometChatGroupList, {
      ref: el => this.groupListRef = el,
      _parent: "glwm",
      theme: this.props.theme,
      lang: this.props.lang,
      onItemClick: this.itemClicked,
      actionGenerated: this.actionHandler
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "groups__main",
      width: {
        base: "100%",
        md: "calc(100% - 280px)"
      },
      height: "100%",
      order: "2",
      display: "flex",
      flexDirection: "row"
    }, messageScreen), /*#__PURE__*/_react.default.createElement(_Calls.CometChatIncomingDirectCall, {
      theme: this.props.theme,
      lang: this.props.lang,
      actionGenerated: this.actionHandler
    })));
  }
}

// Specifies the default values for props:
exports.CometChatGroupListWithMessages = CometChatGroupListWithMessages;
CometChatGroupListWithMessages.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  chatWithGroup: ""
};
CometChatGroupListWithMessages.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  chatWithGroup: _propTypes.default.string
};