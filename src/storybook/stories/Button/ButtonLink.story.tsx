import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, select} from '@storybook/addon-knobs';
import {Button} from '../../../components';
// @ts-ignore
import CenterView from '../../CenterView/index';
import {button} from '../../../static/markdown';

const getKnobProps = () => ({
  size: select('size', ['regular', 'small'], 'regular'),
  color: color('color', ''),
});

storiesOf('Button/Link', module)
  .addParameters({
    notes: {markdown: button},
  })
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('general', () => (
    <CenterView>
      <Button
        style={{alignSelf: 'center'}}
        type="link"
        {...getKnobProps()}
        onPress={action('clicked-shadow')}>
        Button text
      </Button>
    </CenterView>
  ))
  .add('size', () => (
    <CenterView>
      <Button type="link" size="small">
        Size small
      </Button>
      <Button type="link" size="regular">
        Size regular
      </Button>
    </CenterView>
  ));
