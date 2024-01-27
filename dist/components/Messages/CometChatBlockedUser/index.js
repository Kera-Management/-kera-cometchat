"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBlockedUser = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../util/CometChatContext");
var _CometChatEvent = require("../../../util/CometChatEvent");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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