import initStoryshots from '@storybook/addon-storyshots';
describe('storybook tests', () => {
  initStoryshots({
    configPath: './src',
    framework: 'react-native',
  });
});
