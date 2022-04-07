import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Badge from './index';
import {badge} from '../../static/markdown';

export default {
  title: 'Badge',
  component: Badge,
  parameters: {
    notes: {badge},
  },
} as ComponentMeta<typeof Badge>;

export const Default: ComponentStory<typeof Badge> = args => (
  <Badge {...args} />
);

Default.args = {
  value: 5,
};
