import React from 'react';
import { CometChatGroupListItem } from './index';
import { theme } from '../../../resources/theme';

export default {
  title: 'Groups/CometChatGroupListItem',
  component: CometChatGroupListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    group: {
      control: 'object',
      description: 'Group object',
    },
    selectedGroup: {
      control: 'object',
      description: 'Currently selected group',
    },
    theme: {
      control: 'object',
      description: 'Theme object for styling',
    },
  },
};

const mockGroup = {
  guid: 'group123',
  name: 'React Developers',
  icon: 'https://via.placeholder.com/40x40/2196F3/FFFFFF?text=RD',
  type: 'public',
  membersCount: 150,
  owner: 'admin123',
  description: 'A group for React developers to share knowledge and tips',
};

const mockPrivateGroup = {
  guid: 'group456',
  name: 'Private Team',
  icon: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=PT',
  type: 'private',
  membersCount: 12,
  owner: 'admin456',
  description: 'Private team discussion group',
};

const mockPasswordGroup = {
  guid: 'group789',
  name: 'Secure Group',
  icon: '',
  type: 'password',
  membersCount: 25,
  owner: 'admin789',
  description: 'Password protected group for sensitive discussions',
};

export const PublicGroup = {
  args: {
    group: mockGroup,
    selectedGroup: null,
    theme: theme,
    clickHandler: (group) => console.log('Clicked group:', group),
  },
};

export const PrivateGroup = {
  args: {
    group: mockPrivateGroup,
    selectedGroup: null,
    theme: theme,
    clickHandler: (group) => console.log('Clicked group:', group),
  },
};

export const PasswordGroup = {
  args: {
    group: mockPasswordGroup,
    selectedGroup: null,
    theme: theme,
    clickHandler: (group) => console.log('Clicked group:', group),
  },
};

export const SelectedGroup = {
  args: {
    group: mockGroup,
    selectedGroup: mockGroup,
    theme: theme,
    clickHandler: (group) => console.log('Clicked group:', group),
  },
};

export const GroupWithoutIcon = {
  args: {
    group: {
      ...mockGroup,
      icon: '',
    },
    selectedGroup: null,
    theme: theme,
    clickHandler: (group) => console.log('Clicked group:', group),
  },
};

export const LongGroupName = {
  args: {
    group: {
      ...mockGroup,
      name: 'This is a very long group name that should be truncated when it exceeds the available space',
    },
    selectedGroup: null,
    theme: theme,
    clickHandler: (group) => console.log('Clicked group:', group),
  },
};