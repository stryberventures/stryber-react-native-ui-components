import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Checkbox from '../components/Checkbox';
import CenterView from '../components/CenterView';
import Switch from '../components/Switch';

storiesOf('Checkbox', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <Checkbox isChecked />;
  })
  .add('radio', () => {
    return <Checkbox radio isChecked />;
  })
  .add('switch', () => {
    return <Switch isChecked />;
  });
