"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserListItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CometChatUserListItem = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  let userPresence = /*#__PURE__*/_react.default.createElement(_Shared.CometChatUserPresence, {
    status: props.user.status
  });
  const toggleTooltip = (event, flag) => {
    const elem = event.target;
    const scrollWidth = elem.scrollWidth;
    const clientWidth = elem.clientWidth;
    if (scrollWidth <= clientWidth) {
      return false;
    }
    if (flag) {
      elem.setAttribute("title", elem.textContent);
    } else {
      elem.removeAttribute("title");
    }
  };
  const isSelected = props.selectedUser && props.selectedUser.uid === props.user.uid;
  return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
    direction: "row",
    justify: "left",
    align: "center",
    cursor: "pointer",
    width: "100%",
    padding: "8px 16px",
    bg: isSelected ? context.theme.backgroundColor.primary : "transparent",
    _hover: {
      bg: context.theme.backgroundColor.primary
    },
    onClick: () => props.clickHandler(props.user),
    className: "list__item"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    display: "inline-block",
    width: "36px",
    height: "36px",
    flexShrink: 0,
    className: "list__item__thumbnail"
  }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
    user: props.user
  }), userPresence), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    width: "calc(100% - 45px)",
    flexGrow: 1,
    paddingLeft: "16px",
    sx: {
      "&[dir=rtl]": {
        paddingRight: "16px",
        paddingLeft: "0"
      }
    },
    className: "list__item__details",
    dir: _translator.default.getDirection(context.language)
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "15px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    margin: "5px 0 0 0",
    lineHeight: "22px",
    color: context.theme.color.primary,
    className: "item__details__name",
    onMouseEnter: event => toggleTooltip(event, true),
    onMouseLeave: event => toggleTooltip(event, false)
  }, props.user.name), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    marginTop: "10px",
    borderBottom: "1px solid ".concat(context.theme.borderColor.primary),
    className: "item__details__desc"
  })));
};

// Specifies the default values for props:
exports.CometChatUserListItem = CometChatUserListItem;
CometChatUserListItem.defaultProps = {
  theme: _theme.theme,
  user: {}
};
CometChatUserListItem.propTypes = {
  theme: _propTypes.default.object,
  user: _propTypes.default.shape(_chat.CometChat.User)
};