"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAddGroupMemberListItem = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _groupMemberUnselect = _interopRequireDefault(require("./resources/group-member-unselect.svg"));
var _groupMemberSelect = _interopRequireDefault(require("./resources/group-member-select.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatAddGroupMemberListItem = props => {
  const {
    groupMembers,
    theme
  } = (0, _react.useContext)(_CometChatContext.CometChatContext);
  const [checked, setChecked] = (0, _react.useState)(() => {
    const found = groupMembers.find(member => member.uid === props.user.uid);
    const value = found ? true : false;
    return value;
  });
  const handleCheck = event => {
    const value = checked === true ? false : true;
    setChecked(value);
    props.changed(props.user, value);
  };
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
    css: (0, _style.modalRowStyle)(theme)
  }, (0, _react2.jsx)("div", {
    css: (0, _style.modalColumnStyle)(),
    className: "userinfo",
    onMouseEnter: event => toggleTooltip(event, true),
    onMouseLeave: event => toggleTooltip(event, false)
  }, (0, _react2.jsx)("div", {
    css: (0, _style.avatarStyle)(),
    className: "avatar"
  }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
    user: props.user
  }), (0, _react2.jsx)(_Shared.CometChatUserPresence, {
    status: props.user.status
  })), (0, _react2.jsx)("div", {
    css: (0, _style.nameStyle)(),
    className: "name"
  }, props.user.name)), (0, _react2.jsx)("div", {
    css: (0, _style.selectionColumnStyle)(),
    className: "selection"
  }, (0, _react2.jsx)("input", {
    css: (0, _style.selectionBoxStyle)(_groupMemberUnselect.default, _groupMemberSelect.default, theme),
    type: "checkbox",
    checked: checked,
    id: props.user.uid + "sel",
    onChange: handleCheck
  }), (0, _react2.jsx)("label", {
    htmlFor: props.user.uid + "sel"
  }, "\xA0")));
};

// Specifies the default values for props:
exports.CometChatAddGroupMemberListItem = CometChatAddGroupMemberListItem;
CometChatAddGroupMemberListItem.defaultProps = {
  theme: _theme.theme
};
CometChatAddGroupMemberListItem.propTypes = {
  theme: _propTypes.default.object
};