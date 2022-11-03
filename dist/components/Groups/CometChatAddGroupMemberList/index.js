"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAddGroupMemberList = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _ = require("..");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _adding = _interopRequireDefault(require("./resources/adding.svg"));
var _search = _interopRequireDefault(require("./resources/search.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    let addGroupMemberBtn = (0, _react2.jsx)("div", {
      css: (0, _style.modalFootStyle)(this.props, this.state, _adding.default, this.context),
      className: "modal__addmembers"
    }, (0, _react2.jsx)("button", {
      type: "button",
      onClick: this.updateMembers
    }, (0, _react2.jsx)("span", null, createText)));
    let messageContainer = null;
    if (this.state.filteredlist.length === 0) {
      messageContainer = (0, _react2.jsx)("div", {
        css: (0, _style.contactMsgStyle)(),
        className: "members__decorator-message"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.contactMsgTxtStyle)(this.context),
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
      return (0, _react2.jsx)(_react.default.Fragment, {
        key: user.uid
      }, (0, _react2.jsx)(_.CometChatAddGroupMemberListItem, {
        theme: this.props.theme,
        firstLetter: firstLetter,
        user: user,
        changed: this.membersUpdated
      }));
    });
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalWrapperStyle)(this.context),
      className: "modal__addmembers"
    }, (0, _react2.jsx)("span", {
      css: (0, _style.modalCloseStyle)(_close.default, this.context),
      className: "modal__close",
      onClick: this.props.close,
      title: _translator.default.translate("CLOSE", this.context.language)
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalBodyStyle)(),
      className: "modal__body"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.modalCaptionStyle)(_translator.default.getDirection(this.context.language)),
      className: "modal__title"
    }, _translator.default.translate("USERS", this.context.language)), (0, _react2.jsx)("div", {
      css: (0, _style.modalErrorStyle)(this.context),
      className: "modal__error"
    }, this.state.errorMessage), (0, _react2.jsx)("div", {
      css: (0, _style.modalSearchStyle)(),
      className: "modal__search"
    }, (0, _react2.jsx)("input", {
      type: "text",
      autoComplete: "off",
      css: (0, _style.searchInputStyle)(),
      className: "search__input",
      placeholder: _translator.default.translate("SEARCH", this.context.language),
      onChange: this.searchUsers
    })), messageContainer, (0, _react2.jsx)("div", {
      css: (0, _style.modalListStyle)(this.context),
      onScroll: this.handleScroll,
      className: "modal__content"
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