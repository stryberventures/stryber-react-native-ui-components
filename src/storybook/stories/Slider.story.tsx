// @ts-nocheck
import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, boolean, select, color} from '@storybook/addon-knobs';
import {slider} from '../../static/markdown';
import CenterView from '../CenterView';
import {Slider} from '../../components';
import {Speaker, SpeakerMute} from '../../components/Icons';

const getKnobProps = () => ({
  size: select('size', ['regular', 'large']),
  layout: select('layout', ['regular', 'labelBottom', 'labelHidden']),
  color: color('color'),
  showTooltip: boolean('showTooltip', true),
});

storiesOf('Slider', module)
  .addParameters({
    notes: {markdown: slider},
  })
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <Slider {...getKnobProps()} />;
  })
  .add('smooth off', () => {
    return <Slider {...getKnobProps()} smooth={false} valueUp={5} />;
  })
  .add('with down button', () => {
    return (
      <Slider {...getKnobProps()} valueDown={1} valueUp={5} showDownButton />
    );
  })
  .add('with icons', () => {
    return (
      <Slider
        {...getKnobProps()}
        valueUp={5}
        leftLabel={() => <SpeakerMute fill="black" />}
        rightLabel={() => <Speaker fill="black" />}
      />
    );
  });
