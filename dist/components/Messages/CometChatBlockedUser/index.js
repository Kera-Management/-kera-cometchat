"use strict";

require("core-js/modules/es6.symbol.js");
require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBlockedUser = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../util/CometChatContext");
var _CometChatEvent = require("../../../util/CometChatEvent");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const CometChatBlockedUser = props => {
  const context = _react.default.useContext(_CometChatContext.CometChatContext);
  const chatWith = _objectSpread({}, context.item);
  const unblockUser = () => {
    let uid = chatWith.uid;
    _chat.CometChat.unblockUsers([uid]).then(response => {
      if (response && response.hasOwnProperty(uid) && response[uid].hasOwnProperty("success") && response[uid]["success"] === true) {
        const newType = _chat.CometChat.ACTION_TYPE.TYPE_USER;
        const newItem = Object.assign({}, chatWith, {
          blockedByMe: false
        });
        context.setTypeAndItem(newType, newItem);
      } else {
        _CometChatEvent.CometChatEvent.triggerHandler(enums.ACTIONS["ERROR"], "SOMETHING_WRONG");
      }
    }).catch(error => _CometChatEvent.CometChatEvent.triggerHandler(enums.ACTIONS["ERROR"], "SOMETHING_WRONG"));
  };
  return (0, _react2.jsx)("div", {
    css: (0, _style.blockedMessageWrapperStyle)(),
    className: ""
  }, (0, _react2.jsx)("div", {
    css: (0, _style.blockedMessageContainerStyle)()
  }, (0, _react2.jsx)("div", {
    css: (0, _style.blockedTitleStyle)()
  }, _translator.default.translate("YOU_HAVE_BLOCKED", props.lang) + " " + chatWith.name), (0, _react2.jsx)("div", {
    css: (0, _style.bockedSubTitleStyle)(context)
  }, _translator.default.translate("NOT_POSSIBLE_TO_SEND_MESSAGES", props.lang))), (0, _react2.jsx)("button", {
    type: "button",
    css: (0, _style.unblockButtonStyle)(context),
    onClick: unblockUser
  }, _translator.default.translate("UNBLOCK", props.lang)));
};

// Specifies the default values for props:
exports.CometChatBlockedUser = CometChatBlockedUser;
CometChatBlockedUser.defaultProps = {
  lang: _translator.default.getDefaultLanguage()
};
CometChatBlockedUser.propTypes = {
  lang: _propTypes.default.string
};