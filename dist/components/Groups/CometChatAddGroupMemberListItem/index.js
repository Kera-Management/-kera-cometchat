"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAddGroupMemberListItem = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _groupMemberUnselect = _interopRequireDefault(require("./resources/group-member-unselect.svg"));
var _groupMemberSelect = _interopRequireDefault(require("./resources/group-member-select.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  return /*#__PURE__*/React.createElement(_react2.Flex, {
    border: "1px solid ".concat(theme.borderColor.primary),
    width: "100%",
    fontSize: "14px",
    direction: "row",
    justify: "flex-start",
    align: "center",
    sx: {
      "&:not(:last-child)": {
        borderBottom: "none"
      }
    }
  }, /*#__PURE__*/React.createElement(_react2.Flex, {
    className: "userinfo",
    padding: "8px",
    width: "calc(100% - 50px)",
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
    user: props.user
  }), /*#__PURE__*/React.createElement(_Shared.CometChatUserPresence, {
    status: props.user.status
  })), /*#__PURE__*/React.createElement(_react2.Text, {
    className: "name",
    margin: "10px",
    width: "calc(100% - 50px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }, props.user.name)), /*#__PURE__*/React.createElement(_react2.Flex, {
    className: "selection",
    padding: "8px",
    width: "50px",
    justify: "center",
    align: "center"
  }, /*#__PURE__*/React.createElement(_react2.Box, {
    position: "relative"
  }, /*#__PURE__*/React.createElement(_react2.Checkbox, {
    isChecked: checked,
    id: props.user.uid + "sel",
    onChange: handleCheck,
    display: "none",
    sx: {
      " + label": {
        display: "block",
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        width: "100%",
        mask: "url(".concat(_groupMemberUnselect.default, ") center center no-repeat"),
        backgroundColor: theme.secondaryTextColor
      },
      "&:checked + label": {
        width: "100%",
        mask: "url(".concat(_groupMemberSelect.default, ") center center no-repeat"),
        backgroundColor: theme.secondaryTextColor
      }
    }
  }), /*#__PURE__*/React.createElement(_react2.Box, {
    as: "label",
    htmlFor: props.user.uid + "sel"
  }, "\xA0"))));
};

// Specifies the default values for props:
exports.CometChatAddGroupMemberListItem = CometChatAddGroupMemberListItem;
CometChatAddGroupMemberListItem.defaultProps = {
  theme: _theme.theme
};
CometChatAddGroupMemberListItem.propTypes = {
  theme: _propTypes.default.object
};