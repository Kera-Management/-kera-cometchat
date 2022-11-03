"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConversationListWithMessages = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Messages = require("../../Messages");
var _Calls = require("../../Calls");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatConversationListWithMessages extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    _defineProperty(this, "loggedInUser", null);
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
      tab: "conversations",
      sidebarview: false
    };
    this.contextProviderRef = /*#__PURE__*/_react.default.createRef();
    this.chatListRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    if (this.props.chatWithUser.length === 0 && this.props.chatWithGroup.length === 0) {
      this.toggleSideBar();
    }
  }
  render() {
    let messageScreen = (0, _react2.jsx)(_Messages.CometChatMessages, {
      theme: this.props.theme,
      lang: this.props.lang,
      _parent: "conversations",
      actionGenerated: this.actionHandler
    });
    return (0, _react2.jsx)(_CometChatContext.CometChatContextProvider, {
      ref: el => this.contextProviderRef = el,
      user: this.props.chatWithUser,
      group: this.props.chatWithGroup,
      language: this.props.lang
    }, (0, _react2.jsx)("div", {
      css: (0, _style.chatScreenStyle)(this.props),
      className: "cometchat cometchat--chats",
      dir: _translator.default.getDirection(this.props.lang)
    }, (0, _react2.jsx)("div", {
      css: (0, _style.chatScreenSidebarStyle)(this.state, this.props),
      className: "chats__sidebar"
    }, (0, _react2.jsx)(_.CometChatConversationList, {
      ref: el => this.chatListRef = el,
      _parent: "clwm",
      theme: this.props.theme,
      lang: this.props.lang,
      onItemClick: this.itemClicked,
      actionGenerated: this.actionHandler
    })), (0, _react2.jsx)("div", {
      css: (0, _style.chatScreenMainStyle)(this.state, this.props),
      className: "chats__main"
    }, messageScreen), (0, _react2.jsx)(_Calls.CometChatIncomingCall, {
      theme: this.props.theme,
      lang: this.props.lang,
      actionGenerated: this.actionHandler
    }), (0, _react2.jsx)(_Calls.CometChatIncomingDirectCall, {
      theme: this.props.theme,
      lang: this.props.lang,
      actionGenerated: this.actionHandler
    })));
  }
}

// Specifies the default values for props:
exports.CometChatConversationListWithMessages = CometChatConversationListWithMessages;
CometChatConversationListWithMessages.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  chatWithUser: "",
  chatWithGroup: ""
};
CometChatConversationListWithMessages.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  chatWithUser: _propTypes.default.string,
  chatWithGroup: _propTypes.default.string
};