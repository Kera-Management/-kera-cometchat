"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAddGroupMemberList = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _ = require("..");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _adding = _interopRequireDefault(require("./resources/adding.svg"));
var _search = _interopRequireDefault(require("./resources/search.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatAddGroupMemberList extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "userUpdated", user => {
      let userlist = [...this.state.userlist];

      //search for user
      let userKey = userlist.findIndex((u, k) => u.uid === user.uid);

      //if found in the list, update user object
      if (userKey > -1) {
        let userObj = userlist[userKey];
        let newUserObj = Object.assign({}, userObj, user);
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
    _defineProperty(this, "searchUsers", e => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      let val = e.target.value;
      this.AddMembersManager = new _controller.AddMembersManager(this.context, val);
      this.AddMembersManager.initializeMembersRequest().then(() => {
        this.timeout = setTimeout(() => {
          this.setState({
            userlist: [],
            membersToAdd: [],
            membersToRemove: [],
            filteredlist: [],
            decoratorMessage: _translator.default.translate("LOADING", this.context.language)
          }, () => this.getUsers());
        }, 500);
      });
    });
    _defineProperty(this, "getUsers", () => {
      this.AddMembersManager.fetchNextUsers().then(userList => {
        const filteredUserList = userList.filter(user => {
          const found = this.context.groupMembers.find(member => user.uid === member.uid);
          const foundbanned = this.context.bannedGroupMembers.find(member => user.uid === member.uid);
          if (found || foundbanned) {
            return false;
          }
          return true;
        });
        if (filteredUserList.length === 0) {
          this.setState({
            decoratorMessage: _translator.default.translate("NO_USERS_FOUND", this.context.language)
          });
        }
        this.setState({
          userlist: [...this.state.userlist, ...userList],
          filteredlist: [...this.state.filteredlist, ...filteredUserList]
        });
      }).catch(error => this.setState({
        decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
      }));
    });
    _defineProperty(this, "membersUpdated", (user, userState) => {
      if (userState) {
        const members = [...this.state.membersToAdd];
        members.push(user);
        this.setState({
          membersToAdd: [...members]
        });
      } else {
        const membersToAdd = [...this.state.membersToAdd];
        const IndexFound = membersToAdd.findIndex(member => member.uid === user.uid);
        if (IndexFound > -1) {
          membersToAdd.splice(IndexFound, 1);
          this.setState({
            membersToAdd: [...membersToAdd]
          });
        }
      }
    });
    _defineProperty(this, "updateMembers", () => {
      const guid = this.context.item.guid;
      const membersList = [];
      this.state.membersToAdd.forEach(newmember => {
        //if a selected member is already part of the member list, don't add
        const IndexFound = this.context.groupMembers.findIndex(member => member.uid === newmember.uid);
        if (IndexFound === -1) {
          const newMember = new _chat.CometChat.GroupMember(newmember.uid, _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT);
          membersList.push(newMember);
          newmember["type"] = "add";
        }
      });
      if (membersList.length) {
        this.setState({
          addingMembers: true
        });
        const membersToAdd = [];
        _chat.CometChat.addMembersToGroup(guid, membersList, []).then(response => {
          if (Object.keys(response).length) {
            for (const member in response) {
              if (response[member] === "success") {
                const found = this.state.userlist.find(user => user.uid === member);
                found["scope"] = _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                membersToAdd.push(found);
              }
            }
            this.props.actionGenerated(enums.ACTIONS["ADD_GROUP_MEMBER_SUCCESS"], membersToAdd);
          }
          this.setState({
            addingMembers: false
          });
          this.props.close();
        }).catch(error => {
          this.setState({
            addingMembers: false,
            errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
          });
        });
      }
    });
    this.state = {
      userlist: [],
      membersToAdd: [],
      filteredlist: [],
      addingMembers: false,
      decoratorMessage: _translator.default.translate("LOADING", context.language),
      errorMessage: ""
    };
  }
  componentDidMount() {
    this.AddMembersManager = new _controller.AddMembersManager(this.context);
    this.AddMembersManager.initializeMembersRequest().then(() => {
      this.getUsers();
      this.AddMembersManager.attachListeners(this.userUpdated);
    });
  }
  componentWillUnmount() {
    this.AddMembersManager.removeListeners();
    this.AddMembersManager = null;
  }
  render() {
    const createText = this.state.addingMembers ? _translator.default.translate("ADDING", this.context.language) : _translator.default.translate("ADD", this.context.language);
    let addGroupMemberBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      m: "24px auto 0 auto",
      className: "modal__addmembers"
    }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
      cursor: "pointer",
      p: "8px 16px",
      bg: this.context.theme.primaryColor,
      borderRadius: "5px",
      color: "white",
      fontSize: "14px",
      outline: "0",
      border: "0",
      isDisabled: this.state.addingMembers,
      onClick: this.updateMembers,
      sx: {
        background: this.state.addingMembers ? "url(".concat(_adding.default, ") ").concat(this.context.theme.primaryColor, " no-repeat right 10px center") : this.context.theme.primaryColor
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      mr: this.state.addingMembers ? "24px" : "0"
    }, createText)));
    let messageContainer = null;
    if (this.state.filteredlist.length === 0) {
      messageContainer = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        overflow: "hidden",
        w: "100%",
        justifyContent: "center",
        alignItems: "center",
        h: "55%",
        className: "members__decorator-message"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        m: "0",
        h: "30px",
        color: this.context.theme.color.secondary,
        fontSize: "20px",
        fontWeight: "600",
        className: "decorator-message"
      }, this.state.decoratorMessage));
      addGroupMemberBtn = null;
    }
    let currentLetter = "";
    const filteredUserList = [...this.state.filteredlist];
    const users = filteredUserList.map(user => {
      const chr = user.name[0].toUpperCase();
      let firstLetter = null;
      if (chr !== currentLetter) {
        currentLetter = chr;
        firstLetter = currentLetter;
      }
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: user.uid
      }, /*#__PURE__*/_react.default.createElement(_.CometChatAddGroupMemberListItem, {
        theme: this.props.theme,
        firstLetter: firstLetter,
        user: user,
        changed: this.membersUpdated
      }));
    });
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      minW: "350px",
      minH: "450px",
      w: "40%",
      h: "40%",
      overflow: "hidden",
      bg: this.context.theme.backgroundColor.white,
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "1002",
      m: "0 auto",
      boxShadow: "rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px",
      borderRadius: "12px",
      display: "block",
      className: "modal__addmembers",
      sx: {
        ["@media ".concat(this.context.theme.breakPoints[0])]: {
          w: "100%",
          h: "100%"
        },
        ["@media ".concat(this.context.theme.breakPoints[1])]: {
          w: "100%",
          h: "100%"
        },
        ["@media ".concat(this.context.theme.breakPoints[2])]: {
          w: "100%",
          h: "100%"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      position: "absolute",
      w: "32px",
      h: "32px",
      borderRadius: "50%",
      top: "16px",
      right: "16px",
      bg: this.context.theme.primaryColor,
      cursor: "pointer",
      className: "modal__close",
      onClick: this.props.close,
      title: _translator.default.translate("CLOSE", this.context.language),
      sx: {
        mask: "url(".concat(_close.default, ") center center no-repeat")
      }
    }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      p: "24px",
      h: "100%",
      w: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      className: "modal__body"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "20px",
      mb: "16px",
      fontWeight: "bold",
      w: "100%",
      textAlign: _translator.default.getDirection(this.context.language) === "rtl" ? "right" : "left",
      pr: _translator.default.getDirection(this.context.language) === "rtl" ? "32px" : "0",
      className: "modal__title"
    }, _translator.default.translate("USERS", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "12px",
      color: this.context.theme.color.red,
      textAlign: "center",
      m: "8px 0",
      w: "100%",
      className: "modal__error"
    }, this.state.errorMessage), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      fontWeight: "normal",
      mb: "16px",
      w: "100%",
      h: "35px",
      borderRadius: "8px",
      boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
      bg: "rgba(20, 20, 20, 0.04)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      className: "modal__search"
    }, /*#__PURE__*/_react.default.createElement(_react2.Input, {
      type: "text",
      autoComplete: "off",
      w: "calc(100% - 30px)",
      h: "100%",
      p: "8px",
      fontSize: "15px",
      outline: "none",
      border: "none",
      bg: "transparent",
      className: "search__input",
      placeholder: _translator.default.translate("SEARCH", this.context.language),
      onChange: this.searchUsers
    })), messageContainer, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      h: "calc(100% - 125px)",
      overflowY: "auto",
      w: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      className: "modal__content",
      onScroll: this.handleScroll,
      sx: {
        ["@media ".concat(this.context.theme.breakPoints[1], ", ").concat(this.context.theme.breakPoints[2])]: {
          h: "100%"
        }
      }
    }, users), addGroupMemberBtn)));
  }
}

// Specifies the default values for props:
exports.CometChatAddGroupMemberList = CometChatAddGroupMemberList;
_defineProperty(CometChatAddGroupMemberList, "contextType", _CometChatContext.CometChatContext);
CometChatAddGroupMemberList.defaultProps = {
  theme: _theme.theme
};
CometChatAddGroupMemberList.propTypes = {
  theme: _propTypes.default.object
};