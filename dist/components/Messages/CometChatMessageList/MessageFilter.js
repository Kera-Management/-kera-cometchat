"use strict";

require("core-js/modules/es6.symbol.js");
require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _chat = require("@cometchat-pro/chat");
var enums = _interopRequireWildcard(require("../../../util/enums"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
var _default = MessageFilter;
exports.default = _default;