"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatGroupList = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _controller = require("./controller");
var _ = require("..");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _search = _interopRequireDefault(require("./resources/search.svg"));
var _back = _interopRequireDefault(require("./resources/back.svg"));
var _create = _interopRequireDefault(require("./resources/create.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatGroupList extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "item", void 0);
    _defineProperty(this, "timeout", void 0);
    _defineProperty(this, "loggedInUser", null);
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

  /**
   * if search group feature is disabled
   */

  render() {
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = (0, _react2.jsx)("div", {
        css: (0, _style.groupMsgStyle)(),
        className: "groups__decorator-message"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.groupMsgTxtStyle)(_theme.theme),
        className: "decorator-message"
      }, this.state.decoratorMessage));
    }
    const groups = this.state.grouplist.map(group => {
      let selectedGroup = this.getContext().type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.getContext().item.guid === group.guid ? group : null;
      return (0, _react2.jsx)(_.CometChatGroupListItem, {
        key: group.guid,
        group: group,
        selectedGroup: selectedGroup,
        clickHandler: this.handleClick
      });
    });
    let createGroupBtn = (0, _react2.jsx)("div", {
      css: (0, _style.groupAddStyle)(_create.default, _theme.theme),
      title: _translator.default.translate("CREATE_GROUP", this.props.lang),
      onClick: () => this.createGroupHandler(true)
    }, (0, _react2.jsx)("i", null));

    //if create group feature is disabled
    if (this.state.enableCreateGroup === false) {
      createGroupBtn = null;
    }
    let closeBtn = (0, _react2.jsx)("div", {
      css: (0, _style.groupHeaderCloseStyle)(_back.default, _theme.theme),
      className: "header__close",
      onClick: this.handleMenuClose
    });
    if (this.getContext() && Object.keys(this.getContext().item).length === 0) {
      closeBtn = null;
    }
    let searchGroup = null;
    if (this.state.enableSearchGroup) {
      searchGroup = (0, _react2.jsx)("div", {
        css: (0, _style.groupSearchStyle)(),
        className: "groups__search"
      }, (0, _react2.jsx)("input", {
        type: "text",
        autoComplete: "off",
        css: (0, _style.groupSearchInputStyle)(this.props),
        className: "search__input",
        placeholder: _translator.default.translate("SEARCH", this.props.lang),
        onChange: this.searchGroup
      }));
    }
    let createGroup = null;
    if (this.state.createGroup) {
      createGroup = (0, _react2.jsx)(_.CometChatCreateGroup, {
        theme: this.props.theme,
        close: () => this.createGroupHandler(false),
        actionGenerated: this.createGroupActionHandler
      });
    }
    const groupListTemplate = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
      css: (0, _style.groupWrapperStyle)(this.props, _theme.theme),
      className: "groups"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.groupHeaderStyle)(_theme.theme),
      className: "groups__header"
    }, closeBtn, (0, _react2.jsx)("h4", {
      css: (0, _style.groupHeaderTitleStyle)(this.props),
      className: "header__title",
      dir: _translator.default.getDirection(this.props.lang)
    }, _translator.default.translate("GROUPS", this.props.lang)), createGroupBtn), searchGroup, messageContainer, (0, _react2.jsx)("div", {
      css: (0, _style.groupListStyle)(),
      className: "groups__list",
      onScroll: this.handleScroll,
      ref: el => this.groupListRef = el
    }, groups)), createGroup, (0, _react2.jsx)(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.lang
    }));
    let groupListWrapper = groupListTemplate;
    //if used as a standalone component, add errorboundary and context provider
    if (this.props._parent === "") {
      groupListWrapper = (0, _react2.jsx)(_CometChatContext.CometChatContextProvider, {
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