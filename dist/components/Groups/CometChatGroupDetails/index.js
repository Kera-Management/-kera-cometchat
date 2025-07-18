"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatGroupDetails = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _Shared = require("../../Shared");
var _ = require("..");
var _index = require("../../Shared/CometChatSharedMediaView/index.js");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _back = _interopRequireDefault(require("./resources/back.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatGroupDetails extends _react.default.Component {
  constructor(props, context) {
    var _this;
    super(props, context);
    _this = this;
    _defineProperty(this, "item", void 0);
    _defineProperty(this, "enableAddGroupMembers", () => {
      this.context.FeatureRestriction.isAddingGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableAddGroupMembers && this._isMounted) {
          this.setState({
            enableAddGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableAddGroupMembers !== false && this._isMounted) {
          this.setState({
            enableAddGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableChangeScope", () => {
      this.context.FeatureRestriction.isChangingGroupMemberScopeEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableChangeScope && this._isMounted) {
          this.setState({
            enableChangeScope: response
          });
        }
      }).catch(error => {
        if (this.state.enableChangeScope !== false && this._isMounted) {
          this.setState({
            enableChangeScope: false
          });
        }
      });
    });
    _defineProperty(this, "enableKickGroupMembers", () => {
      this.context.FeatureRestriction.isKickingGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableKickGroupMembers && this._isMounted) {
          this.setState({
            enableKickGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableKickGroupMembers !== false && this._isMounted) {
          this.setState({
            enableKickGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableBanGroupMembers", () => {
      this.context.FeatureRestriction.isBanningGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableBanGroupMembers && this._isMounted) {
          this.setState({
            enableBanGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableBanGroupMembers !== false && this._isMounted) {
          this.setState({
            enableBanGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableDeleteGroup", () => {
      this.context.FeatureRestriction.isGroupDeletionEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableDeleteGroup && this._isMounted) {
          this.setState({
            enableDeleteGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enableDeleteGroup !== false && this._isMounted) {
          this.setState({
            enableDeleteGroup: false
          });
        }
      });
    });
    _defineProperty(this, "enableViewGroupMembers", () => {
      this.context.FeatureRestriction.isViewingGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableViewGroupMembers && this._isMounted) {
          this.setState({
            enableViewGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableViewGroupMembers !== false && this._isMounted) {
          this.setState({
            enableViewGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableLeaveGroup", () => {
      this.context.FeatureRestriction.isJoinLeaveGroupsEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableLeaveGroup && this._isMounted) {
          this.setState({
            enableLeaveGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enableLeaveGroup !== false && this._isMounted) {
          this.setState({
            enableLeaveGroup: false
          });
        }
      });
    });
    _defineProperty(this, "enableSharedMedia", () => {
      this.context.FeatureRestriction.isSharedMediaEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSharedMedia && this._isMounted) {
          this.setState({
            enableSharedMedia: response
          });
        }
      }).catch(error => {
        if (this.state.enableSharedMedia !== false && this._isMounted) {
          this.setState({
            enableSharedMedia: false
          });
        }
      });
    });
    _defineProperty(this, "enableBlockUser", () => {
      this.context.FeatureRestriction.isBlockUserEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableBlockUser && this._isMounted) {
          this.setState({
            enableBlockUser: response
          });
        }
      }).catch(error => {
        if (this.state.enableBlockUser !== false && this._isMounted) {
          this.setState({
            enableBlockUser: false
          });
        }
      });
    });
    _defineProperty(this, "groupUpdated", (key, message, group, options) => {
      const guid = this.context.item.guid;
      if (guid !== group.guid) {
        return false;
      }
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE:
          this.updateGroupMemberPresence(options.user);
          break;
        case enums.GROUP_MEMBER_ADDED:
        case enums.GROUP_MEMBER_JOINED:
          {
            const member = options.user;
            const updatedMember = Object.assign({}, member, {
              scope: _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
            });
            this.addParticipants([updatedMember], false);
          }
          break;
        case enums.GROUP_MEMBER_LEFT:
        case enums.GROUP_MEMBER_KICKED:
          {
            const member = options.user;
            this.removeParticipants(key, member, false);
          }
          break;
        case enums.GROUP_MEMBER_BANNED:
          {
            const member = options.user;
            //this.setAvatar(member);
            this.banMembers([member]);
            this.removeParticipants(key, member, false);
          }
          break;
        case enums.GROUP_MEMBER_UNBANNED:
          {
            const member = options.user;
            this.unbanMembers([member]);
          }
          break;
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          {
            const member = options.user;
            const updatedMember = Object.assign({}, member, {
              scope: options["scope"]
            });
            this.updateParticipants(updatedMember);
          }
          break;
        default:
          break;
      }
    });
    /*
      Updating group members presence
      */
    _defineProperty(this, "updateGroupMemberPresence", member => {
      let memberlist = [...this.context.groupMembers];
      //search for user
      let memberKey = memberlist.findIndex((m, k) => m.uid === member.uid);
      //if found in the list, update user object
      if (memberKey > -1) {
        let memberObj = memberlist[memberKey];
        let newMemberObj = Object.assign({}, memberObj, member);
        memberlist.splice(memberKey, 1, newMemberObj);
        this.context.updateGroupMembers(memberlist);
      }
      let bannedmemberlist = [...this.context.bannedGroupMembers];
      //search for user
      let bannedMemberKey = bannedmemberlist.findIndex((m, k) => m.uid === member.uid);
      //if found in the list, update user object
      if (bannedMemberKey > -1) {
        let bannedMemberObj = bannedmemberlist[bannedMemberKey];
        let newBannedMemberObj = Object.assign({}, bannedMemberObj, member);
        bannedmemberlist.splice(bannedMemberKey, 1, newBannedMemberObj);
        this.updateBannedGroupMembers(bannedmemberlist);
      }
    });
    _defineProperty(this, "getGroupMembers", () => {
      const administratorslist = [],
        moderatorslist = [];
      this.GroupDetailManager.fetchNextGroupMembers().then(groupMembers => {
        groupMembers.forEach(member => {
          if (member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
            administratorslist.push(member);
          }
          if (member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
            moderatorslist.push(member);
          }
        });
        this.context.setAllGroupMembers(groupMembers, administratorslist, moderatorslist);
      }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    });
    _defineProperty(this, "getBannedGroupMembers", () => {
      if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        return false;
      }
      this.GroupDetailManager.fetchNextBannedGroupMembers().then(bannedMembers => {
        this.context.setBannedGroupMembers(bannedMembers);
      }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    });
    _defineProperty(this, "deleteGroup", () => {
      this.setState({
        showDeleteConfirmDialog: true,
        showLeaveGroupConfirmDialog: false,
        showTransferOwnershipConfirmDialog: false
      });
    });
    _defineProperty(this, "onDeleteConfirm", e => {
      const optionSelected = e.target.value;
      this.setState({
        showDeleteConfirmDialog: false
      });
      if (optionSelected === "no") {
        return false;
      }
      const guid = this.context.item.guid;
      _chat.CometChat.deleteGroup(guid).then(response => {
        if (response) {
          this.context.setToastMessage("success", "GROUP_DELETION_SUCCESS");
          this.context.setDeletedGroupId(guid);
        } else {
          this.toastRef.setError("SOMETHING_WRONG");
        }
      }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    });
    _defineProperty(this, "onLeaveConfirm", e => {
      const optionSelected = e.target.value;
      this.setState({
        showLeaveGroupConfirmDialog: false
      });
      if (optionSelected === "no") {
        return false;
      }
      const guid = this.context.item.guid;
      _chat.CometChat.leaveGroup(guid).then(response => {
        if (response) {
          this.context.setLeftGroupId(guid);
          this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
        } else {
          this.toastRef.setError("SOMETHING_WRONG");
        }
      }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    });
    _defineProperty(this, "onTransferConfirm", e => {
      const optionSelected = e.target.value;
      this.setState({
        showTransferOwnershipConfirmDialog: false
      });
      if (optionSelected === "no") {
        return false;
      }
      this.setState({
        transferOwnership: true
      });
    });
    _defineProperty(this, "leaveGroup", () => {
      var _this$context$item, _this$state$loggedInU;
      /**
       * If loggeduser is the owner of the group; ask him to transfer ownership before leaving the group else show leave group confirmtion dialog
       */
      if (((_this$context$item = this.context.item) === null || _this$context$item === void 0 ? void 0 : _this$context$item.owner) === ((_this$state$loggedInU = this.state.loggedInUser) === null || _this$state$loggedInU === void 0 ? void 0 : _this$state$loggedInU.uid)) {
        this.setState({
          showTransferOwnershipConfirmDialog: true,
          showDeleteConfirmDialog: false,
          showLeaveGroupConfirmDialog: false
        });
      } else {
        this.setState({
          showLeaveGroupConfirmDialog: true,
          showTransferOwnershipConfirmDialog: false,
          showDeleteConfirmDialog: false
        });
      }
    });
    _defineProperty(this, "clickHandler", (action, flag) => {
      switch (action) {
        case "viewmember":
          this.setState({
            viewMember: flag
          });
          break;
        case "addmember":
          this.setState({
            addMember: flag
          });
          break;
        case "banmember":
          this.setState({
            banMember: flag
          });
          break;
        case "transferownership":
          this.setState({
            transferOwnership: flag
          });
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "membersActionHandler", (action, members) => {
      switch (action) {
        case enums.ACTIONS["FETCH_GROUP_MEMBERS"]:
          this.getGroupMembers();
          break;
        case enums.ACTIONS["FETCH_BANNED_GROUP_MEMBERS"]:
          this.getBannedGroupMembers();
          break;
        case enums.ACTIONS["UNBAN_GROUP_MEMBER_SUCCESS"]:
          this.unbanMembers(members);
          break;
        case enums.ACTIONS["ADD_GROUP_MEMBER_SUCCESS"]:
          this.addParticipants(members);
          break;
        case enums.ACTIONS["BAN_GROUPMEMBER_SUCCESS"]:
        case enums.ACTIONS["KICK_GROUPMEMBER_SUCCESS"]:
          this.removeParticipants(action, members);
          break;
        case enums.ACTIONS["SCOPECHANGE_GROUPMEMBER_SUCCESS"]:
          this.updateParticipants(members);
          break;
        case enums.ACTIONS["OWNERSHIP_TRANSFERRED"]:
          this.updateOwnership(members);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "banMembers", members => {
      this.context.setBannedGroupMembers(members);
    });
    _defineProperty(this, "unbanMembers", members => {
      const bannedMembers = [...this.context.bannedGroupMembers];
      const unbannedMembers = [];
      const filteredBannedMembers = bannedMembers.filter(bannedmember => {
        const found = members.find(member => bannedmember.uid === member.uid);
        if (found) {
          unbannedMembers.push(found);
          return false;
        }
        return true;
      });
      this.props.actionGenerated(enums.ACTIONS["UNBAN_GROUP_MEMBER_SUCCESS"], unbannedMembers);
      this.context.updateBannedGroupMembers(filteredBannedMembers);
    });
    _defineProperty(this, "addParticipants", function (members) {
      let triggerUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      _this.context.setGroupMembers(members);
      if (triggerUpdate) {
        const newItem = _objectSpread(_objectSpread({}, _this.context.item), {}, {
          membersCount: _this.context.groupMembers.length
        });
        _this.context.setItem(newItem);
        _this.props.actionGenerated(enums.ACTIONS["ADD_GROUP_MEMBER_SUCCESS"], members);
      }
    });
    _defineProperty(this, "removeParticipants", function (action, member) {
      let triggerUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      const groupmembers = [..._this.context.groupMembers];
      const filteredMembers = groupmembers.filter(groupmember => {
        if (groupmember.uid === member.uid) {
          return false;
        }
        return true;
      });
      _this.context.updateGroupMembers(filteredMembers);
      if (triggerUpdate) {
        const newItem = _objectSpread(_objectSpread({}, _this.context.item), {}, {
          membersCount: filteredMembers.length
        });
        _this.context.setItem(newItem);

        //if group member is banned, update banned member list in context api
        if (action === enums.ACTIONS["BAN_GROUPMEMBER_SUCCESS"]) {
          _this.context.setBannedGroupMembers([member]);
        }
        _this.props.actionGenerated(action, [member]);
      }
    });
    _defineProperty(this, "updateParticipants", updatedMember => {
      const memberlist = [...this.context.groupMembers];
      const memberKey = memberlist.findIndex(member => member.uid === updatedMember.uid);
      if (memberKey > -1) {
        const memberObj = memberlist[memberKey];
        const newMemberObj = Object.assign({}, memberObj, updatedMember, {
          scope: updatedMember["scope"]
        });
        memberlist.splice(memberKey, 1, newMemberObj);
        this.props.actionGenerated(enums.ACTIONS["SCOPECHANGE_GROUPMEMBER_SUCCESS"], [newMemberObj]);
        this.context.updateGroupMembers(memberlist);
      }
    });
    _defineProperty(this, "updateOwnership", uid => {
      const item = _objectSpread(_objectSpread({}, this.context.item), {}, {
        owner: uid
      });
      const type = _chat.CometChat.RECEIVER_TYPE.GROUP;
      this.setState({
        transferOwnership: false
      });
      this.context.setTypeAndItem(type, item);
    });
    _defineProperty(this, "closeGroupDetail", () => {
      this.props.actionGenerated(enums.ACTIONS["CLOSE_GROUP_DETAIL"]);
    });
    this._isMounted = false;
    this.state = {
      loggedInUser: null,
      memberlist: [],
      bannedmemberlist: [],
      administratorslist: [],
      moderatorslist: [],
      viewMember: false,
      addMember: false,
      banMember: false,
      addAdministrator: false,
      addModerator: false,
      enableAddGroupMembers: false,
      enableChangeScope: false,
      enableKickGroupMembers: false,
      enableBanGroupMembers: false,
      enableDeleteGroup: false,
      enableViewGroupMembers: false,
      enableLeaveGroup: false,
      enableSharedMedia: false,
      showDeleteConfirmDialog: false,
      showLeaveGroupConfirmDialog: false,
      showTransferOwnershipConfirmDialog: false,
      transferOwnership: false
    };
    this.toastRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    _chat.CometChat.getLoggedinUser().then(user => {
      if (this._isMounted) {
        this.setState({
          loggedInUser: user
        });
      }
    }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    this._isMounted = true;
    this.context.clearGroupMembers();
    this.item = this.context.item;
    const guid = this.context.item.guid;
    this.GroupDetailManager = new _controller.GroupDetailManager(guid);
    this.getGroupMembers();
    this.getBannedGroupMembers();
    this.GroupDetailManager.attachListeners(this.groupUpdated);
    this.enableAddGroupMembers();
    this.enableChangeScope();
    this.enableKickGroupMembers();
    this.enableBanGroupMembers();
    this.enableViewGroupMembers();
    this.enableDeleteGroup();
    this.enableLeaveGroup();
    this.enableSharedMedia();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.item.guid !== this.context.item.guid) {
      this.context.clearGroupMembers();
      const guid = this.context.item.guid;
      this.GroupDetailManager.removeListeners();
      this.GroupDetailManager = new _controller.GroupDetailManager(guid);
      this.getGroupMembers();
      this.getBannedGroupMembers();
      this.GroupDetailManager.attachListeners(this.groupUpdated);
    }
    this.item = this.context.item;
    this.enableAddGroupMembers();
    this.enableChangeScope();
    this.enableKickGroupMembers();
    this.enableBanGroupMembers();
    this.enableViewGroupMembers();
    this.enableDeleteGroup();
    this.enableLeaveGroup();
    this.enableSharedMedia();
  }
  componentWillUnmount() {
    this.GroupDetailManager.removeListeners();
    this.GroupDetailManager = null;
    this._isMounted = false;
  }
  render() {
    var _this$context;
    if (this.state.loggedInUser === null) {
      return null;
    }
    let viewMembersBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "content__item",
      position: "relative",
      display: "flex",
      clear: "both",
      width: "100%",
      py: "6px",
      sx: {
        "&:first-of-type": {
          paddingTop: "0"
        },
        "&:last-of-type": {
          paddingBottom: "0"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      className: "item__link",
      onClick: () => this.clickHandler("viewmember", true),
      fontSize: "15px",
      lineHeight: "20px",
      display: "inline-block",
      cursor: "pointer",
      fontWeight: "600",
      color: this.context.theme.color.primary
    }, _translator.default.translate("VIEW_MEMBERS", this.context.language)));
    let addMembersBtn = null,
      deleteGroupBtn = null,
      bannedMembersBtn = null;
    if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
      addMembersBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "content__item",
        position: "relative",
        display: "flex",
        clear: "both",
        width: "100%",
        py: "6px",
        sx: {
          "&:first-of-type": {
            paddingTop: "0"
          },
          "&:last-of-type": {
            paddingBottom: "0"
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "item__link",
        onClick: () => this.clickHandler("addmember", true),
        fontSize: "15px",
        lineHeight: "20px",
        display: "inline-block",
        cursor: "pointer",
        fontWeight: "600",
        color: this.context.theme.color.primary
      }, _translator.default.translate("ADD_MEMBERS", this.context.language)));
      deleteGroupBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "content__item",
        position: "relative",
        display: "flex",
        clear: "both",
        width: "100%",
        py: "6px",
        sx: {
          "&:first-of-type": {
            paddingTop: "0"
          },
          "&:last-of-type": {
            paddingBottom: "0"
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "item__link",
        onClick: this.deleteGroup,
        fontSize: "15px",
        lineHeight: "20px",
        display: "inline-block",
        cursor: "pointer",
        fontWeight: "600",
        color: this.context.theme.color.red
      }, _translator.default.translate("DELETE_AND_EXIT", this.context.language)));
    }
    if (this.context.item.scope !== _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
      bannedMembersBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "content__item",
        position: "relative",
        display: "flex",
        clear: "both",
        width: "100%",
        py: "6px",
        sx: {
          "&:first-of-type": {
            paddingTop: "0"
          },
          "&:last-of-type": {
            paddingBottom: "0"
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "item__link",
        onClick: () => this.clickHandler("banmember", true),
        fontSize: "15px",
        lineHeight: "20px",
        display: "inline-block",
        cursor: "pointer",
        fontWeight: "600",
        color: this.context.theme.color.primary
      }, _translator.default.translate("BANNED_MEMBERS", this.context.language)));
    }
    let leaveGroupBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "content__item",
      position: "relative",
      display: "flex",
      clear: "both",
      width: "100%",
      py: "6px",
      sx: {
        "&:first-of-type": {
          paddingTop: "0"
        },
        "&:last-of-type": {
          paddingBottom: "0"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      className: "item__link",
      onClick: this.leaveGroup,
      fontSize: "15px",
      lineHeight: "20px",
      display: "inline-block",
      cursor: "pointer",
      fontWeight: "600",
      color: this.context.theme.color.primary
    }, _translator.default.translate("LEAVE_GROUP", this.context.language)));
    let sharedmediaView = /*#__PURE__*/_react.default.createElement(_index.CometChatSharedMediaView, {
      containerHeight: "225px",
      lang: this.context.language
    });
    if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
      //if viewing group membersfeature is disabled
      if (this.state.enableViewGroupMembers === false) {
        viewMembersBtn = null;
      }
    } else if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR || this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
      if (this.state.enableViewGroupMembers === false && this.state.enableKickGroupMembers === false && this.state.enableBanGroupMembers === false && this.state.enableChangeScope === false) {
        //if viewing, kicking/banning, promoting/demoting group membersare feature is disabled
        viewMembersBtn = null;
      }
    }

    //if adding group members feature is disabled
    if (this.state.enableAddGroupMembers === false) {
      addMembersBtn = null;
    }

    //if kicking/banning/unbanning group members feature is disabled
    if (this.state.enableBanGroupMembers === false) {
      bannedMembersBtn = null;
    }

    //if deleting group feature is disabled
    if (this.state.enableDeleteGroup === false) {
      deleteGroupBtn = null;
    }

    //if leaving group feature is disabled
    if (this.state.enableLeaveGroup === false || ((_this$context = this.context) === null || _this$context === void 0 || (_this$context = _this$context.item) === null || _this$context === void 0 ? void 0 : _this$context.membersCount) === 1) {
      leaveGroupBtn = null;
    }

    //if viewing shared media group feature is disabled
    if (this.state.enableSharedMedia === false) {
      sharedmediaView = null;
    }
    let members = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "section section__members",
      width: "100%"
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      className: "section__header",
      as: "h6",
      m: 0,
      width: "100%",
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "20px",
      color: this.context.theme.color.secondary,
      textTransform: "uppercase"
    }, _translator.default.translate("MEMBERS", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "section__content",
      width: "100%",
      margin: "6px 0",
      sx: {
        "&:not(:last-of-type)": {
          marginBottom: "16px"
        }
      }
    }, viewMembersBtn, addMembersBtn, bannedMembersBtn));
    let options = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "section section__options",
      width: "100%"
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      className: "section__header",
      as: "h6",
      m: 0,
      width: "100%",
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "20px",
      color: this.context.theme.color.secondary,
      textTransform: "uppercase"
    }, _translator.default.translate("OPTIONS", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "section__content",
      width: "100%",
      margin: "6px 0",
      sx: {
        "&:not(:last-of-type)": {
          marginBottom: "16px"
        }
      }
    }, leaveGroupBtn, deleteGroupBtn));
    if (viewMembersBtn === null && addMembersBtn === null && bannedMembersBtn === null) {
      members = null;
    }
    if (leaveGroupBtn === null && deleteGroupBtn === null) {
      options = null;
    }
    let viewMembers = null;
    if (this.state.viewMember) {
      viewMembers = /*#__PURE__*/_react.default.createElement(_.CometChatViewGroupMemberList, {
        loggedinuser: this.state.loggedInUser,
        lang: this.props.lang,
        enableChangeScope: this.state.enableChangeScope,
        enableKickGroupMembers: this.state.enableKickGroupMembers,
        enableBanGroupMembers: this.state.enableBanGroupMembers,
        close: () => this.clickHandler("viewmember", false),
        actionGenerated: this.membersActionHandler
      });
    }
    let addMembers = null;
    if (this.state.addMember) {
      addMembers = /*#__PURE__*/_react.default.createElement(_.CometChatAddGroupMemberList, {
        close: () => this.clickHandler("addmember", false),
        actionGenerated: this.membersActionHandler
      });
    }
    let bannedMembers = null;
    if (this.state.banMember) {
      bannedMembers = /*#__PURE__*/_react.default.createElement(_.CometChatBanGroupMemberList, {
        loggedinuser: this.state.loggedInUser,
        close: () => this.clickHandler("banmember", false),
        actionGenerated: this.membersActionHandler
      });
    }
    let showDeleteConfirmDialog = null;
    if (this.state.showDeleteConfirmDialog) {
      showDeleteConfirmDialog = /*#__PURE__*/_react.default.createElement(_Shared.CometChatConfirmDialog, _extends({}, this.props, {
        onClick: this.onDeleteConfirm,
        message: _translator.default.translate("DELETE_CONFIRM", this.context.language),
        confirmButtonText: _translator.default.translate("DELETE", this.context.language),
        cancelButtonText: _translator.default.translate("CANCEL", this.context.language)
      }));
    }
    let showLeaveGroupConfirmDialog = null;
    if (this.state.showLeaveGroupConfirmDialog) {
      showLeaveGroupConfirmDialog = /*#__PURE__*/_react.default.createElement(_Shared.CometChatConfirmDialog, _extends({}, this.props, {
        onClick: this.onLeaveConfirm,
        message: _translator.default.translate("LEAVE_CONFIRM", this.context.language),
        confirmButtonText: _translator.default.translate("LEAVE", this.context.language),
        cancelButtonText: _translator.default.translate("CANCEL", this.context.language)
      }));
    }
    let showTransferOwnershipConfirmDialog = null;
    if (this.state.showTransferOwnershipConfirmDialog) {
      showTransferOwnershipConfirmDialog = /*#__PURE__*/_react.default.createElement(_Shared.CometChatConfirmDialog, _extends({}, this.props, {
        onClick: this.onTransferConfirm,
        message: _translator.default.translate("TRANSFER_CONFIRM", this.context.language),
        confirmButtonText: _translator.default.translate("TRANSFER", this.context.language),
        cancelButtonText: _translator.default.translate("CANCEL", this.context.language)
      }));
    }
    let transferOwnership = null;
    if (this.state.transferOwnership) {
      transferOwnership = /*#__PURE__*/_react.default.createElement(_.CometChatTransferOwnershipMemberList, {
        roles: this.roles,
        loggedinuser: this.state.loggedInUser,
        actionGenerated: this.membersActionHandler,
        close: () => this.clickHandler("transferownership", false)
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "detailpane",
      height: "100%",
      position: "relative",
      boxSizing: "border-box",
      fontFamily: this.context.theme.fontFamily,
      sx: {
        "*": {
          boxSizing: "border-box",
          fontFamily: this.context.theme.fontFamily
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "detailpane__header",
      p: 4,
      position: "relative",
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
      justifyContent: "flex-start",
      alignItems: "center",
      height: "69px"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "header__close",
      cursor: "pointer",
      display: "none",
      sx: {
        mask: "url(".concat(_back.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor,
        [this.context.theme.breakPoints[1]]: {
          display: "block"
        }
      },
      width: "24px",
      height: "24px",
      onClick: this.closeGroupDetail
    }), /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      className: "header__title",
      as: "h4",
      m: 0,
      fontWeight: "700",
      fontSize: "22px",
      lineHeight: "26px"
    }, _translator.default.translate("DETAILS", this.context.language))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "detailpane__section",
      m: 0,
      p: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: "calc(100% - 70px)"
    }, members, options, sharedmediaView), viewMembers, addMembers, bannedMembers, transferOwnership, showDeleteConfirmDialog, showLeaveGroupConfirmDialog, showTransferOwnershipConfirmDialog, /*#__PURE__*/_react.default.createElement(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.lang
    }));
  }
}

// Specifies the default values for props:
exports.CometChatGroupDetails = CometChatGroupDetails;
_defineProperty(CometChatGroupDetails, "contextType", _CometChatContext.CometChatContext);
CometChatGroupDetails.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatGroupDetails.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};