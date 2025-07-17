"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserWithoutAvatar = exports.SelectedUser = exports.OnlineUser = exports.OfflineUser = exports.LongUserName = exports.AwayUser = void 0;
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
  title: 'Users/CometChatUserListItem',
  component: _index.CometChatUserListItem,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    user: {
      control: 'object',
      description: 'User object'
    },
    selectedUser: {
      control: 'object',
      description: 'Currently selected user'
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
  status: 'online',
  role: 'member'
};
const mockUserOffline = {
  uid: 'user456',
  name: 'Jane Smith',
  avatar: 'https://via.placeholder.com/40x40/FF5722/FFFFFF?text=JS',
  status: 'offline',
  role: 'member'
};
const mockUserAway = {
  uid: 'user789',
  name: 'Mike Johnson',
  avatar: '',
  status: 'away',
  role: 'admin'
};
const OnlineUser = exports.OnlineUser = {
  args: {
    user: mockUser,
    selectedUser: null,
    theme: _theme.theme,
    clickHandler: user => console.log('Clicked user:', user)
  }
};
const OfflineUser = exports.OfflineUser = {
  args: {
    user: mockUserOffline,
    selectedUser: null,
    theme: _theme.theme,
    clickHandler: user => console.log('Clicked user:', user)
  }
};
const AwayUser = exports.AwayUser = {
  args: {
    user: mockUserAway,
    selectedUser: null,
    theme: _theme.theme,
    clickHandler: user => console.log('Clicked user:', user)
  }
};
const SelectedUser = exports.SelectedUser = {
  args: {
    user: mockUser,
    selectedUser: mockUser,
    theme: _theme.theme,
    clickHandler: user => console.log('Clicked user:', user)
  }
};
const UserWithoutAvatar = exports.UserWithoutAvatar = {
  args: {
    user: _objectSpread(_objectSpread({}, mockUser), {}, {
      avatar: ''
    }),
    selectedUser: null,
    theme: _theme.theme,
    clickHandler: user => console.log('Clicked user:', user)
  }
};
const LongUserName = exports.LongUserName = {
  args: {
    user: _objectSpread(_objectSpread({}, mockUser), {}, {
      name: 'This is a very long user name that should be truncated'
    }),
    selectedUser: null,
    theme: _theme.theme,
    clickHandler: user => console.log('Clicked user:', user)
  }
};