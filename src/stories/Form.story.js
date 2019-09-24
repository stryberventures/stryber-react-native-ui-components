import React from 'react';

import {storiesOf} from '@storybook/react-native';

import Form from '../components/Form';
import CenterView from '../components/CenterView';

storiesOf('Form', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Login Form', () => <Form />);
