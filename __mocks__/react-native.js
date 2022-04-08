const rn = require('react-native');

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-gesture-handler', () => {});

jest.mock('rn-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    fetch: () => {},
    base64: () => {},
    android: () => {},
    ios: () => {},
    config: () => {},
    session: () => {},
    fs: {
      dirs: {
        CacheDir: () => {},
        DocumentDir: () => {},
      },
    },
    wrap: () => {},
  };
});

// Auto-mock YellowBox component to prevent 'test was not wrapped in act(...)' error
jest.mock('YellowBox');

const mockConsoleMethod = realConsoleMethod => {
  const ignoredMessages = ['test was not wrapped in act(...)'];

  return (message, ...args) => {
    const containsIgnoredMessage = ignoredMessages.some(ignoredMessage =>
      message.includes(ignoredMessage),
    );

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args);
    }
  };
};

// Suppress console errors and warnings to avoid polluting output in tests.
/* eslint-disable no-console */
console.warn = jest.fn(mockConsoleMethod(console.warn));
console.error = jest.fn(mockConsoleMethod(console.error));

module.exports = rn;
