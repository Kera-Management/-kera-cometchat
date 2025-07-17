"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResponsiveChat = exports.GroupChatDemo = exports.FullScreenChat = exports.DefaultChat = exports.ChatWithCarol = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _index = require("./index");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Create a Chakra system for this story
const system = (0, _react2.createSystem)(_react2.defaultConfig);

// CometChat configuration
const COMETCHAT_APP_ID = '2239445ea0c555e0';
const COMETCHAT_AUTH_KEY = 'a69de2a3d59932e8e998b048c1319bcdf546982c';
var _default = exports.default = {
  title: 'Complete/CometChatUI',
  component: _index.CometChatUI,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete CometChat UI component with initialization and authentication. This story demonstrates the full chat experience.'
      }
    }
  },
  argTypes: {
    chatWithUser: {
      control: 'text',
      description: 'User ID to start a chat with',
      defaultValue: 'test-user-2'
    },
    receiverId: {
      control: 'text',
      description: 'Receiver ID for the chat',
      defaultValue: 'test-user-2'
    }
  }
}; // Mock users for demonstration
const mockUsers = [{
  uid: 'test-user-1',
  name: 'Alice Johnson',
  avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=AJ',
  status: 'online'
}, {
  uid: 'test-user-2',
  name: 'Bob Smith',
  avatar: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=BS',
  status: 'online'
}, {
  uid: 'test-user-3',
  name: 'Carol Davis',
  avatar: 'https://via.placeholder.com/40x40/FF9800/FFFFFF?text=CD',
  status: 'away'
}];

// CometChat initialization and login wrapper component
const CometChatWrapper = _ref => {
  let {
    chatWithUser,
    receiverId
  } = _ref;
  const [isInitialized, setIsInitialized] = (0, _react.useState)(false);
  const [isLoggedIn, setIsLoggedIn] = (0, _react.useState)(false);
  const [currentUser, setCurrentUser] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);

  // Initialize CometChat
  const initializeChat = (0, _react.useCallback)(async () => {
    try {
      if (window.CometChat) {
        console.log('CometChat already available');
        return true;
      }

      // Make CometChat globally available
      window.CometChat = _chat.CometChat;
      const appSetting = new _chat.CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('US').build();
      const initialized = await _chat.CometChat.init(COMETCHAT_APP_ID, appSetting);
      console.log('CometChat initialized:', initialized);
      setIsInitialized(true);
      return true;
    } catch (err) {
      console.error('CometChat initialization failed:', err);
      setError('Failed to initialize CometChat: ' + err.message);
      return false;
    }
  }, []);

  // Create mock users if they don't exist
  const createMockUsers = (0, _react.useCallback)(async () => {
    try {
      for (const userData of mockUsers) {
        try {
          const user = new _chat.CometChat.User(userData.uid);
          user.setName(userData.name);
          user.setAvatar(userData.avatar);
          await _chat.CometChat.createUser(user, COMETCHAT_AUTH_KEY);
          console.log("Created user: ".concat(userData.name));
        } catch (err) {
          // User might already exist, which is fine
          if (err.code !== 'ERR_UID_ALREADY_EXISTS') {
            console.warn("Failed to create user ".concat(userData.name, ":"), err);
          }
        }
      }
    } catch (err) {
      console.warn('Error creating mock users:', err);
    }
  }, []);

  // Login user
  const loginUser = (0, _react.useCallback)(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const isInit = await initializeChat();
      if (!isInit) {
        throw new Error('CometChat initialization failed');
      }

      // Create mock users first
      await createMockUsers();

      // Login as the first mock user
      const loggedInUser = await _chat.CometChat.login('test-user-1', COMETCHAT_AUTH_KEY);
      console.log('Logged in user:', loggedInUser);
      setCurrentUser(loggedInUser);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed: ' + err.message);
      setIsLoading(false);
    }
  }, [initializeChat, createMockUsers]);
  (0, _react.useEffect)(() => {
    loginUser();
  }, [loginUser]);
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      spacing: 4,
      justify: "center",
      align: "center",
      height: "400px"
    }, /*#__PURE__*/_react.default.createElement(_react2.Spinner, {
      size: "xl",
      color: "blue.500"
    }), /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      size: "md"
    }, "Initializing CometChat..."), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      color: "gray.600"
    }, "Setting up chat environment and logging in user"));
  }
  if (error) {
    return /*#__PURE__*/_react.default.createElement(_react2.Alert, {
      status: "error",
      borderRadius: "md"
    }, /*#__PURE__*/_react.default.createElement(_react2.AlertIcon, null), /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      align: "start",
      spacing: 2
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      size: "sm"
    }, "Failed to Initialize CometChat"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "sm"
    }, error), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "xs",
      color: "gray.600"
    }, "This might be due to network issues or CometChat service availability.")));
  }
  if (!isLoggedIn || !currentUser) {
    return /*#__PURE__*/_react.default.createElement(_react2.Alert, {
      status: "warning",
      borderRadius: "md"
    }, /*#__PURE__*/_react.default.createElement(_react2.AlertIcon, null), /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      align: "start",
      spacing: 2
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      size: "sm"
    }, "Authentication Required"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "sm"
    }, "Please wait while we log you in...")));
  }
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    height: "80vh",
    width: "100%",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "md"
  }, /*#__PURE__*/_react.default.createElement(_index.CometChatUI, {
    chatWithUser: chatWithUser,
    receiverId: receiverId
  }));
};

