"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserList = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _ = require("..");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _search = _interopRequireDefault(require("./resources/search.svg"));
var _back = _interopRequireDefault(require("./resources/back.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
      }, firstChar, (0, _react2.jsx)(_.CometChatUserListItem, {
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
      }, (0, _react2.jsx)("input", {
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