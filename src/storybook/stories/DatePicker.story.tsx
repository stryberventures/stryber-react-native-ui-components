import * as React from 'react';
import {DatePicker} from '../../components';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {storiesOf} from '@storybook/react-native';
import {datePicker} from '../../static/markdown';
import { ArrowDown } from '../../components/Icons';

storiesOf('DatePicker', module)
  .addParameters({
    notes: {markdown: datePicker},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <DatePicker label="Choose date" mode="date" />;
  })
  .add('datetime mode', () => {
    return <DatePicker label="Choose date" mode="datetime" iconSize={18} />;
  })
  .add('time mode', () => {
    return <DatePicker mode="time" icon={() => <ArrowDown  fill={'#444'} />} style={{width: 135}}/>;
  });
