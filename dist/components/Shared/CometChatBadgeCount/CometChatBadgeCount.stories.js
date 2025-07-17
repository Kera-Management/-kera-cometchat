"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SingleDigit = exports.NoCount = exports.HighCount = exports.Default = exports.CustomStyling = void 0;
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
  title: 'Shared/CometChatBadgeCount',
  component: _index.CometChatBadgeCount,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    count: {
      control: 'number',
      description: 'Number to display in the badge'
    },
    theme: {
      control: 'object',
      description: 'Theme object for styling'
    }
  }
};
const defaultTheme = _objectSpread({}, _theme.theme);
const Default = exports.Default = {
  args: {
    count: 5,
    theme: defaultTheme
  }
};
const HighCount = exports.HighCount = {
  args: {
    count: 99,
    theme: defaultTheme
  }
};
const SingleDigit = exports.SingleDigit = {
  args: {
    count: 1,
    theme: defaultTheme
  }
};
const CustomStyling = exports.CustomStyling = {
  args: {
    count: 23,
    theme: _objectSpread(_objectSpread({}, defaultTheme), {}, {
      primaryColor: '#9c27b0'
    })
  }
};
const NoCount = exports.NoCount = {
  args: {
    count: 0,
    theme: defaultTheme
  }
};