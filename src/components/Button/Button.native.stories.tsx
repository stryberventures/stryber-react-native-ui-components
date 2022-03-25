import * as React from 'react';
import {ScrollView} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, select, boolean} from '@storybook/addon-knobs';
import {Button, Block} from '../index';
import CenterView from '../CenterView';
import {button} from '../../static/markdown';
import {ThemeProvider} from '../Theme';

const getKnobProps = () => ({
  size: select('size', ['regular', 'small', 'mini'], 'regular'),
  color: color('color', ''),
  secondaryColor: color('secondaryColor', ''),
  shadow: boolean('shadow', false),
  shape: select('shape', ['rectangle', 'rounded', 'round'], 'rounded'),
  disabled: boolean('disabled', false),
  icon: select('icon', ['Eye'], undefined),
  ripple: boolean('ripple', false),
});

storiesOf('Button/Primary', module)
  .addParameters({
    notes: {markdown: button},
  })
  .addDecorator(withKnobs)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('general', () => (
    <ThemeProvider initial={{some: {thing: 'purple'}}}>
      <CenterView>
        <Button {...getKnobProps()} onPress={action('clicked-shadow')}>
          Button text
        </Button>
      </CenterView>
    </ThemeProvider>
  ))
  .add('size', () => (
    <CenterView>
      <Button size="mini">Size mini</Button>
      <Button size="small">Size small</Button>
      <Button size="regular">Size regular</Button>
    </CenterView>
  ))
  .add('shape', () => (
    <ScrollView contentContainerStyle={{paddingVertical: 20, flex: 1}}>
      <Block column bottom style={{flex: 1}}>
        <Block>
          <Block row space="between">
            <Button size="mini" shape="rectangle">
              Rectangle
            </Button>
            <Button size="mini" shape="rounded">
              Rounded
            </Button>
            <Button size="mini" shape="round">
              Round
            </Button>
          </Block>
          <Block
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Button size="small" shape="rectangle">
              Rectangle
            </Button>
            <Button size="small" shape="rounded">
              Rounded
            </Button>
            <Button size="small" shape="round">
              Round
            </Button>
          </Block>
          <Block>
            <Button shape="rectangle">Rectangle</Button>
            <Button shape="rounded">Rounded</Button>
            <Button shape="round">Round</Button>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  ));

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
    <ScrollView contentContainerStyle={{paddingVertical: 20, flex: 1}}>
      <Block column bottom style={{flex: 1}}>
        <Block>
          <Block row space="between">
            <Button type="outlined" size="mini" shape="rectangle">
              Rectangle
            </Button>
            <Button type="outlined" size="mini" shape="rounded">
              Rounded
            </Button>
            <Button type="outlined" size="mini" shape="round">
              Round
            </Button>
          </Block>
          <Block
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Button type="outlined" size="small" shape="rectangle">
              Rectangle
            </Button>
            <Button type="outlined" size="small" shape="rounded">
              Rounded
            </Button>
            <Button type="outlined" size="small" shape="round">
              Round
            </Button>
          </Block>
          <Block>
            <Button type="outlined" shape="rectangle">
              Rectangle
            </Button>
            <Button type="outlined" shape="rounded">
              Rounded
            </Button>
            <Button type="outlined" shape="round">
              Round
            </Button>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  ));

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
