"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserList = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _Users = require("../../Users");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _search = _interopRequireDefault(require("./resources/search.svg"));
var _back = _interopRequireDefault(require("./resources/back.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
      messageContainer = (0, _react2.jsx)("div", {
        css: (0, _style.contactMsgStyle)(),
        className: "contacts__decorator-message"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.contactMsgTxtStyle)(_theme.theme),
        className: "decorator-message"
      }, this.state.decoratorMessage));
    }
    const userList = [...this.state.userlist];
    let currentLetter = "";
    const users = userList.map(user => {
      const chr = user.name[0].toUpperCase();
      let firstChar = null;
      if (chr !== currentLetter) {
        currentLetter = chr;
        firstChar = (0, _react2.jsx)("div", {
          css: (0, _style.contactAlphabetStyle)(this.props),
          className: "contacts__list__alphabet-filter"
        }, currentLetter);
      } else {
        firstChar = null;
      }
      let selectedUser = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.getContext().item.uid === user.uid ? user : null;
      return (0, _react2.jsx)(_react.default.Fragment, {
        key: user.uid
      }, firstChar, (0, _react2.jsx)(_Users.CometChatUserListItem, {
        user: user,
        selectedUser: selectedUser,
        clickHandler: this.handleClick
      }));
    });
    let closeBtn = (0, _react2.jsx)("div", {
      css: (0, _style.contactHeaderCloseStyle)(_back.default, _theme.theme),
      className: "header__close",
      onClick: this.handleMenuClose
    });
    if (this.getContext() && Object.keys(this.getContext().item).length === 0) {
      closeBtn = null;
    }
    let searchUser = null;
    if (this.state.enableSearchUser) {
      searchUser = (0, _react2.jsx)("div", {
        css: (0, _style.contactSearchStyle)(),
        className: "contacts__search"
      }, (0, _react2.jsx)("button", {
        type: "button",
        className: "search__button",
        css: (0, _style.contactSearchButtonStyle)(_search.default, _theme.theme)
      }), (0, _react2.jsx)("input", {
        type: "text",
        autoComplete: "off",
        css: (0, _style.contactSearchInputStyle)(this.props),
        className: "search__input",
        placeholder: _translator.default.translate("SEARCH", this.props.lang),
        onChange: this.searchUsers
      }));
    }
    const userListTemplate = (0, _react2.jsx)("div", {
      css: (0, _style.contactWrapperStyle)(this.props, _theme.theme),
      className: "contacts"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.contactHeaderStyle)(_theme.theme),
      className: "contacts__header"
    }, closeBtn, (0, _react2.jsx)("h4", {
      css: (0, _style.contactHeaderTitleStyle)(this.props),
      className: "header__title",
      dir: _translator.default.getDirection(this.props.lang)
    }, _translator.default.translate("USERS", this.props.lang)), (0, _react2.jsx)("div", null)), searchUser, messageContainer, (0, _react2.jsx)("div", {
      css: (0, _style.contactListStyle)(),
      className: "contacts__list",
      onScroll: this.handleScroll,
      ref: el => this.userListRef = el
    }, users));
    let userListWrapper = userListTemplate;
    if (this.props._parent === "") {
      userListWrapper = (0, _react2.jsx)(_CometChatContext.CometChatContextProvider, {
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