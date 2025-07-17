"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserListWithMessages = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
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
class CometChatUserListWithMessages extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "loggedInUser", null);
    _defineProperty(this, "itemClicked", (user, type) => {
      this.contextProviderRef.setTypeAndItem(type, user);
      this.toggleSideBar();
    });
    _defineProperty(this, "actionHandler", action => {
      switch (action) {
        case enums.ACTIONS["TOGGLE_SIDEBAR"]:
          this.toggleSideBar();
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
    this.state = {
      sidebarview: false
    };
    this.contextProviderRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    if (this.props.chatWithUser.length === 0) {
      this.toggleSideBar();
    }
  }
  render() {
    let messageScreen = /*#__PURE__*/_react.default.createElement(_Messages.CometChatMessages, {
      _parent: "userscreen",
      actionGenerated: this.actionHandler
    });
    return /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
      ref: el => this.contextProviderRef = el,
      user: this.props.chatWithUser,
      language: this.props.lang
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "cometchat cometchat--contacts",
      dir: _translator.default.getDirection(this.props.lang),
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
      className: "contacts__sidebar",
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
        "> .contacts": {
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
    }, /*#__PURE__*/_react.default.createElement(_.CometChatUserList, {
      _parent: "ulwm",
      theme: this.props.theme,
      lang: this.props.lang,
      onItemClick: this.itemClicked,
      actionGenerated: this.actionHandler
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "contacts__main",
      width: {
        base: "100%",
        md: "calc(100% - 280px)"
      },
      height: "100%",
      order: "2",
      display: "flex",
      flexDirection: "row"
    }, messageScreen), /*#__PURE__*/_react.default.createElement(_Calls.CometChatIncomingCall, {
      theme: this.props.theme,
      lang: this.props.lang,
      actionGenerated: this.actionHandler
    })));
  }
}

// Specifies the default values for props:
exports.CometChatUserListWithMessages = CometChatUserListWithMessages;
CometChatUserListWithMessages.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  chatWithUser: ""
};
CometChatUserListWithMessages.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  chatWithUser: _propTypes.default.string
};