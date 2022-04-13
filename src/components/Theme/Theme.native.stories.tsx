import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import ThemeChooser from '../../storybook/preview/ThemeChooser';
import {theme} from '../../static/markdown';

storiesOf('Theme', module)
  .addParameters({
    notes: {markdown: theme},
  })
  .add('default', () => <ThemeChooser />);
