import React from 'react';
import {DatePicker} from '../components';

import CenterView from '../components/CenterView';

import {storiesOf} from '@storybook/react-native';

storiesOf('DatePicker', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <DatePicker label="Choose date" />;
  });
