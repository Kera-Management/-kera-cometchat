"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserListWithMessages = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("..");
var _Messages = require("../../Messages");
var _Calls = require("../../Calls");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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