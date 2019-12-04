import React from 'react';

import {storiesOf} from '@storybook/react-native';

import Form from '../preview/Form';
import FormikPreview from '../preview/FormikPreview';
import FormRef from '../preview/FormRef';
import CenterView from '../components/CenterView';

storiesOf('Form', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with hook', () => <Form />, {notes: 'Use with context and have fun'})
  .add('with formik', () => <FormikPreview />)
  .add('with refs', () => <FormRef />);
