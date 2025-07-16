import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';

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
      <ChakraProvider>
        <Box p={5}>
          <Story />
        </Box>
      </ChakraProvider>
    ),
  ],
};

export default preview;