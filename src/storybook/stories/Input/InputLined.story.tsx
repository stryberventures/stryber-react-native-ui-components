import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {linkTo} from '@storybook/addon-links';
import {withKnobs, text} from '@storybook/addon-knobs';
import Input from '../../../components/Input';
// @ts-ignore
import CenterView from '../../../components/CenterView/index';
import {UserIcon} from '../../../components/Icons';
import {input} from '../../../static/markdown';
const placeholder = text('Placeholder', 'Input placeholder');
const variant = 'lined';
storiesOf('Input/Lined', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: {markdown: input},
  })
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('disabled', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        variant={variant}
        disabled
      />
    );
  })
  .add('default', () => (
    <Input
      onFocus={linkTo('Input/Lined', 'focused')}
      placeholder={placeholder}
      type="email"
      label="Email"
      variant={variant}
    />
  ))
  .add('focused', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      variant={variant}
      autoFocus
    />
  ))
  .add('with default value', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        variant={variant}
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
        variant={variant}
        value="Default value"
        color="orange"
      />
    );
  })
  .add('with error', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      variant={variant}
      value="Wrong text"
      error="Error text"
    />
  ))
  .add('with mask', () => (
    <Input
      label="Card date"
      placeholder={placeholder}
      type="number"
      variant={variant}
      mask="XX/XX"
      maxLength={5}
    />
  ))
  .add('password', () => (
    <Input
      secure
      label="Password"
      placeholder={placeholder}
      variant={variant}
    />
  ))
  .add('with icon', () => (
    <Input
      type="email"
      placeholder={placeholder}
      label="Email"
      variant={variant}
      icon={() => <UserIcon />}
    />
  ))
  .add('with icon right', () => (
    <Input
      type="email"
      placeholder={placeholder}
      label="Email"
      variant={variant}
      rightIcon={() => <UserIcon fill="blue" />}
    />
  ))
  .add('with icon transparent back', () => (
    <Input
      type="email"
      iconBackground={false}
      placeholder={placeholder}
      label="Email"
      variant={variant}
      icon={() => <UserIcon fill="blue" />}
    />
  ))
  .add('with icon disabled', () => (
    <Input
      type="email"
      disabled
      placeholder={placeholder}
      label="Email"
      variant={variant}
      icon={() => <UserIcon />}
    />
  ))
  .add('with icon error', () => (
    <Input
      type="email"
      error="Error text"
      placeholder={placeholder}
      label="Email"
      variant={variant}
      icon={() => <UserIcon />}
    />
  ))
  .add('multiline disabled', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        variant={variant}
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
        variant={variant}
        multiline
      />
    );
  })
  .add('multiline focused', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      variant={variant}
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
        variant={variant}
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
      variant={variant}
      multiline
      error="Error text"
    />
  ));
