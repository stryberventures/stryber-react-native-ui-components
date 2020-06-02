import * as React from 'react';
import {DatePicker} from '../../components';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {storiesOf} from '@storybook/react-native';
import {datePicker} from '../../static/markdown';
storiesOf('DatePicker', module)
  .addParameters({
    notes: {markdown: datePicker},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <DatePicker label="Choose date" />;
  });
