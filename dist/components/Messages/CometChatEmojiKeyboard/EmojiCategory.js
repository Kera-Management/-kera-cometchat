"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatEmojiCategory = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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