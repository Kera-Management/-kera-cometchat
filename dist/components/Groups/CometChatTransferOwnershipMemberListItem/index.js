"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatTransferOwnershipMemberListItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _CometChatContext = require("../../../util/CometChatContext");
var _Shared = require("../../Shared");
var _style = require("./style");
var _groupMemberUnselect = _interopRequireDefault(require("./resources/group-member-unselect.svg"));
var _groupMemberSelect = _interopRequireDefault(require("./resources/group-member-select.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    return (0, _react2.jsx)("div", {
      css: (0, _style.modalRowStyle)(this.props, this.context)
    }, (0, _react2.jsx)("div", {
      css: (0, _style.modalColumnStyle)(this.context),
      className: "memberinfo",
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, (0, _react2.jsx)("div", {
      css: (0, _style.avatarStyle)(),
      className: "avatar"
    }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
      user: this.props.member
    }), (0, _react2.jsx)(_Shared.CometChatUserPresence, {
      status: this.props.member.status
    })), (0, _react2.jsx)("div", {
      css: (0, _style.nameStyle)(),
      className: "name"
    }, this.props.member.name)), (0, _react2.jsx)("div", {
      css: (0, _style.selectionColumnStyle)(this.context),
      className: "selection"
    }, (0, _react2.jsx)("span", null, this.context.roles[this.props.member.scope]), (0, _react2.jsx)("input", {
      css: (0, _style.selectionBoxStyle)(_groupMemberUnselect.default, _groupMemberSelect.default, this.context),
      type: "radio",
      name: "transferOwnership",
      checked: this.state.checked,
      id: this.props.member.uid + "sel",
      onChange: this.handleCheck
    }), (0, _react2.jsx)("label", {
      htmlFor: this.props.member.uid + "sel"
    }, "\xA0")));
  }
}
exports.CometChatTransferOwnershipMemberListItem = CometChatTransferOwnershipMemberListItem;
_defineProperty(CometChatTransferOwnershipMemberListItem, "contextType", _CometChatContext.CometChatContext);