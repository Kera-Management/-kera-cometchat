import React from 'react';
import { CometChatReceiverTextMessageBubble } from './index';

export default {
  title: 'Messages/CometChatReceiverTextMessageBubble',
  component: CometChatReceiverTextMessageBubble,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    messageText: {
      control: 'text',
      description: 'The text content of the message',
    },
  },
};

const mockMessage = {
  id: '1',
  text: 'Hello! How are you doing today?',
  sender: {
    uid: 'sender123',
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/32x32/E91E63/FFFFFF?text=JS',
  },
  sentAt: Math.floor(Date.now() / 1000),
  readAt: Math.floor(Date.now() / 1000),
  type: 'text',
};

export const Default = {
  args: {
    message: mockMessage,
    messageText: mockMessage.text,
  },
};

export const LongMessage = {
  args: {
    message: {
      ...mockMessage,
      text: 'This is a much longer message that should wrap to multiple lines. It contains quite a bit of text to demonstrate how the message bubble handles longer content and text wrapping.',
    },
    messageText: 'This is a much longer message that should wrap to multiple lines. It contains quite a bit of text to demonstrate how the message bubble handles longer content and text wrapping.',
  },
};

export const ShortMessage = {
  args: {
    message: {
      ...mockMessage,
      text: 'Hi!',
    },
    messageText: 'Hi!',
  },
};

export const WithEmojis = {
  args: {
    message: {
      ...mockMessage,
      text: 'Great job! 🎉👏 Looking forward to it! 😊',
    },
    messageText: 'Great job! 🎉👏 Looking forward to it! 😊',
  },
};

export const NoAvatar = {
  args: {
    message: {
      ...mockMessage,
      sender: {
        uid: 'sender456',
        name: 'Anonymous User',
      },
      text: 'Message from user without avatar',
    },
    messageText: 'Message from user without avatar',
  },
};