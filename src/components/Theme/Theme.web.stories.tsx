import * as React from 'react';
import ThemeChooser from '../../storybook/preview/ThemeChooser';
import {theme} from '../../static/markdown';

export default {
  title: 'Theme',
  component: ThemeChooser,
  parameters: {
    notes: {theme},
  },
};

export const Default = () => <ThemeChooser />;
