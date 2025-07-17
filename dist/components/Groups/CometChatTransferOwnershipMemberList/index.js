"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatTransferOwnershipMemberList = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Shared = require("../../Shared");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
var _transferring = _interopRequireDefault(require("./resources/transferring.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatTransferOwnershipMemberList extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "handleScroll", e => {
      const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === Math.round(e.currentTarget.clientHeight);
      if (bottom) {
        this.props.actionGenerated(enums.ACTIONS["FETCH_GROUP_MEMBERS"]);
      }
    });
    _defineProperty(this, "updateMembers", (action, member, scope) => {
      switch (action) {
        case enums.ACTIONS["CHANGE_OWNERSHIP_GROUP_MEMBER"]:
          this.changeOwnership(member, scope);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "updateGroupOwner", member => {
      this.setState({
        newGroupOwner: member === null || member === void 0 ? void 0 : member.uid
      });
    });
    _defineProperty(this, "transferOwnership", () => {
      var _this$context;
      const guid = (_this$context = this.context) === null || _this$context === void 0 || (_this$context = _this$context.item) === null || _this$context === void 0 ? void 0 : _this$context.guid;
      const uid = this.state.newGroupOwner;
      if (!guid || !uid) {
        return false;
      }
      this.setState({
        transferringOwnership: true
      });
      _chat.CometChat.transferGroupOwnership(guid, uid).then(response => {
        this.setState({
          transferringOwnership: false
        });
        this.props.actionGenerated(enums.ACTIONS["OWNERSHIP_TRANSFERRED"], uid);
      }).catch(error => {
        this.setState({
          transferringOwnership: false,
          errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
        });
      });
    });
    _defineProperty(this, "changeOwnership", () => {});
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
    this.mq = chatWindow.matchMedia(context.theme.breakPoints[1]);
    let userColumnTitle = _translator.default.translate("NAME", context.language);
    if (this.mq.matches) {
      userColumnTitle = _translator.default.translate("AVATAR", context.language);
    }
    this.state = {
      userColumnTitle: userColumnTitle,
      newGroupOwner: null,
      transferringOwnership: false,
      errorMessage: ""
    };
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const memberList = [...this.context.groupMembers];
    const groupMembers = memberList.filter(member => {
      var _this$props;
      return (member === null || member === void 0 ? void 0 : member.uid) !== ((_this$props = this.props) === null || _this$props === void 0 || (_this$props = _this$props.loggedinuser) === null || _this$props === void 0 ? void 0 : _this$props.uid);
    }).map(member => {
      return /*#__PURE__*/_react.default.createElement(_.CometChatTransferOwnershipMemberListItem, {
        loggedinuser: this.props.loggedinuser,
        key: member === null || member === void 0 ? void 0 : member.uid,
        checked: this.updateGroupOwner,
        member: member,
        actionGenerated: this.updateMembers
      });
    });
    let transferBtn = null;
    if (memberList.length) {
      const transferText = this.state.transferringOwnership ? _translator.default.translate("TRANSFERRING", this.context.language) : _translator.default.translate("TRANSFER", this.context.language);
      transferBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        pt: "24px",
        textAlign: "center",
        className: "modal__transferownership"
      }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
        cursor: "pointer",
        p: "8px 16px",
        bg: this.context.theme.backgroundColor.blue,
        borderRadius: "5px",
        color: this.context.theme.color.white,
        fontSize: "14px",
        outline: "0",
        border: "0",
        isDisabled: !this.state.newGroupOwner || this.state.transferringOwnership,
        onClick: this.transferOwnership,
        sx: {
          background: this.state.transferringOwnership ? "url(".concat(_transferring.default, ") no-repeat right 10px center ").concat(this.context.theme.backgroundColor.blue) : this.context.theme.backgroundColor.blue
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        mr: this.state.transferringOwnership ? "24px" : "0"
      }, transferText)));
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
      className: "modal__groupmembers",
      sx: {
        "@media (min-width : 320px) and (max-width: 767px)": {
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
    }, _translator.default.translate("GROUP_MEMBERS", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "12px",
      color: this.context.theme.color.red,
      textAlign: "center",
      p: "8px 0",
      h: "31px",
      w: "100%",
      className: "modal__error"
    }, this.state.errorMessage), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      w: "100%",
      h: "calc(100% - 120px)",
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
        w: "calc(100% - 180px)",
        ["@media ".concat(this.context.theme.breakPoints[1])]: {
          w: "calc(100% - 140px)"
        },
        ["@media ".concat(this.context.theme.breakPoints[2])]: {
          w: "calc(100% - 180px)"
        },
        ["@media ".concat(this.context.theme.breakPoints[3])]: {
          w: "calc(100% - 120px)"
        }
      }
    }, this.state.userColumnTitle), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "scope",
      sx: {
        w: "180px",
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
    }, _translator.default.translate("SCOPE", this.context.language))), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      w: "100%",
      h: "calc(100% - 100px)",
      overflowY: "auto",
      className: "content__list",
      onScroll: this.handleScroll
    }, groupMembers)), transferBtn)));
  }
}
exports.CometChatTransferOwnershipMemberList = CometChatTransferOwnershipMemberList;
_defineProperty(CometChatTransferOwnershipMemberList, "contextType", _CometChatContext.CometChatContext);