import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, text, color} from '@storybook/addon-knobs';
import Input from '../../../components/Input';
// @ts-ignore
import CenterView from '../../../components/CenterView/index';
import {input} from '../../../static/markdown';
import {UserIcon} from '../../../components/Icons';

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
