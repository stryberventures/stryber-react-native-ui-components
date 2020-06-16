import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {linkTo} from '@storybook/addon-links';
import {withKnobs, text} from '@storybook/addon-knobs';
import Input from '../../../components/Input';
// @ts-ignore
import CenterView from '../../../components/CenterView/index';
import {input} from '../../../static/markdown';
import {UserIcon} from '../../../components/Icons';

const placeholder = text('Placeholder', 'Input placeholder');
storiesOf('Input/Simple', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: {markdown: input},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('disabled', () => {
    return (
      <Input placeholder={placeholder} type="email" label="Email" disabled />
    );
  })
  .add('default', () => (
    <Input
      onFocus={linkTo('Input/Simple', 'focused')}
      placeholder={placeholder}
      type="email"
      label="Email"
    />
  ))
  .add('focused', () => (
    <Input label="Email" placeholder={placeholder} type="email" autoFocus />
  ))
  .add('with default value', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        value="Default value"
      />
    );
  })
  .add('with custom color', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        value="Default value"
        color="orange"
      />
    );
  })
  .add('with icon', () => (
    <Input
      label="Text"
      placeholder={placeholder}
      type="number"
      icon={() => <UserIcon fill="black" />}
    />
  ))
  .add('with icon right', () => (
    <Input
      label="Text"
      placeholder={placeholder}
      type="number"
      rightIcon={() => <UserIcon fill="black" />}
    />
  ))
  .add('with error', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      value="Wrong text"
      error="Error text"
    />
  ))
  .add('with mask', () => (
    <Input
      label="Card date"
      placeholder={placeholder}
      type="number"
      mask="XX/XX"
      maxLength={5}
    />
  ))
  .add('password', () => (
    <Input secure label="Password" placeholder={placeholder} />
  ))
  .add('multiline disabled', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        multiline
        disabled
      />
    );
  })
  .add('multiline default', () => {
    const testRef = React.createRef<any>();
    return (
      <Input
        onFocus={linkTo('Input', 'multiline focused')}
        placeholder={placeholder}
        type="email"
        label="Email"
        ref={testRef}
        multiline
      />
    );
  })
  .add('multiline focused', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      multiline
      autoFocus
    />
  ))
  .add('multiline with default value', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        multiline
        value="Default value"
      />
    );
  })
  .add('multiline with error', () => (
    <Input
      label="Email"
      value="Wrong text"
      placeholder={placeholder}
      type="email"
      multiline
      error="Error text"
    />
  ));
