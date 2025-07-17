"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatGroupList = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
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
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _search = _interopRequireDefault(require("./resources/search.svg"));
var _back = _interopRequireDefault(require("./resources/back.svg"));
var _create = _interopRequireDefault(require("./resources/create.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatGroupList extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "item", void 0);
    _defineProperty(this, "timeout", void 0);
    _defineProperty(this, "loggedInUser", null);
    /**
     * if search group feature is disabled
     */
    _defineProperty(this, "enableSearchGroup", () => {
      this.getContext().FeatureRestriction.isGroupSearchEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSearchGroup) {
          this.setState({
            enableSearchGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enableSearchGroup !== false) {
          this.setState({
            enableSearchGroup: false
          });
        }
      });
    });
    /**
     * if create group feature is disabled
     */
    _defineProperty(this, "enableCreateGroup", () => {
      this.getContext().FeatureRestriction.isGroupCreationEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableCreateGroup) {
          this.setState({
            enableCreateGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enableCreateGroup !== false) {
          this.setState({
            enableCreateGroup: false
          });
        }
      });
    });
    /**
     * if join group feature is disabled
     */
    _defineProperty(this, "enableJoinGroup", () => {
      this.getContext().FeatureRestriction.isJoinLeaveGroupsEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableJoinGroup) {
          this.setState({
            enableJoinGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enableJoinGroup !== false) {
          this.setState({
            enableJoinGroup: false
          });
        }
      });
    });
    _defineProperty(this, "groupUpdated", (key, message, group, options) => {
      switch (key) {
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          this.updateMemberChanged(group, options);
          break;
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          this.updateMemberRemoved(group, options);
          break;
        case enums.GROUP_MEMBER_ADDED:
        case enums.GROUP_MEMBER_JOINED:
          this.updateMemberAddition(group, options);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "updateMemberRemoved", (group, options) => {
      let grouplist = [...this.state.grouplist];

      //search for group
      let groupKey = grouplist.findIndex(g => g.guid === group.guid);
      if (groupKey > -1) {
        if (options && this.loggedInUser.uid === options.user.uid) {
          let groupObj = _objectSpread({}, grouplist[groupKey]);
          let membersCount = parseInt(group.membersCount);
          let hasJoined = group.hasJoined;
          let newgroupObj = Object.assign({}, groupObj, {
            membersCount: membersCount,
            hasJoined: hasJoined
          });
          grouplist.splice(groupKey, 1, newgroupObj);
          this.setState({
            grouplist: grouplist
          });
        } else {
          let groupObj = _objectSpread({}, grouplist[groupKey]);
          let membersCount = parseInt(group.membersCount);
          let newgroupObj = Object.assign({}, groupObj, {
            membersCount: membersCount
          });
          grouplist.splice(groupKey, 1, newgroupObj);
          this.setState({
            grouplist: grouplist
          });
        }
      }
    });
    // Callback for when group member is added or joined
    _defineProperty(this, "updateMemberAddition", (group, options) => {
      let grouplist = [...this.state.grouplist];

      //search for group
      let groupKey = grouplist.findIndex(g => g.guid === group.guid);
      if (groupKey > -1) {
        if (options && this.loggedInUser.uid === options.user.uid) {
          let groupObj = _objectSpread({}, grouplist[groupKey]);
          let hasJoined = true;
          let newgroupObj = Object.assign({}, groupObj, {
            hasJoined: hasJoined
          });
          grouplist.splice(groupKey, 1, newgroupObj);
          this.setState({
            grouplist: grouplist
          });
        } else {
          let groupObj = _objectSpread({}, grouplist[groupKey]);
          let membersCount = parseInt(groupObj.membersCount);
          let newgroupObj = Object.assign({}, groupObj, {
            membersCount: membersCount
          });
          grouplist.splice(groupKey, 1, newgroupObj);
          this.setState({
            grouplist: grouplist
          });
        }
      }
    });
    _defineProperty(this, "updateMemberChanged", (group, options) => {
      let grouplist = [...this.state.grouplist];

      //search for group
      let groupKey = grouplist.findIndex(g => g.guid === group.guid);
      if (groupKey > -1) {
        let groupObj = _objectSpread({}, grouplist[groupKey]);
        if (options && this.loggedInUser.uid === options.user.uid) {
          let newgroupObj = Object.assign({}, groupObj, {
            scope: options.scope
          });
          grouplist.splice(groupKey, 1, newgroupObj);
          this.setState({
            grouplist: grouplist
          });
        }
      }
    });
    _defineProperty(this, "handleScroll", e => {
      const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === Math.round(e.currentTarget.clientHeight);
      if (bottom) this.getGroups();
    });
    _defineProperty(this, "handleClick", group => {
      if (!this.props.onItemClick) return;
      if (group.hasJoined === false) {
        //if join group feature is disabled
        if (this.state.enableJoinGroup === false) {
          return false;
        }
        let password = "";
        if (group.type === _chat.CometChat.GROUP_TYPE.PASSWORD) {
          password = prompt(_translator.default.translate("ENTER_YOUR_PASSWORD", this.props.lang));
        }
        const guid = group.guid;
        const groupType = group.type;
        _chat.CometChat.joinGroup(guid, groupType, password).then(response => {
          if (typeof response === "object" && Object.keys(response).length) {
            const groups = [...this.state.grouplist];
            let groupKey = groups.findIndex((g, k) => g.guid === guid);
            if (groupKey > -1) {
              const groupObj = groups[groupKey];
              const newGroupObj = Object.assign({}, groupObj, response, {
                scope: _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
              });
              groups.splice(groupKey, 1, newGroupObj);
              this.setState({
                grouplist: groups
              });
              this.props.onItemClick(newGroupObj, _chat.CometChat.ACTION_TYPE.TYPE_GROUP);
            }
          } else {
            this.toastRef.setError("SOMETHING_WRONG");
          }
        }).catch(error => {
          if (error.hasOwnProperty("code") && error.code && error.code === "ERR_WRONG_GROUP_PASS") {
            this.toastRef.setError("WRONG_PASSWORD");
          } else {
            this.toastRef.setError("SOMETHING_WRONG");
          }
        });
      } else {
        this.props.onItemClick(group, _chat.CometChat.ACTION_TYPE.TYPE_GROUP);
      }
    });
    _defineProperty(this, "handleMenuClose", () => {
      if (!this.props.actionGenerated) {
        return false;
      }
      this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
    });
    _defineProperty(this, "searchGroup", e => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      let val = e.target.value;
      this.timeout = setTimeout(() => {
        this.setState({
          grouplist: [],
          decoratorMessage: _translator.default.translate("LOADING", this.props.lang)
        });
        this.GroupListManager = new _controller.GroupListManager(val);
        this.getGroups();
      }, 500);
    });
    _defineProperty(this, "getGroups", () => {
      this.GroupListManager.fetchNextGroups().then(groupList => {
        if (groupList.length === 0) {
          if (this.state.grouplist.length === 0) {
            this.setState({
              decoratorMessage: _translator.default.translate("NO_GROUPS_FOUND", this.props.lang)
            });
          }
        } else {
          this.setState({
            grouplist: [...this.state.grouplist, ...groupList],
            decoratorMessage: ""
          });
        }
      }).catch(error => this.setState({
        decoratorMessage: _translator.default.translate("SOMETHING_WRONG", this.props.lang)
      }));
    });
    _defineProperty(this, "createGroupHandler", flag => {
      this.setState({
        createGroup: flag
      });
    });
    _defineProperty(this, "createGroupActionHandler", (action, group) => {
      if (action === enums.ACTIONS["GROUP_CREATED"]) {
        this.handleClick(group);
        const groupList = [...this.state.grouplist];
        groupList.unshift(group);
        this.setState({
          grouplist: groupList,
          createGroup: false
        });
      }
    });
    _defineProperty(this, "getContext", () => {
      if (this.props._parent.length) {
        return this.context;
      } else {
        return this.contextProviderRef.state;
      }
    });
    this.state = {
      grouplist: [],
      createGroup: false,
      enableSearchGroup: false,
      enableCreateGroup: false,
      enableJoinGroup: false,
      decoratorMessage: _translator.default.translate("LOADING", props.lang)
    };
    this.contextProviderRef = /*#__PURE__*/_react.default.createRef();
    this.groupListRef = /*#__PURE__*/_react.default.createRef();
    this.toastRef = /*#__PURE__*/_react.default.createRef();
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => this.setState({
      decoratorMessage: _translator.default.translate("SOMETHING_WRONG", props.lang)
    }));
  }
  componentDidMount() {
    this.item = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.getContext().item : null;
    this.enableSearchGroup();
    this.enableCreateGroup();
    this.enableJoinGroup();
    this.GroupListManager = new _controller.GroupListManager();
    this.getGroups();
    this.GroupListManager.attachListeners(this.groupUpdated);
  }
  componentDidUpdate(prevProps) {
    //if group detail(membersCount) is updated, update grouplist
    if (this.item && Object.keys(this.item).length && this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.item.guid === this.getContext().item.guid && this.item.membersCount !== this.getContext().item.membersCount) {
      const groups = [...this.state.grouplist];
      let groupKey = groups.findIndex(group => group.guid === this.getContext().item.guid);
      if (groupKey > -1) {
        const groupObj = groups[groupKey];
        let newGroupObj = Object.assign({}, groupObj, {
          membersCount: this.getContext().item.membersCount
        });
        groups.splice(groupKey, 1, newGroupObj);
        this.setState({
          grouplist: groups
        });
      }
    }

    //upon user deleting a group, remove group from group list
    if (this.getContext().deletedGroupId.trim().length) {
      const guid = this.getContext().deletedGroupId.trim();
      const groups = [...this.state.grouplist];
      const groupKey = groups.findIndex(group => group.guid === guid);
      if (groupKey > -1) {
        groups.splice(groupKey, 1);
        this.setState({
          grouplist: groups
        });
      }
    }
    if (this.getContext().leftGroupId.trim().length) {
      const guid = this.getContext().leftGroupId.trim();
      const groups = [...this.state.grouplist];
      const groupKey = groups.findIndex(group => group.guid === guid);
      if (groupKey > -1) {
        const groupObj = groups[groupKey];
        const membersCount = Number(groupObj.membersCount) ? Number(groupObj.membersCount) - 1 : 0;
        let newGroupObj = Object.assign({}, groupObj, {
          membersCount,
          hasJoined: false
        });
        groups.splice(groupKey, 1, newGroupObj);
        this.setState({
          grouplist: groups
        });
      }
    }
    this.item = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP ? this.getContext().item : null;
    this.enableSearchGroup();
    this.enableCreateGroup();
    this.enableJoinGroup();
  }
  componentWillUnmount() {
    this.GroupListManager = null;
  }
  render() {
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "groups__decorator-message",
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
    const groups = this.state.grouplist.map(group => {
      let selectedGroup = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.getContext().item.guid === group.guid ? group : null;
      return /*#__PURE__*/_react.default.createElement(_.CometChatGroupListItem, {
        key: group.guid,
        group: group,
        selectedGroup: selectedGroup,
        clickHandler: this.handleClick
      });
    });
    let createGroupBtn = /*#__PURE__*/_react.default.createElement(_react2.IconButton, {
      "aria-label": _translator.default.translate("CREATE_GROUP", this.props.lang),
      title: _translator.default.translate("CREATE_GROUP", this.props.lang),
      onClick: () => this.createGroupHandler(true),
      height: "24px",
      width: "24px",
      minWidth: "24px",
      cursor: "pointer",
      background: "none",
      _hover: {
        background: "none"
      },
      sx: {
        "& > *": {
          display: "inline-block",
          width: "24px",
          height: "24px",
          mask: "url(".concat(_create.default, ") center center no-repeat"),
          backgroundColor: _theme.theme.primaryColor
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, null));

    //if create group feature is disabled
    if (this.state.enableCreateGroup === false) {
      createGroupBtn = null;
    }
    let closeBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "header__close",
      cursor: "pointer",
      display: "none",
      sx: {
        mask: "url(".concat(_back.default, ") left center no-repeat"),
        backgroundColor: _theme.theme.primaryColor,
        [_theme.theme.breakPoints[0]]: {
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
    let searchGroup = null;
    if (this.state.enableSearchGroup) {
      searchGroup = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "groups__search",
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
        onChange: this.searchGroup,
        width: "calc(100% - 30px)",
        height: "100%",
        p: 2,
        fontSize: "15px",
        fontWeight: "400",
        lineHeight: "20px",
        outline: "none",
        border: "none",
        color: this.props.theme.color.search,
        backgroundColor: "transparent"
      }));
    }
    let createGroup = null;
    if (this.state.createGroup) {
      createGroup = /*#__PURE__*/_react.default.createElement(_.CometChatCreateGroup, {
        theme: this.props.theme,
        close: () => this.createGroupHandler(false),
        actionGenerated: this.createGroupActionHandler
      });
    }
    const groupListTemplate = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "groups",
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
      className: "groups__header",
      p: 4,
      position: "relative",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid ".concat(_theme.theme.borderColor.primary),
      height: "70px"
    }, closeBtn, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      className: "header__title",
      as: "h4",
      m: 0,
      display: "inline-block",
      width: "100%",
      textAlign: "left",
      fontSize: "22px",
      fontWeight: "700",
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
    }, _translator.default.translate("GROUPS", this.props.lang)), createGroupBtn), searchGroup, messageContainer, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "groups__list",
      height: "calc(100% - 125px)",
      overflowY: "auto",
      m: 0,
      p: 0,
      onScroll: this.handleScroll,
      ref: el => this.groupListRef = el
    }, groups)), createGroup, /*#__PURE__*/_react.default.createElement(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.lang
    }));
    let groupListWrapper = groupListTemplate;
    //if used as a standalone component, add errorboundary and context provider
    if (this.props._parent === "") {
      groupListWrapper = /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
        ref: el => this.contextProviderRef = el
      }, groupListTemplate);
    }
    return groupListWrapper;
  }
}

// Specifies the default values for props:
exports.CometChatGroupList = CometChatGroupList;
_defineProperty(CometChatGroupList, "contextType", _CometChatContext.CometChatContext);
CometChatGroupList.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme,
  onItemClick: () => {},
  _parent: ""
};
CometChatGroupList.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object,
  onItemClick: _propTypes.default.func,
  _parent: _propTypes.default.string
};