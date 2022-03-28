import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Block from './index';
import {block} from '../../static/markdown';

export default {
  title: 'Block',
  component: Block,
  parameters: {
    notes: {block},
  },
} as ComponentMeta<typeof Block>;

export const Default: ComponentStory<typeof Block> = args => (
  <Block
    {...args}
    flex={0}
    style={{width: 200, height: 200}}
    color="#ccc"
    card
  />
);
