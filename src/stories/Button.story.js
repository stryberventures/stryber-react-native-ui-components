import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, text, object, select} from '@storybook/addon-knobs';

import {defaultTheme} from '../constants';
import Button from '../components/Button';
import Text from '../components/Text';
import CenterView from '../components/CenterView';
import {gradientMarkdown} from '../static/markdown/gradientButton.js';

storiesOf('Button', module)
  .addParameters({
    component: Button,
  })
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('all', () => (
    <SafeAreaView>
      <ScrollView>
        <Button gradient onPress={action('clicked-gradient')}>
          <Text bold white center>
            Button text
          </Text>
        </Button>
        <Button shadow color="white" onPress={action('clicked-shadow')}>
          <Text center semibold>
            Button text
          </Text>
        </Button>
        <Button onPress={action('clicked-link')}>
          <Text grey caption center style={{textDecorationLine: 'underline'}}>
            Button text
          </Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  ))
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
          <Text bold {...{[textColorsSelect]: true}} center>
            {buttonText}
          </Text>
        </Button>
      );
    },
    {notes: {markdown: gradientMarkdown}},
  )
  .add('with shadow', () => (
    <Button shadow color="white" onPress={action('clicked-shadow')}>
      <Text center semibold>
        Button text
      </Text>
    </Button>
  ))
  .add('used like link', () => (
    <Button onPress={action('clicked-link')}>
      <Text grey caption center style={{textDecorationLine: 'underline'}}>
        Button text
      </Text>
    </Button>
  ));
