"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatTransferOwnershipMemberList = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _chat = require("@cometchat-pro/chat");
var _ = require("../");
var _Shared = require("../../Shared");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _close = _interopRequireDefault(require("./resources/close.svg"));
var _transferring = _interopRequireDefault(require("./resources/transferring.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
      return (0, _react2.jsx)(_.CometChatTransferOwnershipMemberListItem, {
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
      transferBtn = (0, _react2.jsx)("div", {
        css: (0, _style.modalFootStyle)(this.state, this.context, _transferring.default),
        className: "modal__transferownership"
      }, (0, _react2.jsx)("button", {
        type: "button",
        onClick: this.transferOwnership
      }, (0, _react2.jsx)("span", null, transferText)));
    }
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalWrapperStyle)(this.props, this.context),
      className: "modal__groupmembers"
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
    }, _translator.default.translate("GROUP_MEMBERS", this.context.language)), (0, _react2.jsx)("div", {
      css: (0, _style.modalErrorStyle)(this.context),
      className: "modal__error"
    }, this.state.errorMessage), (0, _react2.jsx)("div", {
      css: (0, _style.modalListStyle)(this.context),
      className: "modal__content"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.listHeaderStyle)(this.context),
      className: "content__header"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.nameColumnStyle)(this.props, this.context),
      className: "name"
    }, this.state.userColumnTitle), (0, _react2.jsx)("div", {
      css: (0, _style.scopeColumnStyle)(this.context),
      className: "scope"
    }, _translator.default.translate("SCOPE", this.context.language))), (0, _react2.jsx)("div", {
      css: (0, _style.listStyle)(),
      className: "content__list",
      onScroll: this.handleScroll
    }, groupMembers)), transferBtn)));
  }
}
exports.CometChatTransferOwnershipMemberList = CometChatTransferOwnershipMemberList;
_defineProperty(CometChatTransferOwnershipMemberList, "contextType", _CometChatContext.CometChatContext);