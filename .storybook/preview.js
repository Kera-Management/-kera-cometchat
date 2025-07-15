import React from 'react';
import { CometChatContextProvider } from '../src/lib/util/CometChatContext';

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
      <CometChatContextProvider>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </CometChatContextProvider>
    ),
  ],
};

export default preview;