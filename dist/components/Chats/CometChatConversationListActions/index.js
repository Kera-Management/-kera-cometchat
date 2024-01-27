"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConversationListActions = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style.js");
var _progress = _interopRequireDefault(require("./resources/progress.svg"));
var _delete = _interopRequireDefault(require("./resources/delete.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatConversationListActions extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "toggleTooltip", (event, flag) => {
      const elem = event.target;
      if (flag) {
        elem.setAttribute("title", elem.dataset.title);
      } else {
        elem.removeAttribute("title");
      }
    });
    _defineProperty(this, "deleteConversation", event => {
      this.props.actionGenerated(enums.ACTIONS["DELETE_CONVERSATION"], this.props.conversation);
      event.stopPropagation();
    });
    this._isMounted = false;
    this.state = {
      deleteInProgress: false
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const deleteConversation = (0, _react2.jsx)("li", null, (0, _react2.jsx)("button", {
      type: "button",
      css: (0, _style.groupButtonStyle)(this.state.deleteInProgress, _progress.default, _delete.default),
      className: "group__button button__delete",
      "data-title": _translator.default.translate("DELETE", this.context.language),
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false),
      onClick: this.deleteConversation
    }));
    return (0, _react2.jsx)("ul", {
      css: (0, _style.conversationActionStyle)(this.context),
      className: "list__item__actions"
    }, deleteConversation);
  }
}
exports.CometChatConversationListActions = CometChatConversationListActions;
_defineProperty(CometChatConversationListActions, "contextType", _CometChatContext.CometChatContext);