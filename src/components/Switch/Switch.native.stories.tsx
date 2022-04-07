import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {color, boolean, select, withKnobs} from '@storybook/addon-knobs';
import {View} from 'react-native';
import CenterView from '../../storybook/CenterView/index';
import Switch from './index';
import {switchDoc} from '../../static/markdown';

const getKnobProps = () => ({
  bgColor: color('bgColor', ''),
  disabled: boolean('disabled', false),
  size: select('size', ['regular', 'large'], 'regular'),
  error: select('error', ['', 'Some error'], ''),
});
storiesOf('Controls/Switch', module)
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add(
    'default',
    () => {
      return <Switch value={true} {...getKnobProps()} />;
    },
    {
      notes: {markdown: switchDoc},
    },
  )
  .add(
    'sizes',
    () => {
      return (
        <>
          <View style={{marginBottom: 10}}>
            <Switch value={true} />
          </View>
          <View style={{marginBottom: 10}}>
            <Switch value={true} size="large" />
          </View>
        </>
      );
    },
    {
      notes: {markdown: switchDoc},
    },
  );
