import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {linkTo} from '@storybook/addon-links';

import Input from '../components/Input';
import CenterView from '../components/CenterView';

const input = React.createRef();

storiesOf('Input', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <Input
      ref={input}
      onFocus={linkTo('Input', 'focused')}
      required
      placeholder={'Input'}
      type="email"
      value={''}
      style={{width: 250}}
    />
  ))
  .add('focused', () => (
    <Input
      ref={input}
      required
      placeholder={'Input'}
      type="email"
      value=""
      autoFocus
      style={{width: 250}}
    />
  ))
  .add('with error', () => (
    <Input
      ref={input}
      error="Error text"
      required
      placeholder={'Input'}
      type="email"
      value=""
      style={{width: 250}}
    />
  ));
