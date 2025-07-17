"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatConversationListActions = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _progress = _interopRequireDefault(require("./resources/progress.svg"));
var _delete = _interopRequireDefault(require("./resources/delete.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    const backgroundImage = this.state.deleteInProgress ? _progress.default : _delete.default;
    const deleteConversation = /*#__PURE__*/_react.default.createElement(_react2.ListItem, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
      variant: "unstyled",
      height: "24px",
      width: "24px",
      borderRadius: "4px",
      className: "group__button button__delete",
      "data-title": _translator.default.translate("DELETE", this.context.language),
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false),
      onClick: this.deleteConversation,
      sx: {
        background: "url(".concat(backgroundImage, ") center center no-repeat")
      }
    }));
    return /*#__PURE__*/_react.default.createElement(_react2.List, {
      display: "flex",
      listStyleType: "none",
      padding: "8px",
      margin: "0",
      width: "72px",
      backgroundColor: this.context.theme.backgroundColor.primary,
      borderRadius: "4px",
      alignItems: "center",
      justifyContent: "flex-end",
      position: "absolute",
      right: "16px",
      height: "100%",
      className: "list__item__actions"
    }, deleteConversation);
  }
}
exports.CometChatConversationListActions = CometChatConversationListActions;
_defineProperty(CometChatConversationListActions, "contextType", _CometChatContext.CometChatContext);