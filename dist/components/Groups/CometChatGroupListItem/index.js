"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatGroupListItem = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _phosphorReact = require("phosphor-react");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatGroupListItem extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "toggleTooltip", (event, flag) => {
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
    });
    _defineProperty(this, "clickHandler", () => {
      this.props.clickHandler(this.props.group);
    });
  }
  render() {
    let groupTypeIcon = null;
    if (this.props.group.type === _chat.CometChat.GROUP_TYPE.PRIVATE) {
      groupTypeIcon = /*#__PURE__*/_react.default.createElement(_react2.Icon, {
        as: _phosphorReact.ShieldCheck,
        boxSize: "24px",
        color: this.context.theme.secondaryTextColor,
        title: _translator.default.translate("PRIVATE_GROUP", this.context.language)
      });
    } else if (this.props.group.type === _chat.CometChat.GROUP_TYPE.PASSWORD) {
      groupTypeIcon = /*#__PURE__*/_react.default.createElement(_react2.Icon, {
        as: _phosphorReact.Lock,
        boxSize: "24px",
        color: this.context.theme.secondaryTextColor,
        title: _translator.default.translate("PROTECTED_GROUP", this.context.language)
      });
    }
    const isSelected = this.props.selectedGroup && this.props.selectedGroup.guid === this.props.group.guid;
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      direction: "row",
      justify: "left",
      align: "center",
      cursor: "pointer",
      width: "100%",
      padding: "8px 16px",
      bg: isSelected ? this.context.theme.backgroundColor.primary : "transparent",
      _hover: {
        bg: this.context.theme.backgroundColor.primary
      },
      className: "list__item",
      onClick: this.clickHandler
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      width: "36px",
      height: "36px",
      flexShrink: 0,
      className: "list__item__thumbnail"
    }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
      group: this.props.group
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "calc(100% - 70px)",
      flexGrow: 1,
      paddingLeft: "16px",
      sx: {
        "&[dir=rtl]": {
          paddingRight: "16px",
          paddingLeft: "0"
        }
      },
      className: "list__item__details",
      dir: _translator.default.getDirection(this.context.language)
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      align: "center",
      width: "100%",
      margin: "0",
      className: "item__details__name",
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "15px",
      fontWeight: "600",
      maxWidth: "calc(100% - 30px)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      margin: "0",
      lineHeight: "22px",
      color: this.context.theme.color.primary
    }, this.props.group.name), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "24px",
      height: "auto",
      margin: "0 8px"
    }, groupTypeIcon)), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
      padding: "0 0 5px 0",
      fontSize: "13px",
      fontWeight: "400",
      lineHeight: "20px",
      color: this.context.theme.color.helpText,
      className: "item__details__desc"
    }, "".concat(this.props.group.membersCount, " ").concat(_translator.default.translate("MEMBERS", this.context.language)))));
  }
}

// Specifies the default values for props:
exports.CometChatGroupListItem = CometChatGroupListItem;
_defineProperty(CometChatGroupListItem, "contextType", _CometChatContext.CometChatContext);
CometChatGroupListItem.defaultProps = {
  theme: _theme.theme,
  group: {},
  selectedGroup: {},
  clickHandler: () => {}
};
CometChatGroupListItem.propTypes = {
  theme: _propTypes.default.object,
  selectedGroup: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.shape(_chat.CometChat.Group)]),
  group: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.shape(_chat.CometChat.Group)]),
  clickHandler: _propTypes.default.func
};