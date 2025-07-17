"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBanGroupMemberList = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatBanGroupMemberList extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "unbanMember", memberToUnBan => {
      const guid = this.context.item.guid;
      _chat.CometChat.unbanGroupMember(guid, memberToUnBan.uid).then(response => {
        if (response) {
          this.props.actionGenerated(enums.ACTIONS["UNBAN_GROUP_MEMBER_SUCCESS"], [memberToUnBan]);
        } else {
          this.setState({
            errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
          });
        }
      }).catch(error => this.setState({
        errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
      }));
    });
    _defineProperty(this, "updateMembers", (action, member) => {
      switch (action) {
        case enums.ACTIONS["UNBAN_GROUP_MEMBER"]:
          this.unbanMember(member);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "handleScroll", e => {
      const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === Math.round(e.currentTarget.clientHeight);
      if (bottom) {
        this.props.actionGenerated(enums.ACTIONS["FETCH_BANNED_GROUP_MEMBERS"]);
      }
    });
    this.state = {
      membersToBan: [],
      membersToUnBan: [],
      decoratorMessage: _translator.default.translate("LOADING", _translator.default.getDefaultLanguage()),
      errorMessage: ""
    };
  }
  componentDidMount() {
    if (this.context.bannedGroupMembers.length === 0) {
      this.setState({
        decoratorMessage: _translator.default.translate("NO_BANNED_MEMBERS_FOUND", this.context.language)
      });
    } else {
      this.setState({
        decoratorMessage: ""
      });
    }
  }
  componentDidUpdate() {
    if (this.context.bannedGroupMembers.length === 0 && this.state.decoratorMessage === "") {
      this.setState({
        decoratorMessage: _translator.default.translate("NO_BANNED_MEMBERS_FOUND", this.context.language)
      });
    } else if (this.context.bannedGroupMembers.length && this.state.decoratorMessage.length) {
      this.setState({
        decoratorMessage: ""
      });
    }
  }
  render() {
    const membersList = [...this.context.bannedGroupMembers];
    const bannedMembers = membersList.map((member, key) => {
      return /*#__PURE__*/_react.default.createElement(_.CometChatBanGroupMemberListItem, {
        key: member.uid,
        member: member,
        loggedinuser: this.props.loggedinuser,
        actionGenerated: this.updateMembers
      });
    });
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        overflow: "hidden",
        w: "100%",
        justifyContent: "center",
        alignItems: "center",
        h: "55%",
        className: "bannedmembers__decorator-message"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        m: "0",
        h: "30px",
        color: this.context.theme.color.secondary,
        fontSize: "20px",
        fontWeight: "600",
        className: "decorator-message"
      }, this.state.decoratorMessage));
    }
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
      className: "modal__bannedmembers",
      sx: {
        ["@media ".concat(this.context.theme.breakPoints[1], ", ").concat(this.context.theme.breakPoints[2])]: {
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
      mb: "8px",
      fontWeight: "bold",
      w: "100%",
      textAlign: _translator.default.getDirection(this.context.language) === "rtl" ? "right" : "left",
      pr: _translator.default.getDirection(this.context.language) === "rtl" ? "32px" : "0",
      className: "modal__title"
    }, _translator.default.translate("BANNED_MEMBERS", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Text, {
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
        w: "calc(100% - 220px)",
        ["@media ".concat(this.context.theme.breakPoints[0])]: {
          w: "calc(100% - 185px)"
        },
        ["@media ".concat(this.context.theme.breakPoints[1])]: {
          w: "calc(100% - 185px)"
        },
        ["@media ".concat(this.context.theme.breakPoints[2])]: {
          w: "calc(100% - 185px)"
        }
      }
    }, _translator.default.translate("NAME", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "role",
      sx: {
        w: "150px",
        ["@media ".concat(this.context.theme.breakPoints[0])]: {
          w: "115px"
        },
        ["@media ".concat(this.context.theme.breakPoints[1])]: {
          w: "115px"
        },
        ["@media ".concat(this.context.theme.breakPoints[2])]: {
          w: "115px"
        }
      }
    }, _translator.default.translate("SCOPE", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      w: "70px",
      className: "unban"
    }, _translator.default.translate("UNBAN", this.context.language))), messageContainer, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      w: "100%",
      h: "calc(100% - 33px)",
      overflowY: "auto",
      className: "content__list",
      onScroll: this.handleScroll
    }, bannedMembers)))));
  }
}

// Specifies the default values for props:
exports.CometChatBanGroupMemberList = CometChatBanGroupMemberList;
_defineProperty(CometChatBanGroupMemberList, "contextType", _CometChatContext.CometChatContext);
CometChatBanGroupMemberList.defaultProps = {
  theme: _theme.theme
};
CometChatBanGroupMemberList.propTypes = {
  theme: _propTypes.default.object
};