"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatListItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CometChatListItem = props => {
  let listIcon = null;
  if (props.iconURL) {
    listIcon = /*#__PURE__*/_react.default.createElement("div", {
      style: (0, _style.listItemIconStyle)(props),
      className: "list_item_icon"
    });
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    id: props.id,
    style: (0, _style.listItem)(props),
    className: "list__item",
    onClick: props.onItemClick.bind(void 0)
  }, listIcon, /*#__PURE__*/_react.default.createElement("div", {
    style: (0, _style.listTitle)(props),
    className: "list_text"
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