"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.promise.js");
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class MessageFilter {
  constructor(context) {
    _defineProperty(this, "categories", {});
    _defineProperty(this, "types", null);
    _defineProperty(this, "context", void 0);
    _defineProperty(this, "getCategories", () => {
      const categories = _objectSpread({}, this.categories);
      return new Promise(resolve => {
        this.context.FeatureRestriction.isGroupActionMessagesEnabled().then(response => {
          if (response === false) {
            delete categories[_chat.CometChat.CATEGORY_ACTION];
          }
          return categories;
        }).catch(error => {
          delete categories[_chat.CometChat.CATEGORY_ACTION];
          return categories;
        }).then(categories => {
          this.context.FeatureRestriction.isCallActionMessagesEnabled().then(response => {
            if (response === false) {
              delete categories[_chat.CometChat.CATEGORY_CALL];
            }
            resolve(categories);
          }).catch(error => {
            delete categories[_chat.CometChat.CATEGORY_CALL];
            resolve(categories);
          });
        });
      });
    });
    _defineProperty(this, "getTypes", () => {
      const types = _objectSpread({}, this.types);
      return new Promise(resolve => resolve(types));
    });
    this.context = context;
    this.categories = {
      [_chat.CometChat.CATEGORY_MESSAGE]: _chat.CometChat.CATEGORY_MESSAGE,
      [_chat.CometChat.CATEGORY_CUSTOM]: _chat.CometChat.CATEGORY_CUSTOM,
      [_chat.CometChat.CATEGORY_ACTION]: _chat.CometChat.CATEGORY_ACTION,
      [_chat.CometChat.CATEGORY_CALL]: _chat.CometChat.CATEGORY_CALL
    };
    this.types = {
      [_chat.CometChat.MESSAGE_TYPE.TEXT]: _chat.CometChat.MESSAGE_TYPE.TEXT,
      [_chat.CometChat.MESSAGE_TYPE.IMAGE]: _chat.CometChat.MESSAGE_TYPE.IMAGE,
      [_chat.CometChat.MESSAGE_TYPE.VIDEO]: _chat.CometChat.MESSAGE_TYPE.VIDEO,
      [_chat.CometChat.MESSAGE_TYPE.AUDIO]: _chat.CometChat.MESSAGE_TYPE.AUDIO,
      [_chat.CometChat.MESSAGE_TYPE.FILE]: _chat.CometChat.MESSAGE_TYPE.FILE,
      [enums.CUSTOM_TYPE_POLL]: enums.CUSTOM_TYPE_POLL,
      [enums.CUSTOM_TYPE_STICKER]: enums.CUSTOM_TYPE_STICKER,
      [enums.CUSTOM_TYPE_DOCUMENT]: enums.CUSTOM_TYPE_DOCUMENT,
      [enums.CUSTOM_TYPE_WHITEBOARD]: enums.CUSTOM_TYPE_WHITEBOARD,
      [enums.CUSTOM_TYPE_MEETING]: enums.CUSTOM_TYPE_MEETING,
      [_chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER]: _chat.CometChat.ACTION_TYPE.TYPE_GROUP_MEMBER,
      [_chat.CometChat.CALL_TYPE.AUDIO]: _chat.CometChat.CALL_TYPE.AUDIO,
      [_chat.CometChat.CALL_TYPE.VIDEO]: _chat.CometChat.CALL_TYPE.VIDEO
    };
  }
}
var _default = exports.default = MessageFilter;