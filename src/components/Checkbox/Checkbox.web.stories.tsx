import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Checkbox from './index';
import {checkbox} from '../../static/markdown';

export default {
  title: 'Checkbox',
  component: Checkbox,
  parameters: {
    notes: {checkbox},
  },
} as ComponentMeta<typeof Checkbox>;

export const Default: ComponentStory<typeof Checkbox> = args => (
  <Checkbox text="checkbox" {...args} />
);
