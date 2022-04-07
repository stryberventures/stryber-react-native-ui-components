import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, color} from '@storybook/addon-knobs';
import Input from './index';
import CenterView from '../../storybook/CenterView';
import {input} from '../../static/markdown';
import {UserIcon} from '../Icons';

const getKnobProps = () => ({
  color: color('color', ''),
});

const placeholder = text('Placeholder', 'Input placeholder');
storiesOf('Input/Simple', module)
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
        disabled
        {...getKnobProps()}
      />
    );
  })
  .add('default', () => (
    <Input
      placeholder={placeholder}
      type="email"
      label="Email"
      {...getKnobProps()}
    />
  ))
  .add('focused', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      autoFocus
      {...getKnobProps()}
    />
  ))
  .add('with default value', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        value="Default value"
        {...getKnobProps()}
      />
    );
  })
  .add('with icon', () => (
    <Input
      label="Text"
      placeholder={placeholder}
      type="number"
      icon={() => <UserIcon fill="black" />}
      {...getKnobProps()}
    />
  ))
  .add('with icon right', () => (
    <Input
      label="Text"
      placeholder={placeholder}
      type="number"
      rightIcon={() => <UserIcon fill="black" />}
      {...getKnobProps()}
    />
  ))
  .add('with error', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      value="Wrong text"
      error="Error text"
      {...getKnobProps()}
    />
  ))
  .add('with mask', () => (
    <Input
      label="Card date"
      placeholder={placeholder}
      type="number"
      mask="XX/XX"
      maxLength={5}
      {...getKnobProps()}
    />
  ))
  .add('password', () => (
    <Input
      secure
      label="Password"
      placeholder={placeholder}
      {...getKnobProps()}
    />
  ))
  .add('multiline disabled', () => {
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        multiline
        disabled
        {...getKnobProps()}
      />
    );
  })
  .add('multiline default', () => {
    const testRef = React.createRef<any>();
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        ref={testRef}
        multiline
        {...getKnobProps()}
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
      {...getKnobProps()}
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
        {...getKnobProps()}
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
      {...getKnobProps()}
    />
  ));

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
        {...getKnobProps()}
      />
    );
  })
  .add('default', () => (
    <Input
      placeholder={placeholder}
      type="email"
      label="Email"
      variant={variant}
      {...getKnobProps()}
    />
  ))
  .add('focused', () => (
    <Input
      label="Email"
      placeholder={placeholder}
      type="email"
      variant={variant}
      autoFocus
      {...getKnobProps()}
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
        {...getKnobProps()}
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
      {...getKnobProps()}
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
      {...getKnobProps()}
    />
  ))
  .add('password', () => (
    <Input
      secure
      label="Password"
      placeholder={placeholder}
      variant={variant}
      {...getKnobProps()}
    />
  ))
  .add('with icon', () => (
    <Input
      type="email"
      placeholder={placeholder}
      label="Email"
      variant={variant}
      icon={() => <UserIcon />}
      {...getKnobProps()}
    />
  ))
  .add('with icon right', () => (
    <Input
      type="email"
      placeholder={placeholder}
      label="Email"
      variant={variant}
      rightIcon={() => <UserIcon fill="blue" />}
      {...getKnobProps()}
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
      {...getKnobProps()}
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
      {...getKnobProps()}
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
      {...getKnobProps()}
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
        {...getKnobProps()}
      />
    );
  })
  .add('multiline default', () => {
    const testRef = React.createRef<any>();
    return (
      <Input
        placeholder={placeholder}
        type="email"
        label="Email"
        ref={testRef}
        variant={variant}
        multiline
        {...getKnobProps()}
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
      {...getKnobProps()}
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
        {...getKnobProps()}
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
      {...getKnobProps()}
    />
  ));
