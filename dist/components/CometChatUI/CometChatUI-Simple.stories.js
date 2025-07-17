"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UIComponentsOnly = exports.MobileView = exports.LoadingState = exports.ErrorState = exports.DarkModeUI = void 0;
require("core-js/modules/es.promise.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _index = require("./index");
var _CometChatContext = require("../../util/CometChatContext");
var _theme = require("../../resources/theme");
const _excluded = ["children"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _default = exports.default = {
  title: 'Complete/CometChatUI-Simple',
  component: _index.CometChatUI,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'CometChat UI component with mock context for testing UI components without CometChat initialization.'
      }
    }
  },
  argTypes: {
    chatWithUser: {
      control: 'text',
      description: 'User ID to start a chat with'
    },
    receiverId: {
      control: 'text',
      description: 'Receiver ID for the chat'
    }
  }
}; // Enhanced mock context for better component testing
const mockCometChatContext = {
  theme: _theme.theme,
  language: 'en',
  UIKitSettings: {
    tabs: ['SIDEBAR_CHATS', 'SIDEBAR_USERS', 'SIDEBAR_GROUPS'],
    showUserPresence: true,
    showUnreadCount: true,
    enableSoundOnMessage: true,
    enableDeleteMessage: true,
    enableEditMessage: true,
    enableReplyToMessage: true
  },
  FeatureRestriction: {
    isUnreadCountEnabled: () => Promise.resolve(true),
    isUserPresenceEnabled: () => Promise.resolve(true),
    isHideDeletedMessagesEnabled: () => Promise.resolve(false),
    isUserListEnabled: () => Promise.resolve(true),
    isGroupListEnabled: () => Promise.resolve(true),
    isChatListEnabled: () => Promise.resolve(true),
    isMessageEnabled: () => Promise.resolve(true),
    isFileUploadEnabled: () => Promise.resolve(true),
    isEmojiEnabled: () => Promise.resolve(true),
    isThreadedMessagesEnabled: () => Promise.resolve(true),
    isCallEnabled: () => Promise.resolve(true)
  },
  getLoggedinUser: () => Promise.resolve({
    uid: 'storybook-user',
    name: 'Storybook User',
    avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=SB',
    status: 'online'
  }),
  // Mock methods that might be called by the UI
  getRoles: () => Promise.resolve([]),
  getUsers: () => Promise.resolve([{
    uid: 'user-1',
    name: 'Alice Johnson',
    avatar: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=AJ',
    status: 'online'
  }, {
    uid: 'user-2',
    name: 'Bob Smith',
    avatar: 'https://via.placeholder.com/40x40/FF9800/FFFFFF?text=BS',
    status: 'away'
  }]),
  getGroups: () => Promise.resolve([{
    guid: 'group-1',
    name: 'React Developers',
    icon: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=RD',
    type: 'public',
    membersCount: 150
  }]),
  getConversations: () => Promise.resolve([])
};

// Simple wrapper that provides mock context
const SimpleCometChatWrapper = _ref => {
  let {
      children
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContext.Provider, {
    value: mockCometChatContext
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    height: "80vh",
    width: "100%",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "md"
  }, /*#__PURE__*/_react.default.createElement(_index.CometChatUI, props)));
};

// Default story - UI testing without real CometChat
const UIComponentsOnly = exports.UIComponentsOnly = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2
  }, "CometChat UI - Component Testing"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "sm"
  }, "This story shows the CometChat UI components with mock data for testing layouts and styling. No real CometChat connection is required.")), /*#__PURE__*/_react.default.createElement(SimpleCometChatWrapper, args))),
  args: {
    chatWithUser: 'user-1',
    receiverId: 'user-1'
  }
};

// Dark mode testing
const DarkModeUI = exports.DarkModeUI = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4,
    bg: "gray.900",
    minHeight: "100vh"
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2,
    color: "white"
  }, "CometChat UI - Dark Mode Test"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.300",
    fontSize: "sm"
  }, "Testing the UI components in a dark theme environment.")), /*#__PURE__*/_react.default.createElement(SimpleCometChatWrapper, args))),
  args: {
    chatWithUser: 'user-2',
    receiverId: 'user-2'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
};

// Mobile responsive testing
const MobileView = exports.MobileView = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.Box, {
    maxWidth: "375px",
    mx: "auto",
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 2,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "sm",
    mb: 1
  }, "Mobile Chat View"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "xs"
  }, "Testing mobile responsiveness")), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    height: "60vh",
    width: "100%",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "md"
  }, /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContext.Provider, {
    value: mockCometChatContext
  }, /*#__PURE__*/_react.default.createElement(_index.CometChatUI, args))))),
  args: {
    chatWithUser: 'user-1',
    receiverId: 'user-1'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Error state testing
const ErrorState = exports.ErrorState = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2
  }, "Error State Testing"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "sm"
  }, "This demonstrates how the UI handles error states.")), /*#__PURE__*/_react.default.createElement(_react2.Alert, {
    status: "error",
    borderRadius: "md"
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertIcon, null), /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    align: "start",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "sm"
  }, "CometChat Connection Error"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "sm"
  }, "Failed to connect to CometChat servers. This is expected in Storybook."), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "xs",
    color: "gray.600"
  }, "Use the full CometChatUI story for actual functionality testing."))))),
  args: {
    chatWithUser: 'invalid-user',
    receiverId: 'invalid-user'
  }
};

// Loading state testing  
const LoadingState = exports.LoadingState = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2
  }, "Loading State Testing"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "sm"
  }, "This shows various loading states within the CometChat UI.")), /*#__PURE__*/_react.default.createElement(SimpleCometChatWrapper, args))),
  args: {
    chatWithUser: 'loading-user',
    receiverId: 'loading-user'
  }
};