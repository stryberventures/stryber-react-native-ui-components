import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, boolean, select, color} from '@storybook/addon-knobs';
import {slider} from '../../static/markdown';
import CenterView from '../../components/CenterView';
import Slider from './index';
import {Speaker, SpeakerMute} from '../../components/Icons';
import {defaultTheme} from '../../constants';

const getKnobProps = () => ({
  size: select('size', ['regular', 'large'], 'regular'),
  layout: select(
    'layout',
    ['regular', 'labelBottom', 'labelHidden'],
    'regular',
  ),
  color: color('color', defaultTheme.colors.primary),
  showTooltip: boolean('showTooltip', true),
});

storiesOf('Slider', module)
  .addParameters({
    notes: {markdown: slider},
  })
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return <Slider {...getKnobProps()} limitUp={9} valueUp={3} />;
  })
  .add('smooth off', () => {
    return (
      <Slider {...getKnobProps()} smooth={false} valueUp={5} limitUp={9} />
    );
  })
  .add('with down button', () => {
    return (
      <Slider
        {...getKnobProps()}
        valueDown={1}
        valueUp={5}
        limitUp={9}
        showDownButton
      />
    );
  })
  .add('with icons', () => {
    return (
      <Slider
        {...getKnobProps()}
        valueUp={5}
        limitUp={10}
        leftLabel={() => <SpeakerMute fill="black" />}
        rightLabel={() => <Speaker fill="black" />}
      />
    );
  });
