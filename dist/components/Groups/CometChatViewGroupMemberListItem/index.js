"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatViewGroupMemberListItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _edit = _interopRequireDefault(require("./resources/edit.svg"));
var _done = _interopRequireDefault(require("./resources/done.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
var _banMember = _interopRequireDefault(require("./resources/ban-member.svg"));
var _delete = _interopRequireDefault(require("./resources/delete.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatViewGroupMemberListItem extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "toggleChangeScope", flag => {
      this.setState({
        showChangeScope: flag
      });
    });
    _defineProperty(this, "scopeChangeHandler", event => {
      this.setState({
        scope: event.target.value
      });
    });
    _defineProperty(this, "updateMemberScope", () => {
      this.props.actionGenerated(enums.ACTIONS["CHANGE_SCOPE_GROUP_MEMBER"], this.props.member, this.state.scope);
      this.toggleChangeScope();
    });
    _defineProperty(this, "toggleTooltip", (event, flag) => {
      const elem = event.currentTarget;
      if (elem.classList.contains("name")) {
        const scrollWidth = elem.scrollWidth;
        const clientWidth = elem.clientWidth;
        if (scrollWidth <= clientWidth) {
          return false;
        }
      }
      if (flag) {
        elem.setAttribute("title", this.props.member.name);
      } else {
        elem.removeAttribute("title");
      }
    });
    this.changeScopeDropDown = (0, _react2.jsx)("select", {
      className: "members-scope-select",
      onChange: this.scopeChangeHandler,
      defaultValue: this.props.member.scope
    });
    this.state = {
      showChangeScope: false,
      scope: null
    };
    this.roles = context.roles;
  }
  render() {
    let editClassName = "";
    let name = this.props.member.name;
    let scope = (0, _react2.jsx)("span", {
      css: (0, _style.roleStyle)()
    }, this.context.roles[this.props.member.scope]);
    let changescope = null;
    let ban = (0, _react2.jsx)("i", {
      css: (0, _style.banIconStyle)(_banMember.default, this.context),
      title: _translator.default.translate("BAN", this.context.language),
      onClick: () => {
        this.props.actionGenerated(enums.ACTIONS["BAN_GROUP_MEMBER"], this.props.member);
      }
    });
    let kick = (0, _react2.jsx)("i", {
      css: (0, _style.kickIconStyle)(_delete.default, this.context),
      title: _translator.default.translate("KICK", this.context.language),
      onClick: () => {
        this.props.actionGenerated(enums.ACTIONS["KICK_GROUP_MEMBER"], this.props.member);
      }
    });
    if (this.state.showChangeScope) {
      let options = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("option", {
        value: _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
      }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]), (0, _react2.jsx)("option", {
        value: _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR
      }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR]), (0, _react2.jsx)("option", {
        value: _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN
      }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN]));
      if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR && this.props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        options = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("option", {
          value: _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
        }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]), (0, _react2.jsx)("option", {
          value: _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR
        }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR]));
      }
      changescope = (0, _react2.jsx)("div", {
        css: (0, _style.scopeWrapperStyle)(),
        className: "scope__wrapper"
      }, (0, _react2.jsx)("select", {
        css: (0, _style.scopeSelectionStyle)(),
        className: "scope__select",
        onChange: this.scopeChangeHandler,
        defaultValue: this.props.member.scope
      }, options), (0, _react2.jsx)("i", {
        css: (0, _style.scopeIconStyle)(_done.default, this.context),
        title: _translator.default.translate("CHANGE_SCOPE", this.context.language),
        onClick: this.updateMemberScope
      }), (0, _react2.jsx)("i", {
        css: (0, _style.scopeIconStyle)(_close.default, this.context),
        title: _translator.default.translate("CHANGE_SCOPE", this.context.language),
        onClick: () => this.toggleChangeScope(false)
      }));
    } else {
      if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        changescope = scope;
      } else {
        changescope = (0, _react2.jsx)(_react.default.Fragment, null, scope, (0, _react2.jsx)("i", {
          css: (0, _style.scopeIconStyle)(_edit.default, this.context),
          title: _translator.default.translate("CHANGE_SCOPE", this.context.language),
          onClick: () => this.toggleChangeScope(true)
        }));
      }
    }

    //disable change scope, kick, ban of group owner
    if (this.context.item.owner === this.props.member.uid) {
      scope = (0, _react2.jsx)("span", {
        css: (0, _style.roleStyle)()
      }, _translator.default.translate("OWNER", this.context.language));
      changescope = scope;
      ban = null;
      kick = null;
    }

    //disable change scope, kick, ban of self
    if (this.props.loggedinuser.uid === this.props.member.uid) {
      name = _translator.default.translate("YOU", this.context.language);
      changescope = scope;
      ban = null;
      kick = null;
    }

    //if the loggedin user is moderator, don't allow to change scope, ban, kick group moderators or administrators
    if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR && (this.props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN || this.props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR)) {
      changescope = scope;
      ban = null;
      kick = null;
    }

    //if the loggedin user is administrator but not group owner, don't allow to change scope, ban, kick group administrators
    if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN && this.context.item.owner !== this.props.loggedinuser.uid && this.props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
      changescope = scope;
      ban = null;
      kick = null;
    }
    let editAccess = null;
    //if the loggedin user is participant, don't show the option to change scope, ban, or kick group members
    if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
      editAccess = null;
      editClassName = "true";
    } else {
      editAccess = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
        css: (0, _style.actionColumnStyle)(this.context),
        className: "ban"
      }, ban), (0, _react2.jsx)("div", {
        css: (0, _style.actionColumnStyle)(this.context),
        className: "kick"
      }, kick));

      /**
       * if kick and ban feature is disabled
       */
      if (this.props.enableBanGroupMembers === false && this.props.enableKickGroupMembers === false) {
        editAccess = null;
      } else if (this.props.enableBanGroupMembers === false) {
        //if ban feature is disabled
        editAccess = (0, _react2.jsx)("div", {
          css: (0, _style.actionColumnStyle)(this.context),
          className: "kick"
        }, kick);
      } else if (this.props.enableKickGroupMembers === false) {
        //if kick feature is disabled
        editAccess = (0, _react2.jsx)("div", {
          css: (0, _style.actionColumnStyle)(this.context),
          className: "ban"
        }, ban);
      }

      /**
       * if promote_demote_members feature is disabled
       */
      if (this.props.enableChangeScope === false) {
        changescope = scope;
      }
    }
    let userPresence = (0, _react2.jsx)(_Shared.CometChatUserPresence, {
      status: this.props.member.status
    });
    return (0, _react2.jsx)("div", {
      css: (0, _style.modalRowStyle)(this.context),
      className: "content__row"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.nameColumnStyle)(this.context, editClassName),
      className: "userinfo"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.avatarStyle)(this.context, editClassName),
      className: "thumbnail",
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
      user: this.props.member
    }), userPresence), (0, _react2.jsx)("div", {
      css: (0, _style.nameStyle)(this.context, editClassName),
      className: "name",
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, name)), (0, _react2.jsx)("div", {
      css: (0, _style.scopeColumnStyle)(this.context),
      className: "scope"
    }, changescope), editAccess);
  }
}

// Specifies the default values for props:
exports.CometChatViewGroupMemberListItem = CometChatViewGroupMemberListItem;
_defineProperty(CometChatViewGroupMemberListItem, "contextType", _CometChatContext.CometChatContext);
CometChatViewGroupMemberListItem.defaultProps = {
  loggedinuser: {},
  enableChangeScope: false
};
CometChatViewGroupMemberListItem.propTypes = {
  loggedinuser: _propTypes.default.shape(_chat.CometChat.User),
  enableChangeScope: _propTypes.default.bool
};