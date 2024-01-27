"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserListWithMessages = void 0;
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("../");
var _Messages = require("../../Messages");
var _Calls = require("../../Calls");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
    let messageScreen = (0, _react2.jsx)(_Messages.CometChatMessages, {
      _parent: "userscreen",
      actionGenerated: this.actionHandler
    });
    return (0, _react2.jsx)(_CometChatContext.CometChatContextProvider, {
      ref: el => this.contextProviderRef = el,
      user: this.props.chatWithUser,
      language: this.props.lang
    }, (0, _react2.jsx)("div", {
      css: (0, _style.userScreenStyle)(this.props),
      className: "cometchat cometchat--contacts",
      dir: _translator.default.getDirection(this.props.lang)
    }, (0, _react2.jsx)("div", {
      css: (0, _style.userScreenSidebarStyle)(this.state, this.props),
      className: "contacts__sidebar"
    }, (0, _react2.jsx)(_.CometChatUserList, {
      _parent: "ulwm",
      theme: this.props.theme,
      lang: this.props.lang,
      onItemClick: this.itemClicked,
      actionGenerated: this.actionHandler
    })), (0, _react2.jsx)("div", {
      css: (0, _style.userScreenMainStyle)(this.state, this.props),
      className: "contacts__main"
    }, messageScreen), (0, _react2.jsx)(_Calls.CometChatIncomingCall, {
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