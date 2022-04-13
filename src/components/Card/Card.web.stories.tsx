import * as React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {card} from '../../static/markdown';
import {defaultTheme as theme} from '../../constants';
import Card from './index';
import Button from '../Button';
import Block from '../Block';
import Text from '../Text';

export default {
  title: 'Card',
  component: Card,
  parameters: {
    notes: {card},
  },
} as ComponentMeta<typeof Card>;

export const Default: ComponentStory<typeof Card> = args => (
  <Card {...args} shadow>
    <Block padding={theme.sizes.cardPadding} style={{flex: 0}}>
      <Text bold size={theme.fontSizes.h2}>
        Card Example
      </Text>
      <Text style={{marginBottom: 10}} size={theme.fontSizes.caption}>
        Active
      </Text>
      <Button type="outlined">Button text</Button>
    </Block>
  </Card>
);
