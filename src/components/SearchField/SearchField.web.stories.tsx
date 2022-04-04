import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import SearchField from './index';

export default {
  title: 'SearchField',
  component: SearchField,
} as ComponentMeta<typeof SearchField>;

export const Default: ComponentStory<typeof SearchField> = args => (
  <SearchField placeholder="Search field" {...args} />
);
