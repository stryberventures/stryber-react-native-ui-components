import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, select, boolean} from '@storybook/addon-knobs';
import {Button} from '../../components';
// @ts-ignore
import CenterView from '../../components/CenterView';
import {button} from '../../static/markdown';

const getKnobProps = () => ({
  size: select('size', ['regular', 'small', 'mini'], 'regular'),
  color: color('color', 'blue'),
  shadow: boolean('shadow', false),
  shape: select('shape', ['rectangle', 'rounded', 'round'], 'rectangle'),
  disabled: boolean('disabled', false),
  // @ts-ignore
  icon: select('icon', [null, 'Eye'], null),
  ripple: boolean('ripple', false),
});

storiesOf('Button', module)
  .addParameters({
    notes: {markdown: button},
  })
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('primary', () => (
    <CenterView>
      <Button {...getKnobProps()} onPress={action('clicked-shadow')}>
        Button text
      </Button>
    </CenterView>
  ))
  .add('secondary', () => (
    <CenterView>
      <Button
        type="outlined"
        {...getKnobProps()}
        onPress={action('clicked-shadow')}>
        Button text
      </Button>
    </CenterView>
  ));
