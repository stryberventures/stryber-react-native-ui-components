// @ts-nocheck
import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {slider} from '../../static/markdown';
import CenterView from '../../components/CenterView';
import {Animated, View} from 'react-native';
import {Slider} from '../../components';

const TestComponent = () => {
  const [size, setSize] = React.useState({
    up: 0,
    down: 0,
  });

  return (
    <>
      <View style={{height: 50}}>
        <Animated.Text>{`${size.up} ${size.down}`}</Animated.Text>
      </View>
      <Slider
        color="green"
        size="large"
        onChange={(up, down) => {
          setSize({up, down});
        }}
      />
    </>
  );
};

storiesOf('Slider', module)
  .addParameters({
    notes: {markdown: slider},
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <TestComponent />;
  });
