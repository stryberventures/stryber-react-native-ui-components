import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
import List from '../../components/List';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {list} from '../../static/markdown';

const data = [
  {
    value: 'Option 1',
    rightValue: 'Value',
    withArrow: true,
  },
  {
    value: 'Option 2',
    rightValue: 'Value',
    withArrow: true,
  },
  {
    value: 'Option 3',
    rightValue: 'Value',
    withArrow: true,
  },
  {
    value: 'Option 4',
    rightValue: 'Value',
    withArrow: true,
  },
  {
    value: 'Option 5',
    rightValue: 'Value',
    withArrow: true,
  },
  {
    value: 'Option 6',
    rightValue: 'Value',
    withArrow: true,
  },
  {
    value: 'Option 7',
    rightValue: 'Value',
    withArrow: true,
  },
  {
    value: 'Option 8',
    rightValue: 'Value',
    withArrow: true,
  },
];

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: {markdown: list},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('Simple list', () => <List data={data} titleText="title" titleLink="link" />);
