"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserList = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _ = require("..");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _search = _interopRequireDefault(require("./resources/search.svg"));
var _back = _interopRequireDefault(require("./resources/back.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatUserList extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "item", void 0);
    _defineProperty(this, "timeout", void 0);
    _defineProperty(this, "toggleUserSearch", () => {
      this.getContext().FeatureRestriction.isUserSearchEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSearchUser) {
          this.setState({
            enableSearchUser: response
          });
        }
      }).catch(error => {
        if (this.state.enableSearchUser !== false) {
          this.setState({
            enableSearchUser: false
          });
        }
      });
    });
    _defineProperty(this, "userUpdated", user => {
      let userlist = [...this.state.userlist];

      //search for user
      let userKey = userlist.findIndex(u => u.uid === user.uid);

      //if found in the list, update user object
      if (userKey > -1) {
        let userObj = _objectSpread({}, userlist[userKey]);
        let newUserObj = _objectSpread(_objectSpread({}, userObj), user);
        userlist.splice(userKey, 1, newUserObj);
        this.setState({
          userlist: userlist
        });
      }
    });
    _defineProperty(this, "handleScroll", e => {
      const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === Math.round(e.currentTarget.clientHeight);
      if (bottom) this.getUsers();
    });
    _defineProperty(this, "handleClick", user => {
      if (!this.props.onItemClick) return;
      this.props.onItemClick(user, _chat.CometChat.ACTION_TYPE.TYPE_USER);
    });
    _defineProperty(this, "handleMenuClose", () => {
      if (!this.props.actionGenerated) {
        return false;
      }
      this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
    });
    _defineProperty(this, "searchUsers", e => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      let val = e.target.value;
      this.UserListManager = new _controller.UserListManager(this.getContext(), val);
      this.UserListManager.initializeUsersRequest().then(response => {
        this.timeout = setTimeout(() => {
          this.setState({
            userlist: [],
            decoratorMessage: _translator.default.translate("LOADING", this.props.lang)
          }, () => this.getUsers());
        }, 500);
      }).catch(error => this.setState({
        decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.props.lang)
      }));
    });
    _defineProperty(this, "getUsers", () => {
      this.UserListManager.fetchNextUsers().then(userList => {
        if (userList.length === 0) {
          if (this.state.userlist.length === 0) {
            this.setState({
              decoratorMessage: _translator.default.translate("NO_USERS_FOUND", this.props.lang)
            });
          }
        } else {
          this.setState({
            userlist: [...this.state.userlist, ...userList],
            decoratorMessage: ""
          });
        }
      }).catch(error => this.setState({
        decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.props.lang)
      }));
    });
    _defineProperty(this, "getContext", () => {
      if (this.props._parent.length) {
        return this.context;
      } else {
        return this.contextProviderRef.state;
      }
    });
    this.state = {
      userlist: [],
      enableSearchUser: false,
      decoratorMessage: _translator.default.translate("LOADING", props.lang)
    };
    this.contextProviderRef = /*#__PURE__*/_react.default.createRef();
    this.userListRef = /*#__PURE__*/_react.default.createRef();
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => this.setState({
      decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.props.lang)
    }));
  }
  componentDidMount() {
    this.item = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER ? this.getContext().item : null;
    this.toggleUserSearch();
    this.UserListManager = new _controller.UserListManager(this.getContext());
    this.UserListManager.initializeUsersRequest().then(response => {
      this.getUsers();
      this.UserListManager.attachListeners(this.userUpdated);
    }).catch(error => this.setState({
      decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.props.lang)
    }));
  }
  componentDidUpdate(prevProps) {
    //if user is blocked/unblocked, update userlist
    if (this.item && Object.keys(this.item).length && this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.item.uid === this.getContext().item.uid && this.item.blockedByMe !== this.getContext().item.blockedByMe) {
      let userlist = [...this.state.userlist];

      //search for user
      let userKey = userlist.findIndex(u => u.uid === this.getContext().item.uid);
      if (userKey > -1) {
        let userObject = _objectSpread({}, userlist[userKey]);
        let newUserObject = Object.assign({}, userObject, {
          blockedByMe: this.getContext().item.blockedByMe
        });
        userlist.splice(userKey, 1, newUserObject);
        this.setState({
          userlist: userlist
        });
      }
    }
    this.item = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER ? this.getContext().item : null;
    this.toggleUserSearch();
  }
  componentWillUnmount() {
    this.UserListManager.removeListeners();
    this.UserListManager = null;
  }
  render() {
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "contacts__decorator-message",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "decorator-message",
        m: 0,
        minHeight: "36px",
        color: _theme.theme.color.secondary,
        fontSize: "20px",
        fontWeight: "600",
        lineHeight: "30px",
        wordWrap: "break-word",
        px: 4
      }, this.state.decoratorMessage));
    }
    const userList = [...this.state.userlist];
    let currentLetter = "";
    const users = userList.map(user => {
      const chr = user.name[0].toUpperCase();
      let firstChar = null;
      if (chr !== currentLetter) {
        currentLetter = chr;
        firstChar = /*#__PURE__*/_react.default.createElement(_react2.Box, {
          className: "contacts__list__alphabet-filter",
          px: 4,
          my: 1,
          width: "100%",
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "20px",
          color: this.props.theme.color.tertiary
        }, currentLetter);
      } else {
        firstChar = null;
      }
      let selectedUser = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.getContext().item.uid === user.uid ? user : null;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: user.uid
      }, firstChar, /*#__PURE__*/_react.default.createElement(_.CometChatUserListItem, {
        user: user,
        selectedUser: selectedUser,
        clickHandler: this.handleClick
      }));
    });
    let closeBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "header__close",
      cursor: "pointer",
      display: "none",
      sx: {
        mask: "url(".concat(_back.default, ") left center no-repeat"),
        backgroundColor: _theme.theme.secondaryTextColor,
        [_theme.theme.breakPoints[1]]: {
          display: "block !important"
        }
      },
      height: "24px",
      width: "33%",
      onClick: this.handleMenuClose
    });
    if (this.getContext() && Object.keys(this.getContext().item).length === 0) {
      closeBtn = null;
    }
    let searchUser = null;
    if (this.state.enableSearchUser) {
      searchUser = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "contacts__search",
        m: 4,
        position: "relative",
        borderRadius: "8px",
        boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
        backgroundColor: "rgba(20, 20, 20, 0.04)",
        height: "35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }, /*#__PURE__*/_react.default.createElement(_react2.Input, {
        type: "text",
        autoComplete: "off",
        className: "search__input",
        placeholder: _translator.default.translate("SEARCH", this.props.lang),
        onChange: this.searchUsers,
        width: "calc(100% - 30px)",
        p: 2,
        fontSize: "15px",
        fontWeight: "400",
        lineHeight: "20px",
        outline: "none",
        border: "none",
        height: "100%",
        color: this.props.theme.color.search,
        backgroundColor: "transparent"
      }));
    }
    const userListTemplate = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "contacts",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxSizing: "border-box",
      sx: _objectSpread(_objectSpread({}, this.props._parent === "" ? {
        border: "1px solid ".concat(_theme.theme.borderColor.primary)
      } : {}), {}, {
        "*": {
          boxSizing: "border-box",
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
      })
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "contacts__header",
      p: 4,
      position: "relative",
      alignItems: "center",
      borderBottom: "1px solid ".concat(_theme.theme.borderColor.primary),
      height: "70px"
    }, closeBtn, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      className: "header__title",
      as: "h4",
      m: 0,
      fontWeight: "700",
      display: "inline-block",
      width: "100%",
      textAlign: "left",
      fontSize: "22px",
      lineHeight: "26px",
      dir: _translator.default.getDirection(this.props.lang),
      sx: _objectSpread(_objectSpread({}, this.props.hasOwnProperty("enableCloseMenu") && this.props.enableCloseMenu.length > 0 ? {
        width: "33%",
        textAlign: "center"
      } : {}), {}, {
        "&[dir=rtl]": {
          textAlign: "right"
        }
      })
    }, _translator.default.translate("USERS", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Box, null)), searchUser, messageContainer, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "contacts__list",
      height: "calc(100% - 125px)",
      overflowY: "auto",
      m: 0,
      p: 0,
      onScroll: this.handleScroll,
      ref: el => this.userListRef = el
    }, users));
    let userListWrapper = userListTemplate;
    if (this.props._parent === "") {
      userListWrapper = /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
        ref: el => this.contextProviderRef = el
      }, userListTemplate);
    }
    return userListWrapper;
  }
}

// Specifies the default values for props:
exports.CometChatUserList = CometChatUserList;
_defineProperty(CometChatUserList, "contextType", _CometChatContext.CometChatContext);
CometChatUserList.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  onItemClick: () => {},
  _parent: ""
};
CometChatUserList.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  onItemClick: _propTypes.default.func,
  _parent: _propTypes.default.string
};