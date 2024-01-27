"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConversationListActions = void 0;
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style.js");
var _progress = _interopRequireDefault(require("./resources/progress.svg"));
var _delete = _interopRequireDefault(require("./resources/delete.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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