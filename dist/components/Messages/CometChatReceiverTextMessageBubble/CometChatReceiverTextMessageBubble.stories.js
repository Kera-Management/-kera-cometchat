"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WithEmojis = exports.ShortMessage = exports.NoAvatar = exports.LongMessage = exports.Default = void 0;
var _react = _interopRequireDefault(require("react"));
var _index = require("./index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports.default = {
  title: 'Messages/CometChatReceiverTextMessageBubble',
  component: _index.CometChatReceiverTextMessageBubble,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    messageText: {
      control: 'text',
      description: 'The text content of the message'
    }
  }
};
const mockMessage = {
  id: '1',
  text: 'Hello! How are you doing today?',
  sender: {
    uid: 'sender123',
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/32x32/E91E63/FFFFFF?text=JS'
  },
  sentAt: Math.floor(Date.now() / 1000),
  readAt: Math.floor(Date.now() / 1000),
  type: 'text'
};
const Default = exports.Default = {
  args: {
    message: mockMessage,
    messageText: mockMessage.text
  }
};
const LongMessage = exports.LongMessage = {
  args: {
    message: _objectSpread(_objectSpread({}, mockMessage), {}, {
      text: 'This is a much longer message that should wrap to multiple lines. It contains quite a bit of text to demonstrate how the message bubble handles longer content and text wrapping.'
    }),
    messageText: 'This is a much longer message that should wrap to multiple lines. It contains quite a bit of text to demonstrate how the message bubble handles longer content and text wrapping.'
  }
};
const ShortMessage = exports.ShortMessage = {
  args: {
    message: _objectSpread(_objectSpread({}, mockMessage), {}, {
      text: 'Hi!'
    }),
    messageText: 'Hi!'
  }
};
const WithEmojis = exports.WithEmojis = {
  args: {
    message: _objectSpread(_objectSpread({}, mockMessage), {}, {
      text: 'Great job! 🎉👏 Looking forward to it! 😊'
    }),
    messageText: 'Great job! 🎉👏 Looking forward to it! 😊'
  }
};
const NoAvatar = exports.NoAvatar = {
  args: {
    message: _objectSpread(_objectSpread({}, mockMessage), {}, {
      sender: {
        uid: 'sender456',
        name: 'Anonymous User'
      },
      text: 'Message from user without avatar'
    }),
    messageText: 'Message from user without avatar'
  }
};