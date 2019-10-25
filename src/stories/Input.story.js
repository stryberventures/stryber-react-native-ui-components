import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {linkTo} from '@storybook/addon-links';
import {withKnobs, text} from '@storybook/addon-knobs';

import Input from '../components/Input';
import CenterView from '../components/CenterView';

const placeholder = text('Placeholder', 'Input');

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('disabled', () => {
    return (
      <Input placeholder={placeholder} type="email" label="Email" disabled />
    );
  })
  .add('default', () => {
    const testRef = React.createRef();
    return (
      <Input
        onFocus={linkTo('Input', 'focused')}
        placeholder={placeholder}
        type="email"
        label="Email"
        ref={testRef}
      />
    );
  })
  .add('focused', () => (
    <Input label="Email" placeholder={placeholder} type="email" autoFocus />
  ))
  .add('with default value', () => {
    return (
      <Input
        placeholder={placeholder}
        value="Default value"
        type="email"
        label="Email"
      />
    );
  })
  .add('with error', () => (
    <Input
      label="Email"
      value="Wrong text"
      error="Error text"
      placeholder={placeholder}
      type="email"
    />
  ))
  .add('with mask', () => (
    <Input
      label="Card date"
      number
      placeholder={placeholder}
      type="card"
      mask="XX/XX"
      maxLength={5}
    />
  ))
  .add('with icon', () => (
    <Input email withLeftBorder={false} placeholder={placeholder} />
  ));