// Default story - Chat with Bob Smith
const DefaultChat = exports.DefaultChat = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.ChakraProvider, {
    value: system
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2
  }, "CometChat UI - Complete Chat Experience"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "sm"
  }, "This story demonstrates the full CometChat UI with authentication and real-time messaging. Currently logged in as: ", /*#__PURE__*/_react.default.createElement("strong", null, "Alice Johnson"), ", chatting with: ", /*#__PURE__*/_react.default.createElement("strong", null, "Bob Smith"))), /*#__PURE__*/_react.default.createElement(CometChatWrapper, args)))),
  args: {
    chatWithUser: 'test-user-2',
    receiverId: 'test-user-2'
  }
};

// Chat with Carol Davis
const ChatWithCarol = exports.ChatWithCarol = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.ChakraProvider, {
    value: system
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2
  }, "Chat with Carol Davis"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "sm"
  }, "Chatting with Carol Davis (Away status)")), /*#__PURE__*/_react.default.createElement(CometChatWrapper, args)))),
  args: {
    chatWithUser: 'test-user-3',
    receiverId: 'test-user-3'
  }
};

// Full Screen Chat
const FullScreenChat = exports.FullScreenChat = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.ChakraProvider, {
    value: system
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    height: "100vh",
    width: "100%"
  }, /*#__PURE__*/_react.default.createElement(CometChatWrapper, args))),
  args: {
    chatWithUser: 'test-user-2',
    receiverId: 'test-user-2'
  },
  parameters: {
    layout: 'fullscreen'
  }
};

// Group Chat Demo (if supported)
const GroupChatDemo = exports.GroupChatDemo = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.ChakraProvider, {
    value: system
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2
  }, "Group Chat Demo"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "sm"
  }, "This demonstrates group chat functionality if supported by your CometChat configuration.")), /*#__PURE__*/_react.default.createElement(CometChatWrapper, args)))),
  args: {
    chatWithUser: 'test-group-1',
    receiverId: 'test-group-1'
  }
};

// Responsive Chat View
const ResponsiveChat = exports.ResponsiveChat = {
  render: args => /*#__PURE__*/_react.default.createElement(_react2.ChakraProvider, {
    value: system
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_react2.VStack, {
    spacing: 4,
    align: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
    size: "md",
    mb: 2
  }, "Responsive Chat View"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    color: "gray.600",
    fontSize: "sm"
  }, "This view adapts to different screen sizes. Try resizing your browser window.")), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    height: {
      base: "60vh",
      md: "70vh",
      lg: "80vh"
    },
    width: "100%",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "md"
  }, /*#__PURE__*/_react.default.createElement(CometChatWrapper, args))))),
  args: {
    chatWithUser: 'test-user-2',
    receiverId: 'test-user-2'
  }
};