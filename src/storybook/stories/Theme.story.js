import React from 'react';

import {storiesOf} from '@storybook/react-native';

import ThemeChooser from '../preview/ThemeChooser';
import {theme} from '../../static/markdown';

storiesOf('Theme', module)
  .addParameters({
    notes: {markdown: theme},
  })
  .add('theme chooser preview', () => {
    return <ThemeChooser />;
  });
