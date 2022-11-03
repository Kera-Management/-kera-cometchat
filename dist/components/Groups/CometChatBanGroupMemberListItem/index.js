"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBanGroupMemberListItem = void 0;
var _react = require("react");
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _banMember = _interopRequireDefault(require("./resources/ban-member.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatBanGroupMemberListItem = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  let name = props.member.name;
  let scope = context.roles[props.member.scope];
  let unBan = (0, _react2.jsx)("i", {
    title: _translator.default.translate("UNBAN", context.language),
    onClick: () => {
      props.actionGenerated(enums.ACTIONS["UNBAN_GROUP_MEMBER"], props.member);
    }
  });

  //if the loggedin user is moderator, don't allow unban of banned moderators or administrators
  if (context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR && (props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN || props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR)) {
    unBan = null;
  }

  //if the loggedin user is administrator, don't allow unban of banned administrators
  if (context.item.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN && props.member.scope === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
    if (context.item.owner !== props.loggedinuser.uid) {
      unBan = null;
    }
  }
  const toggleTooltip = (event, flag) => {
    const elem = event.currentTarget;
    const nameContainer = elem.lastChild;
    const scrollWidth = nameContainer.scrollWidth;
    const clientWidth = nameContainer.clientWidth;
    if (scrollWidth <= clientWidth) {
      return false;
    }
    if (flag) {
      nameContainer.setAttribute("title", nameContainer.textContent);
    } else {
      nameContainer.removeAttribute("title");
    }
  };
  return (0, _react2.jsx)("div", {
    css: (0, _style.modalRowStyle)(context)
  }, (0, _react2.jsx)("div", {
    css: (0, _style.userStyle)(context),
    className: "userinfo",
    onMouseEnter: event => toggleTooltip(event, true),
    onMouseLeave: event => toggleTooltip(event, false)
  }, (0, _react2.jsx)("div", {
    css: (0, _style.avatarStyle)(),
    className: "avatar"
  }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
    user: props.member
  }), (0, _react2.jsx)(_Shared.CometChatUserPresence, {
    status: props.member.status,
    borderColor: props.theme.borderColor.primary
  })), (0, _react2.jsx)("div", {
    css: (0, _style.nameStyle)(),
    className: "name"
  }, name)), (0, _react2.jsx)("div", {
    css: (0, _style.roleStyle)(context),
    className: "role"
  }, scope), (0, _react2.jsx)("div", {
    css: (0, _style.actionStyle)(_banMember.default, context),
    className: "unban"
  }, unBan));
};

// Specifies the default values for props:
exports.CometChatBanGroupMemberListItem = CometChatBanGroupMemberListItem;
CometChatBanGroupMemberListItem.defaultProps = {
  theme: _theme.theme
};
CometChatBanGroupMemberListItem.propTypes = {
  theme: _propTypes.default.object
};