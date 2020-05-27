// @ts-nocheck
import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import Checkbox from '../../../components/Checkbox';
import CenterView from '../../../components/CenterView/index';
import {checkbox} from '../../../static/markdown';
storiesOf('Controls/Checkbox', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add(
    'default',
    () => {
      return <Checkbox value={true} />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'large size',
    () => {
      return <Checkbox value={true} size="large" />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'error',
    () => {
      return <Checkbox value={true} error="Some error" />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'disabled',
    () => {
      return <Checkbox value={false} disabled />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'disabled checked',
    () => {
      return <Checkbox value={true} disabled />;
    },
    {
      notes: {markdown: checkbox},
    },
  );
