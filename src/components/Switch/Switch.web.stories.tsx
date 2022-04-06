import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Switch from './index';
import {switchDoc} from '../../static/markdown';

export default {
  title: 'Switch',
  component: Switch,
  parameters: {
    notes: {switchDoc},
  },
} as ComponentMeta<typeof Switch>;

export const Default: ComponentStory<typeof Switch> = args => (
  <Switch {...args} />
);
