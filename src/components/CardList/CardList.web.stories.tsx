import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import CardList, {IListItem} from './index';
import {cardList} from '../../static/markdown';

export default {
  title: 'CardList',
  component: CardList,
  parameters: {
    notes: {cardList},
  },
} as ComponentMeta<typeof CardList>;

const longText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const data = [...Array(10)].map((_, i) => {
  const item: IListItem = {
    text: 'Lorem ipsum',
  };
  if (i % 2 === 0) {
    item.secondaryText = longText;
  }
  return item;
});

export const Default: ComponentStory<typeof CardList> = args => (
  <CardList {...args} data={data} />
);