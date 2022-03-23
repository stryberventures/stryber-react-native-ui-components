import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import Button from './index';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Core/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['regular', 'outlined', 'link'],
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary: ComponentStory<typeof Button> = Template.bind({});

Primary.args = {
  children: 'Button',
  type: 'regular',
  size: 'small',
};

export const Small: ComponentStory<typeof Button> = Template.bind({});

Small.args = {
  children: 'Button',
  type: 'regular',
  size: 'regular',
};
