"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatListItem = void 0;
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CometChatListItem = props => {
  let listIcon = null;
  if (props.iconURL) {
    listIcon = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "list_item_icon",
      marginLeft: "0px",
      width: "24px",
      height: "24px",
      sx: {
        WebkitMask: "url(".concat(props.iconURL, ") center center no-repeat"),
        backgroundColor: props.style.iconBackground,
        transform: props.style.iconTransform,
        color: props.style.iconTint
      }
    });
  }
  return /*#__PURE__*/_react.default.createElement(_react2.Flex, _extends({
    id: props.id,
    className: "list__item",
    onClick: props.onItemClick.bind(void 0),
    cursor: "pointer",
    align: "center",
    width: props.style.width,
    height: props.style.height,
    borderRadius: props.style.borderRadius,
    border: props.style.border,
    background: props.style.background
  }, props.style), listIcon, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    className: "list_text",
    margin: "0 6px",
    background: "transparent",
    textTransform: "capitalize",
    font: props.style.textFont,
    color: props.style.textColor,
    wordBreak: "break-word"
  }, props.text), props.tail);
};
exports.CometChatListItem = CometChatListItem;
CometChatListItem.defaultProps = {
  id: "",
  text: "",
  tail: "",
  iconURL: "",
  style: {
    width: "",
    height: "",
    iconTint: "red",
    borderRadius: "8px",
    iconBackground: "white",
    textColor: "rgb(51,153,255)",
    border: "1px solid #141414",
    background: "rgba(255,255,255, 0.6)",
    textFont: "600 15px Inter, sans-serif"
  },
  onItemClick: () => {}
};
CometChatListItem.propTypes = {
  id: _propTypes.default.string,
  text: _propTypes.default.string,
  tail: _propTypes.default.string,
  iconURL: _propTypes.default.string,
  style: _propTypes.default.object,
  onItemClick: _propTypes.default.func
};