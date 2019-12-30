import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, select} from '@storybook/addon-knobs';

import CenterView from '../../components/CenterView';
import Text from '../../components/Text';
import {text as textMarkdown} from '../../static/markdown';

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: {markdown: textMarkdown},
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('all cases', () => {
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
      'black',
      'For text',
    );
    const textBoldSelect = select(
      'Bold',
      {
        regular: 'regular',
        bold: 'bold',
        semibold: 'semibold',
        medium: 'medium',
        light: 'light',
      },
      'regular',
      'For text',
    );
    const textAlignSelect = select(
      'Align',
      {
        center: 'center',
        right: 'right',
        left: 'left',
      },
      'center',
      'For text',
    );
    const textFontSizeSelect = select(
      'Font Size',
      {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        title: 'title',
        body: 'body',
        caption: 'caption',
        small: 'small',
      },
      'body',
      'For text',
    );
    const innerText = text('Text', 'Lorem ipsum', 'For text');
    return (
      <Text
        center
        {...{
          [textColorsSelect]: true,
          [textBoldSelect]: true,
          [textAlignSelect]: true,
          [textFontSizeSelect]: true,
        }}>
        {innerText}
      </Text>
    );
  });
