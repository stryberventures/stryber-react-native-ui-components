import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Slider from './index';
import {slider} from '../../static/markdown';

export default {
  title: 'Slider',
  component: Slider,
  parameters: {
    notes: {slider},
  },
} as ComponentMeta<typeof Slider>;

export const Default: ComponentStory<typeof Slider> = args => (
  <Slider {...args} />
);

Default.args = {
  style: {marginTop: 200},
};
