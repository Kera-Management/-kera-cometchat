"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatBlockedUser = void 0;
require("core-js/modules/es.object.assign.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../util/CometChatContext");
var _CometChatEvent = require("../../../util/CometChatEvent");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    zIndex: "1",
    order: "3",
    position: "relative",
    flex: "none",
    minHeight: "105px",
    width: "100%",
    margin: "auto",
    className: ""
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "20px",
    fontWeight: "700",
    textAlign: "center"
  }, _translator.default.translate("YOU_HAVE_BLOCKED", props.lang) + " " + chatWith.name), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    margin: "16px 0",
    textAlign: "center",
    color: context.theme.color.helpText
  }, _translator.default.translate("NOT_POSSIBLE_TO_SEND_MESSAGES", props.lang))), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    type: "button",
    onClick: unblockUser,
    width: {
      base: "70%",
      sm: "70%",
      md: "50%",
      lg: "30%",
      xl: "20%"
    },
    padding: "8px 16px",
    margin: "0",
    borderRadius: "12px",
    backgroundColor: "".concat(context.theme.primaryColor, "!important"),
    color: context.theme.color.white,
    _hover: {
      backgroundColor: "".concat(context.theme.primaryColor, "!important")
    }
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