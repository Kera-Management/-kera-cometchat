"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatEmoji = void 0;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * @class CometChatEmoji
 * @description CometChatEmoji class is used for defining the emoji.
 *
 * @param {String} char
 * @param {Array} keywords
 */
class CometChatEmoji {
  constructor(_ref) {
    let {
      char,
      keywords
    } = _ref;
    _defineProperty(this, "char", "");
    _defineProperty(this, "keywords", []);
    this.char = char;
    this.keywords = keywords;
  }
}
exports.CometChatEmoji = CometChatEmoji;