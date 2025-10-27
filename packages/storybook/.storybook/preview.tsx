import type { Preview } from '@storybook/react-vite';
import '@atkvs/modal-renderer/styles';
import './global.css';
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
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px',
          minHeight: '100vh',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#333',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
