import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, select, boolean} from '@storybook/addon-knobs';
import {Button} from '../../../components';
// @ts-ignore
import CenterView from '../../../components/CenterView/index';
import {button} from '../../../static/markdown';

const getKnobProps = () => ({
  size: select('size', ['regular', 'small', 'mini'], 'regular'),
  color: color('color', ''),
  secondaryColor: color('secondaryColor', ''),
  shadow: boolean('shadow', false),
  shape: select('shape', ['rectangle', 'rounded', 'round'], 'rounded'),
  disabled: boolean('disabled', false),
  // @ts-ignore
  icon: select('icon', [null, 'Eye'], null),
  ripple: boolean('ripple', false),
});

storiesOf('Button/Outlined', module)
  .addParameters({
    notes: {markdown: button},
  })
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('general', () => (
    <CenterView>
      <Button
        type="outlined"
        {...getKnobProps()}
        onPress={action('clicked-shadow')}>
        Button text
      </Button>
    </CenterView>
  ))
  .add('size', () => (
    <CenterView>
      <Button type="outlined" size="mini">
        Size mini
      </Button>
      <Button type="outlined" size="small">
        Size small
      </Button>
      <Button type="outlined" size="regular">
        Size regular
      </Button>
    </CenterView>
  ))
  .add('shape', () => (
    <CenterView>
      <Button type="outlined" shape="rectangle">
        Shape rectangle
      </Button>
      <Button type="outlined" shape="rounded">
        Shape rounded
      </Button>
      <Button type="outlined" shape="round">
        Shape round
      </Button>
    </CenterView>
  ));
