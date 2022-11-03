"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatDeleteMessageBubble = void 0;
require("core-js/modules/web.dom.iterable.js");
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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const CometChatDeleteMessageBubble = props => {
  var _props$message, _props$message$sender;
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  const [loggedInUser, setLoggedInUser] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    context.getLoggedinUser().then(user => {
      setLoggedInUser(_objectSpread({}, user));
    });
  }, [context]);
  let message = null;
  const messageDate = props.message.sentAt * 1000;
  if (((_props$message = props.message) === null || _props$message === void 0 ? void 0 : (_props$message$sender = _props$message.sender) === null || _props$message$sender === void 0 ? void 0 : _props$message$sender.uid) === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.uid)) {
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