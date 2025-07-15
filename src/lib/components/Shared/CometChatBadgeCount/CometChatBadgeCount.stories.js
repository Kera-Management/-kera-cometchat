import React from 'react';
import { CometChatBadgeCount } from './index';
import { theme } from '../../../resources/theme';

export default {
  title: 'Shared/CometChatBadgeCount',
  component: CometChatBadgeCount,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    count: {
      control: 'number',
      description: 'Number to display in the badge',
    },
    theme: {
      control: 'object',
      description: 'Theme object for styling',
    },
  },
};

const defaultTheme = { ...theme };

export const Default = {
  args: {
    count: 5,
    theme: defaultTheme,
  },
};

export const HighCount = {
  args: {
    count: 99,
    theme: defaultTheme,
  },
};

export const SingleDigit = {
  args: {
    count: 1,
    theme: defaultTheme,
  },
};

export const CustomStyling = {
  args: {
    count: 23,
    theme: {
      ...defaultTheme,
      primaryColor: '#9c27b0',
    },
  },
};

export const NoCount = {
  args: {
    count: 0,
    theme: defaultTheme,
  },
};