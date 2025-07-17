"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatDeleteMessageBubble = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CometChatDeleteMessageBubble = props => {
  var _props$message;
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  const [loggedInUser, setLoggedInUser] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    context.getLoggedinUser().then(user => {
      setLoggedInUser(_objectSpread({}, user));
    });
  }, [context]);
  let message = null;
  const messageDate = props.message.sentAt * 1000;
  const isOwnMessage = ((_props$message = props.message) === null || _props$message === void 0 || (_props$message = _props$message.sender) === null || _props$message === void 0 ? void 0 : _props$message.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid);
  if (isOwnMessage) {
    message = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      borderRadius: "12px",
      padding: "8px 12px",
      alignSelf: "flex-end",
      width: "100%",
      backgroundColor: context.theme.backgroundColor.secondary,
      fontStyle: "italic",
      className: "message__txt__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "14px",
      margin: "0",
      lineHeight: "20px",
      color: context.theme.color.helpText,
      className: "message__txt"
    }, _translator.default.translate("YOU_DELETED_THIS_MESSAGE", context.language))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      alignSelf: "flex-end",
      className: "message__info__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "span",
      display: "inline-block",
      fontSize: "11px",
      fontWeight: "500",
      lineHeight: "12px",
      textTransform: "uppercase",
      color: context.theme.color.helpText,
      className: "message__timestamp"
    }, (0, _dateformat.default)(messageDate, "shortTime"))));
  } else {
    let avatar = null,
      name = null;
    const isGroupMessage = props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP;
    if (isGroupMessage) {
      avatar = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        width: "36px",
        height: "36px",
        margin: "12px 0",
        float: "left",
        className: "message__thumbnail"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: props.message.sender
      }));
      name = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        alignSelf: "flex-start",
        padding: "3px 5px",
        className: "message__name__wrapper"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        as: "span",
        fontSize: "10px",
        color: context.theme.color.helpText,
        className: "message__name"
      }, props.message.sender.name));
    }
    message = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, avatar, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flex: "1 1",
      direction: "column",
      position: "relative",
      paddingLeft: isGroupMessage ? "5px" : "0",
      className: "message__details"
    }, name, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      display: "inline-block",
      borderRadius: "12px",
      padding: "8px 12px",
      alignSelf: "flex-start",
      width: "100%",
      backgroundColor: context.theme.backgroundColor.secondary,
      fontStyle: "italic",
      className: "message__txt__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "14px",
      margin: "0",
      lineHeight: "20px",
      color: context.theme.color.helpText,
      className: "message__txt"
    }, _translator.default.translate("THIS_MESSAGE_DELETED", context.language))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      alignSelf: "flex-start",
      className: "message__info__wrapper"
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "span",
      display: "inline-block",
      fontSize: "11px",
      fontWeight: "500",
      lineHeight: "12px",
      textTransform: "uppercase",
      color: context.theme.color.helpText,
      className: "message__timestamp"
    }, (0, _dateformat.default)(messageDate, "shortTime")))));
  }
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    marginBottom: "16px",
    paddingLeft: "16px",
    paddingRight: "16px",
    maxWidth: "65%",
    clear: "both",
    flexShrink: "0",
    alignSelf: isOwnMessage ? "flex-end" : "flex-start",
    className: "message__deleted"
  }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
    flex: "1 1",
    position: "relative",
    width: "100%",
    direction: isOwnMessage ? "column" : "row",
    className: "message__wrapper"
  }, message));
};

// Specifies the default values for props:
exports.CometChatDeleteMessageBubble = CometChatDeleteMessageBubble;
CometChatDeleteMessageBubble.defaultProps = {
  theme: _theme.theme
};
CometChatDeleteMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  message: _propTypes.default.object.isRequired
};