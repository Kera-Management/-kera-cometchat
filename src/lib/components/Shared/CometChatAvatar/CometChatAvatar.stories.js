import React from 'react';
import { CometChatAvatar } from './index';

export default {
  title: 'Shared/CometChatAvatar',
  component: CometChatAvatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'Avatar image URL',
    },
    cornerRadius: {
      control: 'text',
      description: 'Border radius for the avatar',
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
    },
    borderWidth: {
      control: 'text',
      description: 'Border width',
    },
  },
};

const mockUser = {
  uid: 'user123',
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=JD',
};

export const Default = {
  args: {
    user: mockUser,
    cornerRadius: '50%',
    borderColor: '#ccc',
    borderWidth: '1px',
  },
};

export const WithCustomImage = {
  args: {
    image: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=CI',
    cornerRadius: '50%',
    borderColor: '#2196F3',
    borderWidth: '2px',
  },
};

export const WithoutUser = {
  args: {
    image: '',
    user: {},
    cornerRadius: '50%',
    borderColor: '#FF5722',
    borderWidth: '1px',
  },
};

export const SquareAvatar = {
  args: {
    user: mockUser,
    cornerRadius: '8px',
    borderColor: '#9C27B0',
    borderWidth: '2px',
  },
};