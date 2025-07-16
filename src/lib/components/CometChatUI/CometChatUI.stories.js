import React, { useCallback, useEffect, useState } from 'react';
import { Box, useToast, ChakraProvider, VStack, Heading, Text, Spinner, Alert, AlertIcon, createSystem, defaultConfig } from '@chakra-ui/react';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatUI } from './index';

// Create a Chakra system for this story
const system = createSystem(defaultConfig);

// CometChat configuration
const COMETCHAT_APP_ID = '2239445ea0c555e0';
const COMETCHAT_AUTH_KEY = 'a69de2a3d59932e8e998b048c1319bcdf546982c';

export default {
  title: 'Complete/CometChatUI',
  component: CometChatUI,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete CometChat UI component with initialization and authentication. This story demonstrates the full chat experience.',
      },
    },
  },
  argTypes: {
    chatWithUser: {
      control: 'text',
      description: 'User ID to start a chat with',
      defaultValue: 'test-user-2',
    },
    receiverId: {
      control: 'text', 
      description: 'Receiver ID for the chat',
      defaultValue: 'test-user-2',
    },
  },
};

// Mock users for demonstration
const mockUsers = [
  {
    uid: 'test-user-1',
    name: 'Alice Johnson',
    avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=AJ',
    status: 'online',
  },
  {
    uid: 'test-user-2', 
    name: 'Bob Smith',
    avatar: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=BS',
    status: 'online',
  },
  {
    uid: 'test-user-3',
    name: 'Carol Davis',
    avatar: 'https://via.placeholder.com/40x40/FF9800/FFFFFF?text=CD',
    status: 'away',
  },
];

// CometChat initialization and login wrapper component
const CometChatWrapper = ({ chatWithUser, receiverId }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize CometChat
  const initializeChat = useCallback(async () => {
    try {
      if (window.CometChat) {
        console.log('CometChat already available');
        return true;
      }

      // Make CometChat globally available
      window.CometChat = CometChat;
      
      const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion('US')
        .build();

      const initialized = await CometChat.init(COMETCHAT_APP_ID, appSetting);
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
  const createMockUsers = useCallback(async () => {
    try {
      for (const userData of mockUsers) {
        try {
          const user = new CometChat.User(userData.uid);
          user.setName(userData.name);
          user.setAvatar(userData.avatar);
          
          await CometChat.createUser(user, COMETCHAT_AUTH_KEY);
          console.log(`Created user: ${userData.name}`);
        } catch (err) {
          // User might already exist, which is fine
          if (err.code !== 'ERR_UID_ALREADY_EXISTS') {
            console.warn(`Failed to create user ${userData.name}:`, err);
          }
        }
      }
    } catch (err) {
      console.warn('Error creating mock users:', err);
    }
  }, []);

  // Login user
  const loginUser = useCallback(async () => {
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
      const loggedInUser = await CometChat.login('test-user-1', COMETCHAT_AUTH_KEY);
      
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

  useEffect(() => {
    loginUser();
  }, [loginUser]);

  if (isLoading) {
    return (
      <VStack spacing={4} justify="center" align="center" height="400px">
        <Spinner size="xl" color="blue.500" />
        <Heading size="md">Initializing CometChat...</Heading>
        <Text color="gray.600">Setting up chat environment and logging in user</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        <VStack align="start" spacing={2}>
          <Heading size="sm">Failed to Initialize CometChat</Heading>
          <Text fontSize="sm">{error}</Text>
          <Text fontSize="xs" color="gray.600">
            This might be due to network issues or CometChat service availability.
          </Text>
        </VStack>
      </Alert>
    );
  }

  if (!isLoggedIn || !currentUser) {
    return (
      <Alert status="warning" borderRadius="md">
        <AlertIcon />
        <VStack align="start" spacing={2}>
          <Heading size="sm">Authentication Required</Heading>
          <Text fontSize="sm">Please wait while we log you in...</Text>
        </VStack>
      </Alert>
    );
  }

  return (
    <Box height="80vh" width="100%" border="1px solid" borderColor="gray.200" borderRadius="md">
      <CometChatUI 
        chatWithUser={chatWithUser} 
        receiverId={receiverId}
      />
    </Box>
  );
};

// Default story - Chat with Bob Smith
export const DefaultChat = {
  render: (args) => (
    <ChakraProvider value={system}>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Box>
            <Heading size="md" mb={2}>CometChat UI - Complete Chat Experience</Heading>
            <Text color="gray.600" fontSize="sm">
              This story demonstrates the full CometChat UI with authentication and real-time messaging.
              Currently logged in as: <strong>Alice Johnson</strong>, chatting with: <strong>Bob Smith</strong>
            </Text>
          </Box>
          <CometChatWrapper {...args} />
        </VStack>
      </Box>
    </ChakraProvider>
  ),
  args: {
    chatWithUser: 'test-user-2',
    receiverId: 'test-user-2',
  },
};

// Chat with Carol Davis
export const ChatWithCarol = {
  render: (args) => (
    <ChakraProvider value={system}>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Box>
            <Heading size="md" mb={2}>Chat with Carol Davis</Heading>
            <Text color="gray.600" fontSize="sm">
              Chatting with Carol Davis (Away status)
            </Text>
          </Box>
          <CometChatWrapper {...args} />
        </VStack>
      </Box>
    </ChakraProvider>
  ),
  args: {
    chatWithUser: 'test-user-3',
    receiverId: 'test-user-3',
  },
};

// Full Screen Chat
export const FullScreenChat = {
  render: (args) => (
    <ChakraProvider value={system}>
      <Box height="100vh" width="100%">
        <CometChatWrapper {...args} />
      </Box>
    </ChakraProvider>
  ),
  args: {
    chatWithUser: 'test-user-2',
    receiverId: 'test-user-2',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Group Chat Demo (if supported)
export const GroupChatDemo = {
  render: (args) => (
    <ChakraProvider value={system}>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Box>
            <Heading size="md" mb={2}>Group Chat Demo</Heading>
            <Text color="gray.600" fontSize="sm">
              This demonstrates group chat functionality if supported by your CometChat configuration.
            </Text>
          </Box>
          <CometChatWrapper {...args} />
        </VStack>
      </Box>
    </ChakraProvider>
  ),
  args: {
    chatWithUser: 'test-group-1',
    receiverId: 'test-group-1',
  },
};

// Responsive Chat View
export const ResponsiveChat = {
  render: (args) => (
    <ChakraProvider value={system}>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Box>
            <Heading size="md" mb={2}>Responsive Chat View</Heading>
            <Text color="gray.600" fontSize="sm">
              This view adapts to different screen sizes. Try resizing your browser window.
            </Text>
          </Box>
          <Box 
            height={{ base: "60vh", md: "70vh", lg: "80vh" }}
            width="100%" 
            border="1px solid" 
            borderColor="gray.200" 
            borderRadius="md"
          >
            <CometChatWrapper {...args} />
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  ),
  args: {
    chatWithUser: 'test-user-2',
    receiverId: 'test-user-2',
  },
};