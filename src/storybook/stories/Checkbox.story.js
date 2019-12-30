import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Checkbox from '../../components/Checkbox';
import CenterView from '../../components/CenterView';
import Switch from '../../components/Switch';
import {checkbox, switchDoc} from '../../static/markdown';

storiesOf('Checkbox', module)
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
    'radio',
    () => {
      return <Checkbox radio value={true} />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'switch',
    () => {
      return <Switch value={true} />;
    },
    {
      notes: {markdown: switchDoc},
    },
  );
