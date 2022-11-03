"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatEmojiCategory = void 0;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * @class CometChatEmojiCategory
 * @description CometChatEmojiCategory class is used for defining the category.
 * @param {String} id
 * @param {String} name
 * @param {String} symbol
 * @param {Object} emojis
 */
class CometChatEmojiCategory {
  constructor(_ref) {
    let {
      id,
      name,
      emojis,
      symbol
    } = _ref;
    _defineProperty(this, "id", "");
    _defineProperty(this, "name", "");
    _defineProperty(this, "symbol", "");
    _defineProperty(this, "emojis", {});
    this.id = id;
    this.name = name;
    this.emojis = emojis;
    this.symbol = symbol;
  }
}
exports.CometChatEmojiCategory = CometChatEmojiCategory;