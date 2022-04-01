import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import List from './index';
import {list} from '../../static/markdown';

const longText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const data = new Array(10).fill({
  value: 'Option',
  rightValue: 'Value',
  withArrow: true,
  cardText: longText,
});

export default {
  title: 'List',
  component: List,
  parameters: {
    notes: {list},
  },
} as ComponentMeta<typeof List>;

export const Default: ComponentStory<typeof List> = args => (
  <List
    titleText="SUBHEAD TITLE"
    titleLink="Link"
    onItemPress={(item: any) => {
      // eslint-disable-next-line no-console
      console.log('item', item);
    }}
    {...args}
    data={data}
  />
);
