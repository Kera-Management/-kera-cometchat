"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatTransferOwnershipMemberListItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _CometChatContext = require("../../../util/CometChatContext");
var _Shared = require("../../Shared");
var _groupMemberUnselect = _interopRequireDefault(require("./resources/group-member-unselect.svg"));
var _groupMemberSelect = _interopRequireDefault(require("./resources/group-member-select.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatTransferOwnershipMemberListItem extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "handleCheck", e => {
      this.setState(this.toggleSelectedState);
      this.props.checked(this.props.member);
    });
    _defineProperty(this, "toggleSelectedState", state => {
      return {
        isSelected: !state.isSelected
      };
    });
    _defineProperty(this, "toggleTooltip", (event, flag) => {
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
    });
    this.state = {
      isSelected: false
    };
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      width: "100%",
      fontSize: "14px",
      padding: "8px",
      direction: "row",
      justify: "flex-start",
      align: "center",
      borderLeft: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderRight: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary)
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "memberinfo",
      width: {
        base: "calc(100% - 120px)",
        sm: "calc(100% - 140px)",
        md: "calc(100% - 180px)",
        lg: "calc(100% - 180px)"
      },
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "avatar",
      display: "inline-block",
      float: "left",
      width: "36px",
      height: "36px",
      marginRight: "8px"
    }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
      user: this.props.member
    }), /*#__PURE__*/_react.default.createElement(_Shared.CometChatUserPresence, {
      status: this.props.member.status
    })), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      className: "name",
      margin: "10px",
      width: "calc(100% - 50px)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, this.props.member.name)), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "selection",
      width: {
        base: "120px",
        sm: "140px",
        md: "180px",
        lg: "180px"
      },
      justify: "flex-start",
      align: "center"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "12px",
      display: "block",
      paddingRight: "8px"
    }, this.context.roles[this.props.member.scope]), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      position: "relative"
    }, /*#__PURE__*/_react.default.createElement(_react2.Radio, {
      isChecked: this.state.checked,
      name: "transferOwnership",
      id: this.props.member.uid + "sel",
      onChange: this.handleCheck,
      display: "none",
      sx: {
        " + label": {
          display: "block",
          cursor: "pointer",
          mask: "url(".concat(_groupMemberUnselect.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.secondaryTextColor,
          userSelect: "none",
          padding: "8px"
        },
        "&:checked + label": {
          mask: "url(".concat(_groupMemberSelect.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.secondaryTextColor,
          padding: "8px"
        }
      }
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      as: "label",
      htmlFor: this.props.member.uid + "sel"
    }, "\xA0"))));
  }
}
exports.CometChatTransferOwnershipMemberListItem = CometChatTransferOwnershipMemberListItem;
_defineProperty(CometChatTransferOwnershipMemberListItem, "contextType", _CometChatContext.CometChatContext);