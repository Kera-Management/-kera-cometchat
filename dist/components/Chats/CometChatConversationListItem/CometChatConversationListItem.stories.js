"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserConversation = exports.SelectedConversation = exports.NoUnreadMessages = exports.LongMessagePreview = exports.GroupConversation = void 0;
var _react = _interopRequireDefault(require("react"));
var _index = require("./index");
var _theme = require("../../../resources/theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports.default = {
  title: 'Chats/CometChatConversationListItem',
  component: _index.CometChatConversationListItem,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    conversation: {
      control: 'object',
      description: 'Conversation object'
    },
    selectedConversation: {
      control: 'object',
      description: 'Currently selected conversation'
    },
    theme: {
      control: 'object',
      description: 'Theme object for styling'
    }
  }
};
const mockUser = {
  uid: 'user123',
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=JD',
  status: 'online'
};
const mockGroup = {
  guid: 'group123',
  name: 'React Developers',
  icon: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=RD',
  type: 'public'
};
const mockConversationUser = {
  conversationId: 'conv_user_123',
  conversationType: 'user',
  conversationWith: mockUser,
  lastMessage: {
    text: 'Hey there! How are you doing?',
    sentAt: Math.floor(Date.now() / 1000) - 300,
    // 5 minutes ago
    sender: mockUser
  },
  unreadMessageCount: 3
};
const mockConversationGroup = {
  conversationId: 'conv_group_123',
  conversationType: 'group',
  conversationWith: mockGroup,
  lastMessage: {
    text: 'Welcome to the React Developers group!',
    sentAt: Math.floor(Date.now() / 1000) - 1800,
    // 30 minutes ago
    sender: {
      name: 'Admin'
    }
  },
  unreadMessageCount: 12
};
const UserConversation = exports.UserConversation = {
  args: {
    conversation: mockConversationUser,
    selectedConversation: null,
    theme: _theme.theme,
    handleClick: conversation => console.log('Clicked conversation:', conversation)
  }
};
const GroupConversation = exports.GroupConversation = {
  args: {
    conversation: mockConversationGroup,
    selectedConversation: null,
    theme: _theme.theme,
    handleClick: conversation => console.log('Clicked conversation:', conversation)
  }
};
const SelectedConversation = exports.SelectedConversation = {
  args: {
    conversation: mockConversationUser,
    selectedConversation: mockConversationUser,
    theme: _theme.theme,
    handleClick: conversation => console.log('Clicked conversation:', conversation)
  }
};
const NoUnreadMessages = exports.NoUnreadMessages = {
  args: {
    conversation: _objectSpread(_objectSpread({}, mockConversationUser), {}, {
      unreadMessageCount: 0
    }),
    selectedConversation: null,
    theme: _theme.theme,
    handleClick: conversation => console.log('Clicked conversation:', conversation)
  }
};
const LongMessagePreview = exports.LongMessagePreview = {
  args: {
    conversation: _objectSpread(_objectSpread({}, mockConversationUser), {}, {
      lastMessage: _objectSpread(_objectSpread({}, mockConversationUser.lastMessage), {}, {
        text: 'This is a very long message that should be truncated with ellipsis when it exceeds the available width in the conversation list item'
      })
    }),
    selectedConversation: null,
    theme: _theme.theme,
    handleClick: conversation => console.log('Clicked conversation:', conversation)
  }
};