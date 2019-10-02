import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {withKnobs, color, text, object} from '@storybook/addon-knobs';

import {theme} from '../constants';
import Button from '../components/Button';
import Text from '../components/Text';
import CenterView from '../components/CenterView';
import {gradientMarkdown} from '../static/markdown/gradientButton.js';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add(
    'with gradient',
    () => {
      const buttonText = text('Button text', 'Hello Button', 'Text');
      const gradientColor1 = color(
        'Gradient First Color',
        theme.colors.primary,
        'Gradient',
      );
      const gradientColor2 = color(
        'Gradient Second Color',
        theme.colors.secondary,
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
      return (
        <Button
          startColor={gradientColor1}
          endColor={gradientColor2}
          start={colorPosition1}
          end={colorPosition2}
          gradient
          onPress={action('clicked-text')}>
          <Text bold white center>
            {buttonText}
          </Text>
        </Button>
      );
    },
    {notes: {markdown: gradientMarkdown}},
  )
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text grey caption center>
        😀 😎 👍 💯
      </Text>
    </Button>
  ));
