import React from 'react';
import { ChakraProvider, Box, defaultSystem } from '@chakra-ui/react';
import { CometChatContext } from '../src/lib/util/CometChatContext';
import { theme as cometChatTheme } from '../src/lib/resources/theme';

// Mock CometChat context for Storybook
const mockCometChatContext = {
  theme: cometChatTheme,
  language: 'en',
  UIKitSettings: {
    tabs: ['SIDEBAR_CHATS', 'SIDEBAR_USERS', 'SIDEBAR_GROUPS'],
  },
  FeatureRestriction: {
    isUnreadCountEnabled: () => Promise.resolve(true),
    isUserPresenceEnabled: () => Promise.resolve(true),
    isHideDeletedMessagesEnabled: () => Promise.resolve(false),
  },
  getLoggedinUser: () => Promise.resolve({
    uid: 'storybook-user',
    name: 'Storybook User',
    avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=SB',
  }),
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <CometChatContext.Provider value={mockCometChatContext}>
          <Box p={5}>
            <Story />
          </Box>
        </CometChatContext.Provider>
      </ChakraProvider>
    ),
  ],
};

export default preview;