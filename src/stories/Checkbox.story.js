import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Checkbox from '../components/Checkbox';
import CenterView from '../components/CenterView';

storiesOf('Checkbox', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <Checkbox isChecked={true} />;
  });
