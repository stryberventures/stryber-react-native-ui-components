import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import '../../storybook/styles/disableInputOutline.css';

import Dropdown from './index';
import {dropdown} from '../../static/markdown';

//TODO: investigate why Dropdown doesn't work in web version

export default {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    notes: {dropdown},
  },
} as ComponentMeta<typeof Dropdown>;

const mockedData = [
  {
    value: 'Banana',
    label: 'Babana',
  },
  {
    value: 'Mango',
    label: 'Mango',
  },
  {
    value: 'Pear',
    label: 'Pear',
  },
  {
    value: 'Cocoa',
    label: 'Cocoa',
  },
  {
    value: 'Cherry',
    label: 'Cherry',
  },
  {
    value: 'Cocoa',
    label: 'Cocoa',
  },
  {
    value: 'Apricot',
    label: 'Apricot',
  },
];

export const Default: ComponentStory<typeof Dropdown> = args => (
  <Dropdown {...args} data={mockedData} label="Fruit" />
);
