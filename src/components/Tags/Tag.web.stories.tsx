import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Tags from './index';
import {tags} from '../../static/markdown';

const tagsArrWithPreselectedValues = [
  {id: 1, label: 'JavaScript'},
  {id: 2, label: 'React', preselected: true},
  {id: 4, label: 'HTML'},
  {id: 5, label: 'CSS'},
  {id: 6, label: 'React Native', preselected: true},
  {id: 7, label: 'Vue'},
];

export default {
  title: 'Tags',
  component: Tags,
  parameters: {
    notes: {tags},
  },
} as ComponentMeta<typeof Tags>;

export const Default: ComponentStory<typeof Tags> = args => <Tags {...args} />;

Default.args = {
  tags: tagsArrWithPreselectedValues,
};
