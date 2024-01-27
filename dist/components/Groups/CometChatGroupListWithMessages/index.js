"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatGroupListWithMessages = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
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
    let messageScreen = (0, _react2.jsx)(_Messages.CometChatMessages, {
      theme: this.props.theme,
      lang: this.props.lang,
      _parent: "groups",
      actionGenerated: this.actionHandler
    });
    return (0, _react2.jsx)(_CometChatContext.CometChatContextProvider, {
      ref: el => this.contextProviderRef = el,
      group: this.props.chatWithGroup,
      language: this.props.lang
    }, (0, _react2.jsx)("div", {
      css: (0, _style.groupScreenStyle)(this.props),
      className: "cometchat cometchat--groups"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.groupScreenSidebarStyle)(this.state, this.props),
      className: "groups__sidebar"
    }, (0, _react2.jsx)(_.CometChatGroupList, {
      ref: el => this.groupListRef = el,
      _parent: "glwm",
      theme: this.props.theme,
      lang: this.props.lang,
      onItemClick: this.itemClicked,
      actionGenerated: this.actionHandler
    })), (0, _react2.jsx)("div", {
      css: (0, _style.groupScreenMainStyle)(this.state, this.props),
      className: "groups__main"
    }, messageScreen), (0, _react2.jsx)(_Calls.CometChatIncomingDirectCall, {
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