import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Text from './index';
import {text} from '../../static/markdown';

export default {
  title: 'Text',
  component: Text,
  parameters: {
    notes: {text},
  },
} as ComponentMeta<typeof Text>;
//TODO: Investigate why controls and docs are empty in web version of storybook
export const Default: ComponentStory<typeof Text> = ({children, ...args}) => (
  <Text {...args}>{children}</Text>
);

Default.args = {
  children: 'Text',
};
