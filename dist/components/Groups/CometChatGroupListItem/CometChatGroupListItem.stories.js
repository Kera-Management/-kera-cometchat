"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectedGroup = exports.PublicGroup = exports.PrivateGroup = exports.PasswordGroup = exports.LongGroupName = exports.GroupWithoutIcon = void 0;
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
  title: 'Groups/CometChatGroupListItem',
  component: _index.CometChatGroupListItem,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    group: {
      control: 'object',
      description: 'Group object'
    },
    selectedGroup: {
      control: 'object',
      description: 'Currently selected group'
    },
    theme: {
      control: 'object',
      description: 'Theme object for styling'
    }
  }
};
const mockGroup = {
  guid: 'group123',
  name: 'React Developers',
  icon: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=RD',
  type: 'public',
  membersCount: 150,
  owner: 'admin123',
  description: 'A group for React developers to share knowledge and tips'
};
const mockPrivateGroup = {
  guid: 'group456',
  name: 'Private Team',
  icon: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=PT',
  type: 'private',
  membersCount: 12,
  owner: 'admin456',
  description: 'Private team discussion group'
};
const mockPasswordGroup = {
  guid: 'group789',
  name: 'Secure Group',
  icon: '',
  type: 'password',
  membersCount: 25,
  owner: 'admin789',
  description: 'Password protected group for sensitive discussions'
};
const PublicGroup = exports.PublicGroup = {
  args: {
    group: mockGroup,
    selectedGroup: null,
    theme: _theme.theme,
    clickHandler: group => console.log('Clicked group:', group)
  }
};
const PrivateGroup = exports.PrivateGroup = {
  args: {
    group: mockPrivateGroup,
    selectedGroup: null,
    theme: _theme.theme,
    clickHandler: group => console.log('Clicked group:', group)
  }
};
const PasswordGroup = exports.PasswordGroup = {
  args: {
    group: mockPasswordGroup,
    selectedGroup: null,
    theme: _theme.theme,
    clickHandler: group => console.log('Clicked group:', group)
  }
};
const SelectedGroup = exports.SelectedGroup = {
  args: {
    group: mockGroup,
    selectedGroup: mockGroup,
    theme: _theme.theme,
    clickHandler: group => console.log('Clicked group:', group)
  }
};
const GroupWithoutIcon = exports.GroupWithoutIcon = {
  args: {
    group: _objectSpread(_objectSpread({}, mockGroup), {}, {
      icon: ''
    }),
    selectedGroup: null,
    theme: _theme.theme,
    clickHandler: group => console.log('Clicked group:', group)
  }
};
const LongGroupName = exports.LongGroupName = {
  args: {
    group: _objectSpread(_objectSpread({}, mockGroup), {}, {
      name: 'This is a very long group name that should be truncated when it exceeds the available space'
    }),
    selectedGroup: null,
    theme: _theme.theme,
    clickHandler: group => console.log('Clicked group:', group)
  }
};