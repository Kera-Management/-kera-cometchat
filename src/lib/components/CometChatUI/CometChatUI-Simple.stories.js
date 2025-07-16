import React from 'react';
import { Box, VStack, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { CometChatUI } from './index';
import { CometChatContext } from '../../util/CometChatContext';
import { theme } from '../../resources/theme';

export default {
  title: 'Complete/CometChatUI-Simple',
  component: CometChatUI,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'CometChat UI component with mock context for testing UI components without CometChat initialization.',
      },
    },
  },
  argTypes: {
    chatWithUser: {
      control: 'text',
      description: 'User ID to start a chat with',
    },
    receiverId: {
      control: 'text', 
      description: 'Receiver ID for the chat',
    },
  },
};

// Enhanced mock context for better component testing
const mockCometChatContext = {
  theme: theme,
  language: 'en',
  UIKitSettings: {
    tabs: ['SIDEBAR_CHATS', 'SIDEBAR_USERS', 'SIDEBAR_GROUPS'],
    showUserPresence: true,
    showUnreadCount: true,
    enableSoundOnMessage: true,
    enableDeleteMessage: true,
    enableEditMessage: true,
    enableReplyToMessage: true,
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
    isCallEnabled: () => Promise.resolve(true),
  },
  getLoggedinUser: () => Promise.resolve({
    uid: 'storybook-user',
    name: 'Storybook User',
    avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=SB',
    status: 'online',
  }),
  
  // Mock methods that might be called by the UI
  getRoles: () => Promise.resolve([]),
  getUsers: () => Promise.resolve([
    {
      uid: 'user-1',
      name: 'Alice Johnson',
      avatar: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=AJ',
      status: 'online',
    },
    {
      uid: 'user-2', 
      name: 'Bob Smith',
      avatar: 'https://via.placeholder.com/40x40/FF9800/FFFFFF?text=BS',
      status: 'away',
    }
  ]),
  getGroups: () => Promise.resolve([
    {
      guid: 'group-1',
      name: 'React Developers',
      icon: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=RD',
      type: 'public',
      membersCount: 150,
    }
  ]),
  getConversations: () => Promise.resolve([]),
};

// Simple wrapper that provides mock context
const SimpleCometChatWrapper = ({ children, ...props }) => (
  <CometChatContext.Provider value={mockCometChatContext}>
    <Box height="80vh" width="100%" border="1px solid" borderColor="gray.200" borderRadius="md">
      <CometChatUI {...props} />
    </Box>
  </CometChatContext.Provider>
);

// Default story - UI testing without real CometChat
export const UIComponentsOnly = {
  render: (args) => (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading size="md" mb={2}>CometChat UI - Component Testing</Heading>
          <Text color="gray.600" fontSize="sm">
            This story shows the CometChat UI components with mock data for testing layouts and styling.
            No real CometChat connection is required.
          </Text>
        </Box>
        <SimpleCometChatWrapper {...args} />
      </VStack>
    </Box>
  ),
  args: {
    chatWithUser: 'user-1',
    receiverId: 'user-1',
  },
};

// Dark mode testing
export const DarkModeUI = {
  render: (args) => (
    <Box p={4} bg="gray.900" minHeight="100vh">
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading size="md" mb={2} color="white">CometChat UI - Dark Mode Test</Heading>
          <Text color="gray.300" fontSize="sm">
            Testing the UI components in a dark theme environment.
          </Text>
        </Box>
        <SimpleCometChatWrapper {...args} />
      </VStack>
    </Box>
  ),
  args: {
    chatWithUser: 'user-2',
    receiverId: 'user-2',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Mobile responsive testing
export const MobileView = {
  render: (args) => (
    <Box maxWidth="375px" mx="auto" p={2}>
      <VStack spacing={2} align="stretch">
        <Box>
          <Heading size="sm" mb={1}>Mobile Chat View</Heading>
          <Text color="gray.600" fontSize="xs">
            Testing mobile responsiveness
          </Text>
        </Box>
        <Box height="60vh" width="100%" border="1px solid" borderColor="gray.200" borderRadius="md">
          <CometChatContext.Provider value={mockCometChatContext}>
            <CometChatUI {...args} />
          </CometChatContext.Provider>
        </Box>
      </VStack>
    </Box>
  ),
  args: {
    chatWithUser: 'user-1',
    receiverId: 'user-1',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Error state testing
export const ErrorState = {
  render: (args) => (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading size="md" mb={2}>Error State Testing</Heading>
          <Text color="gray.600" fontSize="sm">
            This demonstrates how the UI handles error states.
          </Text>
        </Box>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <VStack align="start" spacing={2}>
            <Heading size="sm">CometChat Connection Error</Heading>
            <Text fontSize="sm">Failed to connect to CometChat servers. This is expected in Storybook.</Text>
            <Text fontSize="xs" color="gray.600">
              Use the full CometChatUI story for actual functionality testing.
            </Text>
          </VStack>
        </Alert>
      </VStack>
    </Box>
  ),
  args: {
    chatWithUser: 'invalid-user',
    receiverId: 'invalid-user',
  },
};

// Loading state testing  
export const LoadingState = {
  render: (args) => (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading size="md" mb={2}>Loading State Testing</Heading>
          <Text color="gray.600" fontSize="sm">
            This shows various loading states within the CometChat UI.
          </Text>
        </Box>
        <SimpleCometChatWrapper {...args} />
      </VStack>
    </Box>
  ),
  args: {
    chatWithUser: 'loading-user',
    receiverId: 'loading-user',
  },
};