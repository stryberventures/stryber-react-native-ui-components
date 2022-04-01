import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Loader from './index';
import {loader} from '../../static/markdown';

export default {
  title: 'Loader',
  component: Loader,
  parameters: {
    notes: {loader},
  },
} as ComponentMeta<typeof Loader>;

export const Default: ComponentStory<typeof Loader> = args => (
  <Loader {...args} />
);

Default.args = {
  dotsAmount: 4,
};
