"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatViewGroupMemberListItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _edit = _interopRequireDefault(require("./resources/edit.svg"));
var _done = _interopRequireDefault(require("./resources/done.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
var _banMember = _interopRequireDefault(require("./resources/ban-member.svg"));
var _delete = _interopRequireDefault(require("./resources/delete.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    this.changeScopeDropDown = /*#__PURE__*/_react.default.createElement("select", {
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
    let scope = /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "12px",
      maxWidth: "calc(100% - 20px)"
    }, this.context.roles[this.props.member.scope]);
    let changescope = null;
    let ban = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "i",
      width: "24px",
      height: "24px",
      display: "inline-block",
      cursor: "pointer",
      title: _translator.default.translate("BAN", this.context.language),
      onClick: () => {
        this.props.actionGenerated(enums.ACTIONS["BAN_GROUP_MEMBER"], this.props.member);
      },
      sx: {
        mask: "url(".concat(_banMember.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.secondaryTextColor
      }
    });
    let kick = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "i",
      width: "24px",
      height: "24px",
      display: "inline-block",
      cursor: "pointer",
      title: _translator.default.translate("KICK", this.context.language),
      onClick: () => {
        this.props.actionGenerated(enums.ACTIONS["KICK_GROUP_MEMBER"], this.props.member);
      },
      sx: {
        background: "url(".concat(_delete.default, ") center center no-repeat")
      }
    });
    if (this.state.showChangeScope) {
      let options = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("option", {
        value: _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
      }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]), /*#__PURE__*/_react.default.createElement("option", {
        value: _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR
      }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR]), /*#__PURE__*/_react.default.createElement("option", {
        value: _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN
      }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN]));
      if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR && this.props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        options = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("option", {
          value: _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
        }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]), /*#__PURE__*/_react.default.createElement("option", {
          value: _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR
        }, this.context.roles[_chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR]));
      }
      changescope = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "scope__wrapper",
        direction: "row",
        align: "center",
        justify: "center",
        width: "100%",
        transition: "opacity .1s linear"
      }, /*#__PURE__*/_react.default.createElement(_react2.Select, {
        className: "scope__select",
        width: "65%",
        border: "0",
        boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
        borderRadius: "8px",
        backgroundColor: "rgba(20, 20, 20, 0.04)",
        padding: "8px",
        color: "rgba(20, 20, 20, 0.6)",
        float: "left",
        onChange: this.scopeChangeHandler,
        defaultValue: this.props.member.scope
      }, options), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        as: "i",
        width: "24px",
        height: "24px",
        display: "inline-block",
        cursor: "pointer",
        margin: "0px 4px",
        title: _translator.default.translate("CHANGE_SCOPE", this.context.language),
        onClick: this.updateMemberScope,
        sx: {
          mask: "url(".concat(_done.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.secondaryTextColor
        }
      }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        as: "i",
        width: "24px",
        height: "24px",
        display: "inline-block",
        cursor: "pointer",
        margin: "0px 4px",
        title: _translator.default.translate("CHANGE_SCOPE", this.context.language),
        onClick: () => this.toggleChangeScope(false),
        sx: {
          mask: "url(".concat(_close.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.secondaryTextColor
        }
      }));
    } else {
      if (this.context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        changescope = scope;
      } else {
        changescope = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, scope, /*#__PURE__*/_react.default.createElement(_react2.Box, {
          as: "i",
          width: "24px",
          height: "24px",
          display: "inline-block",
          cursor: "pointer",
          title: _translator.default.translate("CHANGE_SCOPE", this.context.language),
          onClick: () => this.toggleChangeScope(true),
          sx: {
            mask: "url(".concat(_edit.default, ") center center no-repeat"),
            backgroundColor: this.context.theme.secondaryTextColor
          }
        }));
      }
    }

    //disable change scope, kick, ban of group owner
    if (this.context.item.owner === this.props.member.uid) {
      scope = /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "12px",
        maxWidth: "calc(100% - 20px)"
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
      editAccess = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "ban",
        width: {
          base: "40px",
          md: "40px",
          lg: "70px"
        }
      }, ban), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "kick",
        width: {
          base: "40px",
          md: "40px",
          lg: "70px"
        }
      }, kick));

      /**
       * if kick and ban feature is disabled
       */
      if (this.props.enableBanGroupMembers === false && this.props.enableKickGroupMembers === false) {
        editAccess = null;
      } else if (this.props.enableBanGroupMembers === false) {
        //if ban feature is disabled
        editAccess = /*#__PURE__*/_react.default.createElement(_react2.Box, {
          className: "kick",
          width: {
            base: "40px",
            md: "40px",
            lg: "70px"
          }
        }, kick);
      } else if (this.props.enableKickGroupMembers === false) {
        //if kick feature is disabled
        editAccess = /*#__PURE__*/_react.default.createElement(_react2.Box, {
          className: "ban",
          width: {
            base: "40px",
            md: "40px",
            lg: "70px"
          }
        }, ban);
      }

      /**
       * if promote_demote_members feature is disabled
       */
      if (this.props.enableChangeScope === false) {
        changescope = scope;
      }
    }
    let userPresence = /*#__PURE__*/_react.default.createElement(_Shared.CometChatUserPresence, {
      status: this.props.member.status
    });
    const isParticipantView = editClassName === "true";
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "content__row",
      borderLeft: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderRight: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
      width: "100%",
      fontSize: "14px",
      direction: "row",
      justify: "flex-start",
      align: "center",
      padding: "8px"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "userinfo",
      direction: "row",
      justify: "flex-start",
      align: "center",
      width: isParticipantView ? {
        base: "calc(100% - 140px)",
        sm: "calc(100% - 140px)",
        md: "calc(100% - 180px)"
      } : {
        base: "calc(100% - 240px)",
        sm: "calc(100% - 220px)",
        md: "calc(100% - 260px)",
        lg: "calc(100% - 260px)"
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "thumbnail",
      width: "36px",
      height: "36px",
      flexShrink: "0",
      marginRight: {
        base: isParticipantView ? "8px" : "0",
        md: "8px"
      },
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
      user: this.props.member
    }), userPresence), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      className: "name",
      margin: "8px 0",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: isParticipantView ? "100%" : "calc(100% - 50px)",
      display: {
        base: isParticipantView ? "inline" : "none",
        sm: "inline"
      },
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, name)), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "scope",
      direction: "row",
      align: "center",
      justify: "flex-start",
      width: {
        base: "120px",
        sm: "140px",
        md: "180px",
        lg: "180px"
      },
      sx: {
        "img": {
          width: "24px",
          height: "24px",
          cursor: "pointer"
        }
      }
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