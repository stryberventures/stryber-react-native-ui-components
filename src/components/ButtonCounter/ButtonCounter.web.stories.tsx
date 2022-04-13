import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import ButtonCounter from './index';
import {buttonCounter} from '../../static/markdown';
import Text from '../Text';

export default {
  title: 'ButtonCounter',
  component: ButtonCounter,
  parameters: {
    notes: {buttonCounter},
  },
} as ComponentMeta<typeof ButtonCounter>;

export const Default: ComponentStory<typeof ButtonCounter> = args => (
  <ButtonCounter {...args} />
);

Default.args = {
  children: 'Buy',
  renderCount: (count, style) => (
    <Text style={style}>
      8.50 AED <Text style={[style, {color: '#fda717'}]}>x {count}</Text>
    </Text>
  ),
  initialValue: 0,
  minValue: 0,
  maxValue: 5,
};
