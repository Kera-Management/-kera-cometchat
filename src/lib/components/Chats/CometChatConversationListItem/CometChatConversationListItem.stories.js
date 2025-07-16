import React from 'react';
import { CometChatConversationListItem } from './index';
import { theme } from '../../../resources/theme';

export default {
  title: 'Chats/CometChatConversationListItem',
  component: CometChatConversationListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    conversation: {
      control: 'object',
      description: 'Conversation object',
    },
    selectedConversation: {
      control: 'object',
      description: 'Currently selected conversation',
    },
    theme: {
      control: 'object',
      description: 'Theme object for styling',
    },
  },
};

const mockUser = {
  uid: 'user123',
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=JD',
  status: 'online',
};

const mockGroup = {
  guid: 'group123',
  name: 'React Developers',
  icon: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=RD',
  type: 'public',
};

const mockConversationUser = {
  conversationId: 'conv_user_123',
  conversationType: 'user',
  conversationWith: mockUser,
  lastMessage: {
    text: 'Hey there! How are you doing?',
    sentAt: Math.floor(Date.now() / 1000) - 300, // 5 minutes ago
    sender: mockUser,
  },
  unreadMessageCount: 3,
};

const mockConversationGroup = {
  conversationId: 'conv_group_123',
  conversationType: 'group',
  conversationWith: mockGroup,
  lastMessage: {
    text: 'Welcome to the React Developers group!',
    sentAt: Math.floor(Date.now() / 1000) - 1800, // 30 minutes ago
    sender: { name: 'Admin' },
  },
  unreadMessageCount: 12,
};

export const UserConversation = {
  args: {
    conversation: mockConversationUser,
    selectedConversation: null,
    theme: theme,
    handleClick: (conversation) => console.log('Clicked conversation:', conversation),
  },
};

export const GroupConversation = {
  args: {
    conversation: mockConversationGroup,
    selectedConversation: null,
    theme: theme,
    handleClick: (conversation) => console.log('Clicked conversation:', conversation),
  },
};

export const SelectedConversation = {
  args: {
    conversation: mockConversationUser,
    selectedConversation: mockConversationUser,
    theme: theme,
    handleClick: (conversation) => console.log('Clicked conversation:', conversation),
  },
};

export const NoUnreadMessages = {
  args: {
    conversation: {
      ...mockConversationUser,
      unreadMessageCount: 0,
    },
    selectedConversation: null,
    theme: theme,
    handleClick: (conversation) => console.log('Clicked conversation:', conversation),
  },
};

export const LongMessagePreview = {
  args: {
    conversation: {
      ...mockConversationUser,
      lastMessage: {
        ...mockConversationUser.lastMessage,
        text: 'This is a very long message that should be truncated with ellipsis when it exceeds the available width in the conversation list item',
      },
    },
    selectedConversation: null,
    theme: theme,
    handleClick: (conversation) => console.log('Clicked conversation:', conversation),
  },
};