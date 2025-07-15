const path = require('path');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options) => {
    // Use our custom babel config
    return {
      ...options,
      configFile: path.resolve(__dirname, 'babel.config.js'),
    };
  },
  webpackFinal: async (config) => {
    // Handle SVG files as React components
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test && rule.test.test('.svg'));
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }
    
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    // Ensure proper handling of CSS and style files
    config.module.rules.push({
      test: /\.(css|scss)$/,
      use: ['style-loader', 'css-loader'],
    });

    // Add support for .js files with JSX (for emotion css prop)
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, 'babel.config.js'),
        },
      },
    });

    return config;
  },
};

export default config;