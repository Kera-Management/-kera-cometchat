"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WithoutUser = exports.WithCustomImage = exports.SquareAvatar = exports.Default = void 0;
var _react = _interopRequireDefault(require("react"));
var _index = require("./index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  title: 'Shared/CometChatAvatar',
  component: _index.CometChatAvatar,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'Avatar image URL'
    },
    cornerRadius: {
      control: 'text',
      description: 'Border radius for the avatar'
    },
    borderColor: {
      control: 'color',
      description: 'Border color'
    },
    borderWidth: {
      control: 'text',
      description: 'Border width'
    }
  }
};
const mockUser = {
  uid: 'user123',
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=JD'
};
const Default = exports.Default = {
  args: {
    user: mockUser,
    cornerRadius: '50%',
    borderColor: '#ccc',
    borderWidth: '1px'
  }
};
const WithCustomImage = exports.WithCustomImage = {
  args: {
    image: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=CI',
    cornerRadius: '50%',
    borderColor: '#2196F3',
    borderWidth: '2px'
  }
};
const WithoutUser = exports.WithoutUser = {
  args: {
    image: '',
    user: {},
    cornerRadius: '50%',
    borderColor: '#FF5722',
    borderWidth: '1px'
  }
};
const SquareAvatar = exports.SquareAvatar = {
  args: {
    user: mockUser,
    cornerRadius: '8px',
    borderColor: '#9C27B0',
    borderWidth: '2px'
  }
};