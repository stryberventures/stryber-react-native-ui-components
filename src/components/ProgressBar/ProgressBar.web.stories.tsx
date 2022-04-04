import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import ProgressBar from './index';
import {progressBar} from '../../static/markdown';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  parameters: {
    notes: {progressBar},
  },
} as ComponentMeta<typeof ProgressBar>;

export const Default: ComponentStory<typeof ProgressBar> = args => (
  <ProgressBar {...args} />
);

Default.args = {
  size: 'small',
  value: 1,
  totalValue: 4,
  variant: 'inline',
};
