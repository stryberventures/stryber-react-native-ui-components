import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, text, object, select} from '@storybook/addon-knobs';

import {defaultTheme} from '../../constants';
import {Button, Block} from '../../components';
import Text from '../../components/Text';
import CenterView from '../../components/CenterView';
import {gradientMarkdown} from '../../static/markdown/gradientButton.js';

storiesOf('Button', module)
  .addParameters({
    component: Button,
  })
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add(
    'with gradient',
    () => {
      // for Button
      const gradientColor1 = color(
        'Gradient First Color',
        defaultTheme.colors.primary,
        'Gradient',
      );
      const gradientColor2 = color(
        'Gradient Second Color',
        defaultTheme.colors.secondary,
        'Gradient',
      );
      const colorPosition1 = object(
        "Change 1'st color position",
        {x: 0, y: 0},
        'Gradient',
      );
      const colorPosition2 = object(
        "Change 2'nd color position",
        {x: 1, y: 1},
        'Gradient',
      );
      // for Text
      const textColorsSelect = select(
        'Colors',
        {
          accent: 'accent',
          primary: 'primary',
          secondary: 'secondary',
          tertiary: 'tertiary',
          black: 'black',
          white: 'white',
          gray: 'gray',
          gray2: 'gray2',
        },
        'white',
        'Text',
      );
      const buttonText = text('Button text', 'Hello Button', 'Text');
      return (
        <Button
          startColor={gradientColor1}
          endColor={gradientColor2}
          start={colorPosition1}
          end={colorPosition2}
          gradient
          onPress={action('clicked-gradient')}>
          <Text header bold {...{[textColorsSelect]: true}} center>
            {buttonText}
          </Text>
        </Button>
      );
    },
    {notes: {markdown: gradientMarkdown}},
  )
  .add('with shadow', () => (
    <Button shadow color="white" onPress={action('clicked-shadow')}>
      <Text header center semibold>
        Button text
      </Text>
    </Button>
  ))
  .add('primary', () => (
    <Button color="primary" onPress={action('clicked-shadow')}>
      <Text header white center bold>
        Button text
      </Text>
    </Button>
  ))
  .add('secondary', () => (
    <Button border color="transparent" onPress={action('clicked-shadow')}>
      <Text primary header center bold>
        Button text
      </Text>
    </Button>
  ))
  .add('with ripple', () => (
    <Button
      ripple
      border
      color="transparent"
      onPress={action('clicked-shadow')}>
      <Text primary header center bold>
        Button text
      </Text>
    </Button>
  ))
  .add('mini button', () => (
    <Block
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Button
        border
        color="primary"
        onPress={action('clicked-mini1')}
        style={{width: 70, height: 24}}>
        <Text white caption center>
          Label
        </Text>
      </Button>
      <Button
        border
        color="transparent"
        onPress={action('clicked-mini2')}
        style={{width: 70, height: 24}}>
        <Text primary caption center>
          Label
        </Text>
      </Button>
      <Button
        border="#95acbf"
        color="transparent"
        onPress={action('clicked-mini3')}
        style={{width: 70, height: 24}}>
        <Text color="#95acbf" caption center>
          Label
        </Text>
      </Button>
    </Block>
  ))
  .add('used like link', () => (
    <Button onPress={action('clicked-link')}>
      <Text header grey caption center bold primary>
        Button text >>
      </Text>
    </Button>
  ));
