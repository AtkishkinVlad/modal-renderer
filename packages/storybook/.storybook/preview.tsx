import type { Preview } from '@storybook/react-vite';
import '@atkvs/modal-renderer/styles';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
