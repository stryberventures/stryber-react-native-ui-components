import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {linkTo} from '@storybook/addon-links';
import {withKnobs, text} from '@storybook/addon-knobs';

import Input from '../components/Input';
import CenterView from '../components/CenterView';

const input = React.createRef();
const placeholder = text('Placeholder', 'Input');

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => {
    return (
      <Input
        ref={input}
        onFocus={linkTo('Input', 'focused')}
        required
        placeholder={placeholder}
        type="email"
        value={''}
      />
    );
  })
  .add('focused', () => (
    <Input
      ref={input}
      required
      placeholder={placeholder}
      type="email"
      value=""
      autoFocus
    />
  ))
  .add('with error', () => (
    <Input
      ref={input}
      error="Error text"
      required
      placeholder={placeholder}
      type="email"
      value=""
    />
  ));
