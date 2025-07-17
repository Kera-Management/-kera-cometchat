"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatThreadedMessageReplyCount = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatThreadedMessageReplyCount = props => {
  const context = _react.default.useContext(_CometChatContext.CometChatContext);
  const [reply, setReply] = _react.default.useState(false);
  const toggleReply = () => {
    context.FeatureRestriction.isThreadedMessagesEnabled().then(response => {
      if (response !== reply) {
        setReply(response);
      }
    }).catch(error => {
      if (reply !== false) {
        setReply(false);
      }
    });
  };
  _react.default.useEffect(toggleReply);
  const viewThread = () => {
    props.actionGenerated(enums.ACTIONS["VIEW_THREADED_MESSAGE"], props.message);
  };
  const replyCount = props.message.replyCount;
  const replyText = replyCount === 1 ? "".concat(replyCount, " ").concat(_translator.default.translate("REPLY", context.language)) : "".concat(replyCount, " ").concat(_translator.default.translate("REPLIES", context.language));
  let replies = /*#__PURE__*/_react.default.createElement(_react2.Text, {
    as: "span",
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "500",
    lineHeight: "12px",
    textTransform: "lowercase",
    padding: "0 10px",
    cursor: "pointer",
    color: context.theme.color.blue,
    _hover: {
      textDecoration: "underline"
    },
    className: "replycount",
    onClick: viewThread
  }, replyText);
  if (props.message.hasOwnProperty("replyCount") === false) {
    replies = null;
  }

  //if threadedchats feature is disabled
  if (reply === false) {
    replies = null;
  }
  return replies;
};

// Specifies the default values for props:
exports.CometChatThreadedMessageReplyCount = CometChatThreadedMessageReplyCount;
CometChatThreadedMessageReplyCount.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatThreadedMessageReplyCount.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};