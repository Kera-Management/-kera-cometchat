"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBanGroupMemberListItem = void 0;
var _react = require("react");
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _banMember = _interopRequireDefault(require("./resources/ban-member.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatBanGroupMemberListItem = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  let name = props.member.name;
  let scope = context.roles[props.member.scope];
  let unBan = /*#__PURE__*/React.createElement(_react2.Box, {
    as: "i",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "inline-block",
    title: _translator.default.translate("UNBAN", context.language),
    onClick: () => {
      props.actionGenerated(enums.ACTIONS["UNBAN_GROUP_MEMBER"], props.member);
    },
    sx: {
      mask: "url(".concat(_banMember.default, ") center center no-repeat"),
      backgroundColor: context.theme.secondaryTextColor
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
  return /*#__PURE__*/React.createElement(_react2.Flex, {
    borderLeft: "1px solid ".concat(context.theme.borderColor.primary),
    borderRight: "1px solid ".concat(context.theme.borderColor.primary),
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    width: "100%",
    fontSize: "14px",
    direction: "row",
    justify: "flex-start",
    align: "center",
    padding: "8px"
  }, /*#__PURE__*/React.createElement(_react2.Flex, {
    className: "userinfo",
    width: {
      base: "calc(100% - 185px)",
      md: "calc(100% - 185px)",
      lg: "calc(100% - 220px)"
    },
    onMouseEnter: event => toggleTooltip(event, true),
    onMouseLeave: event => toggleTooltip(event, false)
  }, /*#__PURE__*/React.createElement(_react2.Box, {
    className: "avatar",
    display: "inline-block",
    float: "left",
    width: "36px",
    height: "36px",
    marginRight: "8px"
  }, /*#__PURE__*/React.createElement(_Shared.CometChatAvatar, {
    user: props.member
  }), /*#__PURE__*/React.createElement(_Shared.CometChatUserPresence, {
    status: props.member.status,
    borderColor: props.theme.borderColor.primary
  })), /*#__PURE__*/React.createElement(_react2.Text, {
    className: "name",
    margin: "10px 0 0 0",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }, name)), /*#__PURE__*/React.createElement(_react2.Box, {
    className: "role",
    width: {
      base: "115px",
      lg: "150px"
    },
    fontSize: "12px"
  }, scope), /*#__PURE__*/React.createElement(_react2.Box, {
    className: "unban",
    width: "70px"
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