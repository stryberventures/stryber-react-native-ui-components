import * as React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {boolean, color, select, withKnobs} from '@storybook/addon-knobs';
import Checkbox from './index';
import CenterView from '../CenterView';
import {checkbox} from '../../static/markdown';

const getKnobProps = () => ({
  bgColor: color('bgColor', ''),
  tickColor: color('tickColor', 'white'),
  disabled: boolean('disabled', false),
  size: select('size', ['regular', 'large'], 'regular'),
  error: select('error', ['', 'Some error'], ''),
});
storiesOf('Controls/Checkbox', module)
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add(
    'default',
    () => {
      return <Checkbox text="checkbox" value={true} {...getKnobProps()} />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'sizes',
    () => {
      return (
        <>
          <View style={{marginBottom: 10}}>
            <Checkbox text="checkbox" value={true} />
          </View>
          <View style={{marginBottom: 10}}>
            <Checkbox text="checkbox" value={true} size="large" />
          </View>
        </>
      );
    },
    {
      notes: {markdown: checkbox},
    },
  );

storiesOf('Controls/RadioButton', module)
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add(
    'default',
    () => {
      return <Checkbox text="radio" radio value={true} {...getKnobProps()} />;
    },
    {
      notes: {markdown: checkbox},
    },
  )
  .add(
    'sizes',
    () => {
      return (
        <>
          <View style={{marginBottom: 10}}>
            <Checkbox text="radio" radio value={true} />
          </View>
          <View style={{marginBottom: 10}}>
            <Checkbox text="radio" radio value={true} size="large" />
          </View>
        </>
      );
    },
    {
      notes: {markdown: checkbox},
    },
  );
