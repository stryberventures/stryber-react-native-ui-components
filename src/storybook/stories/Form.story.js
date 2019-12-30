import React from 'react';

import {storiesOf} from '@storybook/react-native';

import Form from '../preview/Form';
import FormikPreview from '../preview/FormikPreview';
import FormRef from '../preview/FormRef';
import CenterView from '../../components/CenterView';
import {form} from '../../static/markdown';

storiesOf('Form', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addParameters({
    notes: {markdown: form},
  })
  .add('with hook', () => <Form />)
  .add('with formik', () => <FormikPreview />)
  .add('with refs', () => <FormRef />);
