// @ts-nocheck
import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {slider} from '../../static/markdown';
import CenterView from '../../components/CenterView';
import {Animated, View} from 'react-native';
import {Slider} from '../../components';
import {Speaker, SpeakerMute} from '../../components/Icons';

const TestComponent = (props: any) => {
  const [size, setSize] = React.useState({
    up: 0,
    down: 0,
  });

  return (
    <>
      <View style={{height: 50, opacity: 1}}>
        <Animated.Text>{`Up: ${size.up}`}</Animated.Text>
        <Animated.Text>{`Down: ${size.down}`}</Animated.Text>
      </View>
      <Slider
        {...props}
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
  })
  .add('smooth off', () => {
    return <TestComponent smooth={false} valueUp={5} />;
  })
  .add('labels in the bottom', () => {
    return <TestComponent layout="labelBottom" valueUp={5} />;
  })
  .add('large size', () => {
    return <TestComponent size="large" />;
  })
  .add('with custom color', () => {
    return <TestComponent color="green" />;
  })
  .add('with down button', () => {
    return <TestComponent valueDown={1} valueUp={5} downButtonVisible />;
  })
  .add('with icons', () => {
    return (
      <TestComponent
        valueUp={5}
        leftLabel={() => <SpeakerMute fill="black" />}
        rightLabel={() => <Speaker fill="black" />}
      />
    );
  });
