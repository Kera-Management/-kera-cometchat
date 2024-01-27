"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatDeleteMessageBubble = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
  if (((_props$message = props.message) === null || _props$message === void 0 || (_props$message = _props$message.sender) === null || _props$message === void 0 ? void 0 : _props$message.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid)) {
    message = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtWrapperStyle)(props, context, loggedInUser),
      className: "message__txt__wrapper"
    }, (0, _react2.jsx)("p", {
      css: (0, _style.messageTxtStyle)(context),
      className: "message__txt"
    }, _translator.default.translate("YOU_DELETED_THIS_MESSAGE", context.language))), (0, _react2.jsx)("div", {
      css: (0, _style.messageInfoWrapperStyle)(props, loggedInUser),
      className: "message__info__wrapper"
    }, (0, _react2.jsx)("span", {
      css: (0, _style.messageTimeStampStyle)(context),
      className: "message__timestamp"
    }, (0, _dateformat.default)(messageDate, "shortTime"))));
  } else {
    let avatar = null,
      name = null;
    if (props.message.receiverType === _chat.CometChat.RECEIVER_TYPE.GROUP) {
      avatar = (0, _react2.jsx)("div", {
        css: (0, _style.messageThumbnailStyle)(),
        className: "message__thumbnail"
      }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
        user: props.message.sender
      }));
      name = (0, _react2.jsx)("div", {
        css: (0, _style.nameWrapperStyle)(props, loggedInUser),
        className: "message__name__wrapper"
      }, (0, _react2.jsx)("span", {
        css: (0, _style.nameStyle)(context),
        className: "message__name"
      }, props.message.sender.name));
    }
    message = (0, _react2.jsx)(_react.default.Fragment, null, avatar, (0, _react2.jsx)("div", {
      css: (0, _style.messageDetailStyle)(props, loggedInUser),
      className: "message__details"
    }, name, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtWrapperStyle)(props, context, loggedInUser),
      className: "message__txt__wrapper"
    }, (0, _react2.jsx)("p", {
      css: (0, _style.messageTxtStyle)(context),
      className: "message__txt"
    }, _translator.default.translate("THIS_MESSAGE_DELETED", context.language))), (0, _react2.jsx)("div", {
      css: (0, _style.messageInfoWrapperStyle)(props, loggedInUser),
      className: "message__info__wrapper"
    }, (0, _react2.jsx)("span", {
      css: (0, _style.messageTimeStampStyle)(context),
      className: "message__timestamp"
    }, (0, _dateformat.default)(messageDate, "shortTime")))));
  }
  return (0, _react2.jsx)("div", {
    css: (0, _style.messageContainerStyle)(props, loggedInUser),
    className: "message__deleted"
  }, (0, _react2.jsx)("div", {
    css: (0, _style.messageWrapperStyle)(props, loggedInUser),
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