// @ts-nocheck
import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import Checkbox from '../../../components/Checkbox';
import CenterView from '../../../components/CenterView/index';
import {checkbox} from '../../../static/markdown';
storiesOf('Controls/RadioButton', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add(
    'default',
    () => {
      return <Checkbox radio value={true} />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'large size',
    () => {
      return <Checkbox radio value={true} size="large" />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'error',
    () => {
      return <Checkbox radio value={true} error="Some error" />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'custom color',
    () => {
      return <Checkbox radio value={true} bgColor="orange" />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'disabled',
    () => {
      return <Checkbox radio value={false} disabled />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'disabled checked',
    () => {
      return <Checkbox radio value={true} disabled />;
    },
    {
      notes: {markdown: checkbox},
    },
  );
