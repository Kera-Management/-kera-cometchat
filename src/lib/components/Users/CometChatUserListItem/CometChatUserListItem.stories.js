import React from 'react';
import { CometChatUserListItem } from './index';
import { theme } from '../../../resources/theme';

export default {
  title: 'Users/CometChatUserListItem',
  component: CometChatUserListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    user: {
      control: 'object',
      description: 'User object',
    },
    selectedUser: {
      control: 'object',
      description: 'Currently selected user',
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
  role: 'member',
};

const mockUserOffline = {
  uid: 'user456',
  name: 'Jane Smith',
  avatar: 'https://via.placeholder.com/40x40/FF5722/FFFFFF?text=JS',
  status: 'offline',
  role: 'member',
};

const mockUserAway = {
  uid: 'user789',
  name: 'Mike Johnson',
  avatar: '',
  status: 'away',
  role: 'admin',
};

export const OnlineUser = {
  args: {
    user: mockUser,
    selectedUser: null,
    theme: theme,
    clickHandler: (user) => console.log('Clicked user:', user),
  },
};

export const OfflineUser = {
  args: {
    user: mockUserOffline,
    selectedUser: null,
    theme: theme,
    clickHandler: (user) => console.log('Clicked user:', user),
  },
};

export const AwayUser = {
  args: {
    user: mockUserAway,
    selectedUser: null,
    theme: theme,
    clickHandler: (user) => console.log('Clicked user:', user),
  },
};

export const SelectedUser = {
  args: {
    user: mockUser,
    selectedUser: mockUser,
    theme: theme,
    clickHandler: (user) => console.log('Clicked user:', user),
  },
};

export const UserWithoutAvatar = {
  args: {
    user: {
      ...mockUser,
      avatar: '',
    },
    selectedUser: null,
    theme: theme,
    clickHandler: (user) => console.log('Clicked user:', user),
  },
};

export const LongUserName = {
  args: {
    user: {
      ...mockUser,
      name: 'This is a very long user name that should be truncated',
    },
    selectedUser: null,
    theme: theme,
    clickHandler: (user) => console.log('Clicked user:', user),
  },
};