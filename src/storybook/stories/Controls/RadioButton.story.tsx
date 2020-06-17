import * as React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {boolean, color, select, withKnobs} from '@storybook/addon-knobs';
import Checkbox from '../../../components/Checkbox';
// @ts-ignore
import CenterView from '../../../components/CenterView/index';
import {checkbox} from '../../../static/markdown';

const getKnobProps = () => ({
  bgColor: color('bgColor', ''),
  tickColor: color('tickColor', 'white'),
  disabled: boolean('disabled', false),
  size: select('size', ['regular', 'large'], 'regular'),
  error: select('error', ['', 'Some error'], ''),
});
storiesOf('Controls/RadioButton', module)
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add(
    'default',
    () => {
      return <Checkbox radio value={true} {...getKnobProps()} />;
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
            <Checkbox radio value={true} />
          </View>
          <View style={{marginBottom: 10}}>
            <Checkbox radio value={true} size="large" />
          </View>
        </>
      );
    },
    {
      notes: {markdown: checkbox},
    },
  );
