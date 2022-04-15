import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import '../../storybook/styles/disableInputOutline.css';

import Input from './index';
import {input} from '../../static/markdown';

export default {
  title: 'Input',
  component: Input,
  parameters: {
    notes: {input},
  },
} as ComponentMeta<typeof Input>;

export const Default: ComponentStory<typeof Input> = args => (
  <Input type="email" label="Email" placeholder="Email" {...args} />
);
