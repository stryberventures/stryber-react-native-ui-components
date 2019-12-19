/* eslint-disable no-undef */
const rn = require('react-native');
const mockAsyncStorage = require('@react-native-community/async-storage/jest/async-storage-mock');

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  };
});

jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;

  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: View,
    Extrapolate: {CLAMP: jest.fn()},
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
    Easing: {
      out: jest.fn(),
    },
  };
});

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
        MainBundleDir: () => {},
        CacheDir: () => {},
        DocumentDir: () => {},
      },
    },
    wrap: () => {},
    polyfill: () => {},
    JSONStream: () => {},
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
console.warn = jest.fn(mockConsoleMethod(console.warn));
console.error = jest.fn(mockConsoleMethod(console.error));

module.exports = rn;
