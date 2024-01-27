"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBanGroupMemberList = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("../");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
      return (0, _react2.jsx)(_.CometChatBanGroupMemberListItem, {
        key: member.uid,
        member: member,
        loggedinuser: this.props.loggedinuser,
        actionGenerated: this.updateMembers
      });
    });
    let messageContainer = null;
    if (this.state.decoratorMessage.length !== 0) {
      messageContainer = (0, _react2.jsx)("div", {
        css: (0, _style.contactMsgStyle)(),
        className: "bannedmembers__decorator-message"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.contactMsgTxtStyle)(this.context),
        className: "decorator-message"
      }, this.state.decoratorMessage));
    }
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalWrapperStyle)(this.context),
      className: "modal__bannedmembers"
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
    }, _translator.default.translate("BANNED_MEMBERS", this.context.language)), (0, _react2.jsx)("div", {
      css: (0, _style.modalErrorStyle)(this.context),
      className: "modal__error"
    }, this.state.errorMessage), (0, _react2.jsx)("div", {
      css: (0, _style.modalListStyle)(),
      className: "modal__content"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.listHeaderStyle)(this.context),
      className: "content__header"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.nameColumnStyle)(this.props),
      className: "name"
    }, _translator.default.translate("NAME", this.context.language)), (0, _react2.jsx)("div", {
      css: (0, _style.roleColumnStyle)(this.context),
      className: "role"
    }, _translator.default.translate("SCOPE", this.context.language)), (0, _react2.jsx)("div", {
      css: (0, _style.actionColumnStyle)(this.context),
      className: "unban"
    }, _translator.default.translate("UNBAN", this.context.language))), messageContainer, (0, _react2.jsx)("div", {
      css: (0, _style.listStyle)(this.props),
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