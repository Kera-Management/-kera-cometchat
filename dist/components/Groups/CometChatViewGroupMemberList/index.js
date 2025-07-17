"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatViewGroupMemberList = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Shared = require("../../Shared");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatViewGroupMemberList extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "updateUserColumnTitle", () => {
      let userColumnTitle = _translator.default.translate("NAME", this.props.lang);
      if (this.mq.matches) {
        userColumnTitle = _translator.default.translate("AVATAR", this.props.lang);
      }
      this.setState({
        userColumnTitle
      });
    });
    _defineProperty(this, "handleScroll", e => {
      const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === Math.round(e.currentTarget.clientHeight);
      if (bottom) {
        this.props.actionGenerated(enums.ACTIONS["FETCH_GROUP_MEMBERS"]);
      }
    });
    _defineProperty(this, "updateMembers", (action, member, scope) => {
      switch (action) {
        case enums.ACTIONS["BAN_GROUP_MEMBER"]:
          this.banMember(member);
          break;
        case enums.ACTIONS["KICK_GROUP_MEMBER"]:
          this.kickMember(member);
          break;
        case enums.ACTIONS["CHANGE_SCOPE_GROUP_MEMBER"]:
          this.changeScope(member, scope);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "banMember", memberToBan => {
      const guid = this.context.item.guid;
      _chat.CometChat.banGroupMember(guid, memberToBan.uid).then(response => {
        if (response) {
          this.context.setToastMessage("success", "BAN_GROUPMEMBER_SUCCESS");
          this.props.actionGenerated(enums.ACTIONS["BAN_GROUPMEMBER_SUCCESS"], memberToBan);
        } else {
          this.setState({
            errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
          });
        }
      }).catch(error => this.setState({
        errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
      }));
    });
    _defineProperty(this, "kickMember", memberToKick => {
      const guid = this.context.item.guid;
      _chat.CometChat.kickGroupMember(guid, memberToKick.uid).then(response => {
        if (response) {
          this.props.actionGenerated(enums.ACTIONS["KICK_GROUPMEMBER_SUCCESS"], memberToKick);
        } else {
          this.setState({
            errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
          });
        }
      }).catch(error => this.setState({
        errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
      }));
    });
    _defineProperty(this, "changeScope", (member, scope) => {
      const guid = this.context.item.guid;
      _chat.CometChat.updateGroupMemberScope(guid, member.uid, scope).then(response => {
        if (response) {
          this.context.setToastMessage("success", "SCOPECHANGE_GROUPMEMBER_SUCCESS");
          const updatedMember = Object.assign({}, member, {
            scope: scope
          });
          this.props.actionGenerated(enums.ACTIONS["SCOPECHANGE_GROUPMEMBER_SUCCESS"], updatedMember);
        } else {
          this.setState({
            errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
          });
        }
      }).catch(error => this.setState({
        errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
      }));
    });
    _defineProperty(this, "setUserColumnTitle", editAccess => {
      if (this._isMounted) {
        if (editAccess !== null && this.mq.matches) {
          this.setState({
            userColumnTitle: _translator.default.translate("AVATAR", this.context.language)
          });
        } else {
          this.setState({
            userColumnTitle: _translator.default.translate("NAME", this.context.language)
          });
        }
      }
    });
    this._isMounted = false;
    const chatWindow = context.UIKitSettings.chatWindow;
    this.mq = chatWindow.matchMedia(this.context.theme.breakPoints[1]);
    this.state = {
      userColumnTitle: "",
      errorMessage: ""
    };
  }
  componentDidMount() {
    this.updateUserColumnTitle();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.updateUserColumnTitle();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const membersList = [...this.context.groupMembers];
    const groupMembers = membersList.map((member, key) => {
      return /*#__PURE__*/_react.default.createElement(_.CometChatViewGroupMemberListItem, {
        loggedinuser: this.props.loggedinuser,
        theme: this.props.theme,
        key: key,
        member: member,
        enableChangeScope: this.props.enableChangeScope,
        enableBanGroupMembers: this.props.enableBanGroupMembers,
        enableKickGroupMembers: this.props.enableKickGroupMembers,
        actionGenerated: this.updateMembers
      });
    });
    let editAccess = null;
    if (this.context.item.scope !== _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
      editAccess = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        w: "70px",
        className: "ban",
        sx: {
          ["@media ".concat(this.context.theme.breakPoints[1])]: {
            w: "40px"
          },
          ["@media ".concat(this.context.theme.breakPoints[2])]: {
            w: "40px"
          }
        }
      }, _translator.default.translate("BAN", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        w: "70px",
        className: "kick",
        sx: {
          ["@media ".concat(this.context.theme.breakPoints[1])]: {
            w: "40px"
          },
          ["@media ".concat(this.context.theme.breakPoints[2])]: {
            w: "40px"
          }
        }
      }, _translator.default.translate("KICK", this.context.language)));
      if (this.props.enableKickGroupMembers === false && this.props.enableBanGroupMembers === false) {
        editAccess = null;
      }
    }
    this.mq.addListener(editAccess => this.setUserColumnTitle(editAccess));
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      minW: "350px",
      minH: "450px",
      w: "50%",
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
      className: "modal__viewmembers",
      sx: {
        ["@media ".concat(this.context.theme.breakPoints[1])]: {
          w: "100%",
          h: "100%"
        },
        ["@media ".concat(this.context.theme.breakPoints[2])]: {
          w: "100%",
          h: "100%"
        },
        ["@media ".concat(this.context.theme.breakPoints[3])]: {
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
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      p: "24px",
      h: "100%",
      w: "100%",
      className: "modal__body"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "20px",
      mb: "16px",
      fontWeight: "bold",
      w: "100%",
      textAlign: _translator.default.getDirection(this.context.language) === "rtl" ? "right" : "left",
      pr: _translator.default.getDirection(this.context.language) === "rtl" ? "32px" : "0",
      className: "modal__title"
    }, _translator.default.translate("GROUP_MEMBERS", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "12px",
      color: this.context.theme.color.red,
      textAlign: "center",
      p: "8px 0",
      w: "100%",
      h: "31px",
      className: "modal__error"
    }, this.state.errorMessage), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      w: "100%",
      h: "calc(100% - 70px)",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      className: "modal__content"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      fontWeight: "bold",
      p: "8px",
      w: "100%",
      border: "1px solid ".concat(this.context.theme.borderColor.primary),
      className: "content__header"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "name",
      sx: {
        w: editAccess === null ? "calc(100% - 180px)" : "calc(100% - 260px)",
        ["@media ".concat(this.context.theme.breakPoints[1])]: {
          w: editAccess === null ? "calc(100% - 140px)" : "calc(100% - 220px)"
        },
        ["@media ".concat(this.context.theme.breakPoints[2])]: {
          w: editAccess === null ? "calc(100% - 180px)" : "calc(100% - 260px)"
        },
        ["@media ".concat(this.context.theme.breakPoints[3])]: {
          w: editAccess === null ? "calc(100% - 180px)" : "calc(100% - 240px)"
        }
      }
    }, this.state.userColumnTitle), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      w: "180px",
      mr: "8px",
      className: "scope",
      sx: {
        ["@media ".concat(this.context.theme.breakPoints[1])]: {
          w: "140px"
        },
        ["@media ".concat(this.context.theme.breakPoints[2])]: {
          w: "180px"
        },
        ["@media ".concat(this.context.theme.breakPoints[3])]: {
          w: "120px"
        }
      }
    }, _translator.default.translate("SCOPE", this.context.language)), editAccess), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      w: "100%",
      h: "calc(100% - 33px)",
      overflowY: "auto",
      className: "content__list",
      onScroll: this.handleScroll
    }, groupMembers)))));
  }
}

// Specifies the default values for props:
exports.CometChatViewGroupMemberList = CometChatViewGroupMemberList;
_defineProperty(CometChatViewGroupMemberList, "contextType", _CometChatContext.CometChatContext);
CometChatViewGroupMemberList.defaultProps = {
  theme: _theme.theme,
  userColumnTitle: "",
  enableChangeScope: false,
  enableKickGroupMembers: false,
  enableBanGroupMembers: false
};
CometChatViewGroupMemberList.propTypes = {
  theme: _propTypes.default.object,
  userColumnTitle: _propTypes.default.string,
  enableChangeScope: _propTypes.default.bool,
  enableKickGroupMembers: _propTypes.default.bool,
  enableBanGroupMembers: _propTypes.default.bool
};