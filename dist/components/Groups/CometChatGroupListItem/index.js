"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatGroupListItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _passwordProtectedGroup = _interopRequireDefault(require("./resources/password-protected-group.svg"));
var _privateGroup = _interopRequireDefault(require("./resources/private-group.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
      groupTypeIcon = (0, _react2.jsx)("i", {
        css: (0, _style.itemIconStyle)(_passwordProtectedGroup.default, this.context),
        title: _translator.default.translate("PRIVATE_GROUP", this.context.language)
      });
    } else if (this.props.group.type === _chat.CometChat.GROUP_TYPE.PASSWORD) {
      groupTypeIcon = (0, _react2.jsx)("i", {
        css: (0, _style.itemIconStyle)(_privateGroup.default, this.context),
        title: _translator.default.translate("PROTECTED_GROUP", this.context.language)
      });
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.listItem)(this.props, this.context),
      className: "list__item",
      onClick: this.clickHandler
    }, (0, _react2.jsx)("div", {
      css: (0, _style.itemThumbnailStyle)(),
      className: "list__item__thumbnail"
    }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
      group: this.props.group
    })), (0, _react2.jsx)("div", {
      css: (0, _style.itemDetailStyle)(),
      className: "list__item__details",
      dir: _translator.default.getDirection(this.context.language)
    }, (0, _react2.jsx)("div", {
      css: (0, _style.itemNameWrapperStyle)(),
      className: "item__details__name",
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, (0, _react2.jsx)("p", {
      css: (0, _style.listItemName)(this.context)
    }, this.props.group.name), (0, _react2.jsx)("div", {
      css: (0, _style.listItemIcon)()
    }, groupTypeIcon)), (0, _react2.jsx)("div", {
      css: (0, _style.itemDescStyle)(this.context),
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