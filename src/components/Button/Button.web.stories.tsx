import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import Button from './index';

export default {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    color: {control: 'color'},
    secondaryColor: {control: 'color'},
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
