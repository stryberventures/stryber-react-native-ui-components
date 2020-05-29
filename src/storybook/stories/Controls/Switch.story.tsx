// @ts-nocheck
import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../components/CenterView/index';
import Switch from '../../../components/Switch';
import {switchDoc} from '../../../static/markdown';
storiesOf('Controls/Switch', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add(
    'default',
    () => {
      return <Switch value={true} />;
    },
    {
      notes: {markdown: switchDoc},
    },
  )
  .add(
    'large size',
    () => {
      return <Switch value={true} size="large" />;
    },
    {
      notes: {markdown: switchDoc},
    },
  )
  .add(
    'error',
    () => {
      return <Switch value={true} error="Some errror" />;
    },
    {
      notes: {markdown: switchDoc},
    },
  )
  .add(
    'custom color',
    () => {
      return <Switch value={true} bgColor="orange" />;
    },
    {
      notes: {markdown: switchDoc},
    },
  )
  .add(
    'disabled off',
    () => {
      return <Switch value={false} disabled />;
    },
    {
      notes: {markdown: switchDoc},
    },
  )
  .add(
    'disabled on',
    () => {
      return <Switch value={true} disabled />;
    },
    {
      notes: {markdown: switchDoc},
    },
  );
