"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserListItem = void 0;
var _react = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _react2 = require("react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatUserListItem = props => {
  const context = (0, _react2.useContext)(_CometChatContext.CometChatContext);
  let userPresence = (0, _react.jsx)(_Shared.CometChatUserPresence, {
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
  return (0, _react.jsx)("div", {
    css: (0, _style.listItem)(props, context),
    onClick: () => props.clickHandler(props.user),
    className: "list__item"
  }, (0, _react.jsx)("div", {
    css: (0, _style.itemThumbnailStyle)(),
    className: "list__item__thumbnail"
  }, (0, _react.jsx)(_Shared.CometChatAvatar, {
    user: props.user
  }), userPresence), (0, _react.jsx)("div", {
    css: (0, _style.itemDetailStyle)(),
    className: "list__item__details",
    dir: _translator.default.getDirection(context.language)
  }, (0, _react.jsx)("div", {
    css: (0, _style.itemNameStyle)(context),
    className: "item__details__name",
    onMouseEnter: event => toggleTooltip(event, true),
    onMouseLeave: event => toggleTooltip(event, false)
  }, props.user.name), (0, _react.jsx)("div", {
    css: (0, _style.itemDescStyle)(context),
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