import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Button from './index';
import {button} from '../../static/markdown';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: {control: 'color'},
    secondaryColor: {control: 'color'},
  },
  parameters: {
    notes: {button},
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({children, ...args}) => (
  <Button {...args}>{children}</Button>
);

export const Primary: ComponentStory<typeof Button> = Template.bind({});

Primary.args = {
  children: 'Button',
  type: 'regular',
  size: 'regular',
};
