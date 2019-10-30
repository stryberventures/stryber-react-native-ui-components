import React from 'react';

import {storiesOf} from '@storybook/react-native';

import ThemeChooser from '../components/ThemeChooser';

storiesOf('Theme', module).add('theme chooser preview', () => {
  return <ThemeChooser />;
});
