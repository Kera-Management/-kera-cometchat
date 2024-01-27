"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatViewGroupMemberList = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _ = require("..");
var _Shared = require("../../Shared");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
      return (0, _react2.jsx)(_.CometChatViewGroupMemberListItem, {
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
      editAccess = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
        css: (0, _style.actionColumnStyle)(this.context),
        className: "ban"
      }, _translator.default.translate("BAN", this.context.language)), (0, _react2.jsx)("div", {
        css: (0, _style.actionColumnStyle)(this.context),
        className: "kick"
      }, _translator.default.translate("KICK", this.context.language)));
      if (this.props.enableKickGroupMembers === false && this.props.enableBanGroupMembers === false) {
        editAccess = null;
      }
    }
    this.mq.addListener(editAccess => this.setUserColumnTitle(editAccess));
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalWrapperStyle)(this.context),
      className: "modal__viewmembers"
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
      css: (0, _style.modalListStyle)(),
      className: "modal__content"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.listHeaderStyle)(this.context),
      className: "content__header"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.nameColumnStyle)(this.context, editAccess),
      className: "name"
    }, this.state.userColumnTitle), (0, _react2.jsx)("div", {
      css: (0, _style.scopeColumnStyle)(this.context),
      className: "scope"
    }, _translator.default.translate("SCOPE", this.context.language)), editAccess), (0, _react2.jsx)("div", {
      css: (0, _style.listStyle)(),
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